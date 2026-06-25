import GrantDirectory from "../components/GrantDirectory";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Explore Grant Opportunities | Tracewell Grant",
  description:
    "Browse curated grant opportunities for nonprofits, startups, researchers, and impact driven organizations.",
};

export default function GrantsPage() {
  return (
    <main>
      <Navbar />
      <GrantDirectory previewLimit={null} />
      <Footer />
    </main>
  );
}
