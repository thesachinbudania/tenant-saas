'use client';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

const loginSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
})

export default function LoginPage() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    })

    const submitHandler: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
        try {
            await api.post('/dj-rest-auth/login/', data)
            window.location.href = '/'
        } catch (error) {
            handleApiError(error, form.setError)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your username and password to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-username">Username</FieldLabel>
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
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-password">Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id="login-password"
                                            aria-invalid={fieldState.invalid}
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                        />
                                        <div className="flex justify-end">
                                            <Link href="/auth/forgot-password" className="-mt-1 text-xs text-foreground hover:underline underline-offset-4" >Forgot Password?</Link>
                                        </div>
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
                                    <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
                                </Alert>
                            )
                        }
                        <Button className="w-full" onClick={form.handleSubmit(submitHandler)} disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Spinner /> : 'Login'}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            type="button"
                            onClick={() => {
                                const redirectUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + "/auth/google/callback"
                                const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUrl}&prompt=consent&response_type=code&client_id=${clientId}&scope=openid%20email%20profile&access_type=offline`
                            }}
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="google"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                ></path>
                            </svg>
                            Login with Google
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="hover:underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
