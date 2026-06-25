export default function AboutUs() {
  return (
    <section className="about-us" id="about-us">
      <div className="about-us__inner">
        <div className="about-us__top">
          <div className="about-us__column">
            <div className="about-us__intro">
              <span className="about-us__badge">About us</span>
              <div className="about-us__copy">
                <h2 className="about-us__heading">Built from the inside out</h2>
                <p className="about-us__text">
                  Tracewell was built because the people closest to the problem,
                  programme officers, NGO founders, and field teams have been the
                  least served by the tools that exist.
                </p>
              </div>
            </div>

            <div className="about-us__copy">
              <h2 className="about-us__heading">Mission</h2>
              <p className="about-us__text">
                To rebalance the power dynamic between funders and NGOs through
                transparency, verified accountability, and a trust system that
                rewards delivery, not paperwork.
              </p>
            </div>
          </div>

          <div className="about-us__graphic" aria-hidden="true">
            <div className="about-us__graphic-blobs">
              <div className="about-us__blob about-us__blob--dark" />
              <div className="about-us__blob about-us__blob--light about-us__blob--light-1" />
              <div className="about-us__blob about-us__blob--light about-us__blob--light-2" />
            </div>
          </div>
        </div>

        <div className="about-us__bottom">
          <h2 className="about-us__heading">
            Delivered once. Trusted everywhere.
          </h2>
          <div className="about-us__long-copy">
            <p className="about-us__text">
              Every grant you deliver builds a permanent, verifiable track record.
              Three years on Tracewell and you carry a profile no reference
              letter, no introductory email, and no pitch deck can replicate
              because it isn&apos;t self-reported. It&apos;s proven. Every
              milestone completed, every disbursement released, every review
              submitted is recorded, timestamped, and immutable. There are no
              black boxes on either side of this relationship. What was agreed
              is what is on record, Always. The platforms that exist were built
              for professional grant researchers with teams, subscriptions, and
              institutional access. Tracewell is built for the programme officer
              juggling three roles, the founder writing proposals at midnight,
              the grassroots organisation doing high-impact work that the current
              system was never designed to see. Accountability here runs in both
              directions, funders are held to response SLAs, not just grantees.
              When a funder is overdue, the platform flags it. Both sides agreed
              to the terms, both sides are held to them.
            </p>
            <p className="about-us__text">
              And when a grant closes, it doesn&apos;t disappear into a filing
              cabinet. Every milestone completion and every disbursement is
              anchored on-chain, publicly queryable, tamper-proof, and shareable
              with any funder anywhere in the world. Your delivery history travels
              with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
