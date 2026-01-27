'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {
    useForm,
    SubmitHandler,
    Controller
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api, handleApiError } from "@/lib/api"
import {
    FieldGroup,
    FieldLabel,
    FieldError,
    Field
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner";
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
    new_password1: z.string().min(8, "Password must be at least 8 characters long"),
    new_password2: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords do not match",
    path: ["new_password2"],
})

export default function ForgotPasswordConfirm({ uid, token }: { uid: string, token: string }) {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            new_password1: "",
            new_password2: "",
        },
    })
    const submitHandler: SubmitHandler<z.infer<typeof forgotPasswordSchema>> = async (data) => {
        try {
            await api.post("/dj-rest-auth/password/reset/confirm/", {
                uid,
                token,
                new_password1: data.new_password1,
                new_password2: data.new_password2,
            })
            window.location.href = '/auth/login'
        } catch (error) {
            handleApiError(error, form.setError)
        }
    }
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your new password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                        <FieldGroup>
                            <Controller
                                name="new_password1"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-username">New Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id="login-username"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="johndoe"
                                            required
                                            type="password"
                                        />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                            <Controller
                                name="new_password2"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-username">Confirm Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id="login-username"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="johndoe"
                                            required
                                            type="password"
                                        />
                                        {
                                            fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        {
                            form.formState.errors?.root?.message && (
                                <Alert variant='destructive' className="bg-destructive-background ">
                                    <AlertCircle />
                                    <AlertTitle>{form.formState.errors?.root?.message}</AlertTitle>
                                </Alert>
                            )
                        }
                        <Button className="w-full" onClick={form.handleSubmit(submitHandler)} disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Spinner /> : 'Reset Password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}