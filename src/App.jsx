// src/App.jsx

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion
import './styles/App.module.css'; // Global app container styling

// TEMPORARILY COMMENT OUT PARTICLES BACKGROUND if you still have install issues
// Otherwise, uncomment these lines if you fixed particles installation:
import ParticlesBackground from './components/ParticlesBackground';


// Import component screens
import Loader from './components/Loader'; // Assumed working (simple Lottie + Skip)
import Hero from './components/Hero';       // Assumed working (internal text bounce + mode buttons)
import QuickView from './components/QuickView'; // Updated below with features
// VibeMode component (implementation pending)
// import VibeMode from './components/VibeMode'; // Will keep import


// Define the distinct application modes/screens using constants
const STATES = {
  INITIAL: 'initial', // Initial blank state on load
  LOADER: 'loader',   // Displaying the loader animation screen
  HERO: 'hero',     // Showing the main Hero screen with mode selection buttons
  QUICK: 'quick',   // Showing the Quick View portfolio content screen
  VIBE: 'vibe',     // Showing the Vibe Mode portfolio content screen (TODO)
};

function App() {
  // State to manage the current screen/mode being displayed
  const [currentState, setCurrentState] = useState(STATES.INITIAL);

  // useEffect runs once on component mount to transition from the INITIAL state to the LOADER state
  useEffect(() => {
    const timer = setTimeout(() => setCurrentState(STATES.LOADER), 300); // Start loader after 300ms
    return () => clearTimeout(timer); // Cleanup the timeout
  }, []); // Empty dependency array: runs only once on mount

  // Central function used by child components to request a state change (e.g., loader complete, button click)
  const handleStateChange = (newState) => {
    console.log(`Transitioning state → ${newState}`);
    setCurrentState(newState); // Update the component's state, which triggers a re-render and tells AnimatePresence to animate
  };

  // This function renders the appropriate component (screen) based on the currentState value
  // AnimatePresence requires that the component returned has a unique `key` and handles its own `initial`/`exit` animations.
  const renderContent = () => {

     // --- Define Animation Variants for Screen Transitions ---
     // These variants define how screens ENTER and EXIT when their key changes within AnimatePresence.
     // They must be applied to the *root motion.div* of the components (Hero, QuickView, VibeMode).

     // Transition variants for the QuickView/VibeMode screens
     const contentScreenEntryExitVariants = {
         initial: { opacity: 0, scale: 0.98, y: 50 }, // Start faded, slightly smaller, lower
         animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }, // Animates to fully visible, full size
         exit:    { opacity: 0, scale: 0.98, y: -50, transition: { duration: 0.6, ease: 'easeIn' } } // Exits by fading, scaling down, sliding up
     };

      // Transition variants for the Hero screen (when coming from Loader, or going to QuickView/VibeMode)
      // Need this to complement the content screens' transitions. Hero can simply fade/scale slightly.
      const heroScreenEntryExitVariants = {
          initial: { opacity: 0, scale: 0.98 }, // Starts faded, slightly smaller (Entry from Loader)
          animate: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }, // Animates to fully visible
          exit:    { opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: 'easeIn' } } // Exits when going to QuickView/VibeMode
      };


    switch (currentState) {
      case STATES.LOADER:
        // The Loader component's root is a motion.div and handles its own simple opacity exit (opacity: 1 -> 0).
        // No need to apply variants FROM App.jsx for Loader.
        return (
          <Loader
            key="loader" // Unique key for AnimatePresence
            onComplete={() => handleStateChange(STATES.HERO)} // Callback from Loader when it finishes
          />
        );

      case STATES.HERO:
        // Render the Hero component (the mode selection screen).
        // Hero *must* be a root motion.div and apply `heroScreenEntryExitVariants`.
        return (
           // Make sure Hero.jsx root motion.div has key="hero" and variant props matching heroScreenEntryExitVariants
           <Hero
              key="hero" // Unique key for AnimatePresence
              onQuickViewClick={() => handleStateChange(STATES.QUICK)}
              onVibeModeClick={() => handleStateChange(STATES.VIBE)}
               // Name/tagline are passed as props (can sync from content.js in Hero if preferred)
              name="Kuldeep Singh Rathore"
              tagline="Driven by Curiosity. Powered by Code."
            />
        );

      case STATES.QUICK:
        // Render the Quick View component.
        // QuickView *must* be a root motion.div and apply `contentScreenEntryExitVariants`.
        return (
           // Make sure QuickView.jsx root motion.div has key="quick" and variant props matching contentScreenEntryExitVariants
          <QuickView
              key="quick" // Unique key for AnimatePresence
              onBack={() => handleStateChange(STATES.HERO)} // Pass back handler
          />
        );

      case STATES.VIBE:
        // Render the Vibe Mode component (TODO). Must be a root motion.div.
        // Likely use `contentScreenEntryExitVariants` or similar.
         // Placeholder implementation:
         return (
            <motion.div
                 key="vibe" // Unique key for AnimatePresence
                 variants={contentScreenEntryExitVariants} // Apply the content screen variants
                initial="initial" animate="animate" exit="exit" // Link to variants
                style={{ // Basic styling for placeholder to fill space
                    color: '#00e0ff', fontSize: '2em', textAlign: 'center',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    position: 'relative', width: '100%', height: '100%'
                }}>
                <p>Vibe Mode: ✨ Under Construction ✨</p>
                <motion.button
                    whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}
                    style={{marginTop: '20px', padding: '10px 20px', fontSize: '0.8em', backgroundColor: 'rgba(0, 224, 255, 0.1)', border: '1px solid rgba(0, 224, 255, 0.3)', borderRadius: '5px', color: '#ffffff', cursor: 'pointer'}}
                    onClick={() => handleStateChange(STATES.HERO)} // Go back to Hero state
                >
                    Go Back Home
                </motion.button>
            </motion.div>
        );


      case STATES.INITIAL:
      default:
        // Render null for initial state (very brief) or for unexpected states
        return null;
    }
  };

  return (
    <>
      {/* ParticlesBackground is fixed and always present */}
      {/* If you had issues installing tsparticles, keep the import and component commented out for now */}
      {/* import ParticlesBackground from './components/ParticlesBackground'; */}
      <ParticlesBackground /> {/* COMMENT OUT if Particles not installed */}

      {/* Main app container - provides bounded area for screens, styles from App.module.css */}
      <div className="app-container">
        {/* AnimatePresence manages mount/unmount transitions for children */}
        {/* mode="wait" ensures sequential entry/exit animations */}
        <AnimatePresence mode="wait">
          {/* renderContent() returns the active screen component */}
          {/* The rendered component MUST be a motion component at root with a key="stateName" */}
          {renderContent()}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;