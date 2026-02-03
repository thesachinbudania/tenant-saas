'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription
} from "@/components/ui/card"
import { Sprout, Sparkles, Crown, BadgeCheck, BadgeMinus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import {
    Alert,
    AlertTitle,
    AlertDescription
} from "@/components/ui/alert";
import { CreditCard } from "lucide-react";

const ProductCard = ({ product, isActive = false }: { product: any, isActive?: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubscribe = () => {
        setIsLoading(true);
        api.post('/payments/create-checkout-session/', {
            price_id: product.price_id,
        })
            .then((res) => {
                setIsLoading(false);
                window.location.href = res.data.url;
            })
            .catch((err) => {
                console.log(err.response.data)
                setIsLoading(false);
            });
    }
    return (
        <Card className="md:w-[300px] w-full">
            <CardHeader>
                <div className="w-full h-4 flex items-center justify-end">
                    {isActive && <Badge><BadgeCheck />Active</Badge>}
                </div>
                <div className="flex flex-col items-center gap-2">
                    {
                        product.name === "Basic" ? (
                            <Sprout className="size-12" />
                        ) : product.name === "Pro" ? (
                            <Sparkles className="size-12" />
                        ) : product.name === "Premium" ? (
                            <Crown className="size-12" />
                        ) : (
                            <BadgeMinus className="size-12" />
                        )
                    }
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="text-center">{product.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-center font-semibold">{product.price}</p>
            </CardContent>
            <CardFooter>
                <Button disabled={isActive || isLoading} className="w-full" onClick={handleSubscribe}>
                    {isLoading && <Spinner ></Spinner>}
                    Subsribe
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function Plan() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<any>(null);
    const [subscription, setSubscription] = useState<any>(null);
    useEffect(() => {
        api.get('/payments/products/').then((res) => {
            setData(res.data);
            api.get('/payments/subscription-status/').then((res) => {
                setSubscription(res.data);
                setIsLoading(false);
            })
        })
    }, [])

    if (isLoading) return (
        <div className="flex justify-center items-center h-full">
            <Spinner className="size-8" />
        </div>
    )
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4">Choose a plan</h2>
            <Alert className=" mb-2 max-w-sm" >
                <CreditCard />
                <AlertTitle>Use the following card details for testing</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc list-inside">
                        <li>Card Number: 4000 0035 6000 0008</li>
                        <li>Expiry Date: Any future date</li>
                        <li>CVV: 123</li>
                    </ul>
                </AlertDescription>
            </Alert>
            <div className="flex gap-4 flex-col xl:flex-row justify-center items-center">
                {
                    data.map((product: any) => (
                        <ProductCard key={product.id} product={product} isActive={subscription.product_active.id === product.id} />
                    ))
                }
            </div>
            <span className="text-muted-foreground text-sm mt-2">Payments powered by Stripe</span>
        </div>
    )
}