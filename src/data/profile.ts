/**
 * All portfolio content lives here. Edit this file to update the site;
 * the components only decide how it looks.
 */

export const site = {
  url: 'https://portfolio-mohammed-anas.netlify.app',
  title: 'Mohammed Anas | Backend Engineer – Java, Spring Boot, Kafka',
  description:
    'Mohammed Anas is a Backend Engineer in Bengaluru building scalable Spring Boot microservices and Kafka-driven systems used by 40M+ people.',
  ogTitle: 'Mohammed Anas | Backend Engineer',
  ogDescription: 'Spring Boot microservices and Kafka-driven systems used by 40M+ people. Based in Bengaluru.',
  formEndpoint: 'https://formspree.io/f/xayrqawk',
} as const;

export const person = {
  name: 'Mohammed Anas',
  title: 'Backend Engineer',
  company: 'Changejar Technologies',
  companyUrl: 'https://www.linkedin.com/company/jarapp/',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'India',
  email: 'mohammedanas1581@gmail.com',
  linkedin: 'https://linkedin.com/in/moham-anas',
  linkedinLabel: 'linkedin.com/in/moham-anas',
  github: 'https://github.com/mohammedanas089',
  githubLabel: 'github.com/mohammedanas089',
  languages: ['Tamil', 'English', 'Kannada', 'Hindi'],
  interests: 'Podcasts, movies & series, anime, songs and novels',
} as const;

export const hero = {
  lead: 'Backend Engineer at Changejar Technologies, designing Spring Boot microservices and Kafka-driven systems used by 40M+ people.',
  /** Phrases that rotate after "I build". */
  roles: ['scalable Spring Boot APIs', 'Kafka-driven systems', 'reliable microservices', 'fast, secure REST APIs'],
  terminal: [
    { cmd: 'whoami', out: 'Mohammed Anas · Backend Engineer' },
    { cmd: 'pwd', out: 'Bengaluru, Karnataka, India' },
    { cmd: 'cat stack.txt', out: 'Java · Spring Boot · Kafka · MongoDB' },
    { cmd: 'cat reach.txt', out: '40M+ users on the APIs I built' },
    { cmd: 'echo $STATUS', out: 'open to conversations' },
  ],
} as const;

export const about = {
  heading: "Hi, I'm Mohammed",
  lead: "I'm a Backend Engineer with production experience designing scalable Spring Boot microservices and Kafka-driven distributed systems serving 40M+ users. I'm strong in REST API design, NoSQL data modeling, system reliability and performance optimization, and I'm used to resolving production incidents and applying API security best practices.",
  stats: [
    { value: 40, suffix: 'M+', text: 'users served by the homepage aggregation APIs I built' },
    { value: 10, suffix: '%', text: 'faster average API response time through optimized query strategies' },
  ],
} as const;

export interface Role {
  id: string;
  title: string;
  meta: string;
  bullets: readonly string[];
  open?: boolean;
}

export const experience: readonly Role[] = [
  {
    id: 'sde',
    title: 'SDE - I · Changejar Technologies',
    meta: 'Bengaluru, Karnataka · Oct 2024 – Present',
    open: true,
    bullets: [
      'Designed and implemented Spring Boot APIs for homepage aggregation, serving 40M+ users and reducing average API response time by 10% through optimized query strategies.',
      'Collaborated with the Android team to optimize API response contracts and reduce frontend latency.',
      'Resolved production incidents through root cause analysis (RCA), hotfixes and improved monitoring to prevent recurrence.',
      'Implemented robust Kafka consumer retry and error-handling mechanisms, reducing message processing failures and improving reliability.',
      'Integrated feature flag rollout with Unleash for safe production deployments.',
      'Integrated Meta Marketing APIs to automate ad budget workflows and improve campaign allocation efficiency.',
      'Optimized backend response handling to support improved frontend performance metrics.',
    ],
  },
  {
    id: 'intern',
    title: 'Backend Developer Intern',
    meta: 'Mar 2024 – Sep 2024',
    bullets: [
      'Built REST APIs using Spring Boot and JPA.',
      'Implemented business rules using Drools.',
      'Debugged production issues during on-call rotation.',
    ],
  },
];

export interface Project {
  id: string;
  meta: string;
  title: string;
  blurb: string;
  stack: string;
  details: readonly string[];
  href: string;
  linkLabel: string;
}

export const projects: readonly Project[] = [
  {
    id: 'poll',
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
    meta: '2023 · Epsilon India',
    title: 'Real-Time Sentiment Analysis',
    blurb: 'Near real-time interactive dashboard to analyse social media data.',
    stack: 'Python · ML · Generative AI',
    details: [
      'Near real-time interactive dashboard to analyse social media data.',
      'Provides business inference and a view of public opinion in the digital world.',
      'Built with traditional ML and generative AI techniques during an academic project with Epsilon India (May – Aug 2023).',
    ],
    href: 'https://drive.google.com/file/d/13kmV9w6MXUbPGKY33VN9alGc-lD_ans3/view?usp=sharing',
    linkLabel: 'View project on Google Drive →',
  },
];

export const skillCategories = [
  { id: 'lang', label: 'Languages' },
  { id: 'fw', label: 'Frameworks' },
  { id: 'db', label: 'Databases' },
  { id: 'msg', label: 'Messaging' },
  { id: 'devops', label: 'DevOps' },
  { id: 'core', label: 'Fundamentals' },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]['id'];

export const skills: readonly { name: string; cat: SkillCategoryId }[] = [
  { name: 'Java', cat: 'lang' },
  { name: 'Python', cat: 'lang' },
  { name: 'Spring Boot', cat: 'fw' },
  { name: 'JPA / Hibernate', cat: 'fw' },
  { name: 'JUnit 5', cat: 'fw' },
  { name: 'MongoDB', cat: 'db' },
  { name: 'MySQL', cat: 'db' },
  { name: 'Kafka', cat: 'msg' },
  { name: 'Docker', cat: 'devops' },
  { name: 'Git', cat: 'devops' },
  { name: 'Linux', cat: 'devops' },
  { name: 'Network fundamentals', cat: 'core' },
  { name: 'REST API design', cat: 'core' },
  { name: 'NoSQL data modeling', cat: 'core' },
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
