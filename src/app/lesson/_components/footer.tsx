import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { useKey, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import type { Lessons } from "@/db/schema";
import { cn } from "@/lib/utils";

interface FooterProps {
  disabled?: boolean;
  lessonId?: Lessons["id"];
  status: "correct" | "wrong" | "none" | "completed";
  onCheck: () => void;
}

const Footer = ({ disabled, lessonId, onCheck, status }: FooterProps) => {
  const isMobile = useMedia("(max-width: 1024px)");

  useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] mx-auto h-full flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircleIcon className="size-6 lg:size-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircleIcon className="size-6 lg:size-10 mr-4" />
            Try again.
          </div>
        )}
        {status === "completed" && (
          <Button variant="default" size={isMobile ? "sm" : "lg"} asChild>
            <Link href={`/lesson/${lessonId}`}>Practice again</Link>
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};

export { Footer };
