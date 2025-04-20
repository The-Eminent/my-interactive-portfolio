// src/components/Hero.jsx

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Hero.module.css';

// Photo + text animation variants
const mainPhotoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
  visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const mainTextFadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};
const mainButtonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// Rotating tagline variants
const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

// Component to cycle through an array of strings
const AnimatedText = ({ items, interval = 3000 }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={items[idx]}
        variants={titleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.animatedTitle}
      >
        {items[idx]}
      </motion.div>
    </AnimatePresence>
  );
};

// Dual‐mode Hero: Quick View vs Vibe Mode
const Hero = ({ name, tagline, onQuickViewClick, onVibeModeClick }) => {
  const controls = useAnimation();

  // animate in main content
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const rotatingTaglines = [
    "Full Stack Developer",
    "CS Grad Student @ CSUF",
    "Open-Source Enthusiast",
    "Tinkering with Models & Metrics",
    "Creative Problem Solver",
    "Let’s build something together."
  ];

  return (
    <motion.div key="hero-screen" className={styles.heroContainer}>
      <motion.div
        className={styles.mainHeroContentContainer}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.1, delayChildren: 0.3 } }
        }}
        initial="hidden"
        animate={controls}
      >
        {/* Photo */}
        <motion.div
          className={styles.photoContainer}
          variants={mainPhotoVariants}
          initial="hidden"
          animate={controls}
          style={{ width: 200, height: 200 }}
        >
          <img src="/your-photo.jpg" alt={name} className={styles.profilePhoto} />
        </motion.div>

        {/* Name + Taglines */}
        <div className={styles.textContainer}>
          <motion.h1
            className={styles.name}
            variants={mainTextFadeVariants}
            initial="hidden"
            animate={controls}
            transition={{ ...mainTextFadeVariants.visible.transition, delay: 0.5 }}
          >
            {name}
          </motion.h1>
          <motion.p
            className={styles.tagline}
            variants={mainTextFadeVariants}
            initial="hidden"
            animate={controls}
            transition={{ ...mainTextFadeVariants.visible.transition, delay: 0.7 }}
          >
            {tagline}
          </motion.p>

          {/* rotating lines */}
          <div className={styles.animatedTitles}>
            <AnimatedText items={rotatingTaglines} interval={2500} />
          </div>
        </div>

        {/* Mode Toggles */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
          <motion.button
            className={styles.exploreButton}
            variants={mainButtonVariants}
            initial="hidden"
            animate={controls}
            transition={{ ...mainButtonVariants.visible.transition, delay: 1.2 }}
            onClick={onQuickViewClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quick View
          </motion.button>
          <motion.button
            className={styles.exploreButton}
            variants={mainButtonVariants}
            initial="hidden"
            animate={controls}
            transition={{ ...mainButtonVariants.visible.transition, delay: 1.4 }}
            onClick={onVibeModeClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Vibe Mode
          </motion.button>
        </div>

        {/* Social icons footer */}
        <div className={styles.socialIcons} style={{ marginTop: '2rem' }}>
          <a href="https://www.linkedin.com/in/kuldeepsinghrathore07/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaLinkedin />
          </a>
          <a href="https://github.com/The-Eminent" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaGithub />
          </a>
          <a href="mailto:kuldeepsingh@csu.fullerton.edu" className={styles.socialIcon}>
            <FaEnvelope />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
