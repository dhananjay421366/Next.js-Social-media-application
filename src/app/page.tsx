"use client";

import React from "react";
import useSWR from "swr";
import VideoFeed from "./components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video.model";

// SWR Fetcher Function
const fetchVideos = async () => {
  const response = await apiClient.getVideos();
  if (!response?.data || !Array.isArray(response.data)) {
    throw new Error("Invalid video data");
  }
  return response.data;
};

export default function Home() {
  const { data: videos, error } = useSWR("/videos", fetchVideos, {
    revalidateOnFocus: false, // Do not re-fetch on focus
    dedupingInterval: 10000, // Cache data for 10 seconds before refetching
  });

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-red-500">Error loading videos. Please try again.</p>
      </main>
    );
  }

  if (!videos) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p>Loading videos...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <VideoFeed videos={videos} />
    </main>
  );
}
