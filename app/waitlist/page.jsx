import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WaitlistForm from "../components/WaitlistForm";

export const metadata = {
  title: "Join the Waitlist | Tracewell Grant",
  description:
    "Get early access to Tracewell Grant — Africa's home for climate, sustainability, and agriculture funding.",
};

export default function WaitlistPage() {
  return (
    <main className="waitlist-page">
      <Navbar />
      <section className="waitlist">
        <div className="waitlist__inner">
          <header className="waitlist__header">
            <h1 className="waitlist__title">Get early access</h1>
            <p className="waitlist__subtitle">
              Tracewell Grant is Africa&apos;s home for climate, sustainability,
              and agriculture funding, connecting grant funders with eligible
              organisations across Nigeria and beyond.
            </p>
          </header>

          <WaitlistForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
