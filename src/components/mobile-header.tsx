import { MobileSidebar } from "./mobile-sidebar";

const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex bg-green-500 items-center border-b-2 fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};

export { MobileHeader };
