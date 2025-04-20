// content.js — Centralized data model for Quick View + Vibe Mode

// Ensure this is a named export using 'export const'
// content.js — Centralized data model for Quick View + Vibe Mode

// Ensure this is a named export using 'export const'
export const content = {
    about: `Hey, I'm Kuldeep Singh Rathore — a passionate Full Stack Developer and CS grad student at California State University, Fullerton. I love building meaningful tech, exploring AI/ML, and expressing creativity through code.`,

    skills: [
      'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Python', 'C/C++',
      'MongoDB', 'SQL', 'Power BI', 'Tableau', 'Git & GitHub', 'Google Cloud Platform',
      'Flask', 'HTML & CSS'
      // Add more skills here
    ],

    projects: [
      {
        title: 'Project Approval System',
        description: 'Developed a full-stack system for managing academic project proposals, saving 30% in time and resources.',
        tech: ['React', 'Node', 'MongoDB'],
        link: 'https://github.com/YourUsername/ProjectApprovalSystem', // Use GitHub link
        // Add live demo link if needed: liveDemoLink: 'https://live.example.com/project1'
      },
      {
        title: 'CodeSyncronix',
        description: 'Real-time code synchronization platform for collaborative programming.',
        tech: ['React', 'Node', 'Express', 'Socket.io'],
        link: 'https://github.com/The-Eminent/CodeSyncronix', // Example real GitHub link
      },
      {
        title: 'YouTube Comments Sentiment Analysis',
        description: 'Analyzed viewer sentiment using TextBlob and visualized results with Chart.js.',
        tech: ['Python', 'Flask', 'TextBlob', 'Chart.js'],
        link: 'https://github.com/YourUsername/YoutubeSentiment',
      }
      // Add more projects here
    ],

    experience: [
      {
        company: 'CrystalTech',
        role: 'Data Visualization Intern',
        date: 'May 2023 – Aug 2023',
        details: [
          'Built interactive dashboards using Plotly and Dash.',
          'Enhanced marketing insights through dynamic data visuals.',
          'Collaborated with cross-functional teams to improve software performance.'
        ]
      },
      {
        company: 'iNeuron',
        role: 'Machine Learning Intern',
        date: 'Jan 2023 – Apr 2023',
        details: [
          'Analyzed adolescent depression patterns via social media datasets.',
          'Built ML models for emotion prediction using structured data.',
          'Utilized Cassandra for handling distributed data storage.'
        ]
      }
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
        duration: '2019 – 2023',
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

    contact: {
      email: 'kuldeepsingh@csu.fullerton.edu', // Your actual email
      linkedIn: 'https://www.linkedin.com/in/yourlinkedinprofile/', // Your actual LinkedIn URL
      github: 'https://github.com/YourGitHubUsername' // Your actual GitHub URL
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