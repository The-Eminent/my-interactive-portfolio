// src/components/Hero.jsx

import React, { useEffect, useState } from 'react';
import { motion as Motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { content } from '../data/content';
import styles from '../styles/Hero.module.css';

const mainPhotoVariants = {
  hidden: { opacity: 0, scale: 0.85, rotateY: 75 },
  visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const mainTextFadeVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } }
};
const mainButtonVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

const titleVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease: 'easeIn' } }
};

const AnimatedText = ({ items, interval = 2600 }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Motion.div
        key={items[idx]}
        variants={titleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.animatedTitle}
      >
        {items[idx]}
      </Motion.div>
    </AnimatePresence>
  );
};

const Hero = ({ name, tagline, onQuickViewClick }) => {
  const controls = useAnimation();
  const socialLinks = {
    linkedIn: content.contact.linkedIn,
    github: 'https://github.com/The-Eminent',
    email: `mailto:${content.contact.email}`,
    resume: content.contact.resume
  };

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const rotatingTaglines = content.rotatingTaglines || [];

  return (
    <Motion.div key="hero-screen" className={styles.heroRoot}>
      <Motion.div
        className={styles.heroInner}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
        }}
        initial="hidden"
        animate={controls}
      >
        <Motion.div
          className={styles.photoContainer}
          variants={mainPhotoVariants}
          initial="hidden"
          animate={controls}
        >
          <img
            src="/your-photo.jpg"
            alt={`Profile photo of ${name}`}
            className={styles.profilePhoto}
          />
        </Motion.div>

        <div className={styles.textBlock}>
          <Motion.h1
            className={styles.name}
            variants={mainTextFadeVariants}
            initial="hidden"
            animate={controls}
          >
            {name}
          </Motion.h1>
          <Motion.p
            className={styles.tagline}
            variants={mainTextFadeVariants}
            initial="hidden"
            animate={controls}
            transition={{ ...mainTextFadeVariants.visible.transition, delay: 0.08 }}
          >
            {tagline}
          </Motion.p>

          <div className={styles.animatedTitles}>
            <AnimatedText items={rotatingTaglines} interval={2500} />
          </div>
        </div>

        <Motion.div
          className={styles.primaryActions}
          variants={mainButtonVariants}
          initial="hidden"
          animate={controls}
          transition={{ ...mainButtonVariants.visible.transition, delay: 0.35 }}
        >
          <button type="button" className={styles.ctaPrimary} onClick={onQuickViewClick}>
            Explore portfolio
            <FaArrowRight className={styles.ctaIcon} aria-hidden />
          </button>
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            Resume
          </a>
        </Motion.div>

        <Motion.div
          className={styles.socialIcons}
          variants={mainButtonVariants}
          initial="hidden"
          animate={controls}
          transition={{ ...mainButtonVariants.visible.transition, delay: 0.45 }}
        >
          <a href={socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={socialLinks.email} className={styles.socialIcon} aria-label="Email">
            <FaEnvelope />
          </a>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
};

export default Hero;
