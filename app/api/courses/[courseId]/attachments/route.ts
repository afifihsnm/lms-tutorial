import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { Attachment, Course } from "@/db-drizzle/migrations/schema";
import { db } from "@/db-drizzle";
import { and, eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.select().from(Course).where(and(eq(Course.id, params.courseId), eq(Course.userId, userId)));

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.insert(Attachment).values({
      url,
      name: url.split("/").pop(),
      courseId: params.courseId,
    });
    // const attachment = await db.attachment.create({
    //   data: {
    //     url,
    //     name: url.split("/").pop(),
    //     courseId: params.courseId,
    //   }
    // });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}