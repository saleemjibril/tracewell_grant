import FooterLogo from "./FooterLogo";

const FOOTER_NAV = [
  [
    { label: "Grants", href: "#grants" },
    { label: "How it works", href: "#how-it-works" },
    { label: "For funders", href: "#for-funders" },
  ],
  [
    { label: "What we're building", href: "#what-were-building" },
    { label: "About us", href: "#about-us" },
    { label: "FAQs", href: "#faq" },
  ],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__newsletter">
        <div className="site-footer__newsletter-inner">
          <div className="site-footer__newsletter-copy">
            <h2 className="site-footer__newsletter-title">Stay up to date</h2>
            <p className="site-footer__newsletter-text">
              Join our email list to get the latest insights, trends, product
              and updates, delivered straight to your inbox.
            </p>
          </div>

          <form className="site-footer__subscribe" action="/waitlist">
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
              required
            />
            <button type="submit" className="site-footer__subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="site-footer__main">
        <div className="site-footer__main-inner">
          <div className="site-footer__top-row">
            <div className="site-footer__cta-col">
              <p className="site-footer__tagline">
                The Future of Grant Funding Starts With Transparency
              </p>
              <a href="/waitlist" className="site-footer__waitlist-btn">
                Join the waitlist
              </a>
            </div>

            <nav className="site-footer__nav" aria-label="Footer navigation">
              {FOOTER_NAV.map((column, columnIndex) => (
                <ul key={columnIndex} className="site-footer__nav-col">
                  {column.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="site-footer__nav-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </nav>
          </div>

          <div className="site-footer__legal">
            <a href="/privacy" className="site-footer__legal-link">
              Privacy policy
            </a>
            <span className="site-footer__legal-dot" aria-hidden="true" />
            <a href="/terms" className="site-footer__legal-link">
              Terms of use
            </a>
          </div>

          <div className="site-footer__brand">
            <span className="site-footer__brand-text">TRACEWELL GRANT</span>
            <FooterLogo />
          </div>

          <p className="site-footer__copyright">
            © 2026. Tracewell Grant All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
