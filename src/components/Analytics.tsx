import { motion } from 'motion/react';
import { TrendingUp, Users, Globe, MousePointer } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollReveal } from './ScrollReveal';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// PLACEHOLDER DATA - Replace with API calls
// TODO: Fetch from /api/analytics
// ============================================
const lineData = [
  { name: 'Mon', clicks: 1200 },
  { name: 'Tue', clicks: 1900 },
  { name: 'Wed', clicks: 1600 },
  { name: 'Thu', clicks: 2400 },
  { name: 'Fri', clicks: 2100 },
  { name: 'Sat', clicks: 1800 },
  { name: 'Sun', clicks: 2800 },
];

const barData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const regionData = [
  { country: 'United States', clicks: '12,450', percentage: 45 },
  { country: 'United Kingdom', clicks: '8,320', percentage: 30 },
  { country: 'Germany', clicks: '4,180', percentage: 15 },
  { country: 'France', clicks: '2,780', percentage: 10 },
];

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: end,
          duration: duration / 1000,
          onUpdate: function() {
            setCount(Math.floor(this.targets()[0].val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [end, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export function Analytics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.dashboard-mockup',
        {
          opacity: 0,
          y: 100,
          rotationX: -30,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.dashboard-mockup',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="analytics" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6">
              Powerful analytics,<br />actionable insights
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-neutral-600">
              Track every click and understand your audience
            </p>
          </ScrollReveal>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: MousePointer, label: 'Total Clicks', value: 127834, change: '+12.5%' },
            { icon: Users, label: 'Unique Visitors', value: 45234, change: '+8.2%' },
            { icon: Globe, label: 'Countries', value: 142, change: '+5.1%' },
            { icon: TrendingUp, label: 'Conversion Rate', value: 3.8, change: '+2.3%', suffix: '%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card bg-white rounded-2xl p-6 border border-neutral-200"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-neutral-900" />
              </motion.div>
              <p className="text-sm text-neutral-500 mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl text-neutral-900">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </p>
                <motion.span 
                  className="text-sm text-green-600"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {stat.change}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          className="dashboard-mockup bg-white rounded-2xl p-8 border border-neutral-200 shadow-2xl perspective-1000"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Line Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl text-neutral-900 mb-6">Click Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
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
                    stroke="#171717" 
                    strokeWidth={2}
                    dot={{ fill: '#171717', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl text-neutral-900 mb-6">Monthly Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e5e5', 
                      borderRadius: '8px',
                    }} 
                  />
                  <Bar dataKey="value" fill="#171717" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Regional Data */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl text-neutral-900 mb-6">Top Regions</h3>
            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div key={region.country} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-900">{region.country}</span>
                    <span className="text-neutral-600">{region.clicks} clicks</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${region.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                      className="h-full bg-black rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
