import { Challenge } from '../types/challenge';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Reduce Internet Usage by 20%",
    description: "Monitor and reduce your internet bandwidth usage for one week by using offline tools and cached resources.",
    difficulty: 'medium',
    category: 'usage',
    xpReward: 50,
    icon: '📊',
    steps: [
      "Measure your current weekly internet usage using your router or ISP dashboard",
      "Identify your top bandwidth-consuming activities (streaming, downloads, cloud sync)",
      "Switch to offline alternatives: download documents, use local media, enable offline mode in apps",
      "Cache frequently accessed websites and resources",
      "Track your daily usage and adjust habits accordingly",
      "After one week, compare your usage to the baseline - aim for 20% reduction"
    ],
    resources: [
      {
        title: "How to Check Your Internet Usage",
        url: "https://www.wikihow.com/Check-Internet-Usage",
        description: "Learn different methods to monitor your bandwidth consumption"
      },
      {
        title: "Offline-First Apps List",
        url: "https://github.com/topics/offline-first",
        description: "Collection of applications that work great offline"
      },
      {
        title: "Browser Offline Mode Guide",
        url: "https://support.mozilla.org/en-US/kb/work-offline-or-online",
        description: "How to enable offline mode in Firefox and other browsers"
      }
    ],
    checklist: [
      { id: 1, text: "Record baseline internet usage for 3 days", completed: false },
      { id: 2, text: "Identify top 3 bandwidth-heavy activities", completed: false },
      { id: 3, text: "Find offline alternatives for each activity", completed: false },
      { id: 4, text: "Implement offline-first habits for 7 days", completed: false },
      { id: 5, text: "Measure final week usage and calculate reduction", completed: false }
    ],
    reflectionQuestions: [
      "What activities consumed the most bandwidth?",
      "Which offline alternatives were most effective?",
      "Did you notice any productivity changes?",
      "What habits will you keep after this challenge?"
    ]
  },
  {
    id: 2,
    title: "Full Day with Linux",
    description: "Use a Linux distribution (like Ubuntu, Mint, or Elementary) for an entire day. Experience open-source software firsthand.",
    difficulty: 'easy',
    category: 'practice',
    xpReward: 30,
    icon: '🐧',
    steps: [
      "Choose a beginner-friendly Linux distribution (Ubuntu, Linux Mint, or Elementary OS)",
      "Create a bootable USB drive or use a virtual machine",
      "Boot into Linux and set up your desktop environment",
      "Connect to WiFi and test your browser",
      "Try common tasks: browsing, documents, coding, media playback",
      "Write down differences you notice compared to your usual OS",
      "Reflect on the experience at the end of the day"
    ],
    resources: [
      {
        title: "Download Ubuntu",
        url: "https://ubuntu.com/download/desktop",
        description: "Official Ubuntu download page for the latest LTS version"
      },
      {
        title: "How to Create a Bootable USB",
        url: "https://ubuntu.com/tutorials/create-a-usb-stick-on-windows",
        description: "Step-by-step guide to create a bootable Linux USB drive"
      },
      {
        title: "5 Basic Linux Commands",
        url: "https://www.howtogeek.com/412055/37-important-linux-commands-you-should-know/",
        description: "Essential terminal commands for Linux beginners"
      },
      {
        title: "Try Linux in Browser (No Install)",
        url: "https://distrotest.net/",
        description: "Test different Linux distributions directly in your browser"
      }
    ],
    checklist: [
      { id: 1, text: "Download Linux distribution (ISO file)", completed: false },
      { id: 2, text: "Create bootable USB or setup VM", completed: false },
      { id: 3, text: "Boot into Linux and connect to WiFi", completed: false },
      { id: 4, text: "Browse the web and test LibreOffice", completed: false },
      { id: 5, text: "Try at least 3 different applications", completed: false },
      { id: 6, text: "Use Linux for your main tasks for full day", completed: false }
    ],
    reflectionQuestions: [
      "What did you like about Linux compared to your usual OS?",
      "What was difficult or confusing?",
      "Which applications worked better than expected?",
      "Would you consider using Linux full-time? Why or why not?"
    ]
  },
  {
    id: 3,
    title: "Try LibreOffice Week",
    description: "Complete all your office work using LibreOffice instead of proprietary software for one full week.",
    difficulty: 'easy',
    category: 'practice',
    xpReward: 40,
    icon: '📝',
    steps: [
      "Download and install LibreOffice (Writer, Calc, Impress)",
      "Import your existing documents and test compatibility",
      "Use Writer for all document editing for one week",
      "Create a presentation in Impress",
      "Work with spreadsheets in Calc",
      "Compare features, performance, and file compatibility with MS Office",
      "Document any issues or missing features you encounter"
    ],
    resources: [
      {
        title: "Download LibreOffice",
        url: "https://www.libreoffice.org/download/download/",
        description: "Official LibreOffice download - works on Windows, Mac, and Linux"
      },
      {
        title: "LibreOffice Getting Started Guide",
        url: "https://documentation.libreoffice.org/en/english-documentation/getting-started/",
        description: "Official beginner's guide to LibreOffice"
      },
      {
        title: "LibreOffice vs MS Office Comparison",
        url: "https://www.libreoffice.org/discover/libreoffice/",
        description: "Feature comparison and migration guide"
      },
      {
        title: "Video Tutorials",
        url: "https://www.youtube.com/results?search_query=libreoffice+tutorial",
        description: "YouTube tutorials for Writer, Calc, and Impress"
      }
    ],
    checklist: [
      { id: 1, text: "Install LibreOffice suite", completed: false },
      { id: 2, text: "Open and edit existing documents", completed: false },
      { id: 3, text: "Create new document in Writer", completed: false },
      { id: 4, text: "Make a presentation in Impress", completed: false },
      { id: 5, text: "Work with spreadsheets in Calc", completed: false },
      { id: 6, text: "Use LibreOffice exclusively for 7 days", completed: false },
      { id: 7, text: "Test file compatibility with MS Office formats", completed: false }
    ],
    reflectionQuestions: [
      "How does LibreOffice compare to Microsoft Office?",
      "Were there any features you missed?",
      "Did you discover any LibreOffice features you liked better?",
      "Could LibreOffice replace MS Office for your school or workplace?"
    ]
  },
  {
    id: 4,
    title: "Teach NIRD in Class",
    description: "Present NIRD principles to your class or colleagues. Share what you learned about digital independence.",
    difficulty: 'hard',
    category: 'teaching',
    xpReward: 100,
    icon: '👨‍🏫',
    steps: [
      "Create a presentation about NIRD (Digital Independence, Open-source, Reuse)",
      "Include real-world examples and case studies",
      "Prepare a demo of an open-source application",
      "Schedule time with your teacher or supervisor",
      "Present to your class or colleagues (15-30 minutes)",
      "Answer questions and discuss challenges",
      "Gather feedback using a simple survey"
    ],
    resources: [
      {
        title: "NIRD Presentation Template",
        url: "https://www.canva.com/templates/",
        description: "Free presentation templates (or use LibreOffice Impress!)"
      },
      {
        title: "Open Source Success Stories",
        url: "https://opensource.com/tags/open-source-stories",
        description: "Real-world examples of open-source adoption"
      },
      {
        title: "Public Speaking Tips",
        url: "https://www.toastmasters.org/resources/public-speaking-tips",
        description: "Guide to effective presentations"
      }
    ],
    checklist: [
      { id: 1, text: "Research NIRD principles thoroughly", completed: false },
      { id: 2, text: "Create presentation slides", completed: false },
      { id: 3, text: "Prepare demo of open-source software", completed: false },
      { id: 4, text: "Practice presentation at least twice", completed: false },
      { id: 5, text: "Schedule presentation time", completed: false },
      { id: 6, text: "Deliver presentation to audience", completed: false },
      { id: 7, text: "Collect feedback from attendees", completed: false }
    ],
    reflectionQuestions: [
      "What was the audience's reaction to NIRD principles?",
      "Which examples resonated most with people?",
      "What questions were asked that you couldn't answer?",
      "How could you improve this presentation?"
    ]
  },
  {
    id: 5,
    title: "Revive an Old Computer",
    description: "Install a lightweight Linux distribution on an old computer that was considered 'too slow' to use.",
    difficulty: 'medium',
    category: 'practice',
    xpReward: 75,
    icon: '♻️',
    steps: [
      "Find an old computer (5+ years old) that runs slowly on Windows",
      "Back up any important data from the computer",
      "Choose a lightweight Linux distro (Lubuntu, Peppermint OS, or antiX)",
      "Create a bootable USB and install Linux",
      "Configure the system and install essential software",
      "Test performance with daily tasks",
      "Donate or repurpose the revived computer"
    ],
    resources: [
      {
        title: "Best Lightweight Linux Distros",
        url: "https://www.fosslinux.com/43353/lightweight-linux-distros-for-old-computers.htm",
        description: "Comparison of Linux distributions for old hardware"
      },
      {
        title: "Lubuntu Official Site",
        url: "https://lubuntu.me/",
        description: "Lightweight Ubuntu variant perfect for old PCs"
      },
      {
        title: "Installation Guide",
        url: "https://help.ubuntu.com/community/Lubuntu/InstallingLubuntu",
        description: "Step-by-step Lubuntu installation instructions"
      }
    ],
    checklist: [
      { id: 1, text: "Identify old computer to revive", completed: false },
      { id: 2, text: "Back up important data", completed: false },
      { id: 3, text: "Download lightweight Linux ISO", completed: false },
      { id: 4, text: "Create bootable USB drive", completed: false },
      { id: 5, text: "Install Linux on the old computer", completed: false },
      { id: 6, text: "Install essential applications", completed: false },
      { id: 7, text: "Test performance with real tasks", completed: false },
      { id: 8, text: "Find a new purpose for the computer", completed: false }
    ],
    reflectionQuestions: [
      "How much faster is the computer with lightweight Linux?",
      "What tasks can this revived computer handle?",
      "How much e-waste did you prevent?",
      "Who could benefit from this revived computer?"
    ]
  },
  // Continuing with remaining challenges...
  {
    id: 6,
    title: "Open-Source Alternatives Research",
    description: "Research and document 5 open-source alternatives for commercial software your school currently uses.",
    difficulty: 'medium',
    category: 'community',
    xpReward: 60,
    icon: '🔍',
    steps: [
      "Identify 5 commercial software tools used in your school",
      "Research open-source alternatives for each",
      "Compare features, compatibility, and cost savings",
      "Create a comparison document or spreadsheet",
      "Calculate potential annual savings",
      "Share your findings with school administration"
    ],
    resources: [
      {
        title: "AlternativeTo",
        url: "https://alternativeto.net/",
        description: "Database of software alternatives including open-source options"
      },
      {
        title: "Awesome Open Source",
        url: "https://awesomeopensource.com/",
        description: "Curated list of open-source software by category"
      }
    ],
    checklist: [
      { id: 1, text: "List 5 commercial software used in school", completed: false },
      { id: 2, text: "Research open-source alternative for each", completed: false },
      { id: 3, text: "Test at least 2 alternatives", completed: false },
      { id: 4, text: "Create comparison document", completed: false },
      { id: 5, text: "Calculate cost savings", completed: false }
    ],
    reflectionQuestions: [
      "Which alternatives were most impressive?",
      "What barriers might prevent adoption?",
      "How much money could your school save?"
    ]
  },
  {
    id: 7,
    title: "Self-Host a Service",
    description: "Set up a self-hosted service like Nextcloud, Jitsi, or Pi-hole for personal or educational use.",
    difficulty: 'hard',
    category: 'practice',
    xpReward: 120,
    icon: '🖥️',
    steps: [
      "Choose a service to self-host (Nextcloud for cloud storage recommended)",
      "Set up a server (old computer, Raspberry Pi, or cloud VPS)",
      "Install required software and dependencies",
      "Configure the service and security settings",
      "Test functionality with real use cases",
      "Document the setup process for others"
    ],
    resources: [
      {
        title: "Nextcloud Installation Guide",
        url: "https://nextcloud.com/install/",
        description: "Official guide to installing Nextcloud"
      },
      {
        title: "Self-Hosting for Beginners",
        url: "https://github.com/awesome-selfhosted/awesome-selfhosted",
        description: "List of self-hosted services and guides"
      }
    ],
    checklist: [
      { id: 1, text: "Choose service to self-host", completed: false },
      { id: 2, text: "Prepare server hardware/VPS", completed: false },
      { id: 3, text: "Install operating system", completed: false },
      { id: 4, text: "Install and configure service", completed: false },
      { id: 5, text: "Test with real data", completed: false },
      { id: 6, text: "Document setup process", completed: false }
    ],
    reflectionQuestions: [
      "What challenges did you face during setup?",
      "How does self-hosting compare to commercial services?",
      "Would you recommend this to others?"
    ]
  },
  {
    id: 8,
    title: "Zero Commercial Software Day",
    description: "Go one full day using only open-source and free software. No proprietary applications allowed!",
    difficulty: 'medium',
    category: 'usage',
    xpReward: 50,
    icon: '🔓',
    steps: [
      "Plan your day's tasks and identify needed software",
      "Find open-source alternatives for all tools",
      "Use only FOSS (Free and Open-Source Software) for 24 hours",
      "Document any challenges or limitations",
      "Note which alternatives worked surprisingly well",
      "Reflect on the experience"
    ],
    resources: [
      {
        title: "FOSS Alternatives List",
        url: "https://www.opensourcealternative.to/",
        description: "Comprehensive list of open-source alternatives"
      }
    ],
    checklist: [
      { id: 1, text: "List all software you typically use", completed: false },
      { id: 2, text: "Find FOSS alternatives for each", completed: false },
      { id: 3, text: "Install needed FOSS applications", completed: false },
      { id: 4, text: "Complete full day using only FOSS", completed: false },
      { id: 5, text: "Document experience", completed: false }
    ],
    reflectionQuestions: [
      "Which FOSS tools exceeded your expectations?",
      "What was most challenging?",
      "Could you continue using FOSS tools long-term?"
    ]
  },
  {
    id: 9,
    title: "Calculate Your School's Software Costs",
    description: "Research and calculate how much your school spends annually on software licenses. Compare with NIRD alternatives.",
    difficulty: 'easy',
    category: 'community',
    xpReward: 35,
    icon: '💰',
    steps: [
      "Research your school's software licenses (Windows, Office, Adobe, etc.)",
      "Calculate annual licensing costs per product",
      "Find open-source alternatives for each",
      "Calculate potential savings with NIRD approach",
      "Create a mini report with findings",
      "Present to school administration or IT department"
    ],
    resources: [
      {
        title: "Education Software Pricing",
        url: "https://www.microsoft.com/en-us/education/products/office",
        description: "Microsoft Office education pricing"
      }
    ],
    checklist: [
      { id: 1, text: "List all commercial software used", completed: false },
      { id: 2, text: "Research licensing costs", completed: false },
      { id: 3, text: "Find FOSS alternatives", completed: false },
      { id: 4, text: "Calculate potential savings", completed: false },
      { id: 5, text: "Create report", completed: false }
    ],
    reflectionQuestions: [
      "How much does your school spend annually?",
      "What percentage could be saved with FOSS?",
      "What would be the biggest implementation challenges?"
    ]
  },
  {
    id: 10,
    title: "Join an Open-Source Community",
    description: "Participate in an open-source project community. Report a bug, suggest a feature, or help with documentation.",
    difficulty: 'medium',
    category: 'community',
    xpReward: 70,
    icon: '🌍',
    steps: [
      "Choose an open-source project you use regularly",
      "Read the project's contribution guidelines",
      "Join their community (Discord, forums, GitHub)",
      "Introduce yourself to the community",
      "Make a contribution (bug report, feature request, or documentation)",
      "Engage in discussions and help others if possible"
    ],
    resources: [
      {
        title: "First Timers Only",
        url: "https://www.firsttimersonly.com/",
        description: "Find beginner-friendly open-source projects"
      },
      {
        title: "How to Contribute to Open Source",
        url: "https://opensource.guide/how-to-contribute/",
        description: "Complete guide to open-source contribution"
      }
    ],
    checklist: [
      { id: 1, text: "Choose an open-source project", completed: false },
      { id: 2, text: "Read contribution guidelines", completed: false },
      { id: 3, text: "Join community platform", completed: false },
      { id: 4, text: "Introduce yourself", completed: false },
      { id: 5, text: "Make first contribution", completed: false }
    ],
    reflectionQuestions: [
      "How welcoming was the community?",
      "What did you learn from the experience?",
      "Will you continue contributing?"
    ]
  }
];

export const WEEKLY_CHALLENGE_COUNT = 3;
export const DAILY_CHALLENGE_COUNT = 1;
