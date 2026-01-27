'use client';

import { AnimatedSection } from '../animated-section';
import { Task } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, isSameDay, isToday, isFuture, isPast, startOfMonth, endOfMonth, addMonths, subMonths, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useState } from 'react';
import { CalendarDays, Clock, CheckCircle2, AlertCircle, TrendingUp, ChevronLeft, ChevronRight, Sparkles, Target, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarSectionProps {
  tasks: Task[];
}

export function CalendarSection({ tasks }: CalendarSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'week'>('calendar');

  // Get tasks for selected date
  const tasksForSelectedDate = tasks.filter((task) =>
    isSameDay(task.dueDate, selectedDate)
  );

  // Dates that have tasks (for highlighting)
  const datesWithTasks = tasks.map((task) => task.dueDate);

  // Get stats for current month
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthTasks = tasks.filter(
    (task) => task.dueDate >= monthStart && task.dueDate <= monthEnd
  );
  const completedThisMonth = monthTasks.filter((t) => t.status === 'completed').length;
  const pendingThisMonth = monthTasks.filter((t) => t.status === 'pending').length;
  const completionRate = monthTasks.length > 0 ? Math.round((completedThisMonth / monthTasks.length) * 100) : 0;

  // Week view data
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Check if selected date is today, past, or future
  const isSelectedToday = isToday(selectedDate);
  const isSelectedPast = isPast(selectedDate) && !isSelectedToday;
  const isSelectedFuture = isFuture(selectedDate);

  // Productivity insights
  const upcomingTasks = tasks.filter(t => isFuture(t.dueDate) && t.status === 'pending').length;
  const overdueTasks = tasks.filter(t => isPast(t.dueDate) && !isToday(t.dueDate) && t.status === 'pending').length;

  // Animation variants - FIXED TYPE
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const stats = [
    {
      icon: CalendarDays,
      label: 'Total Tasks',
      value: monthTasks.length,
      subtext: 'this month',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      textColor: 'text-blue-700'
    },
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: completedThisMonth,
      subtext: `${completionRate}% done`,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      textColor: 'text-green-700'
    },
    {
      icon: Clock,
      label: 'Pending',
      value: pendingThisMonth,
      subtext: 'in progress',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
      textColor: 'text-orange-700'
    },
    {
      icon: TrendingUp,
      label: 'Upcoming',
      value: upcomingTasks,
      subtext: 'future tasks',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <AnimatedSection 
      id="calendar" 
      className="min-h-screen relative overflow-hidden py-20 px-4"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4ODg4ODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzR6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptLTIgMHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptLTIgMHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <CalendarDays className="h-10 w-10 text-white relative z-10" />
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
            Your Calendar
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            Master your time. Visualize your productivity. Achieve your goals.
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center gap-3 mt-8">
            <Button
              onClick={() => setViewMode('calendar')}
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'calendar' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Month View
            </Button>
            <Button
              onClick={() => setViewMode('week')}
              variant={viewMode === 'week' ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'week' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <Target className="h-4 w-4 mr-2" />
              Week View
            </Button>
          </div>
        </motion.div>

        {/* Productivity Stats - Glassmorphism Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${stat.iconBg} rounded-2xl shadow-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Sparkles className={`h-5 w-5 ${stat.textColor} opacity-50`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${stat.textColor} mb-1 uppercase tracking-wide`}>
                      {stat.label}
                    </p>
                    <p className="text-4xl font-black text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-600 font-medium">{stat.subtext}</p>
                  </div>
                </div>
                {/* Animated border gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Alerts for Overdue Tasks */}
        {overdueTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-red-900">Attention Required</h4>
                  <p className="text-sm text-red-700">
                    You have <strong>{overdueTasks}</strong> overdue {overdueTasks === 1 ? 'task' : 'tasks'}. Complete them to stay on track!
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Main Calendar Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calendar Widget - 3 columns */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-md relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl -ml-32 -mb-32"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {format(selectedDate, 'MMMM yyyy')}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      {completionRate}% tasks completed this month
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
                      className="rounded-full hover:bg-gray-100 transition-all hover:scale-110"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date())}
                      className="rounded-full px-4 font-semibold hover:bg-gray-100 transition-all hover:scale-105"
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
                      className="rounded-full hover:bg-gray-100 transition-all hover:scale-110"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-2xl border-0 w-full flex justify-center"
                  month={selectedDate}
                  onMonthChange={setSelectedDate}
                  modifiers={{
                    hasTask: datesWithTasks,
                    today: new Date(),
                  }}
                  modifiersClassNames={{
                    hasTask: 'relative bg-gradient-to-br from-blue-100 to-purple-100 font-bold text-blue-900 hover:from-blue-200 hover:to-purple-200 rounded-xl ring-2 ring-blue-300 ring-offset-2 shadow-md',
                    today: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg ring-2 ring-purple-400 ring-offset-2',
                  }}
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center",
                    month: "space-y-4 w-full max-w-md mx-auto",
                    caption: "flex justify-center pt-1 relative items-center mb-6",
                    caption_label: "text-xl font-bold text-gray-900",
                    nav: "hidden",
                    nav_button: "hidden",
                    table: "w-full border-collapse mx-auto",
                    head_row: "flex justify-center gap-2 mb-4",
                    head_cell: "text-gray-500 rounded-lg w-16 font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center",
                    row: "flex w-full justify-center gap-2 mb-2",
                    cell: "relative p-0 text-center text-base focus-within:relative focus-within:z-20",
                    day: "h-16 w-16 p-0 font-semibold hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center justify-center hover:scale-110 hover:shadow-md",
                    day_selected: "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:from-blue-600 focus:to-purple-600 rounded-xl shadow-xl scale-105 ring-2 ring-blue-400 ring-offset-2",
                    day_outside: "text-gray-300 opacity-40",
                    day_disabled: "text-gray-300 opacity-40",
                  }}
                  fixedWeeks
                />

                {/* Calendar Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-md"></div>
                    <span className="text-sm text-gray-600 font-medium">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-300 shadow-sm"></div>
                    <span className="text-sm text-gray-600 font-medium">Has Tasks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-md"></div>
                    <span className="text-sm text-gray-600 font-medium">Selected</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tasks Panel - 2 columns */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md sticky top-24 overflow-hidden h-full">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {isSelectedToday && <Zap className="h-6 w-6" />}
                    {isSelectedPast && <Clock className="h-6 w-6" />}
                    {isSelectedFuture && <Target className="h-6 w-6" />}
                    <h3 className="text-2xl font-bold">
                      {isSelectedToday && 'Today\'s Focus'}
                      {isSelectedPast && 'Past Tasks'}
                      {isSelectedFuture && 'Upcoming'}
                    </h3>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-1 text-sm font-bold"
                  >
                    {tasksForSelectedDate.length}
                  </Badge>
                </div>
                <p className="text-white/90 font-medium">
                  {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                </p>
              </div>

              {/* Tasks List with scrolling */}
              <div className="p-6 overflow-y-auto premium-scrollbar" style={{ height: 'calc(100% - 120px)' }}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedDate.toISOString()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tasksForSelectedDate.length === 0 ? (
                      <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
                        <motion.div 
                          className="text-center"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6 shadow-lg">
                            <CalendarDays className="h-12 w-12 text-gray-400" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-3">
                            {isSelectedToday && 'Clear Schedule! 🎉'}
                            {isSelectedPast && 'No Past Tasks'}
                            {isSelectedFuture && 'Nothing Planned Yet'}
                          </h4>
                          <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
                            {isSelectedToday && 'You have a free day to relax or plan new tasks'}
                            {isSelectedPast && 'No tasks were scheduled for this date'}
                            {isSelectedFuture && 'Start planning by adding tasks to this date'}
                          </p>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tasksForSelectedDate.map((task, index) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                          >
                            <Card
                              className={`p-5 border-l-4 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group ${
                                task.status === 'completed'
                                  ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50'
                                  : 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-amber-50'
                              }`}
                            >
                              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                task.status === 'completed'
                                  ? 'bg-gradient-to-r from-green-100/50 to-emerald-100/50'
                                  : 'bg-gradient-to-r from-orange-100/50 to-amber-100/50'
                              }`}></div>

                              <div className="relative z-10">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-start gap-3 flex-1">
                                    <div className={`mt-0.5 p-2 rounded-lg ${
                                      task.status === 'completed' 
                                        ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                                        : 'bg-orange-500 shadow-lg shadow-orange-500/30'
                                    }`}>
                                      {task.status === 'completed' ? (
                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                      ) : (
                                        <AlertCircle className="h-5 w-5 text-white" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className={`font-bold text-gray-900 mb-2 text-lg leading-tight ${
                                        task.status === 'completed' ? 'line-through opacity-70' : ''
                                      }`}>
                                        {task.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 leading-relaxed">
                                        {task.description}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge
                                    className={`ml-3 whitespace-nowrap font-bold px-3 py-1 shadow-md ${
                                      task.status === 'completed'
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                                        : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white'
                                    }`}
                                  >
                                    {task.status === 'completed' ? '✓ Done' : '⏳ Pending'}
                                  </Badge>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-xs text-gray-500 font-medium">
                                      {format(task.dueDate, 'PPP')}
                                    </span>
                                  </div>
                                  {task.status === 'completed' && (
                                    <div className="flex items-center gap-1 text-green-600">
                                      <Award className="h-4 w-4" />
                                      <span className="text-xs font-semibold">Completed</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Pro Tips Section */}
        <motion.div
          className="mt-12 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 border-0 shadow-2xl text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Pro Tip</h4>
                  <p className="text-white/90 leading-relaxed">
                    Tasks with dates are highlighted in blue. Click any date to see detailed task information and manage your schedule effectively.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 border-0 shadow-2xl text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Stay Productive</h4>
                  <p className="text-white/90 leading-relaxed">
                    Complete {completionRate >= 50 ? 'the remaining' : 'more'} tasks to boost your productivity score. You're doing {completionRate >= 70 ? 'amazing' : 'great'}!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Premium Custom Scrollbar Styles */}
      <style jsx global>{`
        .premium-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .premium-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
          border-radius: 10px;
        }
        .premium-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
        }
        .premium-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </AnimatedSection>
  );
}