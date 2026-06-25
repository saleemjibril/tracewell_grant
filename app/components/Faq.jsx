"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "../data/faqs";
import FaqItem from "./FaqItem";

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-section__container">
        <div className="faq-section__inner">
          <header className="faq-section__header">
            <span className="faq-section__badge">
              Frequently asked questions (FAQs)
            </span>
            <div className="faq-section__headlines">
              <h2 id="faq-heading" className="faq-section__title">
                Everything you need to know
              </h2>
              <p className="faq-section__subtitle">
                Questions about the platform, the listing, the waitlist, or
                what&apos;s coming. If you don&apos;t find your answer here,
                reach us directly.
              </p>
            </div>
          </header>

          <div className="faq">
            {FAQ_ITEMS.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
