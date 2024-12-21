import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoInfo from "./video-player-options/video-info";
import { Video } from "@/lib/types";
import VideoCaptions from "./video-player-options/video-captions";
import VideoAnalyticsCard from "./video-player-options/video-analytics";
import VideoChapters from "./video-player-options/video-chapters";
export default function VideoPlayerOptions({ video }: { video: Video }) {
  return (
    <div className="w-full p-3">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="captions">Captions</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <VideoInfo video={video} />
        </TabsContent>
        <TabsContent value="captions">
          <VideoCaptions video={video} />
        </TabsContent>
        <TabsContent value="chapters">
          <VideoChapters video={video} />
        </TabsContent>
        <TabsContent value="statistics">
          <VideoAnalyticsCard
            averageViewTime={video.analytics?.averageViewTime || 0}
            totalViews={video.analytics?.totalViews || 0}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
