"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  href: string;
}

const SidebarItem = ({ href, iconSrc, label }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "sidebar-outline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image src={iconSrc} alt={label} className="mr-3" height={32} width={32} />
        {label}
      </Link>
    </Button>
  );
};

export { SidebarItem };
