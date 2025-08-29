import React from 'react';

export default function Footer(){
  return (
    <footer className="border-t border-zinc-200/60 py-10 text-center text-sm text-zinc-500 dark:border-zinc-800/60">© {new Date().getFullYear()} Excel Analytics By Kritika Gupta</footer>
  );
}