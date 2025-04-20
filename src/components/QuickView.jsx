// src/components/QuickView.jsx

import React, { useEffect, useRef } from 'react'; // Import useRef for scroll element and overflow ref
import { motion } from 'framer-motion'; // Import motion
// Import needed icons from react-icons. Add more as needed for skills.
import { FaUser, FaCode, FaBriefcase, FaGraduationCap, FaTrophy, FaEnvelope, FaGithub,
    FaLinkedinIn, // Used for LinkedIn icon
    FaPython, FaJs, FaReact, FaNodeJs, // Example skill-specific icons
    FaTools, // Generic icon
    FaDatabase, // Generic database icon
    FaChartBar, // Generic chart/bar icon
    FaTerminal, FaCogs // Added FaCogs for a more general tech/system feel
} from 'react-icons/fa'; // Primarily using Fa icons
// You might need specific icons from other collections if your tech stack is niche
// If BiLogoExpress or BiLogoMongodb *actually* exist and you prefer them, try installing `@react-icons/bi` and importing like this:
// import { BiLogoMongodb, BiLogoExpress } from 'react-icons/bi'; // <-- Import from BI collection


// Correctly import the content object
import { content } from '../data/content';
// Correctly import styles from the CSS Module file
import styles from '../styles/QuickView.module.css';

// --- Component Animation Variants (Entry/Exit for the whole QuickView screen) ---
// These match the variants used in App.jsx for QuickView's transition (contentScreenEntryExitVariants)
const quickViewScreenVariants = {
    initial: { opacity: 0, scale: 0.98, y: 50 }, // Adjusted Y initial for entry from slightly lower
    animate: { // Entry animation
        opacity: 1, y: 0, scale: 1, transition: {
            duration: 0.8, // Duration for the main screen entry animation
            ease: 'easeOut',
            when: 'beforeChildren', // Ensure container appears before staggering its direct children
            staggerChildren: 0.08, // Stagger delay BETWEEN *each direct motion child* (.section, .backButtonContainer)
            // delayChildren: 0.2 // Optional: Delay before the first child's stagger begins
        }
    },
    exit:    { opacity: 0, scale: 0.98, y: -50, transition: { duration: 0.6, ease: 'easeIn' } }, // Exit animation
};

// --- Variants for Staggered Items (Sections and Back Button Container) ---
// Applied to the motion.section and motion.div.backButtonContainer
const sectionItemVariants = {
    initial: { opacity: 0, y: 40 }, // Start faded and lower for sliding-up effect
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } // Animates to visible position
    // Delay is inherited from the parent's staggerChildren
};


// --- Icon Mappings ---
// Map common skill names to react-icons components.
// IMPORTANT: VERIFY THESE ICON NAMES AND WHICH COLLECTION THEY BELONG TO in your installed react-icons version.
const skillIcons = {
    'JavaScript': <FaJs />, 'React.js': <FaReact />, 'Node.js': <FaNodeJs />,
    'Express.js': <FaCogs />, // Using generic Cogs icon from Fa set
    'Python': <FaPython />, 'C/C++': <FaCode />,
    'MongoDB': <FaDatabase />, // Using Database icon from Fa set
    'SQL': <FaDatabase />, 'Power BI': <FaChartBar />, 'Tableau': <FaChartBar />,
    'Git & GitHub': <FaGithub />, 'Google Cloud Platform': <FaTools />, 'Flask': <FaCogs />,
    'HTML & CSS': <FaCode />,
    // Add more skill icon mappings here as needed. Use icons available in your imports.
};

// Map icons to section titles
const sectionTitleIcons = {
    about: <FaUser />, experience: <FaBriefcase />, projects: <FaGithub />, // Using GitHub as a primary place for projects icon
    skills: <FaCode />, education: <FaGraduationCap />, achievements: <FaTrophy />, contact: <FaEnvelope />,
};


