import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import GrantOpportunities from "./components/GrantOpportunities";
import WhatWereBuilding from "./components/WhatWereBuilding";
import HowItWorks from "./components/HowItWorks";
import JoinFundersCTA from "./components/JoinFundersCTA";
import AboutUs from "./components/AboutUs";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <GrantOpportunities />
      <WhatWereBuilding />
      <HowItWorks />
      <JoinFundersCTA />
      <AboutUs />
      <Faq />
      <Footer />
    </main>
  );
}
