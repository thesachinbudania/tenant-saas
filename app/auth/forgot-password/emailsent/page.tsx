import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"
import Link from "next/link"
import { Item, ItemContent, ItemActions, ItemTitle, ItemDescription } from "@/components/ui/item"

export default function EmailSent() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle className="text-green-500">
                        <BadgeCheck className="h-8 w-8" />
                        Reset link sent!
                    </ItemTitle>
                    <ItemDescription>
                        A reset link has been sent to your email address.
                    </ItemDescription>
                    <ItemActions>
                        <Button variant="outline" className="mt-4">
                            <Link href="/auth/login">
                                Go to Login
                            </Link>
                        </Button>
                    </ItemActions>
                </ItemContent>
            </Item>
        </div>
    )
}