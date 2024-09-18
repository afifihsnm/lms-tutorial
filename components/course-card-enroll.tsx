"use client";

import { Button } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseCardEnrollProps {
  courseId: string;
};

export const CourseCardEnroll = ({
  courseId,
}: CourseCardEnrollProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      radius="md" 
      style={{ flex: 1 }}
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll
    </Button>
  )
}