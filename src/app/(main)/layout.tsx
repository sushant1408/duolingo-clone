import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-64 h-full pt-[50px] lg:pt-0">
        <div className="h-full">{children}</div>
      </main>
    </>
  );
}
