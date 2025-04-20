import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Introduction.module.css'; // Import CSS module

const Introduction = ({ name, tagline, onComplete }) => {
    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8, // Duration for the whole block to appear
                ease: "easeOut",
                when: "beforeChildren", // Animate container before its children
                staggerChildren: 0.3 // Delay between name and tagline appearance
            }
        }
    };

    // Animation variants for individual text lines (name and tagline)
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    useEffect(() => {
        // Delay before calling onComplete to allow user to read
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // Display for 3 seconds

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className={styles.introductionContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={textVariants} className={styles.name}>{name}</motion.h1>
            <motion.p variants={textVariants} className={styles.tagline}>{tagline}</motion.p>
        </motion.div>
    );
};

export default Introduction;