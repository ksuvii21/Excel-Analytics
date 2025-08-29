import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LineChart, LogOut, Menu, X } from 'lucide-react';
import { useAuth, roleHome } from '../context/AuthContext.jsx';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/30 bg-gradient-to-r from-black via-zinc-900 to-black backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <img src={logo} alt="logo" className="h-8 w-8 rounded-xl"/>
          <span className="text-lg bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Excel Analytics
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#home" className="text-sm font-medium text-zinc-300 hover:text-pink-400 transition">Home</a>
          <a href="#about" className="text-sm font-medium text-zinc-300 hover:text-pink-400 transition">About</a>
          <a href="#services" className="text-sm font-medium text-zinc-300 hover:text-pink-400 transition">Services</a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-zinc-300 sm:inline">{user.email} · {user.role}</span>
              <GhostButton as={Link} to={roleHome(user.role)}><LineChart className="h-4 w-4"/> Dashboard</GhostButton>
              <GhostButton onClick={logout}><LogOut className="h-4 w-4"/> Logout</GhostButton>
            </div>
          ) : (
            <GhostButton as={Link} to="/login"><LogIn className="h-4 w-4"/> Sign In</GhostButton>
          )}

          <button className="md:hidden text-zinc-200" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            {open ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-purple-500/30 bg-zinc-950/95 p-4 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#home" className="text-sm text-zinc-300 hover:text-pink-400" onClick={() => setOpen(false)}>Home</a>
            <a href="#about" className="text-sm text-zinc-300 hover:text-pink-400" onClick={() => setOpen(false)}>About</a>
            <a href="#services" className="text-sm text-zinc-300 hover:text-pink-400" onClick={() => setOpen(false)}>Services</a>
          </nav>
        </div>
      )}
    </header>
  );
}

function GhostButton({ as: As = 'button', className = '', children, ...props }) {
  return (
    <As
      className={
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ' +
        'border border-purple-500/50 bg-transparent text-zinc-200 hover:bg-gradient-to-r ' +
        'hover:from-pink-500 hover:to-purple-600 hover:text-white shadow-lg ' +
        className
      }
      {...props}
    >
      {children}
    </As>
  );
}

