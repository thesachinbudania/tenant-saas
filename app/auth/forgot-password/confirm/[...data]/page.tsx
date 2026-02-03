import ForgotPasswordConfirm from "@/components/auth/ForgotPasswordConfirm";

export default async function ForgotPasswordConfirmPage({
    params,
}: {
    params: Promise<{ data: string[] }>;
}) {
    const { data } = await params;
    const uid = data[0]
    const token = data[1]
    return <ForgotPasswordConfirm uid={uid} token={token} />;
}