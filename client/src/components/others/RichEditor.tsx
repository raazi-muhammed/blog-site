import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";

export default function RichEditor({
    description,
    onChange,
}: {
    description: string;
    onChange: (richTest: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ms-3",
                },
            }),
            Heading.configure({
                HTMLAttributes: {
                    class: "editor-text",
                },
                levels: [1, 2, 3],
            }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "max-w-md min-h-44 w-full text-pretty rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <section>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </section>
    );
}
