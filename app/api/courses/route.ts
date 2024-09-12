import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db-drizzle";
import { isTeacher } from "@/lib/teacher";
import { Course } from "@/db-drizzle/migrations/schema";

export async function POST(
  req:Request,
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.insert(Course).values({
      userId: userId,
      title: title,
    }).returning({ id: Course.id });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}