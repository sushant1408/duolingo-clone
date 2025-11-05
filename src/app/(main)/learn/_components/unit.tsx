import { LessonButton } from "@/app/(main)/learn/_components/lesson-button";
import { UnitBanner } from "@/app/(main)/learn/_components/unit-banner";
import type { Lessons, Units } from "@/db/schema";

interface UnitProps {
  activeLesson:
    | (Lessons & {
        unit: Units;
      })
    | undefined;
  activeLessonPercentage: number;
  id: Units["id"];
  title: Units["title"];
  description: Units["description"];
  order: Units["order"];
  lessons: (Lessons & { completed: boolean })[];
}

const Unit = ({
  activeLesson,
  activeLessonPercentage,
  description,
  id,
  lessons,
  order,
  title,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export { Unit };
