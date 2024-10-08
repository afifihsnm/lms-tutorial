import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
};

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  });

  return (
    <div className="h-full flex flex-col overflow-y-auto shadow-sm">
      {/* <div className="p-8 flex flex-col">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div> */}
      <button className="flex flex-col w-[70%] items-start gap-x-2 text-black text-medium font-semibold transition-all hover:bg-[#f2f5fa] ml-12 mb-2">
        Setup Development
      </button>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
      <button className="flex flex-col w-[70%] items-start gap-x-2 text-black text-medium font-semibold transition-all hover:bg-[#f2f5fa] ml-12 mb-2">
        Database Schema
      </button>
      <button className="flex flex-col w-[70%] items-start gap-x-2 text-black text-medium font-semibold transition-all hover:bg-[#f2f5fa] ml-12 mb-2">
        API Route
      </button>
      <button className="flex flex-col w-[70%] items-start gap-x-2 text-black text-medium font-semibold transition-all hover:bg-[#f2f5fa] ml-12 mb-2">
        Create UI
      </button>
    </div>
  )
}