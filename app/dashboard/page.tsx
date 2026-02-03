'use client';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Cog, Gem } from "lucide-react";
import { ActivePlan } from "@/components/dashbaord/activePlan";

export default function DashboardPage() {
    return <div className="flex gap-2 flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">You are now logged in!</h1>
        <h3 className="text-muted-foreground">You data is entirely separated from rest of the database. Thanks to our schema isolation.</h3>
        <div className="mt-4 flex flex-col md:flex-row gap-4 mb-2">
            <Item variant="outline">
                <ItemMedia>
                    <Cog />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Change account details</ItemTitle>
                    <ItemDescription>Change your account details</ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline">
                        <ArrowRight />
                    </Button>
                </ItemActions>
            </Item>
            <Item variant="outline">
                <ItemMedia>
                    <Gem />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Change plan</ItemTitle>
                    <ItemDescription>Change your current plan</ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline">
                        <ArrowRight />
                    </Button>
                </ItemActions>
            </Item>
        </div>
        <ActivePlan />
    </div>
}