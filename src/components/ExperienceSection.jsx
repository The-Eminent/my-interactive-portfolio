import React from 'react';
import { motion } from 'framer-motion';

// Placeholder for the Experience section
const ExperienceSection = ({ onBack }) => {
    return (
        <motion.div>
             <h2>Experience Section</h2> {/* Placeholder */}
             <button onClick={onBack}>Back</button>
        </motion.div>
    );
};

export default ExperienceSection;