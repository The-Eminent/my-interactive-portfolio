// src/components/Loader.jsx

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Lottie from 'react-lottie-player';
import styles from '../styles/Loader.module.css';
import fistAnimationData from '../assets/fist.json';

const Loader = ({ onComplete }) => {
  const skipButtonControls = useAnimation();
  const [showIntroText, setShowIntroText] = useState(false);

  // Timings in milliseconds
  const INTRO_DELAY_MS     = 2000;  // when fists collide
  const INTRO_DURATION_MS  = 1200;  // how long text stays up
  const LOTTIE_DURATION_MS = 5100;  // total length of your fist animation

  // Bounce‑in for “Let’s dive in.”
  const introTextVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: [1.2, 0.9, 1],
      y: [0, -10, 0],
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Fade‑in for Skip button
  const skipButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  useEffect(() => {
    // Show the "Let's dive in" text at the collision time
    const introTimer = setTimeout(() => setShowIntroText(true), INTRO_DELAY_MS);
    const hideTimer  = setTimeout(() => setShowIntroText(false), INTRO_DELAY_MS + INTRO_DURATION_MS);

    // Immediately reveal the Skip button
    skipButtonControls.start('visible');

    return () => {
      clearTimeout(introTimer);
      clearTimeout(hideTimer);
    };
  }, [skipButtonControls]);

  return (
    <motion.div
      className={styles.loaderContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
    >
      {/* Centered 250×250 box containing both Lottie and the intro text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '250px'
        }}
      >
        {/* Pop-in text, positioned relative to this 250×250 box */}
        {showIntroText && (
          <motion.div
            variants={introTextVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'absolute',
              bottom: '70%',      // tweak this % until it sits exactly above the knuckles
              left: '28%',
              transform: 'translateX(-50%)',
              color: '#00e0ff',
              fontSize: '1.25rem',
              textShadow: '0 0 8px rgba(0, 224, 255, 0.6)',
              pointerEvents: 'none'
            }}
          >
            Let’s dive in!
          </motion.div>
        )}

        {/* Your fist‑bump Lottie */}
        <Lottie
          animationData={fistAnimationData}
          play
          loop={false}
          speed={2}
          onComplete={onComplete}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Skip button in the bottom‑right of the loader */}
      <motion.button
        className={styles.skipButton}
        variants={skipButtonVariants}
        initial="hidden"
        animate={skipButtonControls}
        onClick={onComplete}
      >
        Skip
      </motion.button>
    </motion.div>
  );
};

export default Loader;
