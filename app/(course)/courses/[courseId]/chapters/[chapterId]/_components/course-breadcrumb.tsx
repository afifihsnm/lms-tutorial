import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";

interface CourseBreadcrumbProps {
  courseTitle: string;
  chapterTitle: string;
  courseId: string;
}

export const CourseBreadcrumb = ({
  courseId,
  courseTitle,
  chapterTitle,
}: CourseBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">
            <House className="h-5 w-5 text-[#0056d2]" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/courses/${courseId}`}><div className="text-[#0056d2]">{courseTitle}</div></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage><div className="text-[#0056d2]">{chapterTitle}</div></BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}