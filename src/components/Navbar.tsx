'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '#', text: 'Manifesto' },
  { href: '#', text: 'How It Works' },
  { href: '#', text: 'Marketplace', target: '_blank' },
];

const authLinks = {
  login: { href: '#', text: 'Log in', target: '_blank' },
  join: { href: '#', text: 'Join Today', target: '_blank' },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-[8px] sm:text-[12px]">
      {/* Mobile background overlay, active when menu is open */}
      <div
        className={`fixed left-0 top-0 z-[100] block w-full bg-black/80 transition-all duration-300 sm:hidden ${
          isMenuOpen ? 'h-14' : 'h-0'
        }`}
      ></div>

      <div
        className="fixed left-0 top-0 z-[100] flex h-auto w-full items-center justify-center"
      >
        <div className="relative flex h-14 w-full items-center justify-between p-2 pl-3 sm:h-[68px] sm:p-3 sm:pl-5">
          {/* Logo */}
          <Link href="/" className="relative z-[110] w-[140px] sm:w-[200px]">
            <Image
              alt="logo"
              loading="lazy"
              width="180"
              height="100"
              decoding="async"
              className="w-full"
              style={{ color: 'transparent' }}
              src="https://superpower.com/landing/logo.svg"
            />
          </Link>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="font-mono relative z-[110] p-2 text-[10px] uppercase text-white"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
            <Link
              href={authLinks.join.href}
              className={`relative z-[110] flex h-10 items-center justify-center px-4 font-mono text-[10px] uppercase transition-colors duration-300 ease-in-out ${
                isMenuOpen ? 'bg-white text-black' : 'bg-[#FC5F2B] text-white'
              }`}
              target={authLinks.join.target}
            >
              {authLinks.join.text}
            </Link>
          </div>

          {/* Mobile Menu Content (Full screen overlay) */}
          <div
            className={`fixed inset-0 z-[105] flex flex-col items-start gap-4 bg-black p-4 pt-20 transition-opacity duration-300 sm:hidden ${
              isMenuOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
          >
            <Link
              href={authLinks.join.href}
              className="cursor-pointer font-sans text-[32px] font-normal text-white transition-opacity delay-100 hover:opacity-80"
              target={authLinks.join.target}
            >
              Become a member
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="font-sans text-[32px] text-white"
                target={link.target}
              >
                {link.text}
              </Link>
            ))}
            <Link
              href={authLinks.login.href}
              className="font-sans text-[32px] text-white"
              target={authLinks.login.target}
            >
              {authLinks.login.text}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden h-full w-full items-center justify-end gap-6 tracking-tighter sm:flex sm:gap-8">
            <ul className="font-mono flex items-center justify-between gap-6 text-[10px] text-white sm:gap-8 sm:text-xs">
              {navLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="uppercase transition-opacity hover:opacity-80" style={{ textDecoration: 'none' }} target={link.target} rel="noreferrer">
                    {link.text}
                  </Link>
                </li>
              ))}
               <li>
                <Link href={authLinks.login.href} className="uppercase transition-opacity hover:opacity-80" style={{ textDecoration: 'none' }} target={authLinks.login.target} rel="noreferrer">
                  {authLinks.login.text}
                </Link>
              </li>
            </ul>
            <Link href={authLinks.join.href} className="relative z-50 flex h-full w-auto items-center justify-center bg-[#FC5F2B] px-4 font-mono text-[10px] uppercase text-white" style={{ transition: '0.3s ease-in-out' }} target={authLinks.join.target}>
              {authLinks.join.text}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile "Join Today" button */}
      <div className="flex sm:hidden">
        <div className="fixed right-0 top-0 z-[101] h-14 cursor-pointer p-2 pl-3 sm:h-[68px] sm:p-3 sm:pl-5">
            <Link href={authLinks.join.href} className={`relative z-50 flex h-full w-auto items-center justify-center px-4 font-mono text-[10px] uppercase ${
                isMenuOpen ? 'bg-white text-black' : 'bg-[#FC5F2B] text-white'
              }`} style={{ transition: '0.3s ease-in-out' }} target={authLinks.join.target}>
                {authLinks.join.text}
            </Link>
        </div>
      </div>
    </nav>
  );
} 