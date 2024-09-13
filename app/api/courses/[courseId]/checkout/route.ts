import { db } from "@/lib/db";
import { xenditClient } from "@/lib/xendit";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Xendit, Invoice as InvoiceClient, Customer as CustomerClient } from 'xendit-node';
import { CreateInvoiceRequest, Invoice } from "xendit-node/invoice/models";
import { Customer } from 'xendit-node/customer/models';
import { CreateCustomerRequest } from "xendit-node/customer/apis";
import { randomUUID } from "crypto";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { Invoice } = xenditClient;
    const { Customer } = xenditClient

    const xenditInvoiceClient = new InvoiceClient({secretKey: process.env.XENDIT_API_KEY!});
    const xenditCustomerClient = new CustomerClient({secretKey: process.env.XENDIT_API_KEY!});

    const data: CreateInvoiceRequest = {
      "amount" : course.price!,
      "invoiceDuration" : "172800",
      "externalId" : `${user.id}@${course.id}`,
      "description" : "Test Invoice",
      "currency" : "IDR",
      "successRedirectUrl": `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      "failureRedirectUrl": `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
    }

    // const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    //   {
    //     quantity: 1,
    //     price_data: {
    //       currency: "USD",
    //       product_data: {
    //         name: course.title,
    //         description: course.description!,
    //       },
    //       unit_amount: Math.round(course.price! * 100),
    //     }
    //   }
    // ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
          stripeCustomerId: true,
      }
    });

    if (!stripeCustomer) {
      const customer: Customer = await xenditCustomerClient.createCustomer({
        data: {
          referenceId: randomUUID(),
          email: user.emailAddresses[0].emailAddress,
          type: "INDIVIDUAL",
          individualDetail: {
            givenNames: user.fullName!,
          }
        }
      });

      // const customer = await stripe.customers.create({
      //   email: user.emailAddresses[0].emailAddress,
      // });
    
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.referenceId,
        }
      });
    }

    const session: Invoice = await xenditInvoiceClient.createInvoice({
      data,
  })

    // const session = await stripe.checkout.sessions.create({
    //   customer: stripeCustomer.stripeCustomerId,
    //   line_items,
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
    //   metadata: {
    //     courseId: course.id,
    //     userId: user.id,
    //   }
    // });

    return NextResponse.json({ url: session.invoiceUrl });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}