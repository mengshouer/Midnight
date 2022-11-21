export default function Footer({ content }: { content: string }) {
  return (
    <footer className="rounded-xl bg-base-300 prose my-2 p-4 max-w-full">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </footer>
  );
}
