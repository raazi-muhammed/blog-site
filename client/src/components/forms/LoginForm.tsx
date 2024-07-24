import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginDto, loginSchema } from "@/dto/loginDto";
import { z } from "zod";
import {
    Eye as ShowPasswordIcon,
    EyeOff as HidePasswordIcon,
} from "lucide-react";
import { useState } from "react";
import { loginUser } from "@/services/AuthService";
import { toast } from "../ui/use-toast";
import { AxiosError } from "axios";
import Spinner from "../spinners/Spinner";

const emptyDefault = { email: "", password: "" };

export function LoginForm({
    defaultValues = emptyDefault,
}: {
    defaultValues?: LoginDto;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues,
        mode: "onTouched",
    });

    async function onSubmit(values: LoginDto) {
        try {
            await loginUser(values);
            toast({
                description: "You are logged in",
            });
        } catch (error) {
            let errorMessage = "Login failed";
            if (error instanceof AxiosError)
                errorMessage = error.response?.data.errors[0].message;
            toast({
                description: errorMessage,
            });
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="password"
                                    type={showPassword ? "text" : "password"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            {showPassword ? (
                                <HidePasswordIcon
                                    onClick={() => setShowPassword(false)}
                                    size="1em"
                                    className="absolute right-4 top-10 text-primary"
                                />
                            ) : (
                                <ShowPasswordIcon
                                    onClick={() => setShowPassword(true)}
                                    size="1em"
                                    className="absolute right-4 top-10 text-primary"
                                />
                            )}
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}>
                    <Spinner isLoading={form.formState.isSubmitting} />
                    Login
                </Button>
            </form>
        </Form>
    );
}
