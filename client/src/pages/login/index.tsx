import { LoginForm } from "@/components/forms/LoginForm";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <main className="min-h-screen grid place-items-center container">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <p className="text-center mx-auto text-sm">
                        Don't have an account?
                        <span>
                            <Link
                                to="/register"
                                className="ms-1 hover:underline decoration text-primary font-semibold">
                                Register
                            </Link>
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
