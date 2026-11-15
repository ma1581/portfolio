/**
 * All portfolio content lives here. Edit this file to update the site;
 * the components only decide how it looks.
 */

export const site = {
  url: 'https://portfolio-mohammed-anas.netlify.app',
  title: 'Mohammed Anas | Backend Engineer – Java, Spring Boot, Kafka',
  description:
    'Mohammed Anas is a Backend Engineer in Bengaluru working on Java and Spring Boot services for a digital gold and silver savings app.',
  ogTitle: 'Mohammed Anas | Backend Engineer',
  ogDescription: 'Java and Spring Boot services for a digital gold and silver savings app. Based in Bengaluru.',
  formEndpoint: 'https://formspree.io/f/xayrqawk',
  resumePdf: '/Mohammed-Anas-Resume.pdf',
} as const;

export const person = {
  name: 'Mohammed Anas',
  title: 'Backend Engineer',
  level: 'SDE - II',
  company: 'Changejar Technologies',
  companyUrl: 'https://www.linkedin.com/company/jarapp/',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'India',
  email: 'mohammedanas1581@gmail.com',
  linkedin: 'https://linkedin.com/in/moham-anas',
  linkedinLabel: 'linkedin.com/in/moham-anas',
  github: 'https://github.com/ma1581',
  githubLabel: 'github.com/ma1581',
  languages: ['Tamil', 'English', 'Kannada', 'Hindi'],
  interests: 'Podcasts, movies & series, anime, songs and novels',
} as const;

export const hero = {
  lead: 'Backend Engineer (SDE - II) at Changejar Technologies, working on Java and Spring Boot services for a digital gold and silver savings app.',
  /** Phrases that rotate after "I build". */
  roles: ['Spring Boot services', 'payments and autopay flows', 'Kafka consumers', 'REST APIs'],
  terminal: [
    { cmd: 'whoami', out: 'Mohammed Anas · Backend Engineer' },
    { cmd: 'pwd', out: 'Bengaluru, Karnataka, India' },
    { cmd: 'cat stack.txt', out: 'Java · Spring Boot · Kafka · MongoDB · PostgreSQL' },
    { cmd: 'cat focus.txt', out: 'payments · autopay · KYC · home screen APIs' },
    { cmd: 'echo $COMPANY', out: 'Changejar Technologies' },
  ],
} as const;

export const about = {
  heading: "Hi, I'm Mohammed",
  lead: "I'm a backend engineer at Changejar Technologies, where I work on a digital gold and silver savings app: autopay and payments, KYC, and the services behind the home screen. I mostly write Java and Spring Boot, and I also work in Python and TypeScript services. I like clear API contracts, careful handling of failures and retries, and writing things down: design docs, sequence diagrams and root cause analyses.",
  stats: [
    { value: 40, suffix: 'M+', text: 'users reached by the homepage APIs I worked on' },
    { value: 200, suffix: '+', text: 'features and fixes released to production' },
  ],
} as const;

export interface BulletGroup {
  heading?: string;
  bullets: readonly string[];
}

export interface Role {
  id: string;
  title: string;
  meta: string;
  groups: readonly BulletGroup[];
  open?: boolean;
}

export const experience: readonly Role[] = [
  {
    id: 'sde2',
    title: 'SDE - II · Changejar Technologies',
    meta: 'Bengaluru, Karnataka · Oct 2024 – Present · promoted from SDE - I',
    groups: [
      {
        bullets: [
          'Build and maintain Java and Spring Boot services for autopay, payments, KYC and the home screen of a digital gold and silver savings app.',
          'Built the backend for redeeming digital silver as physical coins, and for daily savings and autopay on a second product, silver.',
          'Designed a server-driven home screen backend with cohort-based caching and per-section metrics.',
          'Improved the autopay renewal and retry pipeline, and added detection of mandates cancelled outside the app.',
          'Designed and implemented Spring Boot APIs for homepage aggregation serving 40M+ users, reducing average response time by 10% through optimized queries.',
          'Work with the Android and iOS teams on API contracts, and write design docs, sequence diagrams and root cause analyses.',
        ],
      },
    ],
  },
  {
    id: 'intern',
    title: 'Backend Developer Intern',
    meta: 'Mar 2024 – Sep 2024',
    groups: [
      {
        bullets: [
          'Built REST APIs using Spring Boot and JPA.',
          'Implemented business rules using Drools.',
          'Improved reliability of loan-offer generation on a bank-data pipeline, and debugged production issues while on call.',
        ],
      },
    ],
  },
];

