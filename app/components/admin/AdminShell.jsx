"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TracewellLogoMark from "../TracewellLogoMark";
import { ADMIN_NAV } from "../../data/admin";
import { ADMIN_ICONS, ExternalIcon } from "./AdminIcons";

const AUTH_KEY = "tracewell_admin_auth";

export function isAdminAuthed() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminAuthed(value) {
  if (typeof window === "undefined") return;
  if (value) {
    sessionStorage.setItem(AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthed()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    setAdminAuthed(false);
    router.push("/admin/login");
  };

  if (!ready) {
    return (
      <div className="admin-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`admin-shell${menuOpen ? " admin-shell--menu-open" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link href="/admin" className="admin-sidebar__logo">
            <TracewellLogoMark width={90} height={78} />
          </Link>
          <span className="admin-sidebar__badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {ADMIN_NAV.map((item) => {
            const Icon = ADMIN_ICONS[item.icon];
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar__link${
                  isActive ? " admin-sidebar__link--active" : ""
                }`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar__link admin-sidebar__link--muted"
          >
            <ExternalIcon />
            View site
          </a>
          <button
            type="button"
            className="admin-sidebar__logout"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="admin-shell__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="admin-shell__main">
        <header className="admin-header">
          <button
            type="button"
            className="admin-header__menu-btn"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="admin-header__menu-bar" />
            <span className="admin-header__menu-bar" />
            <span className="admin-header__menu-bar" />
            <span className="visually-hidden">Toggle menu</span>
          </button>
          <p className="admin-header__eyebrow">Tracewell Grant</p>
          <h1 className="admin-header__title">Admin dashboard</h1>
        </header>

        <div className="admin-shell__content">{children}</div>
      </div>
    </div>
  );
}
