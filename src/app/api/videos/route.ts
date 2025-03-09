import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import Video, { IVideo } from "@/models/Video.model";

export async function GET() {
    try {
        await dbConnect();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if (!videos.length) {
            return NextResponse.json(
                { error: "No videos found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ status: 200, data: videos });
    } catch (error) {
        console.error("GET /videos Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await dbConnect();
        const body: IVideo = await request.json();

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        };

        const newVideo = await Video.create(videoData);

        return NextResponse.json({
            status: 201,
            message: "Video created successfully",
            video: newVideo
        });

    } catch (error) {
        console.error("POST /videos Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
