// Sustainable technologies tracking

export interface Technology {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'os' | 'software' | 'hardware' | 'service' | 'practice';
  discoveredAt?: string;
}

export const allTechnologies: Technology[] = [
  {
    id: 'linux',
    name: 'Linux',
    description: 'Open-source operating system alternative to Windows',
    icon: '🐧',
    category: 'os'
  },
  {
    id: 'libreoffice',
    name: 'LibreOffice',
    description: 'Free and open-source office suite',
    icon: '📝',
    category: 'software'
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    description: 'Self-hosted cloud storage solution',
    icon: '☁️',
    category: 'service'
  },
  {
    id: 'reuse-hardware',
    name: 'Hardware Reuse',
    description: 'Extending device lifespan with lightweight Linux',
    icon: '♻️',
    category: 'hardware'
  },
  {
    id: 'moodle',
    name: 'Moodle',
    description: 'Open-source learning management system',
    icon: '🎓',
    category: 'service'
  },
  {
    id: 'jitsi',
    name: 'Jitsi Meet',
    description: 'Open-source video conferencing',
    icon: '📹',
    category: 'service'
  },
  {
    id: 'gimp',
    name: 'GIMP',
    description: 'Free image editor alternative to Photoshop',
    icon: '🎨',
    category: 'software'
  },
  {
    id: 'pfsense',
    name: 'pfSense',
    description: 'Open-source firewall and router',
    icon: '🛡️',
    category: 'service'
  },
  {
    id: 'koha',
    name: 'Koha',
    description: 'Open-source library management system',
    icon: '📚',
    category: 'service'
  }
];

// Map attack IDs to technologies discovered
export const attackToTechnologies: { [key: number]: string[] } = {
  1: ['linux', 'libreoffice'], // Windows 10 end of support
  2: ['reuse-hardware', 'linux'], // Student devices crisis
  3: ['nextcloud'], // Cloud storage costs
  4: ['libreoffice'], // Software licensing audit
  5: ['moodle'], // Learning Management System
  6: ['jitsi'], // Video conferencing
  7: ['nextcloud'], // Email system (could also be Zimbra)
  8: ['pfsense'], // Network security
  9: ['gimp'], // Graphics software
  10: ['linux'], // Server infrastructure
  11: ['pfsense'], // Content filtering
  12: ['koha'] // Digital library
};

const STORAGE_KEY_TECHNOLOGIES = 'village-res-discovered-technologies';

export function getDiscoveredTechnologies(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_TECHNOLOGIES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function discoverTechnology(techId: string): void {
  if (typeof window === 'undefined') return;
  const discovered = getDiscoveredTechnologies();
  if (!discovered.includes(techId)) {
    discovered.push(techId);
    localStorage.setItem(STORAGE_KEY_TECHNOLOGIES, JSON.stringify(discovered));
  }
}

export function discoverTechnologiesFromAttack(attackId: number): void {
  const techIds = attackToTechnologies[attackId] || [];
  techIds.forEach(techId => discoverTechnology(techId));
}

export function getTechnologyDetails(techId: string): Technology | undefined {
  return allTechnologies.find(t => t.id === techId);
}

