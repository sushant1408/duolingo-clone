import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUESTS } from "@/config/constants";
import type { UserProgress } from "@/db/schema";

interface QuestsProps {
  points: UserProgress["points"];
}

const Quests = ({ points }: QuestsProps) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Button asChild size="sm" variant="primary-ghost">
          <Link href="/quests">View all</Link>
        </Button>
      </div>

      <ul className="w-full space-y-4">
        {QUESTS.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              key={quest.title}
              className="flex items-center w-full pb-4 gap-x-3"
            >
              <Image src="/points.svg" alt="points" height={40} width={40} />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export { Quests };
