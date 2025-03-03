import { NextResponse } from "next/server";

export async function middleware() {
    return NextResponse.next(); // ✅ Allow all requests without restrictions
}

export const config = {
    matcher: [], // ✅ No routes are protected
};