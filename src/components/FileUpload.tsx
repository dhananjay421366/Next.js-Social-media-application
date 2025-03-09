"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video";
}

export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image",
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message);
        setUploading(false);
    };

    const handleSuccess = (res: IKUploadResponse) => {
        console.log("Success", res);
        setUploading(false);
        setError(null);
        onSuccess(res);
    };

    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable) {
            const percentComplete = (evt.loaded / evt.total) * 100;
            onProgress?.(Math.round(percentComplete));
        }
    };

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Only video files are allowed");
                return false;
            }
            if (file.size > 100 * 1024 * 1024) {
                setError("File size is too large");
                return false;
            }
        } else {
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                setError("Only image files are allowed (jpeg, png, webp)");
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size is too large");
                return false;
            }
        }
        return true;
    };

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    };

    return (
        <div className="space-y-2">
            <IKUpload
                fileName={fileType === "video" ? "video" : "image"}
                tags={["sample-tag1", "sample-tag2"]}
                useUniqueFileName={true}
                responseFields={["tags"]}
                folder={fileType === "video" ? "/videos" : "/images"}
                overwriteFile={true}
                overwriteAITags={true}
                overwriteTags={true}
                overwriteCustomMetadata={true}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadProgress={handleProgress}
                onUploadStart={handleStartUpload}
                validateFile={validateFile}
            />

            {uploading && (
                <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="animate-spin" />
                    <span>Uploading...</span>
                </div>
            )}

            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
}
