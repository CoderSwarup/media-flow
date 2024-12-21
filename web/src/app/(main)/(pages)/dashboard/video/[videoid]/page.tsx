import { currentUserData } from "@/actions/user-actions";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { VideoSidebar } from "@/components/video/video-sidebar";
import VideoPlayer from "@/components/video/video-player/vidoe-player";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayerInfo from "@/components/video/video-player/video-player-info";
import VideoPlayerOptions from "@/components/video/video-player/video-player-options";

interface Pageprops {
  params: {
    videoid: string;
  };
}

export default async function Page({ params }: Pageprops) {
  if (!params.videoid) {
    return redirect("/dashboard");
  }

  const user = await currentUserData();
  if (!user) {
    return redirect("/dashboard");
  }

  const video = await db.video.findFirst({
    where: {
      AND: [
        { id: params.videoid },
        {
          userId: user?.id,
        },
      ],
    },
    include: {
      captions: true,
      analytics: true,
      timelines: true,
    },
  });

  if (!video) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <VideoPlayer video={video} />

      <div className="min-h-[700px] w-[100%] flex-1 flex  items-start justify-center gap-5 rounded-xl  md:min-h-min">
        <div className="w-[50%] h-full bg-muted/50 ">
          <VideoPlayerOptions video={video} />
        </div>
        <div className="w-[50%] h-full bg-muted/50 ">
          <VideoPlayerInfo video={video} />
        </div>
      </div>
    </div>
  );
}
