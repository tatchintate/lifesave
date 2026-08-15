import React from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Reserves from "./components/sections/Reserves";
import WhyGive from "./components/sections/WhyGive";
import Eligibility from "./components/sections/Eligibility";
import ProcessAndPrep from "./components/sections/ProcessAndPrep";
import Centers from "./components/sections/Centers";
import Faq from "./components/sections/Faq";
import Footer from "./components/layout/Footer";
import MobileStickyCta from "./components/layout/MobileStickyCta";
import "./Styles.css";

function App() {
  return (
    <div className="min-h-screen bg-background text-neutral-900 font-sans antialiased selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <WhyGive />
        <Reserves />
        <ProcessAndPrep />
        <Eligibility />
        <Centers />
        <Faq />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

export default App;
