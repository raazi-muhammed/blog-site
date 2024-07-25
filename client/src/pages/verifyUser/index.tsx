import { VerifyForm } from "@/components/forms/VerifyForm";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function VerifyUser() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Verify user</CardTitle>
            </CardHeader>
            <CardContent>
                <VerifyForm />
            </CardContent>
            <CardFooter>
                <p className="mx-auto text-center text-sm">
                    Already have an account?
                    <span>
                        <Link
                            to="/login"
                            className="ms-1 font-semibold text-primary decoration hover:underline">
                            Login
                        </Link>
                    </span>
                </p>
            </CardFooter>
        </Card>
    );
}
