import VerifyEmail from "@/components/auth/VerifyEmail"

export default async function Activate({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params
    return (
        <VerifyEmail token={token} />
    )
}