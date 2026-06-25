import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works__inner">
        <header className="how-it-works__header">
          <span className="how-it-works__badge">How it works</span>
          <div className="how-it-works__headlines">
            <h2 className="how-it-works__title">Two portals. One mission.</h2>
            <p className="how-it-works__subtitle">
              Tracewell runs two connected portals, one for grant seekers, one
              for funders built on the same engine and designed to hold both
              sides accountable.
            </p>
          </div>
        </header>

        <div className="how-it-works__grid">
          <article className="how-it-works__card how-it-works__card--seekers">
            <div className="how-it-works__media how-it-works__media--seekers">
              <Image
                src="/assets/how-it-works/seekers.png"
                alt="Grant seeker working at a desk"
                fill
                sizes="(max-width: 768px) 100vw, 626px"
              />
            </div>
            <div className="how-it-works__content">
              <h3 className="how-it-works__card-title">For grant seekers</h3>
              <p className="how-it-works__card-description">
                Register your organisation, discover grants that match your
                mission, apply in-platform, and build a credibility score that
                compounds with every grant you deliver.
              </p>
            </div>
          </article>

          <div className="how-it-works__column">
            <article className="how-it-works__card how-it-works__card--funders">
              <div className="how-it-works__media how-it-works__media--funders">
                <Image
                  src="/assets/how-it-works/funders.png"
                  alt="Grant funder reviewing applications on a monitor"
                  fill
                  sizes="(max-width: 768px) 100vw, 626px"
                />
              </div>
              <div className="how-it-works__content">
                <h3 className="how-it-works__card-title">For grant funders</h3>
                <p className="how-it-works__card-description">
                  Post structured grant opportunities, receive
                  credibility-scored applications, run a transparent review
                  process, and disburse funds against verified milestones all
                  in one place.
                </p>
              </div>
            </article>

            <article className="how-it-works__card how-it-works__card--photo">
              <div className="how-it-works__media how-it-works__media--collaboration">
                <Image
                  src="/assets/how-it-works/collaboration.png"
                  alt="Team collaborating over grant documents"
                  fill
                  sizes="(max-width: 768px) 100vw, 626px"
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