export interface Project {
  id: string;
  group: 'work' | 'personal';
  meta?: string;
  title: string;
  blurb: string;
  stack: string;
  details?: readonly string[];
  href?: string;
  linkLabel?: string;
}

export const projectGroups = [
  { id: 'work', label: 'At Changejar' },
  { id: 'personal', label: 'Personal & academic' },
] as const;

export const projects: readonly Project[] = [
  {
    id: 'silver-delivery',
    group: 'work',
    title: 'Physical silver coin delivery',
    blurb: 'Backend for redeeming digital silver as physical coins.',
    stack: 'Java · Spring Boot · NestJS · PostgreSQL · SQS',
  },
  {
    id: 'silver-savings',
    group: 'work',
    title: 'Silver daily savings and autopay',
    blurb: 'Daily savings and autopay for a new product, built on the existing gold stack.',
    stack: 'Java · Spring Boot · Kafka · MongoDB',
  },
  {
    id: 'home-screen',
    group: 'work',
    title: 'Server-driven home screen',
    blurb: 'A card-based home screen backend that personalises by user cohort.',
    stack: 'Java · Spring Boot · Spring Cloud Config · Prometheus',
  },
  {
    id: 'autopay-reliability',
    group: 'work',
    title: 'Autopay reliability',
    blurb: 'Retries, cancellations and status handling for recurring savings payments.',
    stack: 'Java · Spring Boot · Kafka · AWS S3 · Python',
  },
  {
    id: 'poll',
    group: 'personal',
    meta: '2024',
    title: 'Polling Application',
    blurb: 'RESTful polling API with pagination and vote consistency guarantees.',
    stack: 'Java · Spring Boot · JPA · Docker',
    details: [
      'Designed a RESTful polling API with pagination and vote consistency guarantees.',
      'Containerized the application using Docker for reproducible deployment.',
      'Implemented relational persistence using JPA with optimized query strategies.',
    ],
    href: 'https://github.com/ma1581/mini-projects/tree/master/PollingAPI',
    linkLabel: 'View source on GitHub →',
  },
  {
    id: 'sent',
    group: 'personal',
    meta: '2023 · Epsilon India',
    title: 'Real-Time Sentiment Analysis',
    blurb: 'Near real-time interactive dashboard to analyse social media data.',
    stack: 'Python · ML · Generative AI',
    details: [
      'Near real-time interactive dashboard to analyse social media data.',
      'Provides business inference and a view of public opinion in the digital world.',
      'Built with traditional ML and generative AI techniques during an academic project with Epsilon India (May – Aug 2023).',
    ],
    href: '/certificates/epsilon-sentiment-analysis.pdf',
    linkLabel: 'View Epsilon India certificate →',
  },
];

export const skillCategories = [
  { id: 'lang', label: 'Languages' },
  { id: 'fw', label: 'Frameworks' },
  { id: 'db', label: 'Databases' },
  { id: 'msg', label: 'Messaging' },
  { id: 'devops', label: 'DevOps & cloud' },
  { id: 'core', label: 'Practices & domain' },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]['id'];

