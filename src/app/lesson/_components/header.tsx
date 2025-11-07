import { InfinityIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import type { UserProgress } from "@/db/schema";
import { useExitModal } from "@/store/use-exit-modal";

interface HeaderProps {
  hearts: UserProgress["hearts"];
  percentage: number;
  hasActiveSubscription: boolean;
}

const Header = ({ hasActiveSubscription, hearts, percentage }: HeaderProps) => {
  const { open } = useExitModal();

  return (
    <header className="lg:pt-[50px] pt-5 px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <XIcon
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        onClick={open}
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
