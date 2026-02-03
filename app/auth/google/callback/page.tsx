"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { api } from "@/lib/api"
import { Spinner } from "@/components/ui/spinner"
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "@/components/ui/alert";
import { BadgeCheck, CircleAlert } from "lucide-react"
import { Suspense } from "react";

export default function Callback() {
    return (
        <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
            <Spinner className="size-8" />
        </div>}>
            <GoogleCallback />
        </Suspense>
    )
}

function GoogleCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = searchParams.get("code");

    const hasPosted = useRef(false);

    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        if (!code) {
            setStatus("error");
            return;
        }

        if (hasPosted.current) return;
        hasPosted.current = true;

        api.post("/dj-rest-auth/google/", {
            code,
        })
            .then((res) => {
                console.log("Login success:", res.data);
                setStatus("success");
                setTimeout(() => router.replace("/dashboard"), 1000);
            })
            .catch((err) => {
                console.error("Google login failed:", err.response?.data);
                setStatus("error");
            });
    }, [code, router]);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
                <Spinner className="size-8" />
            </div>
        )
    }
    if (status === "success") {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
                <Alert className="md:max-w-md text-green-500" >
                    <BadgeCheck className="h-8 w-8" />
                    <AlertTitle>Logged in Successfully</AlertTitle>
                    <AlertDescription>
                        Redirecting to dashboard...
                    </AlertDescription>
                </Alert>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
                <Alert className="md:max-w-md text-destructive" >
                    <CircleAlert className="h-8 w-8" />
                    <AlertTitle>Something went wrong!</AlertTitle>
                    <AlertDescription>
                        Please try logging in or signing up through you email.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }
}