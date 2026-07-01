/* ══════════════════════════════════════════════════
   WAYPOST — translations.js
   Skills translation library for the Career pillar.
   Maps military-spouse disruption scenarios to
   marketable professional language.
══════════════════════════════════════════════════ */

// ── Skill Categories ───────────────────────────────
const SKILL_CATEGORIES = [
  { id: 'administrative',   label: 'Administrative & Office Support', icon: '🗂️' },
  { id: 'healthcare',       label: 'Healthcare & Medical',            icon: '🏥' },
  { id: 'customer-service', label: 'Customer Service & Retail',       icon: '🛍️' },
  { id: 'education',        label: 'Education & Childcare',           icon: '📚' },
  { id: 'finance',          label: 'Finance & Accounting',            icon: '💰' },
  { id: 'technology',       label: 'Information Technology',          icon: '💻' },
  { id: 'marketing',        label: 'Marketing & Communications',      icon: '📣' },
  { id: 'management',       label: 'Management & Leadership',         icon: '📋' },
  { id: 'sales',            label: 'Sales & Business Development',    icon: '🤝' },
  { id: 'logistics',        label: 'Logistics & Supply Chain',        icon: '📦' },
  { id: 'food-service',     label: 'Food Service & Hospitality',      icon: '🍽️' },
  { id: 'creative',         label: 'Creative & Design',               icon: '🎨' },
  { id: 'legal',            label: 'Legal & Compliance',              icon: '⚖️' },
  { id: 'nonprofit',        label: 'Nonprofit & Social Services',     icon: '🌿' }
];

// ── Gap Types ──────────────────────────────────────
const GAP_TYPES = [
  { id: 'pcs-move',            label: 'PCS / Military Relocation',              icon: '🎖️' },
  { id: 'caregiving-children', label: 'Caregiving — Children',                  icon: '👶' },
  { id: 'caregiving-family',   label: 'Caregiving — Family Member',             icon: '❤️' },
  { id: 'deployment-support',  label: 'Supporting Spouse During Deployment',    icon: '🏠' },
  { id: 'remote-location',     label: 'Remote Duty Station / No Local Jobs',    icon: '📍' },
  { id: 'credential-transfer', label: 'License or Credential Transfer',         icon: '📜' },
  { id: 'other',               label: 'Other',                                  icon: '◎'  }
];

