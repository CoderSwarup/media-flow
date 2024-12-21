"use client";

import * as React from "react";
import { ChevronsUpDown, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Video } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

type VideoPlayerInfoProps = {
  video: Video;
};

export default function VideoPlayerInfo({ video }: VideoPlayerInfoProps) {
  const [isOpenVideoInfo, setIsOpenVideoInfo] = React.useState(false);
  const [isOpenEmbed, setIsOpenEmbed] = React.useState(false);
  const [isOpenVideoLinks, setIsOpenVideoLinks] = React.useState(false);
  // States for the switches
  const [isResponsive, setIsResponsive] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPreLoad, setIsPreLoad] = React.useState(false);
  const [isLoop, setIsLoop] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  // Generate the iframe code dynamically based on toggle options
  const generateIframeUrl = (videoUrl: string) => {
    let iframeUrl = `${videoUrl}?`;

    if (isAutoPlay) iframeUrl += "autoplay=1&";
    if (isPreLoad) iframeUrl += "preload=auto&";
    if (isLoop) iframeUrl += "loop=1&";
    if (isMuted) iframeUrl += "muted=1&";
    if (isResponsive) iframeUrl += "responsive=1&"; // This is more for styling, you can apply CSS as well

    // Remove the trailing "&" if exists
    iframeUrl = iframeUrl.endsWith("&") ? iframeUrl.slice(0, -1) : iframeUrl;

    return `<iframe src="${iframeUrl}" width="100%" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  };

  const iframeCode = video?.originalUrl
    ? generateIframeUrl(video.originalUrl)
    : "";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied!", {
          duration: 1000,
          className: "!text-green-500 font-semibold",
        });
      },
      (err) => {
        console.error("Clipboard copy failed", err);
        toast.error("Failed to copy!", {
          duration: 1000,
          className: "!text-red-500 font-semibold",
        });
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4">
      <Collapsible
        open={isOpenVideoInfo}
        onOpenChange={setIsOpenVideoInfo}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between space-x-4 px-4 border-2 rounded-md">
            <h4 className="text-sm font-semibold">Video Info</h4>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 px-4 py-2 shadow-sm">
            <Label className="text-lg" htmlFor="title">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="title"
              value={video?.title}
              readOnly
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 px-4 py-2 shadow-sm">
            <Label className="text-lg" htmlFor="videoId">
              Video ID
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="videoId"
                value={video?.id}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(video?.id || "")}
              >
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy Video ID</span>
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isOpenEmbed}
        onOpenChange={setIsOpenEmbed}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between space-x-4 px-4 border-2 rounded-md">
            <h4 className="text-sm font-semibold">Embed</h4>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2">
          <div className="flex flex-wrap w-full gap-3 px-4 py-2">
            {/* Toggle Options */}
            <div className="flex items-center space-x-2">
              <Switch
                id="responsive"
                checked={isResponsive}
                onCheckedChange={setIsResponsive}
              />
              <Label htmlFor="responsive">Responsive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-play"
                checked={isAutoPlay}
                onCheckedChange={setIsAutoPlay}
              />
              <Label htmlFor="auto-play">Auto Play</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="pre-load"
                checked={isPreLoad}
                onCheckedChange={setIsPreLoad}
              />
              <Label htmlFor="pre-load">PreLoad</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="loop" checked={isLoop} onCheckedChange={setIsLoop} />
              <Label htmlFor="loop">Loop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="muted"
                checked={isMuted}
                onCheckedChange={setIsMuted}
              />
              <Label htmlFor="muted">Muted</Label>
            </div>
          </div>

          {/* Display the iframe code */}
          <div className="grid w-full max-w-sm items-center gap-1.5 px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="iframe"
                value={iframeCode}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(iframeCode || "")}
              >
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy Embed Code</span>
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isOpenVideoLinks}
        onOpenChange={setIsOpenVideoLinks}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between space-x-4 px-4 border-2 rounded-md">
            <h4 className="text-sm font-semibold">Links</h4>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 px-4 py-2 shadow-sm">
            <Label className="text-lg" htmlFor="videoId">
              Video ID
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="videoId"
                value={video?.id}
                readOnly
                className="flex-1"
                disabled
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(video?.id || "")}
              >
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy Video ID</span>
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 px-4 py-2 shadow-sm">
            <Label className="text-lg" htmlFor="videoId">
              Direct Play URL
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="videoId"
                value={video?.originalUrl}
                readOnly
                className="flex-1"
                disabled
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(video?.id || "")}
              >
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy Video ID</span>
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 px-4 py-2 shadow-sm">
            <Label className="text-lg" htmlFor="videoId">
              Thumbnail URL
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="videoId"
                value={video?.thumbnailUrl || "NULL"}
                readOnly
                className="flex-1"
                disabled
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(video?.id || "")}
                disabled={!video?.thumbnailUrl}
              >
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy Video ID</span>
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
