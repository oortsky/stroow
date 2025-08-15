export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-headings:mb-4 prose-hr:my-4 prose-headings:font-bold prose-headings:text-black prose-strong:text-black prose-a:text-black text-black prose-h1:text-3xl prose-h2:text-2xl dark:prose-headings:text-white prose-strong:dark:text-white prose-a:dark:text-white dark:text-white">
      {children}
    </div>
  );
}