// ── Disruption Translations ────────────────────────
//    Each entry provides language for the profile view,
//    the gap explanation (resume / cover letter),
//    the interview answer, and the skills it surfaces.
const DISRUPTION_TRANSLATIONS = {
  'pcs-move': {
    label: 'PCS / Military Relocation',
    profileLanguage: `Career history reflects frequent geographic relocation in support of an active-duty service member's military assignments. Each transition required rapid integration into new communities, professional networks, and employment environments — often with minimal lead time and without an existing local support system.`,
    gapExplanation: `Employment gaps during this period reflect geographic constraints inherent to military life and an intentional commitment to supporting my family's service — not a departure from professional engagement or long-term career ambition.`,
    interviewAnswer: `My career includes periods of relocation in support of my spouse's military service. During each transition, I maintained professional momentum through [certifications / contract work / coursework / volunteer leadership]. These experiences have made me exceptionally fast at adapting to new environments, building working relationships quickly, and contributing value from my first week on the job. I don't see the transitions as gaps — I see them as proof that I can perform under conditions most professionals never face.`,
    coverLetterBridge: `My career path reflects the realities of military family life, including geographic transitions that required professional flexibility. I bring to this role not only my technical skills but a demonstrated ability to adapt quickly, integrate into new teams, and deliver results in unfamiliar environments.`,
    skills: [
      'Rapid adaptation to new environments and teams',
      'Cross-community relationship building from scratch',
      'Independent problem-solving under uncertainty',
      'Professional resilience through repeated change',
      'Navigating unfamiliar systems and processes efficiently'
    ]
  },

  'caregiving-children': {
    label: 'Caregiving — Children',
    profileLanguage: `Took an intentional career pause to provide full-time care for young children — a period that coincided with military relocation and the demands of managing a household, often as the sole adult present during deployments or extended field exercises.`,
    gapExplanation: `Employment gap reflects a deliberate choice to provide full-time care for young children during critical early years. During this period, I maintained professional awareness through [certifications / reading / volunteer leadership / part-time or freelance engagement] in preparation for a focused return to work.`,
    interviewAnswer: `I took time away from traditional employment to care for my young children — a choice I made with intention and I'm proud of. During that time, I held [volunteer leadership roles / freelance projects / completed coursework] and stayed current in [relevant area]. I'm fully ready now, and I'd argue that the organizational skills, patience, and ability to manage competing demands under pressure that I built during those years make me a stronger professional, not a weaker one.`,
    coverLetterBridge: `After a period of dedicated family caregiving, I'm returning to the workforce with sharpened organizational skills, renewed professional focus, and a strong motivation to contribute meaningfully. My time away from traditional employment has deepened my capacity to prioritize, communicate, and manage complexity — skills I'll bring directly to this role.`,
    skills: [
      'Household financial management and budgeting',
      'Multi-priority scheduling under daily pressure',
      'Pediatric health awareness and care coordination',
      'Crisis response and calm independent decision-making',
      'Community engagement and relationship-building'
    ]
  },

  'caregiving-family': {
    label: 'Caregiving — Family Member',
    profileLanguage: `Provided full-time care for a family member with a medical or age-related condition, managing care schedules, medical appointments, insurance and benefits coordination, and daily wellbeing across multiple competing priorities simultaneously.`,
    gapExplanation: `Employment gap reflects a period of full-time family caregiving — a responsibility I undertook deliberately, and one that demanded sustained organizational skill, healthcare system navigation, and emotional intelligence under real pressure.`,
    interviewAnswer: `I stepped away from employment to care for a family member who needed full-time support. Managing that situation gave me concrete experience in care coordination, navigating healthcare and insurance systems, making high-stakes decisions quickly, and sustaining performance under significant emotional weight. Those are skills that transfer directly to a professional setting, and I'm ready to direct them there.`,
    coverLetterBridge: `A period of family caregiving has given me real-world practice in care coordination, medical and insurance navigation, and sustained responsibility under complex conditions — experience that has sharpened exactly the skills this role requires.`,
    skills: [
      'Care coordination and multi-provider scheduling',
      'Healthcare system and insurance navigation',
      'Medical documentation and records management',
      'Compassionate communication under sustained stress',
      'Long-term planning and contingency management'
    ]
  },

  'deployment-support': {
    label: 'Supporting Spouse During Deployment',
    profileLanguage: `Managed full household operations as the sole decision-maker during extended partner absences due to military deployment, independently overseeing finances, childcare, healthcare decisions, home maintenance, and family wellbeing for periods of seven months or more.`,
    gapExplanation: `During my spouse's deployments, I served as the sole adult managing our household — a role that demanded the full professional commitment I would otherwise have directed toward paid employment. The skills developed in that role are directly transferable to any professional environment.`,
    interviewAnswer: `During my spouse's deployments, I was the only adult making every decision for our household — financial, medical, logistical. There were no shortcuts and no backup. That experience taught me to stay calm under pressure, make decisions with incomplete information, execute reliably without supervision, and follow through without a support system. Those are exactly the qualities I bring to a professional setting.`,
    coverLetterBridge: `Managing a household independently through military deployments gave me hands-on experience in high-stakes independent decision-making, financial management, and sustained operational responsibility — experience that translates directly into professional performance.`,
    skills: [
      'Independent decision-making under sustained pressure',
      'Household and family financial management',
      'Healthcare and insurance navigation',
      'Crisis management and contingency planning',
      'Emotional composure and resilience under stress'
    ]
  },

  'remote-location': {
    label: 'Remote Duty Station / No Local Jobs',
    profileLanguage: `During an assignment to a remote or rural military installation with limited local employment opportunities in my field, I maintained professional engagement through continued education, certification maintenance, freelance or contract work, and community volunteer leadership.`,
    gapExplanation: `Employment gap during this period reflects a geographic labor market constraint at a remote military installation — not a lack of professional commitment. I remained actively engaged through [professional development / volunteer leadership / skill maintenance] throughout.`,
    interviewAnswer: `We were stationed at a remote base where jobs in my field weren't available locally. Rather than letting my skills atrophy, I [describe: took courses, maintained certifications, did volunteer leadership, freelanced]. That took more initiative than staying employed somewhere convenient, and it tells you something about my commitment to my career. I'm here now, and I'm ready.`,
    coverLetterBridge: `A period at a remote military installation — where local employment in my field was unavailable — gave me an opportunity to deepen my skills through independent initiative, demonstrating the professional commitment that geography alone cannot diminish.`,
    skills: [
      'Self-directed professional development',
      'Adaptability under geographic and economic constraints',
      'Career commitment through adversity',
      'Independent initiative without external structure'
    ]
  },

  'credential-transfer': {
    label: 'License or Credential Transfer',
    profileLanguage: `Holds professional credentials earned through years of established practice. Currently navigating interstate licensing and reciprocity requirements following a military-related relocation — a process that reflects geographic administrative barriers, not professional standing.`,
    gapExplanation: `Current employment gap reflects an interstate credentialing and reciprocity process required following a military relocation. My professional skills, technical knowledge, and work ethic are fully intact and unaffected by this administrative process.`,
    interviewAnswer: `My credentials are transferring following our most recent military relocation. This is a licensing administration process — not a reflection of my competence or experience. I have [X] years of practice in [field] and I'm actively completing this transfer as quickly as the process allows. I'm fully ready to contribute in the meantime in any capacity that doesn't require the license to be fully transferred.`,
    coverLetterBridge: `I am an experienced professional currently completing interstate credentialing requirements following a military relocation — a process that reflects geographic licensing realities, not any lapse in professional competence or standing.`,
    skills: [
      'Demonstrated professional competence in field of practice',
      'Navigating regulatory and compliance processes',
      'Proactive credential and certification maintenance',
      'Professional persistence through administrative barriers'
    ]
  },

  'other': {
    label: 'Other',
    profileLanguage: `Career path reflects the realities and demands of military family life, including periods of geographic transition and family responsibility that required professional flexibility without diminishing professional commitment or long-term career goals.`,
    gapExplanation: `Employment gap reflects personal circumstances connected to military family life. I have remained professionally engaged and am fully committed to contributing at a high level in my next role.`,
    interviewAnswer: `I took time away from traditional employment for reasons connected to our military lifestyle. During that time, I stayed professionally engaged through [activities]. I want to be direct: this was a circumstance, not a choice to step back from my career. I'm here and I'm ready.`,
    coverLetterBridge: `My career reflects the resilience required of military family life, and I bring to this role not only professional skills but a demonstrated capacity to adapt, persist, and perform through changing circumstances.`,
    skills: [
      'Professional adaptability through life transitions',
      'Resilience under personal and professional pressure',
      'Commitment to career reentry and long-term growth'
    ]
  }
};

