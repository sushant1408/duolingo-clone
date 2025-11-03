import { MenuIcon } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 z-100">
        <SheetHeader className="sr-only">
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export { MobileSidebar };
