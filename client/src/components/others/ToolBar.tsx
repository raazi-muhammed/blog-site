import { Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    StrikethroughIcon,
} from "lucide-react";

export default function ToolBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    return (
        <section className="mb-2 w-fit rounded border">
            <Toggle
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}>
                <Heading1 className="h-4 w-4" />
            </Toggle>
            <Toggle
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}>
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}>
                <Heading3 className="h-4 w-4" />
            </Toggle>
            <Toggle
                pressed={editor.isActive("bold")}
                onPressedChange={() => {
                    editor.chain().focus().toggleBold().run();
                }}>
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                pressed={editor.isActive("italic")}
                onPressedChange={() => {
                    editor.chain().focus().toggleItalic().run();
                }}>
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                pressed={editor.isActive("strick")}
                onPressedChange={() => {
                    editor.chain().focus().toggleStrike().run();
                }}>
                <StrikethroughIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => {
                    editor.chain().focus().toggleBulletList().run();
                }}>
                <List className="h-4 w-4" />
            </Toggle>
        </section>
    );
}
