import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/db-drizzle";
import { Course, Chapter } from "@/db-drizzle/migrations/schema";
import { and, desc, eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.select().from(Course).where(and(eq(Course.id, params.courseId), eq(Course.userId, userId)));
    // const courseOwner = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     userId: userId
    //   }
    // });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.select().from(Chapter).where(eq(Chapter.courseId, params.courseId)).orderBy(desc(Chapter.position));
    // const lastChapter = await db.chapter.findFirst({
    //   where: {
    //     courseId: params.courseId,
    //   },
    //   orderBy: {
    //     position: "desc",
    //   },
    // });

    const newPosition = lastChapter ? lastChapter[0].position + 1 : 1;

    const chapter = await db.insert(Chapter).values({
      title,
      courseId: params.courseId,
      position: newPosition
    });
    // const chapters = await db.chapter.create({
    //   data: {
    //     title,
    //     courseId: params.courseId,
    //     position: newPosition,
    //   },
    // });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}