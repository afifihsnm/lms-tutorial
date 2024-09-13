import { db } from "@/lib/db";
import { xenditClient } from "@/lib/xendit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  // const body = await req.text();
  // const signature = headers().get("Stripe-Signature") as string;

  // const event = await req.json();

  // try {
    // event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // )
  // } catch (error: any) {
  //   return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  // }

  const callback = await req.json();
  const userIdCourseId = callback?.external_id.split("@");
  const userId = userIdCourseId[0];
  const courseId = userIdCourseId[1];

  if (callback.status === "PAID") {
    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

    await db.purchase.create({
      data: {
        courseId,
        userId,
      }
    });
  } else {
    return new NextResponse(`Webhook Error: Unhandled event type ${callback.status}`, { status: 200 });
  }

  return new NextResponse(null, { status: 200});
}