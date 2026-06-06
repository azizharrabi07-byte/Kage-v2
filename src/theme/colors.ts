export interface ThemeColors {
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
  };
  accent: {
    primary: string;
    neon: string;
    glow: string;
    gold: string;
    goldGlow: string;
    blue: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    inverse: string;
    cream: string;
  };
  glass: {
    light: string;
    medium: string;
    border: string;
    borderLight: string;
  };
  status: {
    ready: string;
    warning: string;
    danger: string;
    recovery: string;
  };
  dojo: {
    shield: string;
    chain: string;
    pact: string;
    leaderboard: string;
    cryActive: string;
  };
  kage: {
    void: string;
    sumi: string;
    kachi: string;
    neonCrimson: string;
    hisui: string;
    kin: string;
    sunset: string;
    indigo: string;
    shu: string;
    parchment: string;
    parchmentCard: string;
    parchmentBorder: string;
  };
}

export const darkColors: ThemeColors = {
  bg: {
    primary: '#0B0B10',
    secondary: '#0F0F1A',
    tertiary: '#1A1A24',
    card: '#1A1A24',
  },
  accent: {
    primary: '#E31E24',
    neon: '#FF3B30',
    glow: 'rgba(227,30,36,0.3)',
    gold: '#C9A84C',
    goldGlow: 'rgba(201,168,76,0.2)',
    blue: '#1A3A5C',
  },
  text: {
    primary: '#F5F0E8',
    secondary: 'rgba(245,240,232,0.55)',
    muted: '#8E9EAF',
    accent: '#E31E24',
    inverse: '#0B0B10',
    cream: '#EAE4D7',
  },
  glass: {
    light: 'rgba(255,255,255,0.03)',
    medium: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.08)',
    borderLight: 'rgba(255,255,255,0.04)',
  },
  status: {
    ready: '#00CC88',
    warning: '#D4A030',
    danger: '#E31E24',
    recovery: '#22D3EE',
  },
  dojo: {
    shield: '#C9A84C',
    chain: '#E31E24',
    pact: '#D4A030',
    leaderboard: '#A8883C',
    cryActive: '#E31E24',
  },
  kage: {
    void: '#0B0B10',
    sumi: '#1A1A24',
    kachi: '#2A2A3A',
    neonCrimson: '#E31E24',
    hisui: '#22D3EE',
    kin: '#F2C94C',
    sunset: '#E87A5D',
    indigo: '#6A4E9B',
    shu: '#FF2040',
    parchment: '#EAE4D7',
    parchmentCard: '#E5DFD0',
    parchmentBorder: '#C2B7A0',
  },
};

export const lightColors: ThemeColors = {
  bg: {
    primary: '#EAE4D7',
    secondary: '#EDE6D6',
    tertiary: '#E0D6C4',
    card: '#EDE6D6',
  },
  accent: {
    primary: '#C8102E',
    neon: '#E83030',
    glow: 'rgba(200,16,46,0.15)',
    gold: '#B8983C',
    goldGlow: 'rgba(184,152,60,0.15)',
    blue: '#D4DCE8',
  },
  text: {
    primary: '#1A1A2E',
    secondary: 'rgba(26,26,46,0.6)',
    muted: 'rgba(26,26,46,0.35)',
    accent: '#C8102E',
    inverse: '#EAE4D7',
    cream: '#EAE4D7',
  },
  glass: {
    light: 'rgba(0,0,0,0.02)',
    medium: 'rgba(0,0,0,0.04)',
    border: 'rgba(0,0,0,0.08)',
    borderLight: 'rgba(0,0,0,0.04)',
  },
  status: {
    ready: '#00CC88',
    warning: '#D4A030',
    danger: '#C8102E',
    recovery: '#3B82F6',
  },
  dojo: {
    shield: '#B8983C',
    chain: '#E82040',
    pact: '#B89030',
    leaderboard: '#98782C',
    cryActive: '#E82040',
  },
  kage: {
    void: '#EAE4D7',
    sumi: '#E5DFD0',
    kachi: '#D8CEBA',
    neonCrimson: '#C8102E',
    hisui: '#059669',
    kin: '#B8983C',
    sunset: '#C76B50',
    indigo: '#6A4E9B',
    shu: '#C8102E',
    parchment: '#EAE4D7',
    parchmentCard: '#E5DFD0',
    parchmentBorder: '#C2B7A0',
  },
};
