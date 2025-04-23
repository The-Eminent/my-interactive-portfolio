// src/components/QuickView.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaBriefcase, FaGithub, FaCode, FaGraduationCap, FaTrophy,
  FaEnvelope, FaLinkedinIn, FaChartBar, FaCertificate, FaBars, FaTimes
} from 'react-icons/fa';
import { content } from '../data/content';
import styles from '../styles/QuickView.module.css';

/* ----- animation variants ----- */
const screenVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: 'easeIn' } }
};
const itemVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const hoverTransition = { type: 'tween', duration: 0.15, ease: 'easeInOut' };

/* ----- icon maps ----- */
const deviconClassMap = {
  JavaScript: 'devicon-javascript-plain colored',
  'React.js': 'devicon-react-original colored',
  'Node.js': 'devicon-nodejs-plain colored',
  'Express.js': 'devicon-express-original colored',
  Python: 'devicon-python-plain colored',
  C: 'devicon-c-plain colored',
  'C++': 'devicon-cplusplus-plain colored',
  MongoDB: 'devicon-mongodb-plain colored',
  SQL: 'devicon-azuresqldatabase-plain',
  Git: 'devicon-git-plain colored',
  Github: 'devicon-github-original',
  GCP: 'devicon-googlecloud-plain colored',
  Flask: 'devicon-flask-original',
  HTML: 'devicon-html5-plain colored',
  CSS: 'devicon-css3-plain colored',
  Cassandra: 'devicon-cassandra-plain',
  'Github Actions': 'devicon-githubactions-plain',
  RStudio: 'devicon-rstudio-plain',
  R: 'devicon-r-plain',
  Tailwind: 'devicon-tailwindcss-original',
  Docker: 'devicon-docker-plain',
  Kubernetes: 'devicon-kubernetes-plain',


};
const fallbackIcons = { 'Power BI': <FaChartBar className={styles.iconFallback} />, Tableau: <FaChartBar className={styles.iconFallback} /> };

const iconImg = (src) => (
  <img src={src} alt="" style={{ width: '1.4em', height: '1.4em' }} />
);
const sectionIcons = {
  about: <FaUser />, experience: <FaBriefcase />, projects: <FaGithub />, skills: <FaCode />, education: <FaGraduationCap />, certifications: iconImg('cert.svg'), achievements: <FaTrophy />, interests: iconImg('beyond.svg'), contact: <FaEnvelope />
};

const interestIconMap = {};

