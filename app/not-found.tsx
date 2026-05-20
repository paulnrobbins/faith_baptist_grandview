import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[100svh] flex items-center">
      <div className="container-editorial flex flex-col gap-8 max-w-[42ch]">
        <span className="caption-mono">404 · Page not found</span>
        <h1 className="font-display text-display-lg text-fg leading-none">
          That door isn’t here, friend.
        </h1>
        <p className="font-body text-lead text-fg-muted">
          The page you were looking for has moved or never existed. The home
          page is waiting whenever you’re ready.
        </p>
        <Link
          href="/"
          className="self-start inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 rounded-full caption-mono hover:bg-accent transition-colors duration-300"
        >
          Back home <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