export const skills: readonly { name: string; cat: SkillCategoryId }[] = [
  { name: 'Java', cat: 'lang' },
  { name: 'Python', cat: 'lang' },
  { name: 'TypeScript', cat: 'lang' },
  { name: 'Spring Boot', cat: 'fw' },
  { name: 'Spring Cloud Config', cat: 'fw' },
  { name: 'JPA / Hibernate', cat: 'fw' },
  { name: 'JUnit 5', cat: 'fw' },
  { name: 'Django', cat: 'fw' },
  { name: 'Celery', cat: 'fw' },
  { name: 'NestJS', cat: 'fw' },
  { name: 'MongoDB', cat: 'db' },
  { name: 'PostgreSQL', cat: 'db' },
  { name: 'MySQL', cat: 'db' },
  { name: 'Redis', cat: 'db' },
  { name: 'ScyllaDB', cat: 'db' },
  { name: 'Kafka', cat: 'msg' },
  { name: 'AWS SQS', cat: 'msg' },
  { name: 'Docker', cat: 'devops' },
  { name: 'Git', cat: 'devops' },
  { name: 'Linux', cat: 'devops' },
  { name: 'Jenkins', cat: 'devops' },
  { name: 'AWS (EKS, S3)', cat: 'devops' },
  { name: 'Prometheus', cat: 'devops' },
  { name: 'Grafana', cat: 'devops' },
  { name: 'Vault', cat: 'devops' },
  { name: 'REST API design', cat: 'core' },
  { name: 'NoSQL data modeling', cat: 'core' },
  { name: 'Network fundamentals', cat: 'core' },
  { name: 'Idempotency and retries', cat: 'core' },
  { name: 'Root cause analysis', cat: 'core' },
  { name: 'UPI autopay and payments', cat: 'core' },
  { name: 'Feature flags (Unleash)', cat: 'core' },
];

export const education = {
  period: 'Feb 2023 – Sep 2024',
  degree: 'Master of Computer Applications (MCA)',
  school: 'RV College of Engineering, Bengaluru',
  certificateUrl: 'https://drive.google.com/file/d/1l-on5wZaQZUFH5GSMPsuROr1GvoO2_wU/view?usp=sharing',
} as const;

export const certifications = [
  {
    issuer: 'Epsilon India',
    title: 'Real-Time Sentiment Analysis with Traditional ML and Generative AI',
    meta: 'Academic project · May – Aug 2023',
    href: '/certificates/epsilon-sentiment-analysis.pdf',
  },
  {
    issuer: 'IEEE Blended Learning',
    title: 'Data Structures for Application Development',
    meta: 'Certificate of completion · Aug 2023',
    href: '/certificates/ieee-data-structures.pdf',
  },
  {
    issuer: 'NPTEL · IIT Kanpur',
    title: 'Enhancing Soft Skills and Personality',
    meta: 'Elite · Top 1% · 90% · Feb – Apr 2023',
    href: '/certificates/nptel-soft-skills-personality.jpg',
  },
  {
    issuer: 'NPTEL',
    title: 'Soft Skill Development',
    meta: 'Jul – Sep 2023',
    href: '/certificates/nptel-soft-skill-development.pdf',
  },
] as const;

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
] as const;

/** One-page resume (shown at /resume and exported to the PDF). Curated, so it stays short. */
export const resume = {
  summary:
    'Backend Engineer at Changejar Technologies since 2024, working on Java and Spring Boot services for a digital gold and silver savings app: autopay and payments, KYC and home screen APIs. Also work in Python and TypeScript services. I care about clear API contracts, careful failure handling and good documentation.',
  sde2Bullets: [
    'Build and maintain Java and Spring Boot services for autopay, payments, KYC and the home screen of a digital gold and silver savings app.',
    'Built the backend for redeeming digital silver as physical coins, and for daily savings and autopay on a second product, silver.',
    'Designed a server-driven home screen backend with cohort-based caching and per-section metrics.',
    'Improved the autopay renewal and retry pipeline, and added detection of mandates cancelled outside the app.',
    'Designed and implemented Spring Boot APIs for homepage aggregation serving 40M+ users, reducing average response time by 10% through optimized queries.',
    'Work with the Android and iOS teams on API contracts, and write design docs, sequence diagrams and root cause analyses.',
  ],
} as const;
