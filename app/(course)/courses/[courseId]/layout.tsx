import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { CollapsibleLayout } from "./_components/collapsible-layout";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) {
    return redirect("/home");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <CollapsibleLayout
      sidebar={
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      }
      navbar={
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      }
    >
      {children}
    </CollapsibleLayout>
  )
}
 
export default CourseLayout;