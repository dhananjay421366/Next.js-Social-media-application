"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Upload New Reel
        </h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
