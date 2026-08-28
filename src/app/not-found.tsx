import Link from "next/link";

export default function NotFound() {
  return <main className="app-shell flex min-h-screen items-center justify-center p-6"><section className="theme-surface max-w-md rounded-2xl border p-8 text-center"><p className="theme-accent text-sm font-semibold">404</p><h1 className="mt-3 text-2xl font-semibold">Document not available</h1><p className="theme-muted mt-3">It may have been removed or has not been shared with the selected user.</p><Link className="editor-button mt-6 inline-block" href="/">Back to documents</Link></section></main>;
}
