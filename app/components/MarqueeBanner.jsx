const MARQUEE_ITEMS = Array.from({ length: 10 }, (_, i) => i);

export default function MarqueeBanner() {
  return (
    <div className="hero__banner">
      <div className="hero__banner-inner">
        <div className="hero__banner-static">
          <p className="hero__banner-title">Tracewell Grant</p>
          <p className="hero__banner-subtitle">
            Built for grant seekers, funders and more...
          </p>
        </div>

        <div className="hero__banner-divider" aria-hidden="true" />

        <div className="hero__banner-marquee" aria-hidden="true">
          <div className="hero__banner-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((i) => (
              <span key={i} className="hero__banner-item">
                Tracewell Grant
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
