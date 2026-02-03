'use client'
import { Button } from "@/components/ui/button"
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

const forgotPasswordSchema = z.object({
    email: z.email({
        message: "Invalid email address",
    }),
})

export default function ForgotPassword() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
    const submitHandler: SubmitHandler<z.infer<typeof forgotPasswordSchema>> = async (data) => {
        try {
            await api.post("/dj-rest-auth/password/reset/", data)
            window.location.href = '/auth/forgot-password/emailsent'
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
                        Enter your email address to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-username">Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id="login-username"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="johndoe"
                                            required
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
                            {form.formState.isSubmitting ? <Spinner /> : 'Send Reset Password Link'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}