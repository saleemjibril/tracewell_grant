import Navbar from "./Navbar";
import MarqueeBanner from "./MarqueeBanner";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__background" aria-hidden="true">
        <div className="hero__blob hero__blob--dark" />
        <div className="hero__blob hero__blob--light hero__blob--light-1" />
        <div className="hero__blob hero__blob--light hero__blob--light-2" />
      </div>

      <Navbar />

      <div className="hero__content">
        <div className="hero__copy">
          <h1 className="hero__headline">
            The Future of Grant Funding Starts With Transparency
          </h1>
          <p className="hero__subheadline">
            Tracewell helps NGOs, startups, and impact driven organizations
            discover verified grant opportunities, manage applications more
            confidently, and build long term funding credibility.
          </p>
        </div>

        <a href="#waitlist" className="hero__btn hero__btn--hero">
          Join the waitlist
        </a>
      </div>

      <MarqueeBanner />
    </section>
  );
}
