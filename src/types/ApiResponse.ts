import { Video } from "@/models/Video.model";


export interface ApiResponse {
    success: boolean;
    message: string;
    video?: Array<Video>
};