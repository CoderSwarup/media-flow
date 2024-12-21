"use client";
import React, { useState } from "react";
import { Video } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Chapter {
  id: string;
  title: string;
  description: string | null | undefined;
  startTime: number;
  endTime: number;
  isAIGenerated: boolean;
}

export default function VideoChapters({ video }: { video: Video }) {
  const [chapters, setChapters] = useState<Chapter[]>(video.timelines || []);
  const [isCreating, setIsCreating] = useState(false);
  const [newChapter, setNewChapter] = useState({
    title: "",
    description: "",
    startTime: 0,
    endTime: 0,
  });

  // Handle input changes for the new chapter
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewChapter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle creating a new chapter
  const handleCreateChapter = () => {
    if (
      newChapter.title &&
      newChapter.startTime >= 0 &&
      newChapter.endTime > newChapter.startTime
    ) {
      setChapters([
        ...chapters,
        {
          id: `${Date.now()}`, // Simple unique ID based on timestamp
          ...newChapter,
          startTime: parseFloat(newChapter.startTime.toString()),
          endTime: parseFloat(newChapter.endTime.toString()),
          isAIGenerated: false,
        },
      ]);
      setIsCreating(false);
      setNewChapter({
        title: "",
        description: "",
        startTime: 0,
        endTime: 0,
      });
      toast.success("Chapter created successfully!");
    } else {
      toast.error("Please fill out all fields correctly.");
    }
  };

  // Handle editing a chapter
  const handleEditChapter = (chapterId: string) => {
    const chapter = chapters.find((chap) => chap.id === chapterId);
    if (chapter) {
      setNewChapter({
        title: chapter.title,
        description: chapter.description || "",
        startTime: chapter.startTime,
        endTime: chapter.endTime,
      });
      setIsCreating(true);
    }
  };

  const handleDeleteChapter = (chapterId: string) => {
    const chapter = chapters.filter((chap) => chap.id !== chapterId);
    setChapters(chapter);
  };

  return (
    <div className="w-full p-3">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <h2 className="text-md font-bold">Chapters</h2>
        <p className="text-[13px] text-zinc-600 dark:text-zinc-200">
          Chapters are displayed in the timeline and allow viewers to more
          easily navigate through the video. Chapters should stay inside the
          total video length: <span className="text-[#1D4ED8]">00:00:00</span>
        </p>
      </div>

      {chapters.length > 0 ? (
        <div className="mt-4 space-y-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{chapter.title}</h3>
                <div className="flex gap-2 items-center justify-center">
                  <Button
                    onClick={() => handleEditChapter(chapter.id)}
                    variant="outline"
                    className="text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteChapter(chapter.id)}
                    variant="outline"
                    className="text-xs bg-red-500 text-white hover:bg-red-800"
                  >
                    Deleted
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Start Time: {chapter.startTime} sec</p>
                <p>End Time: {chapter.endTime} sec</p>
                <p>Description: {chapter.description || "No description"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-gray-500">
          <p>No chapters available. Please create one.</p>
        </div>
      )}

      {/* Create or edit chapter */}
      {isCreating && (
        <div className="mt-6 border p-4 rounded-md shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Create/Edit Chapter</h3>

          <div className="space-y-2">
            <Input
              name="title"
              value={newChapter.title}
              onChange={handleInputChange}
              placeholder="Enter chapter title"
            />
            <Input
              name="startTime"
              type="number"
              value={newChapter.startTime}
              onChange={handleInputChange}
              placeholder="Enter start time in seconds"
            />
            <Input
              name="endTime"
              type="number"
              value={newChapter.endTime}
              onChange={handleInputChange}
              placeholder="Enter end time in seconds"
            />
            <Input
              name="description"
              value={newChapter.description}
              onChange={handleInputChange}
              placeholder="Enter chapter description"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateChapter}>Save Chapter</Button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button onClick={() => setIsCreating(true)}>Create Chapter</Button>
      </div>
    </div>
  );
}
