// src/components/Loader.jsx

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion as Motion, useAnimation, useReducedMotion } from 'framer-motion';
import Lottie from 'react-lottie-player';
import styles from '../styles/Loader.module.css';
import fistAnimationData from '../assets/fist.json';

const Loader = ({ onComplete }) => {
  const skipButtonControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const [showIntroText, setShowIntroText] = useState(false);
  const hasCompletedRef = useRef(false);

  const INTRO_DELAY_MS = 1300;
  const INTRO_DURATION_MS = 800;

  const completeOnce = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onComplete();
  }, [onComplete]);

  const introTextVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: [1.2, 0.9, 1],
      y: [0, -10, 0],
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const skipButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  useEffect(() => {
    let introTimer;
    let hideTimer;
    let reduceMotionTimer;

    if (prefersReducedMotion) {
      reduceMotionTimer = setTimeout(completeOnce, 900);
    } else {
      introTimer = setTimeout(() => setShowIntroText(true), INTRO_DELAY_MS);
      hideTimer = setTimeout(() => setShowIntroText(false), INTRO_DELAY_MS + INTRO_DURATION_MS);
    }

    skipButtonControls.start('visible');

    return () => {
      if (introTimer) clearTimeout(introTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (reduceMotionTimer) clearTimeout(reduceMotionTimer);
    };
  }, [INTRO_DELAY_MS, INTRO_DURATION_MS, completeOnce, prefersReducedMotion, skipButtonControls]);

  return (
    <Motion.div
      className={styles.loaderContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
    >
      <div
        className={styles.lottieStage}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '250px'
        }}
      >
        <Lottie
          animationData={fistAnimationData}
          play={!prefersReducedMotion}
          loop={false}
          speed={3}
          onComplete={prefersReducedMotion ? undefined : completeOnce}
          style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
        />

        {showIntroText && !prefersReducedMotion && (
          <Motion.div
            variants={introTextVariants}
            initial="hidden"
            animate="visible"
            className={styles.introText}
          >
            Let’s dive in!
          </Motion.div>
        )}
      </div>

      <Motion.button
        className={styles.skipButton}
        variants={skipButtonVariants}
        initial="hidden"
        animate={skipButtonControls}
        onClick={completeOnce}
      >
        Skip
      </Motion.button>
    </Motion.div>
  );
};

export default Loader;
