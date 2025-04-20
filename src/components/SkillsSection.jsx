import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = ({ onBack }) => {
    return (
        <motion.div>
             <h2>Skills Section</h2>
             <button onClick={onBack}>Back</button>
        </motion.div>
    );
};
export default SkillsSection;