// ── Volunteer & Community Leadership Translations ──
const VOLUNTEER_TRANSLATIONS = {
  'frg-leader': {
    label: 'FRG Leader',
    title: 'Family Readiness Group Leader',
    bullets: [
      'Led Family Readiness Group operations supporting military families through deployments, PCS transitions, and personal crises — coordinating volunteers, communications, and resources on a non-paid basis',
      'Served as primary liaison between unit command and family members, communicating policy updates, welfare resources, and time-sensitive information to a large, geographically diverse group',
      'Organized community events, fundraising initiatives, and support networks delivering program outcomes comparable to paid nonprofit management roles'
    ],
    skills: ['Community leadership', 'Crisis communication', 'Volunteer coordination', 'Event management', 'Stakeholder communication']
  },
  'pto-officer': {
    label: 'PTO / School Board Officer',
    title: 'PTO Officer / School Community Leader',
    bullets: [
      'Managed parent organization operations including annual budgeting, volunteer recruitment, and fundraising — delivering measurable outcomes on limited resources',
      'Coordinated multi-stakeholder school events and programs serving a large school community',
      'Led a team of volunteer officers through planning cycles, conflict resolution, and program execution'
    ],
    skills: ['Nonprofit management', 'Budget oversight', 'Volunteer leadership', 'Fundraising', 'Community outreach']
  },
  'spouse-club-officer': {
    label: 'Military Spouse Club Officer',
    title: 'Military Spouse Club Officer',
    bullets: [
      'Held elected leadership role in a military spouse organization, overseeing membership engagement, event programming, and community communications',
      'Managed chapter finances, membership records, and volunteer coordination for a broad and frequently rotating membership base'
    ],
    skills: ['Organizational leadership', 'Membership management', 'Event planning', 'Financial oversight', 'Community building']
  },
  'food-bank': {
    label: 'Food Bank / Community Pantry Volunteer',
    title: 'Community Volunteer — Food Security',
    bullets: [
      'Contributed consistent volunteer service to food bank or community pantry operations, including client intake, inventory coordination, and distribution logistics',
      'Supported programs addressing food insecurity in the military and local community'
    ],
    skills: ['Community service', 'Logistics coordination', 'Client services', 'Team collaboration']
  },
  'chapel-volunteer': {
    label: 'Chapel / Community Ministry Volunteer',
    title: 'Chapel Volunteer Leader',
    bullets: [
      'Supported base chapel and community ministry programming including event coordination, outreach, and pastoral care assistance',
      'Organized and led volunteer teams for community programming serving military families'
    ],
    skills: ['Community engagement', 'Event coordination', 'Volunteer management', 'Pastoral support']
  }
};

