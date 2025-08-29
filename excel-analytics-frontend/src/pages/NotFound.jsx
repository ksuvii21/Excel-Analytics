import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){
  return (
    <div className="grid min-h-[60vh] place-items-center p-10 text-center">
      <div>
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-zinc-500">Page not found.</p>
        <Link to="/" className="mt-4 inline-block rounded-xl border px-4 py-2">Go Home</Link>
      </div>
    </div>
  );
}