'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Cog, Gem } from "lucide-react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import { api } from "@/lib/api";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function DashboardSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    {
                        !isCollapsed && (
                            <Link href="/dashboard">
                                <div className="flex justify-center border-b-2 border-b-muted py-4">
                                    <h3 className="text-lg font-semibold">
                                        Covert. Dashboard
                                    </h3>
                                </div>
                            </Link>
                        )
                    }

                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Account</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/dashboard/settings">
                                            <Cog />
                                            Settings
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/dashboard/plan">
                                            <Gem />
                                            Change Plan
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <UserCard />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {
                            !isCollapsed && (
                                <SidebarMenuButton asChild>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild className="data-[state=open]:hidden">
                                            <Button variant='outline' >
                                                <LogOut />
                                                Log out
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    You will be logged out and redirected to the login page.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button
                                                        onClick={() => {
                                                            api.post('/dj-rest-auth/logout/')
                                                            window.location.href = '/'
                                                        }}
                                                        variant="destructive"
                                                    >
                                                        Log out
                                                    </Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </SidebarMenuButton>
                            )
                        }
                    </SidebarMenu>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}

function UserCard() {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getUserData = async () => {
            const data = await api.get('/dj-rest-auth/user/')
            setUserData(data.data)
            setLoading(false)
        }
        getUserData()
    }, [])
    return loading ? <>
        <Skeleton className="size-10 rounded-full" />
        <div className="grid flex-1 gap-1">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-2 w-20 rounded" />
        </div>
    </> : (
        <>
            <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Shadcn</span>
                <span className="truncate text-xs">shadcn@ui.com</span>
            </div>
        </>
    )
}