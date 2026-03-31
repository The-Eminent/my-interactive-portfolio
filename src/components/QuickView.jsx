// src/components/QuickView.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaUser, FaBriefcase, FaGithub, FaCode, FaGraduationCap, FaTrophy,
  FaEnvelope, FaLinkedinIn, FaChartBar, FaBars, FaTimes, FaFileAlt, FaArrowLeft
} from 'react-icons/fa';
import { content } from '../data/content';
import styles from '../styles/QuickView.module.css';

const screenVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};
const itemVariants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};
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

const iconImg = (src, alt) => (
  <img src={src} alt={alt} className={styles.sectionIconImg} />
);
const sectionIcons = {
  about: <FaUser />,
  resume: <FaFileAlt />,
  experience: <FaBriefcase />,
  projects: <FaGithub />,
  skills: <FaCode />,
  education: <FaGraduationCap />,
  certifications: iconImg('cert.svg', 'Certificate badge icon'),
  achievements: <FaTrophy />,
  interests: iconImg('beyond.svg', 'Beyond code icon'),
  contact: <FaEnvelope />
};

function drivePreviewEmbedUrl(viewUrl) {
  const m = viewUrl?.match(/\/file\/d\/([^/]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : viewUrl;
}

const interestIconMap = {};

const SECTION_IDS = ['about', 'resume', 'experience', 'projects', 'skills', 'education', 'certifications', 'achievements', 'interests', 'contact'];

export default function QuickView({ onBack }) {
  const scrollRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [showAllCerts, setShowAllCerts] = useState(false);

  const { about, skills, experience, projects, education, certifications, achievements, interests, contact } = content;

  const skillCategories = useMemo(() => {
    if (content.skillsByCategory?.length) return content.skillsByCategory;
    return [{ label: 'Skills', items: skills }];
  }, [skills]);

  const quickLinks = {
    github: content.contact.github,
    linkedIn: content.contact.linkedIn,
    email: `mailto:${content.contact.email}`,
    resume: contact.resume
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certificates' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'interests', label: 'Beyond code' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const t = setTimeout(() => { scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }, 400);

    let removeListeners = () => {};

    const rafId = requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;

      const updateActiveFromScroll = () => {
        const c = scrollRef.current;
        if (!c) return;
        const line = c.scrollTop + 96;
        let chosen = SECTION_IDS[0];
        for (const id of SECTION_IDS) {
          const node = document.getElementById(id);
          if (!node) continue;
          if (node.offsetTop <= line) {
            chosen = id;
          }
        }
        setActive(chosen);
      };

      updateActiveFromScroll();
      container.addEventListener('scroll', updateActiveFromScroll, { passive: true });
      window.addEventListener('resize', updateActiveFromScroll, { passive: true });

      removeListeners = () => {
        container.removeEventListener('scroll', updateActiveFromScroll);
        window.removeEventListener('resize', updateActiveFromScroll);
      };
    });

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId);
      removeListeners();
    };
  }, []);

  useEffect(() => {
    const keyHandler = (event) => {
      if (event.target?.closest?.('input, textarea, [contenteditable="true"]')) return;

      const key = event.key.toLowerCase();
      const sectionIdx = Number(key);

      if (key === '0') {
        setActive('contact');
        document.getElementById('contact')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      } else if (!Number.isNaN(sectionIdx) && sectionIdx >= 1 && sectionIdx <= 9) {
        const targetId = SECTION_IDS[sectionIdx - 1];
        setActive(targetId);
        document.getElementById(targetId)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }

      if (key === 'g') window.open(content.contact.github, '_blank', 'noopener,noreferrer');
      if (key === 'l') window.open(content.contact.linkedIn, '_blank', 'noopener,noreferrer');
      if (key === 'e') window.location.href = `mailto:${content.contact.email}`;
      if (key === 'r' && content.contact.resume) window.open(content.contact.resume, '_blank', 'noopener,noreferrer');
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [prefersReducedMotion]);

  const scrollToId = (id) => {
    setActive(id);
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <Motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.shell}
    >
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <button type="button" className={styles.backCompact} onClick={onBack} aria-label="Back to home">
            <FaArrowLeft />
          </button>
          <span className={styles.brand}>Kuldeep Singh Rathore</span>
        </div>
        <nav className={styles.topBarLinks} aria-label="Quick links">
          <a href={quickLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={quickLinks.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={quickLinks.email}>Email</a>
          <a href={quickLinks.resume} target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </header>

      <div className={styles.shellInner}>
        <aside className={styles.sidebarRail} aria-label="On this page">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={active === id ? styles.railLinkActive : styles.railLink}
              onClick={() => scrollToId(id)}
            >
              {sectionIcons[id]}
              <span>{label}</span>
            </button>
          ))}
        </aside>

        <Motion.button
          type="button"
          className={styles.navToggle}
          onClick={() => setNavOpen(p => !p)}
          whileHover={{ scale: 1.05 }}
          aria-label="Open section menu"
          aria-expanded={navOpen}
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </Motion.button>

        <AnimatePresence>
          {navOpen && (
            <Motion.nav
              className={styles.floatingNav}
              aria-label="Sections"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={active === id ? styles.mobileNavActive : styles.mobileNavBtn}
                  onClick={() => scrollToId(id)}
                >
                  {sectionIcons[id]}
                  <span>{label}</span>
                </button>
              ))}
            </Motion.nav>
          )}
        </AnimatePresence>

        <main ref={scrollRef} id="main-content" className={styles.mainScroll} tabIndex={-1}>
          {about && (
            <Motion.section
              id="about"
              className={styles.section}
              variants={itemVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2 className={styles.sectionTitle}>{sectionIcons.about} About</h2>
              <div className={styles.prose}>
                {about.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Motion.section>
          )}

          {contact?.resume && (
            <Motion.section
              id="resume"
              className={styles.section}
              variants={itemVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className={styles.sectionTitle}>{sectionIcons.resume} Resume</h2>
              <p className={styles.resumeIntro}>
                Preview below or{' '}
                <a href={contact.resume} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                  open on Google Drive
                </a>
                .
              </p>
              <div className={styles.resumeEmbedWrap}>
                <iframe
                  title="Resume PDF preview"
                  src={drivePreviewEmbedUrl(contact.resume)}
                  className={styles.resumeIframe}
                  loading="lazy"
                />
              </div>
            </Motion.section>
          )}

          {experience?.length > 0 && (
            <Motion.section id="experience" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.experience} Experience</h2>
              {experience.map((e, i) => (
                <Motion.article
                  key={`${e.company}-${i}`}
                  className={styles.card}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.cardHeader}>
                    <h3>{e.role}</h3>
                    {e.date && <span className={styles.cardMeta}>{e.date}</span>}
                  </div>
                  <p className={styles.cardCompany}>{e.company}</p>
                  <ul className={styles.bulletList}>
                    {e.details.map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                </Motion.article>
              ))}
            </Motion.section>
          )}

          {projects?.length > 0 && (
            <Motion.section id="projects" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.projects} Projects</h2>
              <div className={styles.projectGrid}>
                {projects.map((p, i) => (
                  <Motion.article
                    key={p.title}
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.45 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.projectCardTop}>
                      <h3>{p.title}</h3>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.projectGh} aria-label="Repository">
                          <FaGithub />
                        </a>
                      )}
                    </div>
                    {p.tech && (
                      <div className={styles.tagRow}>
                        {p.tech.map((t) => (
                          <span key={t} className={styles.tag}>{t}</span>
                        ))}
                      </div>
                    )}
                    {p.highlights && (
                      <ul className={styles.highlightList}>
                        {p.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                    <p className={styles.projectDesc}>{p.description}</p>
                  </Motion.article>
                ))}
              </div>
            </Motion.section>
          )}

          {skills?.length > 0 && (
            <Motion.section id="skills" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.skills} Skills</h2>
              {skillCategories.map((cat) => (
                <div key={cat.label} className={styles.skillBlock}>
                  <h3 className={styles.skillCategoryLabel}>{cat.label}</h3>
                  <div className={styles.skillsGrid}>
                    {cat.items.map((s) => (
                      <div key={s} className={styles.skillTile}>
                        {deviconClassMap[s] ? <i className={deviconClassMap[s]} aria-hidden /> :
                          fallbackIcons[s] || <FaCode className={styles.iconFallback} />}
                        <span className={styles.skillLabel}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Motion.section>
          )}

          {education?.length > 0 && (
            <Motion.section id="education" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.education} Education</h2>
              {education.map((ed) => (
                <Motion.div key={ed.institution} className={styles.card} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className={styles.eduRow}>
                    <div className={styles.eduText}>
                      <h3>{ed.degree}</h3>
                      <p className={styles.eduInstitution}>{ed.institution}</p>
                      <p className={styles.eduYears}>{ed.duration}</p>
                    </div>
                    <div className={styles.eduLogo}>
                      <img
                        src={ed.logo}
                        alt={`${ed.institution} logo`}
                        className={styles.eduLogoImg}
                      />
                    </div>
                  </div>
                </Motion.div>
              ))}
            </Motion.section>
          )}

          {certifications?.length > 0 && (
            <Motion.section id="certifications" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.certifications} Certifications</h2>
              <div className={styles.certGrid}>
                {(showAllCerts ? certifications : certifications.slice(0, 3)).map((c, i) => (
                  <div key={`${c.name}-${i}`} className={styles.certCard}>
                    <div className={styles.certImgBox}>
                      <img
                        src={c.logo}
                        alt={
                          c.org
                            ? `${c.name} — ${c.org}${c.date ? `, ${c.date}` : ''}`
                            : `${c.name}${c.date ? `, ${c.date}` : ''}`
                        }
                        loading="lazy"
                      />
                    </div>
                    <span className={styles.certName}>{c.name}</span>
                    {c.org && <span className={styles.certOrg}>{c.org}</span>}
                    {c.date && <span className={styles.certDate}>{c.date}</span>}
                    {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" className={styles.certBtn}>Verify</a>}
                  </div>
                ))}
              </div>
              {certifications.length > 3 && (
                <button type="button" className={styles.showMoreBtn} onClick={() => setShowAllCerts(p => !p)}>
                  {showAllCerts ? 'Show less' : 'Show all'}
                </button>
              )}
            </Motion.section>
          )}

          {achievements?.length > 0 && (
            <Motion.section id="achievements" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.achievements} Achievements</h2>
              <ul className={styles.bulletList}>
                {achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </Motion.section>
          )}

          {interests?.length > 0 && (
            <Motion.section id="interests" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.interests} Beyond the code</h2>
              <div className={styles.interestsGrid}>
                {interests.map(({ name, icon, caption }) => (
                  <div key={name} className={styles.interestTile}>
                    <div className={styles.interestInner}>
                      <div className={styles.interestFace}>
                        {interestIconMap[name]
                          ? interestIconMap[name]
                          : (icon?.startsWith('fa')
                            ? <i className={`${icon} ${styles.interestIcon}`} />
                            : <span className={styles.interestIcon}>{icon}</span>)}
                        <span className={styles.interestLabel}>{name}</span>
                      </div>
                      <div className={`${styles.interestFace} ${styles.interestBack}`}>
                        <span className={styles.interestCaption}>{caption}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Motion.section>
          )}

          {(contact.linkedIn || contact.github || contact.email) && (
            <Motion.section id="contact" className={styles.section} variants={itemVariants} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className={styles.sectionTitle}>{sectionIcons.contact} Contact</h2>
              <ul className={styles.contactList}>
                {contact.linkedIn && (
                  <li>
                    <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                      <FaLinkedinIn /> LinkedIn
                    </a>
                  </li>
                )}
                {contact.github && (
                  <li>
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                      <FaGithub /> GitHub
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                      <FaEnvelope /> Email
                    </a>
                  </li>
                )}
              </ul>
            </Motion.section>
          )}

          <div className={styles.footerBack}>
            <button type="button" className={styles.backFab} onClick={onBack}>
              <FaArrowLeft /> Back to home
            </button>
          </div>
        </main>
      </div>
    </Motion.div>
  );
}
