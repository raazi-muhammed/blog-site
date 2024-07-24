import { RegisterForm } from "@/components/forms/RegisterForm";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
            <CardFooter>
                <p className="text-center mx-auto text-sm">
                    Already have an account?
                    <span>
                        <Link
                            to="/login"
                            className="ms-1 hover:underline decoration text-primary font-semibold">
                            Login
                        </Link>
                    </span>
                </p>
            </CardFooter>
        </Card>
    );
}
