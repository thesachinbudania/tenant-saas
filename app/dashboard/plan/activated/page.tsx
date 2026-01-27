import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"
import Link from "next/link"
import { Item, ItemContent, ItemActions, ItemTitle, ItemDescription } from "@/components/ui/item"

export default function PlanActivated() {
    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle className="text-green-500">
                        <BadgeCheck className="h-8 w-8" />
                        Plan Activated!
                    </ItemTitle>
                    <ItemDescription>
                        Your plan has been activated successfully.
                    </ItemDescription>
                    <ItemActions>
                        <Button variant="outline" className="mt-4">
                            <Link href="/dashboard">
                                Go to Dashboard
                            </Link>
                        </Button>
                    </ItemActions>
                </ItemContent>
            </Item>
        </div>
    )
}