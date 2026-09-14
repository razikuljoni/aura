import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-amber-400 font-serif text-6xl tracking-widest mb-4">404</div>
      <h1 className="font-serif text-3xl font-light text-neutral-200 mb-3">Sanctuary Not Found</h1>
      <p className="text-neutral-400 max-w-md mb-8 text-sm leading-relaxed">
        The escape or luxury retreat you are seeking is currently unavailable or has been relocated within our portfolio.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium tracking-wider text-xs uppercase transition-all duration-300 rounded-sm"
      >
        Return to Portfolio
      </Link>
    </div>
  );
}
