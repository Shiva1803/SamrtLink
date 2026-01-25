import {
  Link2,
  BarChart3,
  Shield,
  Zap,
  QrCode,
  Users,
  Globe,
  Sparkles,
  TrendingUp,
  Target,
} from 'lucide-react';

export type MarketingStat = {
  label: string;
  value: string;
  sublabel?: string;
};

export type MarketingFeature = {
  icon: typeof Link2;
  title: string;
  description: string;
  usp?: string;
};

export type MarketInsight = {
  title: string;
  summary: string;
  metric?: string;
};

export type MonetizationTrack = {
  title: string;
  description: string;
  highlight: string;
};

export const HERO_BADGES = {
  trust: 'Trusted by growth-focused teams worldwide',
  promise: 'Launch-ready analytics without the enterprise overhead',
};

export const HERO_STATS: MarketingStat[] = [
  { label: 'Links Optimized', value: '1.2M+', sublabel: 'Brand-safe redirects' },
  { label: 'Global Uptime', value: '99.95%', sublabel: 'Multi-region routing' },
  { label: 'Markets Reached', value: '140+', sublabel: 'Localized redirects' },
];

export const HERO_HIGHLIGHTS = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
];

export const FEATURES: MarketingFeature[] = [
  {
    icon: Link2,
    title: 'Smart URL Shortening',
    description: 'Create branded short links that are memorable, shareable, and optimized for every campaign touchpoint.',
    usp: 'Brand-safe domains with automated QA checks.',
  },
  {
    icon: BarChart3,
    title: 'Revenue-Grade Analytics',
    description: 'Track clicks, locations, devices, and referrers in real-time so every link ties back to ROI.',
    usp: 'Unified metrics for paid, organic, and partner channels.',
  },
  {
    icon: QrCode,
    title: 'Dynamic QR Codes',
    description: 'Launch offline campaigns fast with QR codes that update instantly without reprinting.',
    usp: 'Retargetable scans with attribution built in.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and automated abuse detection keep every redirect trusted.',
    usp: 'Built-in compliance guardrails.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Delivery',
    description: 'Global routing and edge caching keep links under 100ms worldwide.',
    usp: 'Performance SLAs for every tier.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign roles, manage approvals, and ship links faster across teams and clients.',
    usp: 'Workflow-ready for marketing ops.',
  },
];

export const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Paste Your Link',
    description: 'Drop any long URL and SmartLink instantly analyzes the destination and metadata.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXB0b3AlMjBtaW5pbWFsfGVufDF8fHx8MTc2MDExMDE1OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '02',
    title: 'Customize & Brand',
    description: 'Apply your domain, campaign tags, and QR styling so every click strengthens your brand.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTEwMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    description: 'Monitor live analytics, A/B test destinations, and re-route traffic to winners.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGhhbmR8ZW58MXx8fHwxNzYwMTEwMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechFlow Inc',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYwMTEwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'SmartLink connects every campaign to revenue. We finally have a single view of link performance across channels.',
  },
  {
    name: 'Michael Chen',
    role: 'Founder & CEO',
    company: 'Digital Ventures',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDExMDE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'The team workflows and brand controls saved us hours each week while improving conversion rates.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Social Media Manager',
    company: 'Creative Studio',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwMTEwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'QR updates without reprints made our retail launches faster and far more measurable.',
  },
];

export const TESTIMONIAL_STATS: MarketingStat[] = [
  { label: 'Active Teams', value: '50K+', sublabel: 'Across SaaS, retail, and media' },
  { label: 'Avg. Rating', value: '4.9/5', sublabel: 'Across 1,800+ reviews' },
  { label: 'Uptime', value: '99.95%', sublabel: 'Monitored 24/7' },
  { label: 'Support', value: '24/7', sublabel: 'Dedicated success team' },
];

export const MARKET_INSIGHTS: MarketInsight[] = [
  {
    title: 'Creators & SMBs are consolidating tools',
    summary: 'Teams want fewer dashboards and faster ROI reporting. SmartLink bundles analytics, QR, and attribution in one workspace.',
    metric: '42% reduction in reporting time',
  },
  {
    title: 'Offline-to-online attribution is resurging',
    summary: 'Retail and events rely on QR codes with dynamic routing to prove campaign lift.',
    metric: '2.4x higher scan-to-click conversion',
  },
  {
    title: 'Branded links lift trust and conversions',
    summary: 'Custom domains drive higher click-through rates and reduce drop-off from security-conscious audiences.',
    metric: '18% average CTR uplift',
  },
];

export const USP_POINTS = [
  { icon: Globe, title: 'Unified omnichannel tracking', description: 'Track web, QR, and partner links from one workspace.' },
  { icon: Sparkles, title: 'AI-assisted optimization', description: 'Get suggested variants and next-best actions powered by analytics.' },
  { icon: TrendingUp, title: 'Revenue-first reporting', description: 'Tie every link back to pipeline and sales impact.' },
  { icon: Target, title: 'Fast go-to-market', description: 'Launch new campaigns in minutes with templated workflows.' },
];

export const MONETIZATION_TRACKS: MonetizationTrack[] = [
  {
    title: 'Usage-based tiers',
    description: 'Charge by active links, click volume, and advanced analytics retention.',
    highlight: 'Best for SMB growth and predictable expansion.',
  },
  {
    title: 'Team & agency workspaces',
    description: 'Upsell collaboration seats, approvals, and client-specific reporting.',
    highlight: 'Perfect for agencies and multi-brand teams.',
  },
  {
    title: 'Enterprise add-ons',
    description: 'Offer SLAs, dedicated success, compliance reviews, and private hosting.',
    highlight: 'High-margin revenue with multi-year contracts.',
  },
];

export const PRICING_MESSAGING = {
  headline: 'Monetize every click with flexible plans',
  subheadline: 'Start free, scale with usage, and unlock enterprise-grade intelligence when you need it.',
};

export const CTA_CONTENT = {
  headline: 'Ready to turn every link into revenue intelligence?',
  body: 'Launch your first campaign today and see how SmartLink unlocks conversion insights across every channel.',
  proofPoints: ['No credit card required', 'Live onboarding in 15 minutes', 'Cancel anytime'],
};
