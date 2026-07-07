"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TracewellLogoMark from "../TracewellLogoMark";
import { setAdminAuthed } from "./AdminShell";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }

    setAdminAuthed(true);
    router.push("/admin");
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          <TracewellLogoMark width={100} height={87} />
          <span className="admin-login__badge">Admin</span>
        </div>

        <h1 className="admin-login__title">Sign in</h1>
        <p className="admin-login__subtitle">
          Access the Tracewell Grant admin dashboard.
        </p>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span className="admin-field__label">Email</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@tracewell.org"
            />
          </label>

          <label className="admin-field">
            <span className="admin-field__label">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>

          {error && (
            <p className="admin-login__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="admin-button admin-button--full">
            Sign in
          </button>
        </form>

        <p className="admin-login__hint">
          Demo access — any credentials will sign you in.
        </p>
      </div>
    </div>
  );
}
