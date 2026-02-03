'use client'
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
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { api, handleApiError } from "@/lib/api"
import { AlertCircle } from "lucide-react"

const schema = z.object({
    email: z.email(),
    username: z.string().min(3, "Username must at least be 3 characters long"),
    password1: z.string().min(8, "Password must be at least 8 characters long"),
    password2: z.string().min(8, "Confirm Password must be at least 8 characters long")
}).refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
})

export default function SignupPage() {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            username: "",
            password1: "",
            password2: "",
        },
    })

    console.log(form.formState.errors)

    const submitHandler: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            await api.post('/dj-rest-auth/registration/', data)
            window.location.href = '/auth/signup/emailsent/'
        } catch (error) {
            handleApiError(error, form.setError)
        }
    }

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
                <Card className="w-full max-w-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your details below to create your account
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
                                            <FieldLabel htmlFor="signup-username">Username</FieldLabel>
                                            <Input
                                                {...field}
                                                id="signup-username"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="johndoe"
                                                required
                                            />

                                            {
                                                fieldState.invalid ? (
                                                    <FieldError errors={[fieldState.error]} />
                                                ) : (
                                                    <FieldDescription>
                                                        Choose a unique username
                                                    </FieldDescription>
                                                )
                                            }
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="signup-email">
                                                Email
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="signup-email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="johndoe@example.com"
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
                                    name="password1"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="signup-password">
                                                Password
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="signup-password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="••••••••"
                                                required
                                                type='password'
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
                                    name="password2"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="signup-confirm-password">
                                                Confirm Password
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="signup-confirm-password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="••••••••"
                                                required
                                                type='password'
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
                                        <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
                                    </Alert>
                                )
                            }

                            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                                {
                                    form.formState.isSubmitting && <Spinner />
                                }
                                Sign Up
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
                                variant="outline" className="w-full" type="submit">
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
                                Sign up with Google
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
