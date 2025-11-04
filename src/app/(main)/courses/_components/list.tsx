"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { upsertUserProgress } from "@/actions/user-progress";
import { Card } from "@/app/(main)/courses/_components/card";
import type { Courses, UserProgress } from "@/db/schema";

interface ListProps {
  courses: Courses[];
  activeCourseId?: UserProgress["activeCourseId"];
}

const List = ({ activeCourseId, courses }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (id: Courses["id"]) => {
    if (pending) {
      return;
    }

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => {
        toast.error("Something went wrong.");
      });
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          onClick={handleClick}
          disabled={pending}
          active={activeCourseId === course.id}
          {...course}
        />
      ))}
    </div>
  );
};

export { List };
