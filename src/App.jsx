import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyGive from "./components/WhyGive";
import Eligibility from "./components/Eligibility";
import ProcessAndPrep from "./components/ProcessAndPrep";
import Centers from "./components/Centers";
import Reserves from "./components/Reserves";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import "./Styles.css";

function App() {
  return (
    <div className="min-h-screen bg-background text-neutral-900 font-sans antialiased selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <WhyGive />
        <Eligibility />
        <ProcessAndPrep />
        <Centers />
        <Reserves />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default App;
