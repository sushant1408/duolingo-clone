import { NotebookTextIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Units } from "@/db/schema";

interface UnitBannerProps {
  title: Units["title"];
  description: Units["description"];
}

const UnitBanner = ({ description, title }: UnitBannerProps) => {
  return (
    <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Button
        asChild
        size="lg"
        variant="secondary"
        className="hidden lg:flex border-2 border-b-4 active:border-2"
      >
        <Link href="/lesson">
          <NotebookTextIcon />
          Continue
        </Link>
      </Button>
    </div>
  );
};

export { UnitBanner };
