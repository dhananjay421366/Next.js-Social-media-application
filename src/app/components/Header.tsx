
"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'



export const Header = () => {

    const { data: session } = useSession();

    const handleSignout = async () => {
        try {
            await signOut()

        } catch (error) {
            console.error(error)

        }
    }
    return (
        <div>
            <button onClick={handleSignout}>signOut</button>
            {session ? (
                <div>Welcome</div>
            ) : (
                <Link href={"/login"}>Login</Link>
            )}
        </div>
    )
}