export default function QuickView({ onBack }) {
  const scrollRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [showAllCerts, setShowAllCerts] = useState(false);

  /* --------- wheel proxy + scroll‑spy ---------- */
  useEffect(() => {
    const t = setTimeout(() => { scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }, 600);
    const wheel = e => { if (scrollRef.current) { e.preventDefault(); scrollRef.current.scrollBy({ top: e.deltaY }); } };
    window.addEventListener('wheel', wheel, { passive: false });

    /* scroll‑spy at 60 % visibility */
    const ids = ['about', 'experience', 'projects', 'skills', 'education', 'certifications', 'achievements', 'interests', 'contact'];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && setActive(e.target.id));
    }, { root: scrollRef.current, threshold: 0.6 });
    ids.forEach(id => { const el = document.getElementById(id); el && io.observe(el); });
    return () => { clearTimeout(t); window.removeEventListener('wheel', wheel); io.disconnect(); }
  }, []);

  const { about, skills, experience, projects, education, certifications, achievements, interests, contact } = content;

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications & Badges' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'interests', label: 'Beyond the Code' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.div ref={scrollRef} className={styles.container}
      variants={screenVariants} initial="initial" animate="animate" exit="exit">

      {/* nav toggle (TOP‑LEFT) */}
      <motion.button className={styles.navToggle} onClick={() => setNavOpen(p => !p)} whileHover={{ scale: 1.1 }}>
        {navOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* floating menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav className={styles.floatingNav}
            initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}
            transition={{ type: 'tween', duration: 0.25 }}>
            {navLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={active === id ? styles.activeNav : undefined}
                onClick={() => { setActive(id); setNavOpen(false); }}>
                {sectionIcons[id]}<span>{label}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ---------- About ---------- */}
      {about && (
        <motion.section
          id="about"
          className={styles.section}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>{sectionIcons.about} About Me</h2>

          {/* split the template‑literal string on blank lines */}
          {about.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.section>
      )}

      {/* ---------- Experience ---------- */}
      {experience?.length > 0 && (
        <motion.section id="experience" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}>
          <h2>{sectionIcons.experience} Experience & Internships</h2>
          {experience.map((e, i) => (
            <motion.div key={i} className={styles.card} initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease: 'easeOut', duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,224,255,0.2)', transition: hoverTransition }}
              viewport={{ once: true }}>
              <h3>{e.role} — <em>{e.company}</em></h3>
              {e.date && <span className={styles.date}>{e.date}</span>}
              <ul>{e.details.map((d, j) => <li key={j}>{d}</li>)}</ul>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* ---------- Projects ---------- */}
      {projects?.length > 0 && (
        <motion.section id="projects" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.projects} Projects</h2>
          {projects.map((p, i) => (
            <motion.div key={i} className={styles.card} initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease: 'easeOut', duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,224,255,0.2)', transition: hoverTransition }}
              viewport={{ once: true }}>
              <div className={styles.projectTitleLine}>
                <h3>{p.title}</h3>
                {p.link && (
                  <motion.a href={p.link} target="_blank" rel="noopener noreferrer"
                    className={styles.githubIconLink}
                    whileHover={{ scale: 1.15, color: '#fff', transition: hoverTransition }}>
                    <FaGithub />
                  </motion.a>
                )}
              </div>
              {p.tech && <span className={styles.tech}>{p.tech.join(', ')}</span>}
              <p>{p.description}</p>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* ---------- Skills ---------- */}
      {skills?.length > 0 && (
        <motion.section id="skills" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.skills} Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((s, i) => (
              <motion.div key={s} className={styles.skillTile} initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05, ease: 'easeOut', duration: 0.4 }}
                whileHover={{ scale: 1.1, transition: hoverTransition }} viewport={{ once: true }}>
                {deviconClassMap[s] ? <i className={deviconClassMap[s]} aria-label={s} /> :
                  fallbackIcons[s] || <FaCode className={styles.iconFallback} />}
                <div className={styles.skillLabel}>{s}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ---------- Education ---------- */}
      {education?.length > 0 && (
        <motion.section id="education" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.education} Education</h2>
          {education.map((ed, i) => (
            <motion.div key={i} className={styles.card} initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease: 'easeOut', duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,224,255,0.2)', transition: hoverTransition }}
              viewport={{ once: true }}>
              <div className={styles.educationCardContent}>
                <div className={styles.educationText}>
                  <h3>{ed.degree}</h3>
                  <span className={styles.text}>{ed.institution}</span>
                  <span className={styles.date}>{ed.duration}</span>
                </div>
                <motion.div className={styles.educationLogoContainer}
                  whileHover={{ scale: 1.05, boxShadow: '0 6px 16px rgba(0,224,255,0.2)', transition: hoverTransition }}>
                  <img src={ed.logo} alt={`${ed.institution} logo`} className={styles.educationLogoImg} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* ---------- Certifications ---------- */}
      {certifications?.length > 0 && (
        <motion.section id="certifications" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.certifications} Certifications & Badges</h2>
          <div className={styles.certGrid}>
            {(showAllCerts ? certifications : certifications.slice(0, 3)).map((c, i) => (
              <motion.div key={i} className={styles.certCard}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, ease: 'easeOut', duration: 0.4 }}
                whileHover={{ boxShadow: '0 8px 20px rgba(0,224,255,0.25)', transition: hoverTransition }}
                viewport={{ once: true }}>
                <div className={styles.certImgBox}>
                  <img src={c.logo} alt={`${c.name} preview`} />
                </div>
                <span className={styles.certName}>{c.name}</span>
                {c.org && <span className={styles.certOrg}>{c.org}</span>}
                {c.date && <span className={styles.certDate}>{c.date}</span>}
                {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" className={styles.certBtn}>View</a>}
              </motion.div>
            ))}
          </div>
          {certifications.length > 3 && (
            <button className={styles.showMoreBtn} onClick={() => setShowAllCerts(p => !p)}>
              {showAllCerts ? 'Show Less' : 'See More'}
            </button>
          )}
        </motion.section>
      )}



      {/* ---------- Achievements ---------- */}
      {achievements?.length > 0 && (
        <motion.section id="achievements" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.achievements} Achievements</h2>
          <ul>{achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </motion.section>
      )}

      {/* ── Beyond the Code – with flip caption ── */}
      {interests?.length > 0 && (
        <motion.section id="interests" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.interests} Beyond&nbsp;the&nbsp;Code</h2>

          <div className={styles.interestsGrid}>
            {interests.map(({ name, icon, caption }) => (
              <div key={name} className={styles.interestTile}>
                <div className={styles.interestInner}>
                  {/* front face */}
                  <div className={styles.interestFace}>
                    {interestIconMap[name]
                      ? interestIconMap[name]
                      : (icon?.startsWith('fa')
                        ? <i className={`${icon} ${styles.interestIcon}`} />
                        : <span className={styles.interestIcon}>{icon}</span>)}
                    <span className={styles.interestLabel}>{name}</span>
                  </div>

                  {/* back face */}
                  <div className={`${styles.interestFace} ${styles.interestBack}`}>
                    <span className={styles.interestCaption}>{caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}


      {/* ---------- Contact ---------- */}
      {(contact.linkedIn || contact.github || contact.email) && (
        <motion.section id="contact" className={styles.section}
          variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <h2>{sectionIcons.contact} Contact</h2>
          <ul className={styles.contactList}>
            {contact.linkedIn && (
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }} viewport={{ once: true }}>
                <motion.a href={contact.linkedIn} target="_blank" rel="noopener noreferrer"
                  className={styles.contactLink}
                  whileHover={{ color: '#fff', x: 5, transition: hoverTransition }}>
                  <FaLinkedinIn className={styles.contactIcon} />
                  <span className={styles.contactText}>LinkedIn</span>
                </motion.a>
              </motion.li>
            )}
            {contact.github && (
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }} viewport={{ once: true }}>
                <motion.a href={contact.github} target="_blank" rel="noopener noreferrer"
                  className={styles.contactLink}
                  whileHover={{ color: '#fff', x: 5, transition: hoverTransition }}>
                  <FaGithub className={styles.contactIcon} />
                  <span className={styles.contactText}>GitHub</span>
                </motion.a>
              </motion.li>
            )}
            {contact.email && (
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }} viewport={{ once: true }}>
                <motion.a href={`mailto:${contact.email}`} className={styles.contactLink}
                  whileHover={{ color: '#fff', x: 5, transition: hoverTransition }}>
                  <FaEnvelope className={styles.contactIcon} />
                  <span className={styles.contactText}>Email</span>
                </motion.a>
              </motion.li>
            )}
          </ul>
        </motion.section>
      )}

      {/* ---------- Back button ---------- */}
      <motion.div className={styles.backButtonContainer} variants={itemVariants}>
        <motion.button className={styles.backButton} onClick={onBack}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,224,255,0.2)', transition: hoverTransition }}>
          Back
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
