import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="w-full h-full justify-center items-center flex">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                        <Button variant="outline">
                            <ArrowLeft />
                        </Button>
                        Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
        </div>
    )
}