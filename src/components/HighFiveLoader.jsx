import React, { useEffect, useRef } from 'react';
// *** CORRECTED IMPORT: Ensure useAnimation is here ***
import { motion, useAnimation } from 'framer-motion';
import LottiePlayer from 'react-lottie-player'; // Use react-lottie-player
import styles from '../styles/HighFiveLoader.module.css';

// Use the provided LottieFiles URL directly
const LOTTIE_ANIMATION_URL = "https://lottie.host/ca365e9a-38f6-4d00-add0-ba361ee8162e/0He0DbSNuP.lottie";


const HighFiveLoader = ({ onComplete }) => {
    const lottiePlayerRef = useRef(null); // Ref for LottiePlayer component

    // We need useAnimation for the skip button control
    const skipButtonControls = useAnimation(); // This should now be defined

    // Calculate when the skip button should appear (based on Lottie duration)
    const lottieApproxDuration = 5.1; // Estimate based on LottieFiles URL preview
    const skipButtonAppearanceDelay = lottieApproxDuration + 0.5; // Appear after Lottie finishes + buffer


    // --- Skip button variants (fade in) ---
     const skipButtonVariants = {
         hidden: { opacity: 0, y: 20 },
         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
         // Delay set in useEffect below
     }


    // --- Effect to Play Lottie, Trigger Completion, Handle Cleanup & Skip Button ---
    useEffect(() => {
        let isMounted = true; // Flag for cleanup safety

        // Trigger the skip button animation concurrently
        const triggerSkipButton = async () => {
            await new Promise(resolve => setTimeout(resolve, skipButtonAppearanceDelay * 1000));
            if(isMounted) {
                // Start button fade-in animation defined in skipButtonVariants.visible
                skipButtonControls.start("visible");
            }
        };

        // --- Start sequence(s) on mount ---
        // The Lottie will autoplay due to the `play={true}` prop on the component.
        // Completion is triggered by LottiePlayer's `onComplete` prop.
        // We only need to manually start the skip button animation.
        triggerSkipButton();


        // --- Component Unmount Cleanup ---
        // Runs when the component is removed (e.g., by App.jsx's AnimatePresence after Lottie finishes)
        return () => {
            isMounted = false; // Update mounted flag

             // Clean up the Lottie Player instance
             // Crucial check for `lottiePlayerRef.current` before calling methods
             if (lottiePlayerRef.current) {
                 try {
                     lottiePlayerRef.current.stop(); // Attempt to stop playback
                     lottiePlayerRef.current.destroy(); // Recommended cleanup for react-lottie-player
                 } catch (e) {
                     // Catch any potential errors during cleanup if instance is already null/invalid
                     console.error("Error during Lottie player cleanup:", e);
                 }
            }
            // Framer Motion controls clean up automatically. Timers used with `await setTimeout` + `isMounted` check don't need explicit `clearTimeout` from here.
         };

    // Dependencies array: List all values used inside useEffect logic (controls, calculated delay)
    // onComplete prop is used directly on LottiePlayer prop, so not needed here
    // lottieApproxDuration used only in calculation of skipButtonAppearanceDelay, so not a direct dep here
    }, [skipButtonControls, skipButtonAppearanceDelay]);


    // --- Render Logic ---
    return (
        // Overall loader container: Full screen overlay, handles exit fade via App.jsx
        // Root motion.div is required for App.jsx's AnimatePresence to detect/animate mount/unmount
        <motion.div
            className={styles.loaderContainer}
             initial={{ opacity: 1 }} // Starts fully opaque immediately when component is added to DOM
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }} // Defines fade-out when removed by App.jsx
        >

            {/* Lottie Fist Bump Animation Container */}
            {/* Positioned using absolute positioning inside the fixed loader container */}
             <motion.div
                 className={styles.characterContainer}
                  style={{
                       position: 'absolute', // Position independently within parent
                       top: '50%', // Vertical center point for container's top edge
                       left: '50%', // Horizontal center point for container's left edge
                       transform: 'translate(-50%, -50%)', // Shifts container back by half its size to center it truly
                       // *** ADJUST THESE WIDTH/HEIGHT TO CONTROL THE VISUAL SIZE OF THE FIST BUMP ANIMATION ***
                       // These values from HighFiveLoader.module.css might be overwritten by this inline style!
                       // Make sure these are set correctly based on how you want it to look.
                       width: '300px', // Example size - TWEAK THIS!
                       height: '300px', // Example size - TWEAK THIS based on aspect ratio!
                       // Add border, background etc. here or in CSS
                   }}
             >
                 {/* *** The LottiePlayer component from react-lottie-player *** */}
                 {/* This component renders the animation from the URL */}
                 <LottiePlayer
                      src={LOTTIE_ANIMATION_URL} // Provide the direct URL

                     ref={lottiePlayerRef}      // Attach ref for cleanup (stop/destroy)
                     loop={false}               // Play the animation just once
                     play={true}                // *** IMPORTANT: Auto-play when the component mounts/updates and src/lottie props are present ***
                     speed={1}                  // Playback speed (adjust if the Lottie plays too fast/slow)

                     onComplete={onComplete}    // *** IMPORTANT: This prop tells react-lottie-player to call onComplete when loop={false} animation finishes ***

                     // style={{ width: '100%', height: '100%' }} // Add if Lottie doesn't automatically fill container
                 />
             </motion.div>


             {/* Text is NOT rendered by HighFiveLoader in this simplified version. It will be part of the Hero component now. */}

             {/* Skip Button */}
             {/* Positioned fixed in the Bottom Right corner */}
             <motion.button
                 className={styles.skipButton} // CSS for styling
                 variants={skipButtonVariants} // Variants for fade/slide animation
                 initial="hidden"          // Starts in the "hidden" state from variants
                 animate={skipButtonControls} // Animation is controlled by useAnimation instance
                onClick={onComplete} // When clicked, immediately call parent completion handler to exit loader
             >
                 Skip {/* Button text */}
             </motion.button>


        </motion.div>
    );
};

export default HighFiveLoader;