"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-start gap-x-2 text-black text-sm font-sm transition-all hover:bg-[#f2f5fa] ml-12 mr-4",
        "border-l-[6px] border-transparent hover:border-[#0056d2]",
        isActive && "text-black bg-[#f2f5fa] border-[#0056d2] hover:bg-[#f2f5fa]",
        isCompleted && "text-black hover:bg-[#f2f5fa]",
        isCompleted && isActive && "text-black bg-[#f2f5fa] hover:bg-[#f2f5fa]"
      )}
    >
      {/* <div className={cn(
        "opacity-0 border-2 border-[#0056d2] h-full transition-all mr-4 hover:opacity-100",
        isActive && "opacity-100",
        isCompleted && "text-black hover:bg-[#f2f5fa]"
      )} /> */}
      <div className="flex items-start gap-x-2 pt-4 pb-2 ml-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        <div className="flex flex-col items-start">
          <span><strong>Video: </strong>{label}</span>
          <p className="text-xs text-slate-500 mt-1">10 min</p>
        </div>
      </div>
    </button>
  )
}