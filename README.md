# Village Résistant 🏰

An interactive educational game that teaches schools about digital independence, open-source solutions, and sustainable technology practices through the NIRD philosophy.

## About the Game

Village Résistant simulates the challenges educational institutions face when dealing with digital infrastructure decisions. Players defend their "digital village" (school) from attacks by the "tech empire" by choosing between sustainable NIRD solutions and expensive commercial alternatives.

## What is NIRD?

NIRD represents three core principles for sustainable technology in education:

- **🛡️ Digital Independence**: Freedom from vendor lock-in and proprietary control
- **🔓 Open-source Software**: Using free, transparent, community-driven solutions
- **♻️ Reuse Hardware**: Extending device lifespan with lightweight Linux distributions

## Game Flow

1. **Home Page**: Introduction to the game and NIRD principles
2. **Game Start**: Story setup and game mechanics explanation
3. **12 Attacks**: Players face different technological challenges
4. **Result Page**: Score evaluation with personalized tips
5. **Scenarios**: Interactive decision-making scenarios with real consequences
6. **Challenges**: Real-world practice challenges to apply NIRD principles
7. **Learn Page**: Educational content about NIRD and real-world examples

## Features

### Main Game
- Interactive decision-making gameplay with 12 attacks
- Real-world scenarios based on actual school challenges
- Randomized option ordering to prevent pattern recognition
- Visual feedback with hearts system and progress tracking
- Responsive design for all devices
- Beautiful animations and transitions

### Post-Game Learning Modules

#### Mini-Scenarios (Decision-Making Simulations)
- 5 detailed real-world scenarios with multiple choices
- See immediate consequences of each decision
- TCO (Total Cost of Ownership) calculations
- Category-based learning (Sustainability, Cost Analysis, Vendor Management)
- XP rewards system for optimal choices
- Interactive feedback with explanations

#### Challenges (Real-World Practice)
- 10 practical challenges across 3 difficulty levels (Easy, Medium, Hard)
- Real-life applications of NIRD principles
- Categories: Usage, Practice, Teaching, Community
- XP progression tracking
- Streak system for consistency
- Completion stats dashboard

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Deployment**: Ready for Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd village-res
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
village-res/
├── app/
│   ├── game/
│   │   ├── attack/[id]/
│   │   │   └── page.tsx      # Dynamic attack pages
│   │   └── start/
│   │       └── page.tsx      # Game introduction
│   ├── learn/
│   │   └── page.tsx          # Educational content
│   ├── result/
│   │   └── page.tsx          # Score and evaluation
│   ├── layout.tsx            # Root layout with GameProvider
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles and animations
├── components/
│   ├── AttackCard.tsx        # Interactive choice component
│   ├── HeartsBar.tsx         # Village health indicator
│   ├── Layout.tsx            # Page layout with nav/footer
│   ├── ProgressBar.tsx       # Attack progress tracker
│   └── ScoreBadge.tsx        # Result score display
├── lib/
│   ├── context/
│   │   └── GameContext.tsx   # Game state management
│   ├── data/
│   │   └── attacks.ts        # Game scenarios data
│   └── types/
│       └── game.ts           # TypeScript interfaces
└── package.json
```

## Game Mechanics

### Main Game
- Players face 12 different technological challenges
- Each challenge has two options (randomly ordered):
  - **NIRD Solution**: Gains 1 point, maintains village health
  - **Commercial Solution**: No points, loses 1 heart
- Final score determines the evaluation:
  - 100%: "100% Resistant School!"
  - 60-99%: "You're on the right track!"
  - 0-59%: "The tech empire has taken over..."

### Attack Scenarios

1. End of Support for Windows 10
2. Student Devices Crisis
3. Cloud Storage Costs Rising
4. Software Licensing Audit
5. Learning Management System
6. Video Conferencing Solution
7. Email System Upgrade
8. Network Security Challenge
9. Graphics and Design Software
10. Server Infrastructure Replacement
11. Content Filtering System
12. Digital Library Platform

Each scenario is based on real challenges schools face and presents both sustainable and commercial solutions.

### Mini-Scenarios (Post-Game)

1. **The Cheap Hardware Trap** - Learning about vendor lock-in and TCO
2. **The Cloud Storage Crisis** - Data sovereignty vs. convenience
3. **The Software Audit** - License compliance and alternatives
4. **The E-Waste Dilemma** - Environmental responsibility
5. **The Video Conferencing Decision** - Privacy vs. convenience trade-offs

### Challenges (Practice Activities)

10 real-world challenges including:
- Reduce Internet Usage by 20%
- Full Day with Linux
- Try LibreOffice Week
- Teach NIRD in Class
- Revive an Old Computer
- Open-Source Alternatives Research
- Self-Host a Service
- Zero Commercial Software Day
- Calculate School's Software Costs
- Join an Open-Source Community

## Educational Goals

- Raise awareness about open-source alternatives
- Demonstrate cost savings of NIRD principles
- Encourage sustainable technology practices
- Reduce electronic waste through hardware reuse
- Promote digital independence in education

## Future Enhancements

Potential features for future development:

- Leaderboard with Supabase integration
- More attack scenarios
- Multiplayer mode for schools to compete
- Detailed case studies of successful implementations
- Downloadable NIRD implementation guides
- Teacher dashboard for classroom use

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is designed for educational purposes to promote digital independence and sustainable technology in schools.

## Acknowledgments

- Inspired by real-world challenges in educational technology
- Built to support the NIRD philosophy
- Dedicated to schools worldwide striving for digital independence

## Contact

For questions or feedback about the game, please open an issue on GitHub.

---

**Play the game and defend your digital village! 🛡️**
