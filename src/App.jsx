// App.jsx - Version mise à jour
import { useState, useEffect } from "react";
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
import SplashScreen from "./components/SplashScreen";
import "./Styles.css";

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Préchargement des ressources
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="app-shell min-h-screen bg-[#F8F6F1] dark:bg-[#0B1528] text-neutral-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300 selection:bg-primary-500 selection:text-white">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div 
        className={`app-content ${
          showSplash 
            ? "opacity-0 scale-95 pointer-events-none" 
            : "opacity-100 scale-100 pointer-events-auto"
        } transition-all duration-700 ease-out`}
      >
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
      </div>
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