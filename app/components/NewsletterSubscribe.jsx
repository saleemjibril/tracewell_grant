"use client";

import { useState } from "react";
import { subscribeNewsletter } from "../lib/api";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const data = await subscribeNewsletter(email.trim());
      setEmail("");
      setStatus("success");
      setMessage(data.message || "Subscribed successfully.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Unable to subscribe. Please try again.");
    }
  };

  return (
    <div className="site-footer__subscribe-wrap">
      <form className="site-footer__subscribe" onSubmit={handleSubmit} noValidate>
      <label htmlFor="footer-email" className="visually-hidden">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        name="email"
        placeholder="Enter email"
        className="site-footer__email-input"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        disabled={status === "submitting"}
      />
      <button
        type="submit"
        className="site-footer__subscribe-btn"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Subscribing..." : "Subscribe"}
      </button>
      </form>
      {message && (
        <p
          className={`site-footer__subscribe-message site-footer__subscribe-message--${status}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  );
}
