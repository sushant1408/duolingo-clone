"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/config/constants";
import type { UserProgress as DB_UserProgress } from "@/db/schema";

interface ItemsProps {
  hearts: DB_UserProgress["hearts"];
  points: DB_UserProgress["points"];
  hasActiveSubscription: boolean;
}

const Items = ({ hasActiveSubscription, hearts, points }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
          onClick={onRefillHearts}
        >
          {hearts === MAX_HEARTS ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="points" height={20} width={20} />
              <p>50</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

export { Items };
