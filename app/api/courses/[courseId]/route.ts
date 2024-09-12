import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/db-drizzle";
import { Chapter, Course, MuxData } from "@/db-drizzle/migrations/schema";
import { and, eq } from "drizzle-orm";

const { video } = new Mux();

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.select().from(Course).where(and(eq(Course.id, params.courseId), eq(Course.userId, userId))).leftJoin(Chapter, eq(Course.id, Chapter.courseId)).leftJoin(MuxData, eq(Chapter.id, MuxData.chapterId));
    // const course = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     userId
    //   },
    //   include: {
    //     chapters: {
    //       include: {
    //         muxData: true,
    //       }
    //     }
    //   }
    // });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("COURSE_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}