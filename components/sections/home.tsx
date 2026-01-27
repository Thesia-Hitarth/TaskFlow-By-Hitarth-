'use client';
import { AnimatedSection } from '../animated-section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, CheckCircle, Users, ArrowRight, Sparkles, Zap, Target, Clock, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

export function HomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll tracking for parallax effects
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background layer - moves slowest
  const yBackground = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityBackground = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);

  // Middle layer (dashboard mockup) - medium speed
  const yDashboard = useTransform(scrollY, [0, 500], [0, -250]);
  const opacityDashboard = useTransform(scrollY, [0, 400, 600], [1, 0.8, 0]);
  const scaleDashboard = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Front layer (text/hero) - moves fastest
  const yHero = useTransform(scrollY, [0, 300, 500], [0, -100, -350]);
  const opacityHero = useTransform(scrollY, [0, 200, 400], [1, 1, 0]);
  const scaleHero = useTransform(scrollY, [0, 200], [1, 1.1]);

  const features = [
    {
      icon: Target,
      title: 'Smart Prioritization',
      description: 'AI-powered task ranking keeps you focused on what matters most',
      color: 'from-violet-500 to-purple-600',
      delay: 0.2,
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Keyboard shortcuts and instant sync for seamless workflow',
      color: 'from-amber-500 to-orange-600',
      delay: 0.4,
    },
    {
      icon: Calendar,
      title: 'Timeline View',
      description: 'Visualize your entire project roadmap at a glance',
      color: 'from-emerald-500 to-teal-600',
      delay: 0.6,
    },
  ];

  return (
    <AnimatedSection 
      id="home" 
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-500 to-white"
    >
      <div ref={containerRef} className="relative w-full">
        {/* Background Layer - Animated Grid and Orbs */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yBackground, opacity: opacityBackground }}
        >
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#475569_1px,transparent_1px),linear-gradient(to_bottom,#475569_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-55" />
          
          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Hero Content - Front Layer */}
        <motion.div 
          className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32"
          style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Full-stack Project Showcase</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-white">
                Work Smarter,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
                Not Harder
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              TaskFlow transforms chaos into clarity. Manage projects, collaborate with teams, 
              and achieve your goals with an interface that feels like magic.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="#tasks"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Tasking
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Dashboard Mockup - Middle Layer with 3D perspective */}
        <motion.div 
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          style={{ 
            y: yDashboard, 
            opacity: opacityDashboard,
            scale: scaleDashboard
          }}
        >
          <div className="relative perspective-[2000px]">
            <motion.div
              className="relative mx-auto max-w-5xl"
              initial={{ opacity: 0, y: 100, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              {/* Main Dashboard Card */}
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex-1 mx-4 bg-slate-950/50 rounded-lg px-3 py-1.5 text-xs text-slate-500">
                    taskflow.app/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">Good morning, Alex</h2>
                      <p className="text-slate-400">You have 12 tasks due this week</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center hover:bg-violet-500/30 transition-colors cursor-pointer">
                        <CheckCircle className="w-5 h-5 text-violet-400" />
                      </div>
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors cursor-pointer">
                        <Clock className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* Task Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Design System Update', status: 'In Progress', progress: 75, color: 'violet', team: 3 },
                      { title: 'Client Presentation', status: 'Review', progress: 45, color: 'amber', team: 5 },
                      { title: 'Code Review Sprint', status: 'Almost Done', progress: 90, color: 'emerald', team: 4 },
                    ].map((task, idx) => (
                      <motion.div
                        key={task.title}
                        className="bg-slate-800/50 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white text-sm leading-tight">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full bg-${task.color}-500/20 text-${task.color}-300 font-medium`}>
                            {task.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">{task.status}</p>
                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden mb-4">
                          <motion.div
                            className={`h-full bg-gradient-to-r from-${task.color}-500 to-${task.color}-400`}
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ delay: 1.2 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {Array.from({ length: task.team }).map((_, i) => (
                              <div 
                                key={i} 
                                className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full border-2 border-slate-800"
                              />
                            ))}
                          </div>
                          <Users className="w-4 h-4 text-slate-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards - Positioned outside dashboard boundaries */}
              {/* Team Meeting Card - Right side */}
              <motion.div
                className="absolute -right-8 xl:-right-72 top-32 w-64 bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-2xl hidden xl:block"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">Team Meeting</h4>
                    <p className="text-slate-400 text-xs">In 30 minutes</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-7 h-7 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full border-2 border-slate-800" 
                    />
                  ))}
                </div>
              </motion.div>

              {/* AI Suggestion Card - Left side */}
              <motion.div
                className="absolute -left-8 xl:-left-64 top-64 w-56 bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-2xl hidden xl:block"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">AI Suggestion</span>
                </div>
                <p className="text-white text-sm mb-3">Break down "Website Redesign" into smaller tasks?</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-xs py-1.5 rounded-lg transition-colors">
                    Accept
                  </button>
                  <button className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs py-1.5 rounded-lg transition-colors">
                    Dismiss
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section - Transitions to white background */}
        <div className="relative z-30 bg-gradient-to-b from-transparent via-slate-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Everything you need to
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
                  stay productive
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Powerful features designed to help you and your team achieve more
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: feature.delay, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-violet-600 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Features Highlights */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-slate-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                { icon: CheckCircle, label: 'Drag & Drop', description: 'Intuitive Interface' },
                { icon: Zap, label: 'Real-time Sync', description: 'Instant Updates' },
                { icon: Calendar, label: 'Smart Calendar', description: 'Visual Planning' },
                { icon: Users, label: 'Collaboration', description: 'Team Ready' },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.label}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl mb-3 group-hover:shadow-lg transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-violet-600" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-1">
                    {feature.label}
                  </div>
                  <div className="text-slate-600 text-sm">{feature.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}