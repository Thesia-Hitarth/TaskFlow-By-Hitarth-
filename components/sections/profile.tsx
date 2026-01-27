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
  TrendingUp
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
    // Store user photo in /public/images/profile/ folder
    // Name it: profile-photo.jpg or profile-photo.png
    photoPath: "/images/profile/profile-photo.png",
    // Or use a placeholder if no photo
    photoPlaceholder: "HT",
    
    // Social links - Easy to update
    email: "hitarththesia123@gmail.com",
    github: "Thesia-Hitarth",
    linkedin: "hitarth-thesia-2043b0170",
    
    // Bio
    bio: "Passionate about creating elegant solutions to complex problems. Currently diving deep into full-stack development with React, Node.js, and cloud technologies. I believe in writing clean code, continuous learning, and building products that make a real difference.",

    // Skills & Interests
    skills: [
      { name: "React & Next.js", icon: Code, color: "bg-blue-500" },
      { name: "TypeScript", icon: Code, color: "bg-blue-600" },
      { name: "Node.js", icon: Code, color: "bg-green-600" },
      { name: "Tailwind CSS", icon: Sparkles, color: "bg-cyan-500" },
      { name: "Git & GitHub", icon: Github, color: "bg-gray-800" },
      { name: "Problem Solving", icon: Award, color: "bg-purple-600" },
    ],

    // Current focus
    currentFocus: [
      "🎯 Building personal projects to strengthen portfolio",
      "📚 Learning system design and architecture",
      "💡 Contributing to open-source projects",
      "🚀 Preparing for technical interviews",
    ],

    // Achievements
    achievements: [
      { label: "Projects Completed", value: "12+", icon: Award },
      { label: "GitHub Contributions", value: "500+", icon: Github },
      { label: "Days Streak", value: "45", icon: TrendingUp },
    ]
  };

  // Generate social links from user data
  const socialLinks = [
    { 
      icon: Github, 
      label: "GitHub", 
      url: `https://github.com/${userProfile.github}`,
      color: "hover:text-gray-900",
      bgColor: "hover:bg-gray-100",
      isEmail: false
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      url: `https://www.linkedin.com/in/${userProfile.linkedin}/`,
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50",
      isEmail: false
    },
    { 
      icon: Mail, 
      label: "Email", 
      url: `mailto:${userProfile.email}`,
      color: "hover:text-red-600",
      bgColor: "hover:bg-red-50",
      isEmail: true
    },
  ];

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${userProfile.email}`;
  };

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
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
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

                {/* Profile Info */}
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

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={link.label}
                          href={link.url}
                          target={link.isEmail ? "_self" : "_blank"}
                          rel={link.isEmail ? undefined : "noopener noreferrer"}
                          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all group border border-white/20"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          onClick={link.isEmail ? handleEmailClick : undefined}
                        >
                          <link.icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{link.label}</span>
                          {!link.isEmail && (
                            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Two Column Layout - Task Statistics Removed */}
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
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                  <h3 className="text-2xl font-bold">Achievements</h3>
                </div>
                <div className="space-y-6">
                  {userProfile.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                        <achievement.icon className="h-8 w-8 text-yellow-300" />
                      </div>
                      <p className="text-4xl font-bold mb-1">{achievement.value}</p>
                      <p className="text-blue-100 text-sm font-medium">{achievement.label}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-bold mb-2">Let's Connect!</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Open to collaboration, mentorship, and new opportunities
                </p>
                <motion.button
                  onClick={handleEmailClick}
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}