import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";

export default function PlanCancelled() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-muted/40 p-4">
            <Alert className="md:max-w-md text-destructive" >
                <CircleAlert className="h-8 w-8" />
                <AlertTitle>Payment Unsuccessfull!</AlertTitle>
                <AlertDescription>
                    The payment was cancelled by the user.
                </AlertDescription>
            </Alert>
        </div>
    )
}