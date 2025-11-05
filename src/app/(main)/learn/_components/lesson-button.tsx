"use client";

import { CheckIcon, CrownIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Button } from "@/components/ui/button";
import type { Lessons } from "@/db/schema";
import { cn } from "@/lib/utils";

import "react-circular-progressbar/dist/styles.css";

interface LessonButtonProps {
  id: Lessons["id"];
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
}

const LessonButton = ({
  current,
  id,
  index,
  locked,
  percentage,
  totalCount,
}: LessonButtonProps) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;
  let indetationLevel: number;

  if (cycleIndex <= 2) {
    indetationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indetationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indetationLevel = 4 - cycleIndex;
  } else {
    indetationLevel = cycleIndex - 8;
  }

  const rightPosition = indetationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? CheckIcon : isLast ? CrownIcon : StarIcon;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 20,
        }}
      >
        {current ? (
          <div className="size-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#4ade80",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="size-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    "size-10",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-popover-foreground",
                    isCompleted && "fill-none stroke-4"
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className="size-[70px] border-b-8"
          >
            <Icon
              className={cn(
                "size-10",
                locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-4"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};

export { LessonButton };
