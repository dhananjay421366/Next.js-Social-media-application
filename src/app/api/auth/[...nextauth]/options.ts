import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
export const authOptions: NextAuthOptions = {
    // all api route are tested
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "password", type: "text", placeholder: "password" }
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.email || credentials.password) {
                    throw new Error("Missing email or password");

                }
            }
        })
    ]

}