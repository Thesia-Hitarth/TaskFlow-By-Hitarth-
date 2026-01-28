'use client';

import { AnimatedSection } from '../animated-section';
import { Card } from '@/components/ui/card';
import { Task } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Code,
  ExternalLink,
  Sparkles,
  TrendingUp,
  FolderGit2,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProfileSectionProps {
  tasks: Task[];
}

export function ProfileSection({ tasks }: ProfileSectionProps) {
  const [imageError, setImageError] = useState(false);

  // User profile data - Easy to customize
  const userProfile = {
    name: "Hitarth Thesia",
    title: "Aspiring Software Developer",
    tagline: "Building tomorrow's solutions, one line of code at a time",
    location: "Ahmedabad, Gujarat, India",
    joinDate: "January 2025",
    photoPath: "/images/profile/profile-photo.png",
    photoPlaceholder: "HT",
    email: "hitarththesia123@gmail.com",
    phone: "+91 89806 84801", 
    github: "Thesia-Hitarth",
    linkedin: "hitarth-thesia-2043b0170",
    
    // Bio
    bio: "I turn caffeine and code into digital experiences. As a Computer Engineering student specializing in the MERN stack, I've transformed classroom theory into real-world impact through internships and collaborative projects. Whether I'm building responsive interfaces that delight users or crafting APIs that power seamless functionality, I approach every challenge with curiosity and determination. My mission? To create web applications that don't just work—they inspire.",

    // Skills & Interests
    skills: [
      { name: "React & Next.js", icon: Code, color: "bg-blue-500" },
      { name: "Node.js & Express.js", icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
        </svg>
      ), color: "bg-green-600" },
      { name: "MongoDB & MySQL", icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      ), color: "bg-green-500" },
      { name: "JavaScript & TypeScript", icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z"/>
        </svg>
      ), color: "bg-yellow-500" },
      { name: "RESTful APIs", icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
          <polyline points="7.5 19.79 7.5 14.6 3 12"/>
          <polyline points="21 12 16.5 14.6 16.5 19.79"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ), color: "bg-purple-600" },
      { name: "Tailwind & ShadCN", icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2C11.5,2 11,2.19 10.59,2.59L2.59,10.59C1.8,11.37 1.8,12.63 2.59,13.41L10.59,21.41C11.37,22.2 12.63,22.2 13.41,21.41L21.41,13.41C22.2,12.63 22.2,11.37 21.41,10.59L13.41,2.59C13,2.19 12.5,2 12,2M12,4L20,12L12,20L4,12L12,4M12,6C11.47,6 11,6.47 11,7V11H7C6.47,11 6,11.47 6,12C6,12.53 6.47,13 7,13H11V17C11,17.53 11.47,18 12,18C12.53,18 13,17.53 13,17V13H17C17.53,13 18,12.53 18,12C18,11.47 17.53,11 17,11H13V7C13,6.47 12.53,6 12,6Z"/>
        </svg>
      ), color: "bg-cyan-500" },
      { name: "Git & GitHub", icon: Github, color: "bg-gray-800" },
      { name: "Problem Solving", icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ), color: "bg-pink-600" },
    ],

    // Current focus
    currentFocus: [
      "🎯 Building personal projects to strengthen my technical skills",
      "📚 Learning system design and scalable software architecture",
      "💡 Actively contributing to open-source projects",
      "🚀 Preparing rigorously for technical interviews",
    ],

    // Achievements - Updated for fresher
    achievements: [
      { label: "Projects Completed", value: "6+", icon: FolderGit2 },
      { label: "Live Projects", value: "2", icon: TrendingUp },
      { label: "Internship Experience", value: "2", icon: Award },
      { label: "Tech Stack Learned", value: "8+", icon: BookOpen },
    ]
  };

  // Generate social links from user data
  const socialLinks = [
    { 
      icon: Github, 
      label: "GitHub", 
      href: `https://github.com/${userProfile.github}`,
      color: "hover:text-gray-900",
      bgColor: "hover:bg-gray-100",
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      href: `https://www.linkedin.com/in/${userProfile.linkedin}/`,
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50",
    },
    { 
      icon: Mail, 
      label: "Email", 
      href: `mailto:${userProfile.email}`,
      color: "hover:text-red-600",
      bgColor: "hover:bg-red-50",
    },
  ];

  return (
    <AnimatedSection 
      id="profile" 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden mb-8 border-0 shadow-2xl">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]" />
            </div>

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Photo - Oval Shape */}
                <motion.div 
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-40 h-48 md:w-48 md:h-56">
                    {/* Animated ring - oval shaped */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ borderRadius: '50% / 60%' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <div 
                        className="w-full h-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-400"
                        style={{ borderRadius: '50% / 60%' }}
                      />
                    </motion.div>
                    
                    {/* Inner gradient border - oval shaped */}
                    <div 
                      className="absolute inset-1 bg-gradient-to-br from-blue-600 to-purple-700 p-1"
                      style={{ borderRadius: '50% / 60%' }}
                    >
                      {!imageError ? (
                        <div 
                          className="w-full h-full overflow-hidden bg-white"
                          style={{ borderRadius: '50% / 60%' }}
                        >
                          <img
                            src={userProfile.photoPath}
                            alt={userProfile.name}
                            className="w-full h-full object-cover object-center"
                            style={{ 
                              objectPosition: 'center 25%',
                            }}
                            onError={() => setImageError(true)}
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-inner"
                          style={{ borderRadius: '50% / 60%' }}
                        >
                          {userProfile.photoPlaceholder}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Online indicator */}
                  <motion.div
                    className="absolute bottom-3 right-3 w-7 h-7 bg-green-400 rounded-full border-4 border-white shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute inset-1 bg-green-500 rounded-full" />
                  </motion.div>
                </motion.div>

                {/* Profile Info - Center */}
                <div className="flex-1 text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                      {userProfile.name}
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-100 mb-3 font-medium">
                      {userProfile.title}
                    </p>
                    <p className="text-base md:text-lg text-blue-50/90 mb-4 italic max-w-2xl">
                      "{userProfile.tagline}"
                    </p>
                    
                    {/* Location & Date */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-blue-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {userProfile.joinDate}</span>
                      </div>
                    </div>

                    {/* Social Links - Only GitHub and LinkedIn */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`https://github.com/${userProfile.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all group border border-white/20 hover:scale-105 hover:-translate-y-0.5"
                      >
                        <Github className="h-5 w-5" />
                        <span className="text-sm font-medium">GitHub</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/in/${userProfile.linkedin}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all group border border-white/20 hover:scale-105 hover:-translate-y-0.5"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="text-sm font-medium">LinkedIn</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Contact Information - Right Side - Matching Social Links Style */}
                <motion.div 
                  className="flex-shrink-0 w-full md:w-auto"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="space-y-3 min-w-[280px]">
                    <p className="text-xs font-semibold text-blue-100 mb-3 uppercase tracking-wider">Contact</p>
                    
                    {/* Email */}
                    <a 
                      href={`mailto:${userProfile.email}`}
                      className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all group border border-white/20 hover:scale-105 hover:-translate-y-0.5"
                    >
                      <Mail className="h-5 w-5 flex-shrink-0 text-white" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-100 mb-0.5">Email</p>
                        <p className="text-sm font-medium text-white break-all">{userProfile.email}</p>
                      </div>
                    </a>
                    
                    {/* Phone */}
                    <a 
                      href={`tel:${userProfile.phone}`}
                      className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all group border border-white/20 hover:scale-105 hover:-translate-y-0.5"
                    >
                      <svg className="h-5 w-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs text-blue-100 mb-0.5">Phone</p>
                        <p className="text-sm font-medium text-white">{userProfile.phone}</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - About & Focus */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {userProfile.bio}
                </p>
              </Card>
            </motion.div>

            {/* Current Focus */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 md:p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">Current Focus</h3>
                </div>
                <ul className="space-y-3">
                  {userProfile.currentFocus.map((focus, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-2xl">{focus.split(' ')[0]}</span>
                      <span>{focus.substring(focus.indexOf(' ') + 1)}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 md:p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">Skills & Technologies</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {userProfile.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <div className={`p-2 rounded-lg ${skill.color} text-white`}>
                        <skill.icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm group-hover:text-gray-900">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Achievements */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="relative overflow-hidden p-6 border-0 shadow-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 h-full">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 via-pink-500/20 to-indigo-600/20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Sparkle particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      animate={{
                        y: [-10, -80],
                        x: [0, Math.random() * 40 - 20],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.5 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                      }}
                      style={{
                        left: `${10 + i * 20}%`,
                        bottom: `${Math.random() * 30}%`,
                      }}
                    >
                      <Sparkles className="h-3 w-3 text-yellow-300" />
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with animated sparkle icon */}
                  <div className="flex items-center gap-2 mb-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="h-6 w-6 text-yellow-300 drop-shadow-lg" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
                      Achievements
                    </h3>
                  </div>

                  {/* Achievements Grid - 2x2 with equal heights */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {userProfile.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.label}
                        className="group relative flex"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        {/* Card background with glassmorphism - Full height */}
                        <div className="relative p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/15 group-hover:shadow-2xl group-hover:border-white/30 w-full flex flex-col items-center justify-center">
                          {/* Glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-pink-500/0 group-hover:from-yellow-400/20 group-hover:to-pink-500/20 transition-all duration-300"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          />

                          <div className="relative z-10 text-center flex flex-col items-center justify-center">
                            {/* Icon with animated background */}
                            <motion.div
                              className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg relative overflow-hidden"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                              {/* Rotating gradient background */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-pink-400/30"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                              />
                              <achievement.icon className="h-8 w-8 text-yellow-300 relative z-10 drop-shadow-lg" />
                            </motion.div>

                            {/* Animated counter - Larger text */}
                            <motion.p 
                              className="text-4xl font-bold mb-2 text-white drop-shadow-lg"
                              initial={{ scale: 0.5, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                delay: 0.4 + index * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                              }}
                            >
                              {achievement.value}
                            </motion.p>

                            {/* Label - Larger text */}
                            <p className="text-blue-100 text-sm font-medium leading-tight">
                              {achievement.label}
                            </p>

                            {/* Shine effect on hover */}
                            <motion.div
                              className="absolute top-0 left-0 w-full h-full rounded-2xl"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                              }}
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <motion.div
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full group-hover:w-16 transition-all duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-center text-sm text-blue-100/80 flex items-center justify-center gap-2 font-medium">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block w-2 h-2 bg-green-400 rounded-full"
                      />
                      Growing every day
                    </p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Call to Action - Simple anchor tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="relative overflow-hidden p-7 border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white h-full flex flex-col">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-indigo-400/20 via-purple-500/20 to-blue-600/20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      animate={{
                        y: [-20, -100],
                        x: [0, Math.random() * 50 - 25],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 1.5,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        bottom: 0,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center py-4">
                  {/* Icon with pulse animation */}
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 mb-5 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Mail className="h-10 w-10 text-yellow-300 drop-shadow-lg" />
                    </motion.div>
                  </motion.div>

                  {/* Title with gradient text */}
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent">
                    Let's Connect!
                  </h3>
                  
                  {/* Description */}
                  <p className="text-blue-50 mb-6 text-sm leading-relaxed max-w-xs mx-auto">
                    Open to collaboration, mentorship, and exciting new opportunities
                  </p>

                  {/* Enhanced CTA Button */}
                  <a 
                    href={`mailto:${userProfile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <motion.button
                      className="relative inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-xl overflow-hidden"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          translateX: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        Get in Touch
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </motion.span>
                      </span>
                    </motion.button>
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}