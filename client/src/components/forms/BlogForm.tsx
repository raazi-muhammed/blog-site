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
import Spinner from "../spinners/Spinner";
import { BlogDto, blogSchema } from "@/dto/blogDto";
import RichEditor from "../others/RichEditor";

const emptyDefault = { title: "", content: "" };

export function BlogForm({
    defaultValues = emptyDefault,
}: {
    defaultValues?: BlogDto;
}) {
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues,
        mode: "onTouched",
    });

    async function onSubmit(values: BlogDto) {
        console.log(values);
        console.log("====================================");
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Rich Editor</FormLabel>
                            <FormControl>
                                <RichEditor
                                    description={field.name}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
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
