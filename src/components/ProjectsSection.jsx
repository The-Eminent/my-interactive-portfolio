import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = ({ onBack }) => {
    return (
        <motion.div>
             <h2>Projects Section</h2>
             <button onClick={onBack}>Back</button>
        </motion.div>
    );
};
export default ProjectsSection;