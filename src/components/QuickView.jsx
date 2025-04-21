// src/components/QuickView.jsx
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FaUser,
  FaBriefcase,
  FaGithub,
  FaCode,
  FaGraduationCap,
  FaTrophy,
  FaEnvelope,
  FaLinkedinIn,
  FaChartBar
} from 'react-icons/fa'
import { content } from '../data/content'
import styles from '../styles/QuickView.module.css'

// SCREEN ENTRY / EXIT VARIANTS
const screenVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.08 }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.5, ease: 'easeIn' }
  }
}

// STAGGERED ITEM VARIANTS
const itemVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// QUICK HOVER TRANSITION
const hoverTransition = { type: 'tween', duration: 0.15, ease: 'easeInOut' }

// ICON MAPS
const deviconClassMap = {
  'JavaScript': 'devicon-javascript-plain colored',
  'React.js': 'devicon-react-original colored',
  'Node.js': 'devicon-nodejs-plain colored',
  'Express.js': 'devicon-express-original colored',
  'Python': 'devicon-python-plain colored',
  'C': 'devicon-c-plain colored',
  'C++': 'devicon-cplusplus-plain colored',
  'MongoDB': 'devicon-mongodb-plain colored',
  'SQL': 'devicon-postgresql-plain colored',
  'Git': 'devicon-git-plain colored',
  'Github': 'devicon-github-original',
  'GCP': 'devicon-googlecloud-plain colored',
  'Flask': 'devicon-flask-original',
  'HTML': 'devicon-html5-plain colored',
  'CSS': 'devicon-css3-plain colored'
}
const fallbackIcons = {
  'Power BI': <FaChartBar className={styles.iconFallback} />,
  'Tableau': <FaChartBar className={styles.iconFallback} />
}
const sectionIcons = {
  about: <FaUser />,
  experience: <FaBriefcase />,
  projects: <FaGithub />,
  skills: <FaCode />,
  education: <FaGraduationCap />,
  achievements: <FaTrophy />,
  contact: <FaEnvelope />
}

export default function QuickView({ onBack }) {
  const scrollRef = useRef(null)
  const origOverflow = useRef(document.body.style.overflow)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
    return () => {
      document.body.style.overflow = origOverflow.current
      clearTimeout(t)
    }
  }, [])

  const { about, skills, experience, projects, education, achievements, contact } = content

  return (
    <motion.div
      ref={scrollRef}
      className={styles.container}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >

      {/* About */}
      {about && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>{sectionIcons.about} About Me</h2>
          <p>{about}</p>
        </motion.section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>{sectionIcons.experience} Experience & Internships</h2>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, ease: 'easeOut', duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 20px rgba(0,224,255,0.2)',
                transition: hoverTransition
              }}
              viewport={{ once: true }}
            >
              <h3>
                {exp.role} — <em>{exp.company}</em>
              </h3>
              {exp.date && <span className={styles.date}>{exp.date}</span>}
              <ul>
                {exp.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2>{sectionIcons.projects} Projects</h2>
          {projects.map((prj, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, ease: 'easeOut', duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 20px rgba(0,224,255,0.2)',
                transition: hoverTransition
              }}
              viewport={{ once: true }}
            >
              <div className={styles.projectTitleLine}>
                <h3>{prj.title}</h3>
                {prj.link && (
                  <motion.a
                    href={prj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubIconLink}
                    whileHover={{
                      scale: 1.15,
                      color: '#fff',
                      transition: hoverTransition
                    }}
                  >
                    <FaGithub />
                  </motion.a>
                )}
              </div>
              {prj.tech && <span className={styles.tech}>{prj.tech.join(', ')}</span>}
              <p>{prj.description}</p>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2>{sectionIcons.skills} Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                className={styles.skillTile}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, ease: 'easeOut', duration: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  transition: hoverTransition
                }}
                viewport={{ once: true }}
              >
                {deviconClassMap[skill] ? (
                  <i className={deviconClassMap[skill]} aria-label={skill} />
                ) : (
                  fallbackIcons[skill] || <FaCode className={styles.iconFallback} />
                )}
                <div className={styles.skillLabel}>{skill}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2>{sectionIcons.education} Education</h2>
          {education.map((ed, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, ease: 'easeOut', duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 20px rgba(0,224,255,0.2)',
                transition: hoverTransition
              }}
              viewport={{ once: true }}
            >
              <div className={styles.educationCardContent}>
                <div className={styles.educationText}>
                  <h3>{ed.degree}</h3>
                  <span className={styles.text}>{ed.institution}</span>
                  <span className={styles.date}>{ed.duration}</span>
                </div>
                <motion.div
                  className={styles.educationLogoContainer}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 6px 16px rgba(0,224,255,0.2)',
                    transition: hoverTransition
                  }}
                >
                  <img
                    src={ed.logo}
                    alt={`${ed.institution} logo`}
                    className={styles.educationLogoImg}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2>{sectionIcons.achievements} Achievements</h2>
          <ul>
            {achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Contact */}
      {(contact.linkedIn || contact.github || contact.email) && (
        <motion.section
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2>{sectionIcons.contact} Contact</h2>
          <ul className={styles.contactList}>
            {contact.linkedIn && (
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={contact.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  whileHover={{
                    color: '#fff',
                    x: 5,
                    transition: hoverTransition
                  }}
                >
                  <FaLinkedinIn className={styles.contactIcon} />
                  <span className={styles.contactText}>LinkedIn</span>
                </motion.a>
              </motion.li>
            )}
            {contact.github && (
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  whileHover={{
                    color: '#fff',
                    x: 5,
                    transition: hoverTransition
                  }}
                >
                  <FaGithub className={styles.contactIcon} />
                  <span className={styles.contactText}>GitHub</span>
                </motion.a>
              </motion.li>
            )}
            {contact.email && (
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={`mailto:${contact.email}`}
                  className={styles.contactLink}
                  whileHover={{
                    color: '#fff',
                    x: 5,
                    transition: hoverTransition
                  }}
                >
                  <FaEnvelope className={styles.contactIcon} />
                  <span className={styles.contactText}>Email</span>
                </motion.a>
              </motion.li>
            )}
          </ul>
        </motion.section>
      )}

      {/* Back Button */}
      <motion.div className={styles.backButtonContainer} variants={itemVariants}>
        <motion.button
          className={styles.backButton}
          onClick={onBack}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 8px 20px rgba(0,224,255,0.2)',
            transition: hoverTransition
          }}
        >
          Back
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
