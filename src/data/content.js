// Ensure this is a named export using 'export const'
// content.js — Centralized data model for Quick View + Vibe Mode

export const content = {
  about: `👋 Hey, I’m Kuldeep - a CS grad student at California State University, Fullerton, passionate about building tech that matters.

💡 I design and develop full-stack solutions - from front-end micro-interactions to backend systems and dashboards. My recent work includes real-time collaboration tools, machine learning pipelines, and API-driven platforms.

🧠 What drives me? Curiosity, collaboration, and the thrill of solving the unsolved - whether it’s a stubborn bug or a clever tactic. Let’s build something meaningful.`,

  skills: [
    'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Python', 'C', 'C++',
    'MongoDB', 'SQL', 'Power BI', 'Tableau', 'Git', 'Github', 'GCP',
    'Flask', 'HTML', 'CSS'
    // Add more skills here
  ],

  projects: [
    {
      title: 'Project Approval System',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: 'A full-stack platform to streamline academic project approvals with user roles, status tracking, and plagiarism integration.',
      link: 'https://github.com/The-Eminent/Project-Approval-System'
    },
    {
      title: 'CodeSyncronix',
      tech: ['React', 'Node.js', 'Express', 'Socket.io'],
      description: 'A real-time code sharing and collaboration tool that minimizes context switching and streamlines group workflows.',
      link: 'https://github.com/The-Eminent'
    },
    {
      title: 'YouTube Sentiment Analysis',
      tech: ['Python', 'Flask', 'TextBlob', 'Chart.js'],
      description: 'A tool that analyzes viewer sentiment from YouTube comments and visualizes insights through interactive charts.',
      link: 'https://github.com/The-Eminent/YouTube-Comments-Extraction-and-Sentiment-Analysis-Flask-App'
    },
    {
      title: 'Decentralized Crowdfunding Platform',
      tech: ['Solidity', 'Truffle', 'Web3.js', 'JavaScript'],
      description: 'Blockchain-based platform enabling transparent crowdfunding with integrated micropayments and affiliate reward logic.',
      link: 'https://github.com/The-Eminent/Decentralized_Crowdfunding'
    },
    {
      title: 'Load Balancer in Node.js',
      tech: ['Node.js', 'JavaScript'],
      description: 'Custom-built application-layer load balancer using round-robin algorithm, server health checks, and dynamic routing.',
      link: 'https://github.com/The-Eminent/load-balancer'
    },
    {
      title: 'Sales Insights Dashboard',
      tech: ['Python', 'Pandas', 'Plotly', 'Power BI'],
      description: 'Developed an interactive dashboard to analyze sales data, visualize trends, and highlight high-performing products, aiding strategic marketing decisions.',
      link: 'https://github.com/the-eminent'
    }
  ],

  experience: [
    {
      company: 'California State University - Fullerton',
      role: 'Student Assistant',
      date: 'Apr 2025 - current',
      details: [
        'Managed large-scale datasets using Excel and Python, automating processes and reducing data processing time.',
        'Validated executive profiles via social media analytics, creating structured datasets with improved accuracy.'
      ]
    },
    {
      company: 'iNeuron',
      role: 'Project Intern',
      date: 'Aug 2023 – Apr 2024',
      details: [
        'Utilized Cassandra database for data management, reducing query response time by 25%.',
        'Developed emotion prediction models, increasing accuracy from 70% to 85%.',
        'Analyzed social media data to identify key patterns, leading to targeted intervention strategies for adolescent depression.'
      ]
    },
    {
      company: 'CrystalTech',
      role: 'Python Developer Intern',
      date: 'Jan 2023 – June 2023',
      details: [
        'Enhanced Python-based web development and data visualization techniques through diverse projects.',
        'Resolved critical bugs, improving application stability by 15%.',
        'Collaborated with cross-functional teams to optimize code performance, decreasing application response time by 20%.'
      ]
    },
    // Add more experience entries here
  ],

  education: [
    {
      institution: 'California State University, Fullerton',
      degree: 'M.S. Computer Science',
      duration: '2024 – 2026',
      // --- ADD PLACEHOLDER FOR LOGO IMAGE PATH ---
      logo: '/csuf-logo.png', // Example path to CSUF logo image in your public folder
      // Consider size: A square image around 64x64px or 100x100px works well for small logos. Vector formats (SVG) are scalable.
    },
    {
      institution: 'Indore Institute of Science and Technology',
      degree: 'B.Tech Computer Science & Engineering',
      duration: '2020 – 2024',
      // --- ADD PLACEHOLDER FOR LOGO IMAGE PATH ---
      logo: '/iist-logo.jpg', // Example path to IIST logo image
    }
    // Add more education entries if needed
  ],

  achievements: [
    'Runner-up – Smart India Hackathon 2023 (Top 1% out of 500+ teams)',
    'GDSC Core Member – Organized tech events and marketing outreach',
    '30 Days of Google Cloud – Completed Cloud Engineering & ML tracks'
  ],

  // — NEW —
  certifications: [
    { name:'TCS iON Career Edge', org:'TCS', date:'2023', logo:'tcsion.png', link:'https://drive.google.com/file/d/1bUe2Dj0chLXfNS5bsr2xh4HVkyHKgImG/view?usp=sharing' },
    { name:'Google Cloud Platform Traning', org:'GDSC', date:'2021', logo:'gcp-cloud.png', link:'https://drive.google.com/file/d/1Dzct-8Ia8VvfBfEDE-AXKvFfkLBm81xU/view?usp=sharing' },
    { name:'Uber Hacktag 2.0', org:'Uber', date:'2022', logo:'uber-hacktag.png', link:'https://drive.google.com/file/d/1WIJaf-GPmMLpn6EE5jWFyRQNfsYgAIhn/view?usp=sharing' },
    
    // add more…
  ],

  interests: [
    { name: 'Chess',    icon: 'fa-solid fa-chess',    caption: 'Sharpening logic, one move at a time' },
    { name: 'Fitness',  icon: 'fa-solid fa-dumbbell', caption: 'Fueling focus through strength' },
    { name: 'Football', icon: 'fa-solid fa-futbol',   caption: 'Teamwork, tactics, and passion on the field' }
  ],
  
  contact: {
    email: 'kuldeepsingh@csu.fullerton.edu', // Your actual email
    linkedIn: 'https://www.linkedin.com/in/kuldeepsinghrathore07/', // Your actual LinkedIn URL
    github: 'https://github.com/the-eminent' // Your actual GitHub URL
    // Add other contact info like Twitter, personal website etc.
  },

  // Array of strings for Rotating Taglines (used in Hero)
  rotatingTaglines: [
    'Full Stack Developer',
    'CS Grad Student @ CSUF',
    'Open‑Source Enthusiast',
    'Tinkering with Models & Metrics',
    'Creative Problem Solver',
    'Let’s build something together.'
  ]
};