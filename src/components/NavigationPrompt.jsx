import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/NavigationPrompt.module.css'; // Import CSS module

const NavigationPrompt = ({ options, onSelectOption }) => {

    // Variants for the overall list of options
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Delay between each option appearing
            }
        }
    };

    // Variants for each individual option item
    const itemVariants = {
        hidden: { opacity: 0, x: -20 }, // Start left and invisible
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } // Slide in and fade
    };

    return (
        <motion.div
            className={styles.promptContainer}
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            <h2 className={styles.question}>What would you like to know?</h2>
            <div className={styles.optionsList}>
                {options.map((option) => (
                    <motion.button
                        key={option.id}
                        className={styles.optionButton}
                        variants={itemVariants} // Apply item animation variants
                        onClick={() => onSelectOption(option.id)} // Call parent function with selected state ID
                        whileHover={{ scale: 1.05, color: '#00e0ff' }} // Slightly grow and change color on hover
                        whileTap={{ scale: 0.95 }} // Shrink slightly when clicked
                    >
                        <span className={styles.commandPrefix}>{'>'}</span> {option.command}
                    </motion.button>
                ))}
            </div>
             {/* Optional: Add contact info here or link to contact */}
             <motion.p
                 className={styles.contactHint}
                 variants={itemVariants} // Can use the same variants or different ones
             >
                (Click an option above or use 'get in touch')
             </motion.p>
        </motion.div>
    );
};

export default NavigationPrompt;