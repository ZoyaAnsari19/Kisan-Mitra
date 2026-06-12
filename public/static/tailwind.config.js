/* Premium Rural-Luxury Color System for Kisan Mitra */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest:    '#1F3A2E',   // Deep Forest Green — primary text & dark surfaces
        'forest-soft': '#2C4A3B',
        olive:     '#4A5D3A',   // Olive Green — secondary accents
        'olive-deep': '#3A4A2D',
        sand:      '#E6D7B8',   // Warm Sand
        clay:      '#D4B896',   // Clay Beige
        ivory:     '#F7F3EA',   // Soft Ivory — main background
        'ivory-deep': '#EFE9DA',
        brown:     '#6B4F35',   // Natural Brown
        'brown-soft': '#8B6F4E',
        gold:      '#B89968',   // Muted Gold accents
        'gold-deep': '#9A7F4F',
        copper:    '#A0673C',   // Copper accent
        dusty:     '#7A8B6B',   // Dusty Green
        cream:     '#FAF6EE',
        bone:      '#EDE5D2',
      },
      fontFamily: {
        serif:  ['Fraunces', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        hindi:  ['Tiro Devanagari Hindi', 'serif'],
        mono:   ['DM Mono', 'monospace'],
      },
      fontSize: {
        'display':  ['clamp(3.5rem, 9vw, 9rem)',   { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'mega':     ['clamp(2.5rem, 6.5vw, 6.5rem)',{ lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'huge':     ['clamp(2rem, 4.5vw, 4.5rem)',  { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'editorial':['clamp(1.5rem, 2.5vw, 2.25rem)',{ lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'soft':    '0 1px 2px rgba(31,58,46,0.04), 0 8px 32px -8px rgba(31,58,46,0.08)',
        'depth':   '0 20px 50px -20px rgba(31,58,46,0.18), 0 4px 10px -4px rgba(31,58,46,0.06)',
        'premium': '0 30px 80px -30px rgba(31,58,46,0.25), 0 10px 30px -10px rgba(107,79,53,0.10)',
        'gold':    '0 20px 50px -20px rgba(184,153,104,0.35)',
        'inner-soft': 'inset 0 1px 2px rgba(31,58,46,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'xl2':  '1.25rem',
        '4xl':  '2rem',
        '5xl':  '2.5rem',
        'organic': '60% 40% 50% 50% / 50% 60% 40% 50%',
      },
      letterSpacing: {
        'editorial': '-0.025em',
        'wide-lux':  '0.18em',
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 14s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'orbit': 'orbit 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%':      { transform: 'translateY(-14px) translateX(6px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(12%,9%)' },
          '70%': { transform: 'translate(9%,4%)' },
          '90%': { transform: 'translate(-1%,7%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
};
