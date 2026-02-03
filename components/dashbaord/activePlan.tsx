'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    BadgeMinus,
    Crown,
    Sparkles,
    Sprout
} from "lucide-react";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export function ActivePlan() {
    const [plan, setPlan] = useState<{ id: string; name: string, price: string } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPlan = async () => {
            const plan = await api.get('/payments/subscription-status/');
            setPlan(plan.data.product_active);
            setLoading(false);
        }
        getPlan();
    }, [])
    if (loading) return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle className="text-center">Current Subscription</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-20">
                <Skeleton className="w-full h-full rounded-lg" />
            </CardContent>
        </Card>
    )
    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle className="text-center">Current Subscription</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-20">
                {
                    plan?.name === "Basic" ? (
                        <Sprout />
                    ) : plan?.name === "Pro" ? (
                        <Sparkles />
                    ) : plan?.name === "Premium" ? (
                        <Crown />
                    ) : (
                        <BadgeMinus />
                    )
                }
                <span className="text-2xl font-semibold text-center">{plan?.name}</span>
                <span className="text-sm text-muted-foreground text-center">{plan?.price}</span>
            </CardContent>
        </Card>
    )
}