"use client";

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function VideoNavOptions({
  videoOptions,
  selectedOption,
  handleOptionClick,
}: {
  videoOptions: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  selectedOption: string;
  handleOptionClick: (name: string) => void;
}) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Manage Video</SidebarGroupLabel>
      <SidebarMenu>
        {videoOptions.map((item) => {
          const isSelected = selectedOption === item.name;
          return (
            <SidebarMenuItem
              className={`cursor-pointer rounded-md ${
                isSelected
                  ? "bg-gray-700 dark:bg-gray-800 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => handleOptionClick(item.name)}
              key={item.name}
            >
              <SidebarMenuButton asChild>
                <Link href={`${pathname}${item.url}`}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
