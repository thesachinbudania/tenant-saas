import {
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/dashboard-sidebar";


export default function ({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="p-4 border-1 w-full m-2 rounded-md">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}