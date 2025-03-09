
// import VideoComponent from "./VideoComponent";

// interface VideoFeedProps {
//   videos: IVideo[];
// }

// export default function VideoFeed({ videos }: VideoFeedProps) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {videos?.map((video) => (
//         <VideoComponent key={video._id?.toString()} video={video} />
//       ))}

//       {videos.length === 0 && (
//         <div className="col-span-full text-center py-12">
//           <p className="text-base-content/70">No videos found</p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import VideoComponent from "./VideoComponent";
import { IVideo } from "@/models/Video.model";

interface VideoFeedProps {
  videos?: IVideo[]; // Mark videos as optional
}

export default function VideoFeed({ videos = [] }: VideoFeedProps) { // Default to empty array
  if (!Array.isArray(videos)) {
    console.error("Expected videos to be an array but received:", videos);
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-base-content/70">Invalid video data</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}
