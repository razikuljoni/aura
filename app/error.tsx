'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-amber-400 font-serif text-5xl tracking-widest mb-4">AURA</div>
      <h1 className="font-serif text-2xl font-light text-neutral-200 mb-3">Service Interruption</h1>
      <p className="text-neutral-400 max-w-md mb-8 text-sm leading-relaxed">
        Our digital concierge experienced a temporary connectivity disturbance. Please refresh or retry.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium tracking-wider text-xs uppercase transition-all duration-300 rounded-sm cursor-pointer"
      >
        Retry Request
      </button>
    </div>
  );
}
