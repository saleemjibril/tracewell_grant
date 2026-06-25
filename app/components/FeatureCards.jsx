const CARDS = [
  {
    title: "Find Grants",
    description:
      "Use Tracewell Grant to identify and connect the right funders, in one place.",
    link: "Explore grants",
    href: "#grants",
  },
  {
    title: "Build your credibility",
    description:
      "Every completed project builds follows your organisation to every future application.",
    link: "Search nonprofits",
    href: "#nonprofits",
  },
  {
    title: "Find Grant Seekers",
    description:
      "Identify and connect with the right organizations that seek grant, in one place.",
    link: "Explore grant seekers",
    href: "#grant-seekers",
  },
];

export default function FeatureCards() {
  return (
    <section className="feature-cards" aria-label="Features">
      <div className="feature-cards__inner">
        {CARDS.map((card) => (
          <a key={card.title} href={card.href} className="feature-cards__card">
            <div className="feature-cards__content">
              <div className="feature-cards__copy">
                <h2 className="feature-cards__title">{card.title}</h2>
                <p className="feature-cards__description">{card.description}</p>
              </div>
              <span className="feature-cards__link">{card.link}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
