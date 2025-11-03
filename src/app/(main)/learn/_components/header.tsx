import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Button asChild variant="ghost" size="sm">
        <Link href="/courses">
          <ArrowLeftIcon className="size-5 stroke-2 text-neutral-400" />
        </Link>
      </Button>
      <h1 className="font-bold text-lg">{title}</h1>
      <div />
    </div>
  );
};

export { Header };
