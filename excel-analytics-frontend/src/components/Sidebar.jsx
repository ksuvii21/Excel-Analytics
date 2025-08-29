import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ title='KSUVII', subtitle='USER', links = [], onLogout }){
  return (
    <aside className="border-r border-zinc-200/60 bg-zinc-50/60 p-4 dark:border-zinc-800/60 dark:bg-zinc-950/40">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-indigo-600"/>
        <div className="leading-tight">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-xs text-zinc-500">{subtitle}</div>
        </div>
      </div>
      <nav className="space-y-1">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white dark:hover:bg-zinc-900">
            {l.icon}
            <span>{l.label}</span>
          </Link>
        ))}
      </nav>
      <button onClick={onLogout} className="mt-6 w-full rounded-xl border border-zinc-300/70 px-3 py-2 text-left text-sm hover:bg-white dark:border-zinc-700/70 dark:hover:bg-zinc-900">Log out</button>
    </aside>
  );
}
