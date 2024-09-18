"use client";

import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";
import { Card, Text, Group, Badge, Button, Image } from '@mantine/core';
import classes from './course-card.module.css';
import { CourseCardEnroll } from "./course-card-enroll";


interface CourseCardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

export const CourseCard = ({
  id,
  title,
  description,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Link href={`/courses/${id}`}>
        <Card.Section>
          <Image
            w="full"
            h={180}
            alt={title}
            src={imageUrl} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {title}
            </Text>
            <Badge size="sm" variant="light">
              {category}
            </Badge>
          </Group>
          <Text fz="sm" mt="xs" lineClamp={3} className={classes.description}>
            {description}
          </Text>
          <div className="mt-3 flex items-center gap-x-2 text-sm md:text-xs justify-between">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          {progress === null && (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
          </div>
        </Card.Section>
      </Link>
      
      {progress !== null ? (
        <div className="mt-[14px]">
          <CourseProgress
            variant={progress === 100 ? "success" : "default"}
            size="sm"
            value={progress}
          />
        </div>
      ) : (
        <Group mt="xs">
          <CourseCardEnroll courseId={id}/>
        </Group>
      )}
    </Card>
    // 
    //   <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
    //     <div className="relative w-full aspect-video rounded-md overflow-hidden">
    //       <Image
    //         fill
    //         className="object-cover"
    //         alt={title}
    //         src={imageUrl}
    //       />
    //     </div>
    //     <div className="flex flex-col pt-2">
    //       <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
    //         {title}
    //       </div>
    //       <p className="text-xs text-muted-foreground">
    //         {category}
    //       </p>
    //       <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
    //         <div className="flex items-center gap-x-1 text-slate-500">
    //           <IconBadge size="sm" icon={BookOpen} />
    //           <span>
    //             {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
    //           </span>
    //         </div>
    //       </div>
    //       {progress !== null ? (
    //         <div>
    //           <CourseProgress
    //             variant={progress === 100 ? "success" : "default"}
    //             size="sm"
    //             value={progress}
    //           />
    //         </div>
    //       ) : (
    //         <p className="text-md md:text-sm font-medium text-slate-700">
    //           {formatPrice(price)}
    //         </p>
    //       )}
    //     </div>
    //   </div>
    // </Link>
  )
}