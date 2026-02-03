'use client'
import React from 'react';
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    useForm,
    SubmitHandler,
    Controller
} from "react-hook-form"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { handleApiError, api, getCurrentUser } from "@/lib/api";
import useUserStore from "@/lib/stores/user";
import { toast } from "sonner";

const settingsSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long"
    }),
    first_name: z.string().min(3, {
        message: "First name must be at least 3 characters long"
    }),
    last_name: z.string().min(3, {
        message: "Last name must be at least 3 characters long"
    }),
})

const changePasswordSchema = z.object({
    new_password1: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    new_password2: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
})

export default function SettingsPage() {
    // user data handling
    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
    })
    const { user, setUser } = useUserStore()
    React.useEffect(() => {
        if (user) {
            form.setValue("username", user.username);
            form.setValue("first_name", user.first_name);
            form.setValue("last_name", user.last_name);
        }
    }, [])

    const submitHandler: SubmitHandler<z.infer<typeof settingsSchema>> = async (data) => {
        try {
            await api.put('/dj-rest-auth/user/', data)
            setUser({ ...user!, ...data })
            toast.success("Profile updated successfully")
        } catch (error) {
            handleApiError(error, form.setError);
        }
    }

    //user password handling
    const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
    })
    const passSubmitHandler: SubmitHandler<z.infer<typeof changePasswordSchema>> = async (data) => {
        try {
            await api.post('/dj-rest-auth/password/change/', data)
            toast.success("Password changed successfully!")
            changePasswordForm.setValue('new_password1', '')
            changePasswordForm.setValue('new_password2', '')
        } catch (error) {
            handleApiError(error, changePasswordForm.setError);
        }
    }

    return (
        <>
            <div className="w-full h-full justify-center items-center flex">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                            <FieldGroup>
                                <Controller
                                    name="username"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="settings-username">Username</FieldLabel>
                                            <Input
                                                {...field}
                                                id="settings-username"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="johndoe"
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
                                    name="first_name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="settings-first_name">First Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id="settings-first_name"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="John"
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
                                    name="last_name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="settings-last_name">Last Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id="settings-last_name"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Doe"
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
                                    <Alert variant="destructive" className="bg-destructive-background">
                                        <AlertCircle />
                                        <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
                                    </Alert>
                                )
                            }
                            <CardAction className="gap-2 flex justify-end">
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    Save
                                    {form.formState.isSubmitting && (
                                        <Spinner />
                                    )}
                                </Button>
                            </CardAction>
                        </form>
                        <form onSubmit={changePasswordForm.handleSubmit(passSubmitHandler)} className="space-y-4">
                            <FieldGroup>
                                <Controller
                                    name="new_password1"
                                    control={changePasswordForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="settings-new_password1">New Password</FieldLabel>
                                            <Input
                                                {...field}
                                                id="settings-new_password1"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="New Password"
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
                                    control={changePasswordForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="settings-new_password2">Confirm New Password</FieldLabel>
                                            <Input
                                                {...field}
                                                id="settings-new_password2"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Confirm New Password"
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
                            {changePasswordForm.formState.errors?.root?.message && (
                                <Alert variant="destructive" className="bg-destructive-background">
                                    <AlertCircle />
                                    <AlertTitle>{changePasswordForm.formState.errors.root.message}</AlertTitle>
                                </Alert>
                            )}
                            <CardAction className="gap-2 flex justify-end">
                                <Button type="submit" disabled={changePasswordForm.formState.isSubmitting}>
                                    Change Password
                                    {changePasswordForm.formState.isSubmitting && (
                                        <Spinner />
                                    )}
                                </Button>
                            </CardAction>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}