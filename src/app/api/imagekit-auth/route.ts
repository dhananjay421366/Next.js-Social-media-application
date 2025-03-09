import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_API_KEY!,
    privateKey: process.env.IMAGE_KIT_SECRET_KEY!,
    urlEndpoint: process.env.IMAGE_KIT_URL!,
});

export async function GET() {
    try {
        const AuthenticationParameter = imagekit.getAuthenticationParameters()
        return NextResponse.json(AuthenticationParameter)

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Imagekit Auth Failed" },
            { status: 500 }
        )
    }

}