"use client";

interface VillageIllustrationProps {
  className?: string;
}

export default function VillageIllustration({
  className = "",
}: VillageIllustrationProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ciel avec dégradé */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F4FF" />
          </linearGradient>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>

        {/* Fond du ciel */}
        <rect width="800" height="500" fill="url(#skyGradient)" />

        {/* Soleil */}
        <circle cx="650" cy="80" r="50" fill="#FCD34D">
          <animate
            attributeName="r"
            values="50;55;50"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <g stroke="#FCD34D" strokeWidth="3" fill="none">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1={650 + 65 * Math.cos((angle * Math.PI) / 180)}
              y1={80 + 65 * Math.sin((angle * Math.PI) / 180)}
              x2={650 + 80 * Math.cos((angle * Math.PI) / 180)}
              y2={80 + 80 * Math.sin((angle * Math.PI) / 180)}
            >
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </g>

        {/* Nuages */}
        <g fill="white" opacity="0.9">
          <ellipse cx="150" cy="100" rx="50" ry="30">
            <animate
              attributeName="cx"
              values="150;170;150"
              dur="8s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="190" cy="90" rx="40" ry="25" />
          <ellipse cx="120" cy="95" rx="35" ry="20" />

          <ellipse cx="450" cy="70" rx="45" ry="25">
            <animate
              attributeName="cx"
              values="450;430;450"
              dur="10s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="490" cy="65" rx="35" ry="20" />
        </g>

        {/* Collines en arrière-plan */}
        <ellipse cx="200" cy="350" rx="250" ry="100" fill="#86EFAC" />
        <ellipse cx="600" cy="370" rx="300" ry="120" fill="#86EFAC" />

        {/* Sol principal */}
        <rect y="350" width="800" height="150" fill="url(#grassGradient)" />

        {/* Arbres */}
        <g>
          {/* Arbre 1 */}
          <rect x="95" y="280" width="15" height="70" fill="#92400E" />
          <circle cx="102" cy="260" r="40" fill="#059669" />
          <circle cx="80" cy="280" r="30" fill="#10B981" />
          <circle cx="125" cy="275" r="35" fill="#10B981" />

          {/* Arbre 2 */}
          <rect x="695" y="290" width="12" height="60" fill="#92400E" />
          <circle cx="701" cy="270" r="35" fill="#059669" />
          <circle cx="680" cy="285" r="28" fill="#10B981" />
          <circle cx="720" cy="280" r="30" fill="#10B981" />
        </g>

        {/* Maison principale (École) */}
        <g>
          {/* Corps de la maison */}
          <rect x="300" y="250" width="200" height="120" fill="#FEF3C7" />
          <rect
            x="300"
            y="250"
            width="200"
            height="120"
            fill="none"
            stroke="#D97706"
            strokeWidth="3"
          />

          {/* Toit */}
          <polygon points="280,250 400,170 520,250" fill="url(#roofGradient)" />
          <polygon
            points="280,250 400,170 520,250"
            fill="none"
            stroke="#991B1B"
            strokeWidth="3"
          />

          {/* Fenêtres */}
          <rect x="320" y="280" width="40" height="40" fill="#7DD3FC" />
          <rect
            x="320"
            y="280"
            width="40"
            height="40"
            fill="none"
            stroke="#0369A1"
            strokeWidth="2"
          />
          <line
            x1="340"
            y1="280"
            x2="340"
            y2="320"
            stroke="#0369A1"
            strokeWidth="2"
          />
          <line
            x1="320"
            y1="300"
            x2="360"
            y2="300"
            stroke="#0369A1"
            strokeWidth="2"
          />

          <rect x="440" y="280" width="40" height="40" fill="#7DD3FC" />
          <rect
            x="440"
            y="280"
            width="40"
            height="40"
            fill="none"
            stroke="#0369A1"
            strokeWidth="2"
          />
          <line
            x1="460"
            y1="280"
            x2="460"
            y2="320"
            stroke="#0369A1"
            strokeWidth="2"
          />
          <line
            x1="440"
            y1="300"
            x2="480"
            y2="300"
            stroke="#0369A1"
            strokeWidth="2"
          />

          {/* Porte */}
          <rect x="375" y="310" width="50" height="60" fill="#92400E" />
          <circle cx="415" cy="345" r="5" fill="#FCD34D" />

          {/* Panneau Linux/Tux */}
          <circle cx="400" cy="220" r="25" fill="white" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="400" cy="225" rx="15" ry="18" fill="#1E293B" />
          <ellipse cx="400" cy="215" rx="12" ry="10" fill="white" />
          <circle cx="395" cy="212" r="2" fill="#1E293B" />
          <circle cx="405" cy="212" r="2" fill="#1E293B" />
          <ellipse cx="400" cy="220" rx="4" ry="3" fill="#FCD34D" />
        </g>

        {/* Petite maison à gauche */}
        <g>
          <rect x="150" y="320" width="80" height="60" fill="#DBEAFE" />
          <polygon points="140,320 190,280 240,320" fill="#6366F1" />
          <rect x="175" y="345" width="30" height="35" fill="#92400E" />
          <rect x="160" y="330" width="20" height="20" fill="#7DD3FC" />
        </g>

        {/* Petite maison à droite */}
        <g>
          <rect x="570" y="310" width="90" height="70" fill="#FCE7F3" />
          <polygon points="560,310 615,260 670,310" fill="#EC4899" />
          <rect x="600" y="340" width="30" height="40" fill="#92400E" />
          <rect x="635" y="325" width="20" height="20" fill="#7DD3FC" />
        </g>

        {/* Chemin */}
        <path
          d="M400,370 Q400,420 350,450 Q300,480 250,500"
          fill="none"
          stroke="#D4A574"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M400,370 Q400,420 450,450 Q500,480 550,500"
          fill="none"
          stroke="#D4A574"
          strokeWidth="30"
          strokeLinecap="round"
        />

        {/* Personnages stylisés */}
        <g>
          {/* Personnage 1 */}
          <circle cx="320" cy="420" r="12" fill="#FBBF24" />
          <rect x="315" y="432" width="10" height="20" fill="#3B82F6" rx="3" />
          <line
            x1="320"
            y1="452"
            x2="315"
            y2="470"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <line
            x1="320"
            y1="452"
            x2="325"
            y2="470"
            stroke="#1E293B"
            strokeWidth="3"
          />

          {/* Personnage 2 */}
          <circle cx="360" cy="425" r="12" fill="#F472B6" />
          <rect x="355" y="437" width="10" height="20" fill="#10B981" rx="3" />
          <line
            x1="360"
            y1="457"
            x2="355"
            y2="475"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <line
            x1="360"
            y1="457"
            x2="365"
            y2="475"
            stroke="#1E293B"
            strokeWidth="3"
          />

          {/* Personnage 3 */}
          <circle cx="440" cy="422" r="12" fill="#A78BFA" />
          <rect x="435" y="434" width="10" height="20" fill="#F59E0B" rx="3" />
          <line
            x1="440"
            y1="454"
            x2="435"
            y2="472"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <line
            x1="440"
            y1="454"
            x2="445"
            y2="472"
            stroke="#1E293B"
            strokeWidth="3"
          />
        </g>

        {/* Drapeau NIRD */}
        <g>
          <line
            x1="400"
            y1="170"
            x2="400"
            y2="130"
            stroke="#92400E"
            strokeWidth="3"
          />
          <rect x="400" y="130" width="40" height="25" fill="#10B981">
            <animate
              attributeName="x"
              values="400;402;400"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>
          <text x="408" y="147" fill="white" fontSize="10" fontWeight="bold">
            NIRD
          </text>
        </g>

        {/* Étoiles/Particules flottantes */}
        {[
          { x: 100, y: 150 },
          { x: 250, y: 120 },
          { x: 550, y: 140 },
          { x: 700, y: 180 },
        ].map((pos, i) => (
          <circle key={i} cx={pos.x} cy={pos.y} r="3" fill="#FCD34D">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${2 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${pos.y};${pos.y - 10};${pos.y}`}
              dur={`${3 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
