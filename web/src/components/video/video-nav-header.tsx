"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Trash, VideoIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { deleteVideo } from "@/actions/video-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function VideoNavHeader({
  video,
}: {
  video: {
    title: string;
    id: string;
  };
}) {
  const { isMobile } = useSidebar();
  const params = useParams();
  const router = useRouter();

  const handleDelete = async () => {
    let data = null;
    if (Array.isArray(params.videoid)) {
      const videoId = params.videoid[0];
      data = await deleteVideo(videoId);
    } else if (params.videoid) {
      // If it's a single string
      data = await deleteVideo(params.videoid);
    }

    console.log(data);

    if (data) {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    router.push("/dashboard");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <VideoIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{video.title}</span>
                <span className="truncate text-xs">{params.videoid}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Settings
            </DropdownMenuLabel>

            <DropdownMenuItem className="gap-2 p-2" onClick={handleDelete}>
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Trash className="size-4 shrink-0 text-red-600" />
              </div>
              Delete Video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
