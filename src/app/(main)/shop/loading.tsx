import { Spinner } from "@/components/ui/spinner";

export default function LearnPageLoading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}
