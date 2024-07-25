export default function BlogHtml({ content }: { content: string }) {
    return (
        <div
            className="min-h-[50vh]"
            dangerouslySetInnerHTML={{
                __html: content,
            }}></div>
    );
}
