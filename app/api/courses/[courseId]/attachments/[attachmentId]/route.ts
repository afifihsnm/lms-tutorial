import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/db-drizzle";
import { Attachment, Course } from "@/db-drizzle/migrations/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.select().from(Course).where(and(eq(Course.id, params.courseId), eq(Course.userId, userId)));
    // const courseOwner = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     userId: userId
    //   }
    // })

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.delete(Attachment).where(and(eq(Attachment.courseId, params.courseId), eq(Attachment.id, params.attachmentId)));
    // const newAttachment = await db.attachment.delete({
    //   where: {
    //     courseId: params.courseId,
    //     id: params.attachmentId,
    //   }
    // });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}