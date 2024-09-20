"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import toast from "react-hot-toast";

interface CoursePrevNextButtonProps {
  courseId: string;
  nextChapterId?: string;
  prevChapterId?: string;
}

export const CoursePrevNextButton = ({
  courseId,
  nextChapterId,
  prevChapterId,
}: CoursePrevNextButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const prevButtonId = useId();
  const nextButtonId = useId();

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const clickedButtonId = event.currentTarget.id;

      setIsLoading(true);

      if (nextChapterId && clickedButtonId === nextButtonId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      } else if (prevChapterId && clickedButtonId === prevButtonId) {
        router.push(`/courses/${courseId}/chapters/${prevChapterId}`);
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex">
      {prevChapterId && (
        <Button
          id={prevButtonId}
          onClick={onClick}
          disabled={isLoading}
          type="button"
          variant="ghost"
          className="w-full md:w-auto"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
      )}
      {nextChapterId && (
        <Button
          id={nextButtonId}
          onClick={onClick}
          disabled={isLoading}
          type="button"
          variant="ghost"
          className="w-full md:w-auto"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  )
}