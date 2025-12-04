import { Attack } from '../types/game';

export const attacks: Attack[] = [
  {
    id: 1,
    title: "End of Support for Windows 10",
    description: "Microsoft has ended support for Windows 10 on your school computers. The tech empire wants you to upgrade to expensive new systems. What will you do?",
    goodOption: {
      label: "Switch to Linux + Open-source Office",
      explanation: "Save costs, maintain independence, and keep existing hardware running smoothly with free, open-source software."
    },
    badOption: {
      label: "Buy new hardware + Paid Office licenses",
      explanation: "High costs, increased dependence on large companies, and unnecessary hardware waste."
    }
  },
  {
    id: 2,
    title: "Student Devices Crisis",
    description: "Many students don't have access to laptops. The tech companies offer expensive tablet leasing programs. How will you respond?",
    goodOption: {
      label: "Recycle old computers with lightweight Linux",
      explanation: "Transform outdated hardware into functional student devices using lightweight Linux distributions at minimal cost."
    },
    badOption: {
      label: "Sign a 3-year tablet leasing contract",
      explanation: "Lock into expensive recurring payments and dependency on proprietary ecosystems."
    }
  },
  {
    id: 3,
    title: "Cloud Storage Costs Rising",
    description: "Your cloud storage provider is increasing prices by 200%. They suggest upgrading to their premium enterprise plan. What's your move?",
    goodOption: {
      label: "Deploy Nextcloud on local server",
      explanation: "Own your data, control your costs, and maintain privacy with self-hosted open-source cloud storage."
    },
    badOption: {
      label: "Accept the price increase and upgrade",
      explanation: "Become more dependent on external providers with ever-increasing costs and less control."
    }
  },
  {
    id: 4,
    title: "Software Licensing Audit",
    description: "A big software company is auditing your licenses and demanding expensive renewals. The pressure is mounting. How do you handle this?",
    goodOption: {
      label: "Migrate to LibreOffice and FOSS alternatives",
      explanation: "Eliminate licensing fees forever, ensure compliance, and support ethical software development."
    },
    badOption: {
      label: "Pay for expensive license renewals",
      explanation: "Continue the cycle of recurring costs and vendor lock-in."
    }
  },
  {
    id: 5,
    title: "Learning Management System",
    description: "Your current LMS contract is expiring. Vendors are offering feature-rich platforms at premium prices. What will you choose?",
    goodOption: {
      label: "Implement Moodle open-source LMS",
      explanation: "Full-featured, customizable, community-supported, and completely free learning platform."
    },
    badOption: {
      label: "Subscribe to proprietary LMS platform",
      explanation: "Ongoing subscription costs, data privacy concerns, and limited customization."
    }
  },
  {
    id: 6,
    title: "Video Conferencing Solution",
    description: "Remote learning requires video conferencing. A major provider offers premium plans with advanced features at a high monthly cost. What's your decision?",
    goodOption: {
      label: "Use Jitsi Meet or BigBlueButton",
      explanation: "Self-hosted, open-source video conferencing with no user limits, complete privacy control, and zero licensing costs."
    },
    badOption: {
      label: "Subscribe to premium Zoom/Teams enterprise",
      explanation: "Monthly fees per user, data collected by third parties, and dependency on external service availability."
    }
  },
  {
    id: 7,
    title: "Email System Upgrade",
    description: "Your school email needs modernization. Cloud providers promise easy migration and management for a monthly per-user fee. What approach will you take?",
    goodOption: {
      label: "Deploy open-source email server (Zimbra/iRedMail)",
      explanation: "Complete control over student data, no monthly fees, enhanced privacy, and customizable features."
    },
    badOption: {
      label: "Migrate to Google Workspace or Microsoft 365",
      explanation: "Recurring costs, student data stored on external servers, privacy concerns, and vendor dependency."
    }
  },
  {
    id: 8,
    title: "Network Security Challenge",
    description: "Cybersecurity threats are increasing. Companies offer expensive managed firewall and security solutions. How will you protect your network?",
    goodOption: {
      label: "Implement pfSense or OPNsense firewall",
      explanation: "Enterprise-grade open-source security, community support, regular updates, and complete network control without licensing fees."
    },
    badOption: {
      label: "Purchase proprietary security appliances",
      explanation: "High upfront costs, annual licensing fees, vendor lock-in, and limited customization options."
    }
  },
  {
    id: 9,
    title: "Graphics and Design Software",
    description: "Art and design classes need professional software. Adobe offers educational licenses but costs thousands annually. What will you do?",
    goodOption: {
      label: "Use GIMP, Inkscape, and Krita",
      explanation: "Professional-grade open-source tools, free forever, compatible with industry formats, and great learning resources."
    },
    badOption: {
      label: "Purchase Adobe Creative Cloud licenses",
      explanation: "Expensive annual subscriptions, cloud dependency, and students lose access after graduation."
    }
  },
  {
    id: 10,
    title: "Server Infrastructure Replacement",
    description: "Your aging servers need replacement. Vendors push expensive proprietary server solutions with ongoing support contracts. What's your strategy?",
    goodOption: {
      label: "Build servers with commodity hardware + Linux",
      explanation: "Lower costs, flexible configurations, strong community support, and ability to repurpose existing hardware."
    },
    badOption: {
      label: "Buy branded servers with proprietary OS",
      explanation: "Premium pricing, mandatory support contracts, vendor lock-in, and limited hardware flexibility."
    }
  },
  {
    id: 11,
    title: "Content Filtering System",
    description: "Schools need web filtering for student safety. Commercial solutions cost thousands per year. How will you implement filtering?",
    goodOption: {
      label: "Deploy Pi-hole or Squid proxy server",
      explanation: "Open-source filtering, customizable block lists, detailed logging, and zero licensing costs."
    },
    badOption: {
      label: "Subscribe to commercial filtering service",
      explanation: "Annual subscription fees, less control over filtering policies, and dependency on external service."
    }
  },
  {
    id: 12,
    title: "Digital Library Platform",
    description: "The school library needs a modern digital catalog system. Commercial library software vendors offer comprehensive but expensive solutions. Your choice?",
    goodOption: {
      label: "Implement Koha or Evergreen ILS",
      explanation: "Full-featured open-source library systems used worldwide, active communities, and customizable to your needs."
    },
    badOption: {
      label: "Purchase proprietary library management system",
      explanation: "High licensing costs, annual maintenance fees, limited customization, and vendor dependency."
    }
  }
];

export const INITIAL_HEARTS = 12;
export const MAX_ATTACKS = attacks.length;
