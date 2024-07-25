import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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

const emptyDefault = { title: "", content: "", description: "", cover: "" };

export function BlogForm({
    defaultValues = emptyDefault,
    onSubmit,
}: {
    defaultValues?: BlogDto;
    onSubmit: SubmitHandler<BlogDto>;
}) {
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues,
        mode: "onTouched",
    });

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
                    name="cover"
                    render={({}) => (
                        <FormItem>
                            <FormLabel>Cover</FormLabel>
                            <FormControl>
                                <Input
                                    {...form.register("cover")}
                                    type="file"
                                    accept="images/*"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="description" {...field} />
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
                                    description={field.value}
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
                    Post Blog
                </Button>
            </form>
        </Form>
    );
}
