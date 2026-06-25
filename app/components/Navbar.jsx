"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Grants", href: "#grants" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For funders", href: "#for-funders" },
  { label: "About us", href: "#about-us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`hero__nav${menuOpen ? " hero__nav--open" : ""}`}>
      <div className="hero__nav-inner">
        <div className="hero__nav-bar">
          <Logo />

          <button
            type="button"
            className="hero__nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hero__nav-toggle-icon" aria-hidden="true">
              <span className="hero__nav-toggle-bar" />
              <span className="hero__nav-toggle-bar" />
              <span className="hero__nav-toggle-bar" />
            </span>
            <span className="visually-hidden">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>

        {menuOpen && (
          <button
            type="button"
            className="hero__nav-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />
        )}

        <div
          id="main-navigation"
          className={`hero__nav-menu${menuOpen ? " hero__nav-menu--open" : ""}`}
        >
          <nav className="hero__nav-links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hero__nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#waitlist"
            className="hero__btn hero__btn--nav"
            onClick={closeMenu}
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
