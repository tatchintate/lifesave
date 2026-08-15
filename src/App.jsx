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
import { ThemeProvider } from "./context/ThemeContext";
import "./Styles.css";

function AppContent() {
  return (
    <div className="min-h-screen bg-[#FAF9F8] dark:bg-[#0B1528] text-neutral-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300 selection:bg-primary-500 selection:text-white">
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
