import { InfinityIcon, XIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import type { UserProgress } from "@/db/schema";
import Image from "next/image";

interface HeaderProps {
  hearts: UserProgress["hearts"];
  percentage: number;
  hasActiveSubscription: boolean;
}

const Header = ({ hasActiveSubscription, hearts, percentage }: HeaderProps) => {
  return (
    <header className="lg:pt-[50px] pt-5 px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <XIcon
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        onClick={() => {}}
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          alt="heart"
          height={28}
          width={28}
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="size-6 stroke-3" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export { Header };
