// Ensure this is a named export using 'export const'
// content.js — Centralized data model for Quick View + Vibe Mode

export const content = {
  about: `👋 Hey, I’m Kuldeep - a CS grad student at California State University, Fullerton, passionate about building tech that matters.

💡 I design and develop full-stack solutions - from front-end micro-interactions to backend systems and dashboards. My recent work includes real-time collaboration tools, machine learning pipelines, and API-driven platforms.

🧠 What drives me? Curiosity, collaboration, and the thrill of solving the unsolved - whether it’s a stubborn bug or a clever tactic. Let’s build something meaningful.`,

skills: [
  // 🚀 In-Demand Core Skills
  'Python', 'JavaScript', 'React.js', 'Node.js', 'SQL',

  // 🌐 Web Development & Frameworks
  'Express.js', 'Flask', 'HTML', 'CSS', 'Tailwind',

  // 📊 Data Analytics & Visualization
  'Power BI', 'Tableau', 'Excel', 'R', 'RStudio',

  // ☁️ Cloud & DevOps
  'GCP', 'Docker', 'Kubernetes', 'Github Actions',

  // 🛠️ Tools
  'Git', 'Github',

  // 🗄️ Databases
  'MongoDB', 'Cassandra',

  // 👨‍💻 Other Languages
  'C', 'C++'
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
      role: 'Graduate Research Assistant',
      date: 'March 2025 - Current',
      details: [
        'Analyze complex executive and organizational datasets using Python, pandas, and SQL to identify trends in leadership traits, compensation, and firm performance.',
        'Develop interactive dashboards with Power BI and matplotlib to visualize insights on corporate leadership, political affiliations, and business outcomes.',
        'Automate data collection workflows from public sources and apply statistical techniques to support academic research and data-driven publications.',
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
    'Runner-up - Smart India Hackathon 2023 (Top 1% out of 500+ teams)',
    'GDSC Core Member - Organized tech events and marketing outreach',
    '30 Days of Google Cloud - Completed Cloud Engineering & ML tracks'
  ],

  // — NEW —
  certifications: [
    // 🏆 High-Impact Skill Badges (Cloud, ML, DevOps)
    {
      name: 'Cloud Architecture: Design, Implement, and Manage',
      org: 'Google Cloud',
      date: '2022',
      logo: 'gcp-architecture.png',
      link: 'https://www.credly.com/badges/818e53dd-5479-4480-8cd3-940a44d08fda/public_url'
    },
    {
      name: 'Deploy Kubernetes Applications on Google Cloud',
      org: 'Google Cloud',
      date: '2021',
      logo: 'gcp-kubernetes.png',
      link: 'https://www.credly.com/badges/61db90cf-b7a0-44f7-b21e-eb5d1700cb65/public_url'
    },
    {
      name: 'Build a Secure Google Cloud Network',
      org: 'Google Cloud',
      date: '2021',
      logo: 'gcp-secure-network.png',
      link: 'https://www.credly.com/badges/612e5dd6-0d6a-40e6-9162-3bbc496528dc/public_url'
    },
    {
      name: 'Implement DevOps Workflows in Google Cloud',
      org: 'Google Cloud',
      date: '2022',
      logo: 'gcp-devops.png',
      link: 'https://www.credly.com/badges/31882679-3edb-4068-bb5d-68186032a766/public_url'
    },
    {
      name: 'Engineer Data for Predictive Modeling with BigQuery ML',
      org: 'Google Cloud',
      date: '2021',
      logo: 'gcp-bigquery-ml.png',
      link: 'https://www.credly.com/badges/b86c2782-25ab-480a-b14e-67477f75c539/public_url'
    },
    {
      name: '5-Day Generative AI Intensive',
      org: 'Kaggle',
      date: '2024',
      logo: 'kaggle-genai.png',
      link: 'https://www.kaggle.com/certification/badges/computerjock/96'
    },
  
    // 🎓 Academic Publications & Top Certs
    {
      name:'Research Publication - Project Approval & Cost Optimization',
      org:'ICICES Conference',
      date:'2023',
      logo:'icices-research.png',
      link:'https://drive.google.com/file/d/1gwKLZkFiOZEFGJ9I_jKLq39-BR0tjw3x/view?usp=sharing'
    },
    {
      name:'Research Publication - Multi-Cloud Resource Allocation',
      org:'IEEE MRTM 2023',
      date:'2023',
      logo:'mrtm-research.png',
      link:'https://drive.google.com/file/d/1IDEouEsHkkm-vxjVK52woc6Fr2QfnTV1/view?usp=sharing'
    },
    {
      name:'CCNAv7 : Intro to Networks',
      org:'Cisco',
      date:'2023',
      logo:'ccna.png',
      link:'https://drive.google.com/file/d/1Onuln30hV4scHA4K3M9IhZmegOTC348n/view?usp=sharing'
    },
  
    // 📜 Other Recognized Certs
    {
      name:'Microsoft Learn AI Skills Challenge',
      org:'Microsoft',
      date:'2023',
      logo:'microsoft-ai.png',
      link:'https://drive.google.com/file/d/1guzxKE0eaGOmEVlMjA6HEtH_IJ9vX-aU/view?usp=sharing'
    },
    {
      name:'TCS iON Career Edge',
      org:'TCS',
      date:'2023',
      logo:'tcsion.png',
      link:'https://drive.google.com/file/d/1bUe2Dj0chLXfNS5bsr2xh4HVkyHKgImG/view?usp=sharing'
    },
    {
      name:'Google Cloud Program - Cloud & ML Tracks',
      org:'GDSC',
      date:'2021',
      logo:'gcp-cloud.png',
      link:'https://drive.google.com/file/d/1Dzct-8Ia8VvfBfEDE-AXKvFfkLBm81xU/view?usp=sharing'
    },
    {
      name:'Uber Hacktag 2.0',
      org:'Uber',
      date:'2022',
      logo:'uber-hacktag.png',
      link:'https://drive.google.com/file/d/1WIJaf-GPmMLpn6EE5jWFyRQNfsYgAIhn/view?usp=sharing'
    }
  ],

  interests: [
    {
      name: 'Chess',
      icon: 'fa-solid fa-chess',
      caption: 'Strategy is second nature - thanks to chess'
    },
    {
      name: 'Football',
      icon: 'fa-solid fa-futbol',
      caption: 'Teamwork, focus, and fast decision-making'
    },
    {
      name: 'Book Reading',
      icon: 'fa-solid fa-book-open',
      caption: 'New to the shelf-life 📚 - got a rec?'
    },
    {
      name: 'Photography',
      icon: 'fa-solid fa-camera-retro',
      caption: 'Love capturing moments that speak for themselves'
    },
    {
      name: 'Music',
      icon: 'fa-solid fa-music',
      caption: 'Classical tunes have my focus lately'
    }
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