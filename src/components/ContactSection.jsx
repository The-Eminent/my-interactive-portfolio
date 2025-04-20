import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = ({ onBack }) => {
    return (
        <motion.div>
             <h2>Contact Section</h2>
             <button onClick={onBack}>Back</button>
        </motion.div>
    );
};
export default ContactSection;