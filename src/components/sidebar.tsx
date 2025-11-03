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
    ></div>
  );
};

export { Sidebar };
