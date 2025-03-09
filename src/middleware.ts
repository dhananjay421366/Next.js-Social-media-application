import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Allow authentication-related paths
                if (pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/register") {
                    return true;
                }

                // Allow public pages
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true;
                }

                // Require authentication for other routes
                return !!token;
            }
        }
    }
);

// kaha kaha per middleware run karna hai hame 
export const config = {
    matcher: [
        /*
         * Matches all API routes except authentication endpoints
         * - Protects all `/api` routes except `/api/auth/*`
         */
        "/api/:path*",

        /*
         * Protects all app pages except public ones
         * - Prevents unauthenticated access to protected pages
         */
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        "/events/:path*"
    ]
};
