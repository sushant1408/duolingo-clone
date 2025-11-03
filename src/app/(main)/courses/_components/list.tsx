"use client";

import { Card } from "@/app/(main)/courses/_components/card";
import type { Courses } from "@/db/schema";

interface ListProps {
  courses: Courses[];
  activeCourseId: Courses["id"];
}

const List = ({ activeCourseId, courses }: ListProps) => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          onClick={() => {}}
          disabled={false}
          active={activeCourseId === course.id}
          {...course}
        />
      ))}
    </div>
  );
};

export { List };
