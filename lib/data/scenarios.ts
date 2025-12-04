import { MiniScenario } from '../types/challenge';

export const miniScenarios: MiniScenario[] = [
  {
    id: 1,
    title: "The Cheap Hardware Trap",
    description: "Making sustainable purchasing decisions",
    situation: "A vendor offers you 50 laptops at 40% below market price. However, they come with a proprietary OS that requires expensive annual licensing, and the hardware cannot be upgraded or repaired. The vendor says 'everyone is buying these!' What will you do?",
    choices: [
      {
        id: 1,
        text: "Accept the offer - it's too cheap to refuse!",
        feedback: "This creates vendor lock-in and future costs will exceed initial savings.",
        isOptimal: false,
        consequence: "Year 1: Save $12,000. Years 2-5: Pay $25,000 in licenses + unable to repair = Total loss: $13,000"
      },
      {
        id: 2,
        text: "Reject and find hardware that supports open-source OS",
        feedback: "Excellent! You prioritize long-term sustainability over short-term savings.",
        isOptimal: true,
        consequence: "Initial cost higher by $8,000, but zero licensing fees + 10-year lifespan + repairable = Save $40,000 over time"
      },
      {
        id: 3,
        text: "Negotiate to remove proprietary OS and install Linux",
        feedback: "Good strategic thinking! You're reducing unnecessary costs.",
        isOptimal: true,
        consequence: "Vendor agrees to $25/unit discount for no OS. You save $1,250 + install Ubuntu for free"
      },
      {
        id: 4,
        text: "Buy half now, evaluate before buying more",
        feedback: "Cautious, but you'll still face the same lock-in problem with 25 devices.",
        isOptimal: false,
        consequence: "You discover the lock-in issue after spending $6,000. Now stuck with incompatible infrastructure."
      }
    ],
    correctChoiceIndex: 1,
    explanation: "True cost analysis must include licensing, repairability, and longevity. NIRD principles teach us to evaluate Total Cost of Ownership (TCO), not just upfront price. The cheapest option often becomes the most expensive.",
    category: 'cost-analysis',
    xpReward: 80
  },
  {
    id: 2,
    title: "The Cloud Storage Crisis",
    description: "Data sovereignty vs. convenience",
    situation: "Your current cloud storage provider just increased prices by 300%. They claim it's due to 'enhanced security features' you didn't ask for. Your school's data is stored on their servers. Student records, grades, and personal information are all there. What's your next move?",
    choices: [
      {
        id: 1,
        text: "Pay the increase - we can't risk losing our data",
        feedback: "You're being held hostage by vendor lock-in. This will happen again.",
        isOptimal: false,
        consequence: "Budget crisis: $15,000/year becomes $45,000/year. No money left for teachers or equipment."
      },
      {
        id: 2,
        text: "Migrate to another commercial cloud provider",
        feedback: "You're just moving from one trap to another. What happens when they raise prices?",
        isOptimal: false,
        consequence: "Migration costs $8,000 + new provider starts cheap but will increase prices in 18 months."
      },
      {
        id: 3,
        text: "Deploy self-hosted Nextcloud on school servers",
        feedback: "Perfect! You regain control of your data and eliminate recurring costs.",
        isOptimal: true,
        consequence: "One-time setup: $5,000 (server + setup). Yearly cost: $500 (electricity + maintenance). Own your data forever."
      },
      {
        id: 4,
        text: "Negotiate with the current provider for a discount",
        feedback: "Temporary relief, but you're still dependent on their goodwill and future pricing.",
        isOptimal: false,
        consequence: "They reduce increase to 200%. You're still paying $30,000/year and don't own your data."
      }
    ],
    correctChoiceIndex: 2,
    explanation: "Data sovereignty means owning and controlling your own data. Self-hosted open-source solutions like Nextcloud eliminate recurring costs and vendor dependency. The initial investment pays for itself within 1-2 years.",
    category: 'sustainability',
    xpReward: 90
  },
  {
    id: 3,
    title: "The Software Audit",
    description: "License compliance nightmare",
    situation: "A major software company is auditing your school's licenses. They claim you're using 25 unlicensed copies of their software and demand $75,000 in back-payments plus future licensing fees of $15,000/year. Your IT department says some teachers installed the software without authorization. What do you do?",
    choices: [
      {
        id: 1,
        text: "Pay the fine and continue using their software",
        feedback: "You're rewarding bad behavior and ensuring future financial vulnerability.",
        isOptimal: false,
        consequence: "$75,000 fine + $15,000/year forever = Budget destroyed. Risk of future audits."
      },
      {
        id: 2,
        text: "Negotiate payment plan and downgrade number of licenses",
        feedback: "Still paying for past mistakes and ongoing dependency. Not a sustainable solution.",
        isOptimal: false,
        consequence: "Negotiate to $50,000 over 2 years + $8,000/year. Still expensive and dependent."
      },
      {
        id: 3,
        text: "Switch entirely to LibreOffice and open-source alternatives",
        feedback: "Excellent! Eliminate the problem at its root and prevent future compliance issues.",
        isOptimal: true,
        consequence: "Migration cost: $3,000 (training + setup). Ongoing cost: $0. Compliance risk: $0. Future audits: impossible."
      },
      {
        id: 4,
        text: "Fight the audit and claim educational fair use",
        feedback: "Legal battles are expensive and outcome is uncertain. Not a sustainable strategy.",
        isOptimal: false,
        consequence: "Legal fees: $30,000. Lose the case anyway. Still owe $75,000 + damaged reputation."
      }
    ],
    correctChoiceIndex: 2,
    explanation: "Open-source software eliminates licensing compliance risks entirely. LibreOffice, GIMP, Inkscape, and other FOSS alternatives provide professional functionality without the legal and financial vulnerabilities of proprietary software.",
    category: 'vendor-management',
    xpReward: 100
  },
  {
    id: 4,
    title: "The E-Waste Dilemma",
    description: "Environmental responsibility",
    situation: "Your school has 80 computers that are 7 years old. A vendor says they're 'obsolete' and offers to 'recycle' them for $500, then sell you new computers for $60,000. However, a teacher mentions these computers could run lightweight Linux distributions perfectly fine. What's your decision?",
    choices: [
      {
        id: 1,
        text: "Accept the vendor's offer - old computers are useless",
        feedback: "You're contributing to e-waste and spending money unnecessarily.",
        isOptimal: false,
        consequence: "$60,500 spent. 80 working computers in landfill. Vendor makes profit from both recycling AND new sales."
      },
      {
        id: 2,
        text: "Install lightweight Linux (Lubuntu/Linux Mint) on existing computers",
        feedback: "Perfect! You extend hardware life, save money, and reduce environmental impact.",
        isOptimal: true,
        consequence: "Cost: $800 (installation + training). Computers run fast for 3-5 more years. Save $59,700 + help environment."
      },
      {
        id: 3,
        text: "Keep half old computers, buy half new ones",
        feedback: "Better than full replacement, but still wasteful. Why not maximize existing hardware?",
        isOptimal: false,
        consequence: "$30,250 spent. 40 computers to landfill. Half-measure solution that wastes resources."
      },
      {
        id: 4,
        text: "Donate old computers to students who need them at home",
        feedback: "Good intention, but Windows 10 on old hardware will frustrate users. Better to install Linux first!",
        isOptimal: false,
        consequence: "Students receive slow, frustrating computers. Many end up abandoned. Good idea, wrong execution."
      }
    ],
    correctChoiceIndex: 1,
    explanation: "Lightweight Linux distributions like Lubuntu, Linux Mint XFCE, or Peppermint OS can breathe new life into old hardware. A 7-year-old computer running Linux often outperforms a new computer bloated with proprietary software. This is NIRD's hardware reuse principle in action.",
    category: 'sustainability',
    xpReward: 85
  },
  {
    id: 5,
    title: "The Video Conferencing Decision",
    description: "Privacy vs. convenience trade-offs",
    situation: "Remote learning requires video conferencing. A popular commercial provider offers easy setup and 'enterprise features' for $25/user/month (300 users = $7,500/month). An IT-savvy teacher suggests self-hosting BigBlueButton or Jitsi for free, but says it requires server setup and maintenance. What do you choose?",
    choices: [
      {
        id: 1,
        text: "Subscribe to commercial provider - it's easier",
        feedback: "Convenience costs $90,000/year. Your data and meetings are monitored by third parties.",
        isOptimal: false,
        consequence: "$90,000/year forever. Student privacy compromised. Vendor controls your education infrastructure."
      },
      {
        id: 2,
        text: "Self-host BigBlueButton on school servers",
        feedback: "Excellent! Complete control, privacy protection, and significant cost savings.",
        isOptimal: true,
        consequence: "Setup cost: $4,000 (server + installation). Yearly cost: $800 (maintenance). Own your data. Save $85,000/year."
      },
      {
        id: 3,
        text: "Use free tier of commercial service with limitations",
        feedback: "You get what you pay for: 40-minute limits, ads, data collection, and unreliable service.",
        isOptimal: false,
        consequence: "Free but frustrating. Classes interrupted at 40 minutes. Students' data still collected and sold."
      },
      {
        id: 4,
        text: "Hybrid: commercial for admin, self-hosted for students",
        feedback: "Unnecessary complexity and partial costs. Why pay for any commercial service?",
        isOptimal: false,
        consequence: "$30,000/year for admin use. Complex infrastructure. Split systems confuse users."
      }
    ],
    correctChoiceIndex: 1,
    explanation: "Self-hosted open-source video conferencing (BigBlueButton, Jitsi) provides enterprise features, complete privacy, no user limits, and no recurring costs. The initial setup investment pays for itself within 2 months compared to commercial subscriptions.",
    category: 'cost-analysis',
    xpReward: 95
  }
];

export const SCENARIO_CATEGORIES = [
  'sustainability',
  'vendor-management',
  'decision-making',
  'cost-analysis'
] as const;