// ── Universal Military Spouse Transferable Skills ──
//    Applied to all profiles regardless of gap type
const UNIVERSAL_SKILLS = [
  'Cross-cultural adaptability and rapid community integration',
  'Independent decision-making under uncertainty and pressure',
  'Household project management across complex, overlapping priorities',
  'Professional resilience through repeated major life transitions',
  'Building trust and networks quickly in unfamiliar environments'
];

// ── Industry-Based Resume Bullet Templates ─────────
//    Generic starting-point bullets by category
const INDUSTRY_BULLETS = {
  'administrative':   ['Managed office operations, scheduling, and correspondence', 'Coordinated administrative support across departments', 'Maintained records, databases, and filing systems with high accuracy'],
  'healthcare':       ['Provided patient-centered care and support in a clinical setting', 'Coordinated care schedules, medical records, and insurance documentation', 'Maintained compliance with healthcare regulations and privacy standards (HIPAA)'],
  'customer-service': ['Delivered consistent, high-quality service to a diverse customer base', 'Resolved customer concerns efficiently and with professionalism', 'Built lasting customer relationships through attentive and responsive support'],
  'education':        ['Delivered curriculum and instruction to students across a range of learning needs', 'Maintained classroom environment conducive to engagement and achievement', 'Communicated student progress clearly to parents, guardians, and staff'],
  'finance':          ['Managed accounts payable/receivable, reconciliations, and financial reporting', 'Maintained accuracy and integrity in financial records and documentation', 'Supported budgeting, forecasting, and audit preparation processes'],
  'technology':       ['Provided technical support and troubleshooting across hardware and software environments', 'Documented technical processes and supported end-user training', 'Maintained systems with attention to security and performance standards'],
  'marketing':        ['Developed and executed marketing campaigns across digital and print channels', 'Created content that engaged target audiences and drove measurable outcomes', 'Tracked campaign performance and applied insights to improve future efforts'],
  'management':       ['Led cross-functional teams toward clearly defined goals on deadline', 'Managed team performance through clear expectations, feedback, and coaching', 'Oversaw project planning, resource allocation, and stakeholder communication'],
  'sales':            ['Developed new business relationships and maintained existing client accounts', 'Met or exceeded sales targets through persistent and consultative selling', 'Prepared proposals, presentations, and follow-through to close business'],
  'logistics':        ['Coordinated supply chain operations including procurement, inventory, and distribution', 'Maintained accurate inventory records and supported demand forecasting', 'Managed vendor relationships and ensured on-time delivery against commitments'],
  'food-service':     ['Delivered efficient, friendly service in a high-volume food service environment', 'Maintained food safety standards, cleanliness, and quality consistency', 'Collaborated with kitchen and front-of-house teams to deliver a positive guest experience'],
  'creative':         ['Produced visual and written content for print, digital, and social media channels', 'Collaborated with stakeholders to translate requirements into polished deliverables', 'Maintained brand consistency across all materials and formats'],
  'legal':            ['Supported legal proceedings through research, documentation, and case management', 'Maintained confidential records and ensured compliance with regulatory requirements', 'Prepared and proofread legal documents with high attention to accuracy'],
  'nonprofit':        ['Supported program delivery, volunteer coordination, and community outreach', 'Managed grant documentation, reporting, and stakeholder communications', 'Contributed to mission-driven work with measurable community impact']
};
