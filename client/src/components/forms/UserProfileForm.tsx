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
import { z } from "zod";
import { UserDto, userSchema } from "@/dto/userDto";
import Spinner from "../spinners/Spinner";
import { editProfile } from "@/services/UserService";

const emptyDefault = { name: "", avatar: "" };

export function UserProfileForm({
    defaultValues = emptyDefault,
}: {
    defaultValues?: UserDto;
}) {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues,
        mode: "onTouched",
    });

    async function onSubmit(values: UserDto) {
        const data = new FormData();
        data.append("name", values.name);
        if (values.avatar) {
            data.append("avatar", values.avatar[0]);
        }

        editProfile(data).then((res) => {
            console.log("====================================");
            console.log(res);
            console.log("====================================");
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({}) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    {...form.register("avatar")}
                                    type="file"
                                    accept="images/*"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full"
                    type="submit"
                    disabled={
                        form.formState.isSubmitting || !form.formState.isDirty
                    }>
                    <Spinner isLoading={form.formState.isSubmitting} />
                    Save
                </Button>
            </form>
        </Form>
    );
}
