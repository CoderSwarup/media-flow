"use client";

import { useState } from "react";
import {
  AudioLines,
  Captions,
  Command,
  MegaphoneIcon,
  ShieldCheck,
  TrendingUp,
  VideoIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VideoNavHeader } from "./video-nav-header";
import { VideoNavAdvanceOptions } from "./video-nav-advance-options";
import { VideoNavOptions } from "./video-nav-options";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  video: {
    title: "Video Manager",
    id: "Enterprise",
  },

  videoOptions: [
    {
      name: "Player",
      url: "/",
      icon: VideoIcon,
    },
    {
      name: "Advertising",
      url: "#",
      icon: MegaphoneIcon,
    },
    {
      name: "Encoding",
      url: "#",
      icon: AudioLines,
    },
    {
      name: "Transcribing",
      url: "#",
      icon: Captions,
    },
    {
      name: "Statistics",
      url: "/statistics",
      icon: TrendingUp,
    },
  ],

  advanceOptions: [
    {
      title: "Security",
      url: "#",
      icon: ShieldCheck,
      isActive: true,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "DRM",
          url: "#",
        },
      ],
    },
  ],
};

export function VideoSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [selectedOption, setSelectedOption] = useState<string>("Player");

  const handleOptionClick = (name: string): void => {
    setSelectedOption(name); // Set selected option
  };
  return (
    <Sidebar
      className="absolute top-1 left-1 h-full"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="bg-zinc-200 dark:bg-[#020817]">
        <VideoNavHeader video={data.video} />
      </SidebarHeader>
      <SidebarContent className="bg-zinc-200 dark:bg-[#020817]">
        <VideoNavOptions
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          videoOptions={data.videoOptions}
        />
        <VideoNavAdvanceOptions items={data.advanceOptions} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
