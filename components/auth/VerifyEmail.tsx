'use client';
import { Spinner } from "../ui/spinner"
import { useState } from "react"
import { useEffect } from "react"
import { api } from "@/lib/api"
import { AlertCircle, BadgeCheck } from "lucide-react"
import { Button } from "../ui/button";
import { Item, ItemContent, ItemActions, ItemTitle, ItemDescription } from "../ui/item"
import Link from "next/link";

export default function ({ token }: { token: string }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        if (!token) return
        const decondedToken = decodeURIComponent(token)
        api.post('/dj-rest-auth/registration/verify-email/', {
            "key": String(decondedToken)
        }).then(() => {
            setLoading(false)
        }).catch((e) => {
            setError(true)
            setLoading(false)
        })
    }, [token])

    if (loading) return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Spinner className="size-8" />
        </div>
    )

    if (error) return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle className="text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Something went wrong!
                    </ItemTitle>
                    <ItemDescription>
                        The link didn't worked. Please recheck your mail or contact support.
                    </ItemDescription>
                    <ItemActions>
                        <Button variant="outline" className="mt-4">
                            <Link href="/auth/signup">
                                Back to Sign Up
                            </Link>
                        </Button>
                    </ItemActions>
                </ItemContent>
            </Item>
        </div>
    )
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle className="text-green-500">
                        <BadgeCheck className="h-8 w-8" />
                        Email Verified!
                    </ItemTitle>
                    <ItemDescription>
                        Your email has been verified successfully.
                    </ItemDescription>
                    <ItemActions>
                        <Button variant="outline" className="mt-4">
                            <Link href="/auth/login">
                                Login
                            </Link>
                        </Button>
                    </ItemActions>
                </ItemContent>
            </Item>
        </div>
    )
}