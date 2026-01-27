import { Navbar1 } from "@/components/navbar1";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen w-full flex flex-col font-sans">
            <Navbar1 />
            <div className="pt-16">
                {children}
            </div>
        </main>
    );
}
