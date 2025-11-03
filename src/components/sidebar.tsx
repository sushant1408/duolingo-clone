import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { SidebarItem } from "@/components/sidebar-item";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "h-full lg:w-64 lg:fixed flex left-0 top-0 px-4 border-r flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.svg" alt="logo" height={40} width={40} />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Duolingo Clone
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="Quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Spinner className="size-5 text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: "flex-row-reverse!",
              },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export { Sidebar };
