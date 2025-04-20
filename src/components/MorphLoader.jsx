import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '../styles/MorphLoader.module.css'; // Make sure this path is correct

const MorphLoader = ({ onComplete }) => {
    const textLines = [
        "So… portfolio tour",
        "or just here for the vibes?"
    ];

    const shapeControls = useAnimation();
    const textControls = useAnimation();
    const skipButtonControls = useAnimation();

    // --- Animation Timings (in seconds) ---
    const initialDropDuration = 0.6; // Time for ball to drop/appear
    const squishDuration = 0.3;      // Time for squish/bounce
    const bounceHeight = 0.1;       // How much it "bounces" up before settling (as a factor of its height)
    const morphDuration = 0.8;       // Time for ball to expand and morph
    const morphDelayAfterBounce = 0.1; // Short pause before morph begins

    const textRevealDuration = 0.5;  // Time for text to fade in
    const textRevealDelay = 0.3;     // Delay after morph completes before text starts fading in

    const holdDuration = 1.5;        // Time to display the full message before transitioning

    const skipButtonDelay = initialDropDuration + squishDuration + morphDuration + textRevealDelay + textRevealDuration + 0.5; // Appear shortly after text is fully visible


    // Define the target size/scale for the shape after morphing, relative to its initial size
    // This is a visual tuning based on how large the text container will be.
    // You might need to adjust these scales based on your text styles and container padding.
    const targetScaleX = 5; // Example: morph shape becomes 5x wider
    const targetScaleY = 3; // Example: morph shape becomes 3x taller
    const targetBorderRadius = '15px'; // Example: final rounded rectangle border-radius

    // Calculate rough total sequence duration (excluding the final fade out which is via AnimatePresence)
    const totalSequenceTimeBeforeComplete =
        initialDropDuration +
        squishDuration +
        morphDelayAfterBounce +
        morphDuration +
        textRevealDelay +
        textRevealDuration +
        holdDuration;


    // --- Animation Definitions (Variants for Text) ---
    // Using simple fade/scale for the entire text block
    const textVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: textRevealDuration, ease: "easeOut" } }
    };

     // Skip button variants
    const skipButtonVariants = {
         hidden: { opacity: 0, y: 20 },
         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: skipButtonDelay } }
     }


    // --- Orchestration with useEffect and useAnimation ---
    useEffect(() => {
        const morphSequence = async () => {
            // Phase 0: Initial state
            // The shape starts high up/off-screen, text and button are hidden (handled by initial prop/set)
             await textControls.set("hidden"); // Ensure text is hidden initially
             await skipButtonControls.set("hidden"); // Ensure skip button is hidden

            // Phase 1: Ball Drop and Squish
             // Assuming initial position (handled by initial prop) is top and scale 1
            await shapeControls.start({
                y: 0, // Animate down to its intended landing position (y=0 relative to initial top/transform)
                transition: { duration: initialDropDuration, ease: 'easeOut' }
            });

            // Squish & Bounce (Quick sequence after landing)
             await shapeControls.start({ // Squish down (scaleY < 1), expand slightly (scaleX > 1)
                scaleY: 0.8,
                scaleX: 1.1,
                transition: { duration: squishDuration / 2, ease: 'easeOut' }
            });

             await shapeControls.start({ // Bounce back up slightly, less squish
                y: -1 * bounceHeight * (100 * targetScaleY), // Bounce up relative to initial shape height scaled up (needs testing!)
                 scaleY: 1.1,
                 scaleX: 0.95,
                 transition: { duration: squishDuration / 2, ease: 'easeIn' }
             });

             await shapeControls.start({ // Return to original position/scale before morph
                 y: 0,
                 scaleY: 1,
                 scaleX: 1,
                 transition: { duration: squishDuration / 2, ease: 'easeOut' }
             });

            // Phase 2: Pause before Morph and Trigger Skip Button Appearance
             await new Promise(resolve => setTimeout(resolve, morphDelayAfterBounce * 1000));

             // Trigger skip button reveal here so it's visible during morph/text
             skipButtonControls.start("visible");


            // Phase 3: Morphing Animation (Expand and change border radius)
             await shapeControls.start({
                 scaleX: targetScaleX,
                 scaleY: targetScaleY,
                 borderRadius: targetBorderRadius, // Animate to a rounded corner value
                transition: { duration: morphDuration, ease: 'easeInOut' }
            });


            // Phase 4: Text Reveal after Morphing
             await new Promise(resolve => setTimeout(resolve, textRevealDelay * 1000));
            textControls.start("visible"); // Trigger text animation


            // Phase 5: Hold and Trigger Completion
            const finalHoldTimer = setTimeout(() => {
                // Signal parent to hide loader (via AnimatePresence exit)
                onComplete();
            }, holdDuration * 1000);


            // --- Cleanup ---
            // This cleans up the final timer if the component is unmounted before the timer fires
             return () => {
                clearTimeout(finalHoldTimer);
                // Note: Framer Motion handles stopping its animations on unmount automatically
            };

        }; // End morphSequence async function

        // Start the animation sequence on component mount
        morphSequence();

         // Cleanup function returned by useEffect
        return () => {
            // This cleanup mainly ensures any timers/async operations started in this effect
            // don't try to do things after the component is gone. The finalHoldTimer cleanup above
            // is more specific to the sequence ending, this one is for unexpected unmounts.
            // If we were using Lottie, cleanup like stop() or destroy() would go here with null checks.
        };


    }, [onComplete, shapeControls, textControls, skipButtonControls, // Dependencies
        initialDropDuration, squishDuration, bounceHeight, morphDuration, // Timing dependencies
        morphDelayAfterBounce, textRevealDuration, textRevealDelay, // Timing dependencies
        holdDuration, targetScaleX, targetScaleY, targetBorderRadius, skipButtonDelay]); // Value dependencies


    // --- Render Logic ---
    return (
        // Overall loader container, covers the screen
        // This div is controlled by App.jsx's AnimatePresence and its exit prop
        <motion.div
            className={styles.loaderContainer}
            // Initial state (visible), Exit state (fade out controlled by parent's AnimatePresence)
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
        >

            {/* Morphing Shape - Initially a ball, animates position, scale, border-radius */}
            {/* Positioned in the center initially for simplicity before the drop simulation via Y animation */}
             <motion.div
                className={styles.morphShape}
                initial={{ y: -200, scale: 1, borderRadius: '50%', opacity: 1 }} // Start slightly off-screen top, as a circle, fully opaque
                animate={shapeControls} // Framer Motion controls 'y', 'scale', 'borderRadius', 'opacity'
                 // Base position centered. Y animation adds offset from this base.
                style={{
                     position: 'absolute', // Needed for y animation
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)', // Keep it centered horizontally
                }}
             ></motion.div>


            {/* Greeting Text Container - Appears over the morphed shape */}
            {/* Its visibility (opacity/scale) is controlled by textControls */}
            {/* It needs to be visually centered where the morphing shape ends up */}
             <motion.div
                 className={styles.greetingTextContainer}
                 variants={textVariants} // Apply defined fade/scale variants
                 initial="hidden" // Starts in the hidden state
                 animate={textControls} // This will receive "visible" state command from useEffect
             >
                 {/* Text lines inside. Styles handled by CSS. */}
                 <p className={styles.greetingLine}>{textLines[0]}</p>
                 <p className={styles.greetingLine}>{textLines[1]}</p>
             </motion.div>

             {/* Skip Button */}
             <motion.button
                className={styles.skipButton}
                variants={skipButtonVariants}
                 initial="hidden"
                 animate={skipButtonControls}
                onClick={onComplete} // Call the parent's completion handler
             >
                Skip
             </motion.button>


        </motion.div>
    );
};

export default MorphLoader;