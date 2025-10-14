import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { 
  Link2, 
  BarChart3, 
  QrCode, 
  Copy, 
  TrendingUp, 
  Users, 
  Globe,
  MousePointer,
  Download,
  Plus,
  Search,
  Settings,
  Home,
  LogOut,
  Edit,
  Trash2,
  Share2,
  MoreVertical,
  FileDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner@2.0.3';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// PLACEHOLDER DATA - Replace with API calls
// TODO: Fetch from /api/dashboard
// ============================================
const PLACEHOLDER_STATS = {
  totalLinks: 1247,
  totalClicks: 127834,
  activeLinks: 1189,
  countries: 142,
};

const PLACEHOLDER_LINKS = [
  {
    id: 1,
    name: 'Summer Campaign 2024',
    shortUrl: 'smartlink.io/summer24',
    originalUrl: 'https://example.com/summer-campaign-2024-special-promotion',
    clicks: 12453,
    created: '2024-01-15',
    lastClick: '2 hours ago',
    status: 'active',
    qrCode: true,
  },
  {
    id: 2,
    name: 'Special Promotion',
    shortUrl: 'smartlink.io/promo',
    originalUrl: 'https://example.com/special-promotion',
    clicks: 8329,
    created: '2024-01-20',
    lastClick: '5 hours ago',
    status: 'active',
    qrCode: true,
  },
  {
    id: 3,
    name: 'Latest Blog Post',
    shortUrl: 'smartlink.io/blog-post',
    originalUrl: 'https://example.com/blog/latest-article',
    clicks: 5647,
    created: '2024-02-01',
    lastClick: '1 day ago',
    status: 'active',
    qrCode: false,
  },
  {
    id: 4,
    name: 'Webinar Registration',
    shortUrl: 'smartlink.io/webinar',
    originalUrl: 'https://example.com/webinar-registration',
    clicks: 3421,
    created: '2024-02-05',
    lastClick: '3 days ago',
    status: 'active',
    qrCode: true,
  },
];

const PLACEHOLDER_ANALYTICS_DATA = [
  { date: 'Mon', clicks: 1200 },
  { date: 'Tue', clicks: 1900 },
  { date: 'Wed', clicks: 1600 },
  { date: 'Thu', clicks: 2400 },
  { date: 'Fri', clicks: 2100 },
  { date: 'Sat', clicks: 1800 },
  { date: 'Sun', clicks: 2800 },
];

const PLACEHOLDER_DEVICE_DATA = [
  { name: 'Desktop', value: 45, color: '#000000' },
  { name: 'Mobile', value: 35, color: '#525252' },
  { name: 'Tablet', value: 20, color: '#a3a3a3' },
];

const PLACEHOLDER_REGION_DATA = [
  { country: 'United States', clicks: 12450, percentage: 45 },
  { country: 'United Kingdom', clicks: 8320, percentage: 30 },
  { country: 'Germany', clicks: 4180, percentage: 15 },
  { country: 'France', clicks: 2780, percentage: 10 },
];

const PLACEHOLDER_CONVERSION_DATA = [
  { date: 'Mon', rate: 2.4 },
  { date: 'Tue', rate: 3.1 },
  { date: 'Wed', rate: 2.8 },
  { date: 'Thu', rate: 3.8 },
  { date: 'Fri', rate: 3.5 },
  { date: 'Sat', rate: 2.9 },
  { date: 'Sun', rate: 4.2 },
];

export function Dashboard() {
  const [newUrl, setNewUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const contentRef = useRef<HTMLDivElement>(null);

  // ============================================
  // GSAP SCROLL ANIMATIONS
  // ============================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.chart-card',
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.analytics-section',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.table-row',
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.links-table',
            start: 'top 80%',
          },
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // ============================================
  // PLACEHOLDER FUNCTIONS - Connect to API
  // ============================================
  
  // TODO: API call to create short link
  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating link:', { url: newUrl, slug: customSlug });
    toast.success('Link created successfully!');
    setNewUrl('');
    setCustomSlug('');
  };

  // TODO: API call to copy link
  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  // TODO: API call to download QR code
  const handleDownloadQR = (linkId: number) => {
    console.log('Downloading QR for link:', linkId);
    toast.success('QR Code downloaded!');
  };

  // TODO: API call to edit link
  const handleEditLink = (linkId: number) => {
    console.log('Editing link:', linkId);
    toast.info('Edit link feature (Placeholder)');
  };

  // TODO: API call to delete link
  const handleDeleteLink = (linkId: number) => {
    console.log('Deleting link:', linkId);
    toast.success('Link deleted!');
  };

  // TODO: API call to share link
  const handleShareLink = (url: string) => {
    console.log('Sharing link:', url);
    toast.success('Share options opened!');
  };

  // TODO: API call to download analytics report
  const handleDownloadReport = () => {
    console.log('Downloading analytics report');
    toast.success('Report downloaded!');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* ============================================ */}
      {/* SIDEBAR NAVIGATION - PLACEHOLDER */}
      {/* ============================================ */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex w-64 bg-white border-r border-neutral-200 flex-col fixed h-screen z-50"
      >
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl text-neutral-900">SmartLink</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Home, label: 'Dashboard', active: activeTab === 'overview' },
            { icon: Link2, label: 'Links', active: activeTab === 'links' },
            { icon: BarChart3, label: 'Analytics', active: activeTab === 'analytics' },
            { icon: Settings, label: 'Settings', active: false },
          ].map((item) => (
            <motion.button
              key={item.label}
              onClick={() => setActiveTab(item.label.toLowerCase().replace(' ', ''))}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                item.active
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <main ref={contentRef} className="flex-1 lg:ml-64">
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <ScrollReveal>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl text-neutral-900 mb-4">Dashboard</h1>
                  <p className="text-lg text-neutral-600">Welcome back! Here's your link performance overview.</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleDownloadReport}
                    variant="outline"
                    className="border-neutral-200 hover:bg-neutral-50"
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats Grid - PLACEHOLDER DATA */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { 
                icon: Link2, 
                label: 'Total Links', 
                value: PLACEHOLDER_STATS.totalLinks,
                change: '+12%' 
              },
              { 
                icon: MousePointer, 
                label: 'Total Clicks', 
                value: PLACEHOLDER_STATS.totalClicks.toLocaleString(),
                change: '+8%' 
              },
              { 
                icon: TrendingUp, 
                label: 'Active Links', 
                value: PLACEHOLDER_STATS.activeLinks,
                change: '+5%' 
              },
              { 
                icon: Globe, 
                label: 'Countries', 
                value: PLACEHOLDER_STATS.countries,
                change: '+3' 
              },
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-2xl p-6 border border-neutral-200 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-neutral-900" />
                  </div>
                  <p className="text-sm text-neutral-500 mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl text-neutral-900">{stat.value}</p>
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Create Link Section */}
          <ScrollReveal>
            <Card className="p-8 mb-12 bg-white border-neutral-200">
              <h2 className="text-2xl text-neutral-900 mb-6">Create New Link</h2>
              <form onSubmit={handleCreateLink} className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Original URL *
                  </label>
                  <Input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/your-long-url"
                    className="bg-neutral-50 border-neutral-200"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Custom Slug (optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">smartlink.io/</span>
                    <Input
                      type="text"
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value)}
                      placeholder="my-custom-link"
                      className="bg-neutral-50 border-neutral-200"
                    />
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="bg-black hover:bg-neutral-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Short Link
                  </Button>
                </motion.div>
              </form>
            </Card>
          </ScrollReveal>

          {/* ============================================ */}
          {/* LINKS TABLE - PLACEHOLDER DATA */}
          {/* ============================================ */}
          <ScrollReveal>
            <Card className="p-8 mb-12 bg-white border-neutral-200 links-table">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-neutral-900">My Links</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    placeholder="Search links..."
                    className="pl-10 bg-neutral-50 border-neutral-200 w-64"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Link Name</TableHead>
                      <TableHead>Short URL</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PLACEHOLDER_LINKS.map((link, index) => (
                      <TableRow
                        key={link.id}
                        className="table-row border-b border-neutral-100 hover:bg-neutral-50"
                      >
                        <TableCell>
                          <span className="text-neutral-900">{link.name}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-neutral-900">{link.shortUrl}</span>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyLink(link.shortUrl)}
                                className="h-7 w-7 p-0"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-neutral-900">{link.clicks.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-neutral-600">{link.created}</span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-700">
                            {link.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditLink(link.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleShareLink(link.shortUrl)}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              {link.qrCode && (
                                <DropdownMenuItem onClick={() => handleDownloadQR(link.id)}>
                                  <QrCode className="w-4 h-4 mr-2" />
                                  QR Code
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleDeleteLink(link.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </ScrollReveal>

          {/* ============================================ */}
          {/* ANALYTICS CHARTS - PLACEHOLDER DATA */}
          {/* ============================================ */}
          <div className="analytics-section">
            <ScrollReveal>
              <h2 className="text-3xl text-neutral-900 mb-8">Analytics Overview</h2>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card className="chart-card p-8 bg-white border-neutral-200">
                <h3 className="text-xl text-neutral-900 mb-6">Click Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={PLACEHOLDER_ANALYTICS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="date" stroke="#737373" />
                    <YAxis stroke="#737373" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#000000" 
                      strokeWidth={2}
                      dot={{ fill: '#000000', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="chart-card p-8 bg-white border-neutral-200">
                <h3 className="text-xl text-neutral-900 mb-6">Conversion Rate</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={PLACEHOLDER_CONVERSION_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="date" stroke="#737373" />
                    <YAxis stroke="#737373" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#000000" 
                      fill="#f5f5f5"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="chart-card p-8 bg-white border-neutral-200">
                <h3 className="text-xl text-neutral-900 mb-6">Device Breakdown</h3>
                <div className="flex justify-center mb-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={PLACEHOLDER_DEVICE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {PLACEHOLDER_DEVICE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {PLACEHOLDER_DEVICE_DATA.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-neutral-600">{item.name}</span>
                      </div>
                      <span className="text-sm text-neutral-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="chart-card p-8 bg-white border-neutral-200">
                <h3 className="text-xl text-neutral-900 mb-6">Top Regions</h3>
                <div className="space-y-4">
                  {PLACEHOLDER_REGION_DATA.map((region, index) => (
                    <div key={region.country} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-900">{region.country}</span>
                        <span className="text-neutral-600">{region.clicks.toLocaleString()} clicks</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${region.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-black rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
