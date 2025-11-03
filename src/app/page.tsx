import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button>default</Button>
        <Button variant="primary">primary</Button>
        <Button variant="primary-ghost">primary ghost</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="secondary-ghost">secondary ghost</Button>
        <Button variant="danger">danger</Button>
        <Button variant="danger-ghost">danger ghost</Button>
        <Button variant="super">super</Button>
        <Button variant="super-ghost">super ghost</Button>
        <Button variant="sidebar">sidebar</Button>
        <Button variant="sidebar-outline">sidebar outline</Button>
        <Button variant="ghost">ghost</Button>
      </main>
    </div>
  );
}
