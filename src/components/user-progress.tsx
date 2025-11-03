import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Courses } from "@/db/schema";

interface UserProgressProps {
  activeCourse: Courses;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

const UserProgress = ({
  activeCourse,
  hasActiveSubscription,
  hearts,
  points,
}: UserProgressProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Button asChild variant="ghost">
        <Link href="/courses">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-orange-500">
        <Link href="/shop">
          <Image src="/points.svg" alt="Points" width={28} height={28} />
          {points}
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-rose-500">
        <Link href="/shop">
          <Image src="/heart.svg" alt="Hearts" width={28} height={28} />
          {hasActiveSubscription ? (
            <InfinityIcon className="stroke-3" />
          ) : (
            hearts
          )}
        </Link>
      </Button>
    </div>
  );
};

export { UserProgress };