// Component to display portfolio content in Quick View mode
// onBack prop is called when the user clicks the Back button
const QuickView = ({ onBack }) => {

    // Ref for the main scrollable container element to scroll it to top on mount
    const scrollContainerRef = useRef(null);
    // Ref to store the body's original overflow style for cleanup
     const originalBodyOverflowRef = useRef(''); // Initialize ref with empty string


    // Destructure data from the content.js named export
    const { about, skills, experience, projects, education, achievements, contact } = content;


    // Effect to handle page scroll behavior: set body overflow, scroll to top, cleanup body overflow
    useEffect(() => {
        const body = document.body;
        // Store the original body overflow style in the ref
        originalBodyOverflowRef.current = body.style.overflow;

        // Set body overflow to hidden to prevent dual scrollbars (assuming QuickView container has 100% height and overflow-y: auto)
         // Only change if it's not already hidden globally (which is the recommended setup)
         if (body.style.overflow !== 'hidden') {
             body.style.overflow = 'hidden';
         }


         // Scroll the QuickView container (this component's root div) to the top when it mounts.
        // Add a slight delay to allow entry animation and staggering to start before scrolling.
        const scrollToTopTimer = setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
         }, 600); // Adjust delay (ms) if content load/stagger takes longer or entry anim is longer

        // Cleanup function for the effect (runs when component unmounts)
        return () => {
            // Restore the body's original overflow style when the QuickView component unmounts
             // We check if the current body overflow is still 'hidden' before potentially restoring,
             // to avoid issues if something else also sets body overflow later.
             // More simply, just restore the saved original value from the ref:
            body.style.overflow = originalBodyOverflowRef.current;

            clearTimeout(scrollToTopTimer); // Clean up the scroll-to-top timer
        };
        // Empty dependency array: runs only once on mount and unmount. Refs (like originalBodyOverflowRef) do not go in deps.
    }, []);


    // Render logic for the QuickView screen content
    return (
    // Root motion.div for the entire QuickView screen. This is the main scrollable container.
    // App.jsx's AnimatePresence handles its mount/unmount animation using `quickViewScreenVariants`.
    <motion.div
        ref={scrollContainerRef} // Attach ref to the scrollable container element
        className={styles.container} // Apply main QuickView layout, padding, and scrolling styles (overflow-y: auto, scrollbar hiding)
        variants={quickViewScreenVariants} // Use screen entry/exit transition variants defined above
        initial="initial"          // Start in the 'initial' state (from variants) on mount (AnimatePresence default initial={false})
        animate="animate"          // Animate to the 'animate' state automatically when mounted
        exit="exit"              // Animate to the 'exit' state when removed by App.jsx state change (triggered by onBack)
        // Scrolling styles like overflow-y: auto are applied via the CSS module class
    >

        {/* --- Portfolio Sections (Rendered in Professional Order) --- */}
        {/* Sections are direct children of the root motion.div container and use sectionItemVariants for stagger animation */}

        {/* Section: About Me */}
        {about && about.trim() && ( // Conditional render check
            <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                <h2>{sectionTitleIcons.about} About Me</h2> {/* Title with icon from mappings */}
                <p>{about}</p>
            </motion.section>
        )}

        {/* Section: Experience & Internships */}
        {experience && Array.isArray(experience) && experience.length > 0 && ( // Conditional render check
            <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                <h2>{sectionTitleIcons.experience} Experience & Internships</h2> {/* Title with icon */}
                {experience.map((exp, i) => (
                    // motion.div for each experience card - subtle entry within section stagger + hover animation
                    <motion.div key={`exp-${i}`} className={styles.card}
                         initial={{ opacity: 0, y: 15 }} // Subtle entry state
                         animate={{ opacity: 1, y: 0 }} // Subtle animate state
                         transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }} // Subtle stagger for cards within section
                         whileHover={{ scale: 1.01, borderColor: 'rgba(0, 224, 255, 0.6)' }} // Scale slightly & border highlight on hover
                    >
                        <h3>{exp.role} — <em>{exp.company}</em></h3>
                        {exp.date && <span className={styles.date}>{exp.date}</span>}
                        {exp.details && Array.isArray(exp.details) && exp.details.length > 0 && (
                            <ul>
                                {exp.details.map((detail, j) => <li key={`exp-${i}-det-${j}`}>{detail}</li>)}
                            </ul>
                        )}
                    </motion.div>
                ))}
            </motion.section>
        )}

        {/* Section: Projects */}
        {projects && Array.isArray(projects) && projects.length > 0 && ( // Conditional render check
            <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                 <h2>{sectionTitleIcons.projects} Projects</h2> {/* Title with icon */}
                 {projects.map((prj, i) => (
                    // motion.div for each project card - subtle entry + hover animation
                    <motion.div key={`prj-${i}`} className={styles.card}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
                        whileHover={{ scale: 1.01, borderColor: 'rgba(0, 224, 255, 0.6)' }}
                    >
                        {/* Project Title line with potential GitHub icon link */}
                        <div className={styles.projectTitleLine}>
                            <h3>{prj.title}</h3>
                             {/* GitHub Icon Link (using motion.a) */}
                             {/* Ensure prj.link is a string and starts with http before rendering */}
                             {prj.link && typeof prj.link === 'string' && prj.link.startsWith('http') && (
                                 <motion.a // Changed from standard <a> to motion.a to accept Framer Motion props
                                    href={prj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                     className={styles.githubIconLink} // Style the icon link
                                     whileHover={{ scale: 1.15, color: '#ffffff' }} // Scale/color on hover
                                     whileTap={{ scale: 0.9 }}
                                     transition={{duration: 0.2}}
                                 >
                                    <FaGithub /> {/* GitHub Icon */}
                                </motion.a>
                             )}
                             {/* Could add live demo link here */}
                        </div>
                        {/* Tech stack used (comma separated) */}
                        {prj.tech && Array.isArray(prj.tech) && prj.tech.length > 0 && (
                           <span className={styles.tech}>{prj.tech.join(', ')}</span>
                        )}
                        {/* Project description */}
                        {prj.description && <p>{prj.description}</p>}
                    </motion.div>
                 ))}
            </motion.section>
        )}

        {/* Section: Skills */}
        {skills && Array.isArray(skills) && skills.length > 0 && ( // Conditional render check
            <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                 <h2>{sectionTitleIcons.skills} Skills</h2> {/* Title with icon */}
                 {/* Skills list container with flex wrap for skill items */}
                 <div className={styles.skillsListContainer}>
                     {/* Map through skills array - each skill item (icon+text) is a motion div */}
                     {skills.map((skill, i) => (
                         <motion.div key={`skill-${i}`} className={styles.skillItem} // motion.div for the skill item (pill shape)
                            initial={{ opacity: 0, y: 15 }} // Subtle entry animation
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.02 }} // Faster stagger
                            whileHover={{ scale: 1.05 }} // Scale on hover
                            whileTap={{ scale: 0.95 }} // Shrink on tap
                         >
                            {/* Skill Icon (conditionally rendered if mapped) */}
                             {skillIcons[skill] && (
                                 <span className={styles.skillIcon}>{skillIcons[skill]}</span> // Icon container/style
                             )}
                             {/* Skill Name Text */}
                             <span className={styles.skillName}>{skill}</span>
                         </motion.div>
                     ))}
                 </div> {/* Closing skillsListContainer */}
             </motion.section>
         )}

        {/* Section: Education */}
        {education && Array.isArray(education) && education.length > 0 && ( // Conditional render check
             <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                 <h2>{sectionTitleIcons.education} Education</h2> {/* Title with icon */}
                 {education.map((ed, i) => (
                     // motion.div for each education card - subtle entry + hover animation
                     <motion.div key={`edu-${i}`} className={styles.card}
                         initial={{ opacity: 0, y: 15 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
                         whileHover={{ scale: 1.01, borderColor: 'rgba(0, 224, 255, 0.6)' }}
                     >
                         {/* Education Details & Logo - flexbox container */}
                         <div className={styles.educationCardContent}>
                             <div className={styles.educationText}> {/* Text content wrapper */}
                                 <h3>{ed.degree}</h3>
                                 {ed.institution && <span className={styles.text}>{ed.institution}</span>}
                                 {ed.duration && <span className={styles.date}>{ed.duration}</span>}
                             </div>
                              {/* Education Logo Container & Image (conditionally rendered) */}
                              {/* Ensure ed.logo exists, is a string, and not empty/whitespace */ }
                              {ed.logo && typeof ed.logo === 'string' && ed.logo.trim() && (
                                 // motion.div for the logo container with its own animation
                                 <motion.div
                                    className={styles.educationLogoContainer} // Styles for size/shape/border etc.
                                    initial={{ opacity: 0, scale: 0.8 }} // Entry animation for logo
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                                     whileHover={{ scale: 1.05 }} // Subtle scale up on hover
                                 >
                                    {/* Image tag for the logo */}
                                     <img src={ed.logo} alt={`${ed.institution} logo`} className={styles.educationLogoImg} />
                                 </motion.div>
                              )}
                         </div> {/* Closing educationCardContent */}
                     </motion.div>
                 ))}
             </motion.section>
         )}


        {/* Section: Achievements */}
        {achievements && Array.isArray(achievements) && achievements.length > 0 && ( // Conditional render check
            <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                 <h2>{sectionTitleIcons.achievements} Achievements</h2>
                 {/* List of achievements */}
                <ul>
                     {achievements.map((ach, i) => (
                         <li key={`ach-${i}`}>{ach}</li> // Standard list items
                     ))}
                 </ul>
            </motion.section>
         )}


        {/* Section: Contact */}
        {contact && (contact.linkedIn || contact.github || contact.email) && ( // Conditional render check
            <motion.section className={styles.section} variants={sectionItemVariants}> {/* Apply section stagger animation */}
                <h2>{sectionTitleIcons.contact} Contact</h2> {/* Title with icon */}
                {/* List of contact links with icons - use a flex container for list items too */}
                <ul className={styles.contactList}> {/* Class for contact list layout/styling */}
                    {/* LinkedIn link with icon (conditionally rendered) */}
                    {contact.linkedIn && typeof contact.linkedIn === 'string' && contact.linkedIn.startsWith('http') && (
                        // motion.li for subtle stagger entry of each link item
                        <motion.li key="contact-li" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}>
                           <motion.a // Use motion.a for link animations/hover/tap
                              href={contact.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                               className={styles.contactLink} // Styles the link area/icon+text layout and default color
                               whileHover={{ color: '#ffffff', x: 5 }} // Change color and slide right on hover
                           >
                              <span className={styles.contactIcon}><FaLinkedinIn /></span>{/* LinkedIn Icon */}
                              <span className={styles.contactText}>LinkedIn</span>{/* Link text label */}
                           </motion.a>
                        </motion.li>
                    )}
                    {/* GitHub link with icon (conditionally rendered) */}
                    {contact.github && typeof contact.github === 'string' && contact.github.startsWith('http') && (
                        <motion.li key="contact-gh" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}>
                           <motion.a // Use motion.a
                              href={contact.github}
                              target="_blank"
                              rel="noopener noreferrer"
                               className={styles.contactLink}
                               whileHover={{ color: '#ffffff', x: 5 }}
                           >
                              <span className={styles.contactIcon}><FaGithub /></span>{/* GitHub Icon */}
                              <span className={styles.contactText}>GitHub</span>{/* Link text label */}
                           </motion.a>
                        </motion.li>
                    )}
                    {/* Email link with icon (conditionally rendered) */}
                    {contact.email && typeof contact.email === 'string' && contact.email.includes('@') && (
                         <motion.li key="contact-mail" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}>
                            <a // A standard <a> is fine here if no hover/tap animations are needed, otherwise use motion.a
                                href={`mailto:${contact.email}`}
                                className={styles.contactLink} // Apply style
                               // Add whileHover/whileTap if using motion.a
                                // whileHover={{ color: '#ffffff', x: 5 }}
                            >
                                <span className={styles.contactIcon}><FaEnvelope /></span>{/* Email Icon */}
                                <span className={styles.contactText}>Email</span>{/* Link text label */}
                            </a>
                         </motion.li>
                    )}
                     {/* Add other contact links here with icons */}
                 </ul>
            </motion.section>
        )}


        {/* Back Button Container - Fixed position at the bottom */ }
        {/* This motion.div contains the button and is included as the last item in the main stagger sequence */}
        <motion.div className={styles.backButtonContainer} variants={sectionItemVariants}>
            {/* The Back button element itself. Add hover/tap animations. */}
            {/* Use motion.button for animations */}
            <motion.button
                className={styles.backButton} // Apply button styles
                onClick={onBack} // Call parent prop to go back
                 whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 224, 255, 0.15)', borderColor: '#00e0ff', color: '#00e0ff', boxShadow: '0 0 18px rgba(0, 224, 255, 0.7)' }} // Hover animation
                 whileTap={{ scale: 0.95 }} // Tap animation
            >
                Back {/* Button text */}
            </motion.button>
         </motion.div>


    </motion.div> // Closing tag for the root motion.div container (.container)
  );
};

export default QuickView; // Export the QuickView component