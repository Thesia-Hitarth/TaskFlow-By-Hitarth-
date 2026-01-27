'use client';

import { useState, useEffect } from 'react';
import { AnimatedSection } from '../animated-section';
import { TaskCard } from '../task-card';
import { TaskForm } from '../task-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Sparkles,
  Target,
  Zap,
  List,
  Grid3x3,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Task, TaskFormData } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, isFuture } from 'date-fns';

interface TasksSectionProps {
  tasks: Task[];
  onCreateTask: (data: TaskFormData) => void;
  onUpdateTask: (id: string, data: TaskFormData) => void;
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function TasksSection({
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onToggleStatus,
}: TasksSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration error by ensuring client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: TaskFormData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, data);
    } else {
      onCreateTask(data);
    }
    setEditingTask(undefined);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  // Task statistics for filters
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const todayTasks = tasks.filter(t => isToday(t.dueDate)).length;
  const upcomingTasks = tasks.filter(t => isFuture(t.dueDate) && t.status === 'pending').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter and search tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      const dateA = a.dueDate.getTime();
      const dateB = b.dueDate.getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Animation variants
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

  const quickFilters = [
    { id: 'all', label: 'All Tasks', count: totalTasks, icon: List },
    { id: 'pending', label: 'Pending', count: pendingTasks, icon: Clock },
    { id: 'completed', label: 'Completed', count: completedTasks, icon: CheckCircle2 },
  ];

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <AnimatedSection 
        id="tasks" 
        className="min-h-screen relative overflow-hidden py-20 px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4ODg4ODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzR6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptLTIgMHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptLTIgMHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection 
      id="tasks" 
      className="min-h-screen relative overflow-hidden py-20 px-4"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4ODg4ODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzR6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bTAtNHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptLTIgMHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptLTIgMHYyaDJ2LTJ6bS0yIDB2Mmgydi0yem0tMiAwdjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnptMCAydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <Target className="h-10 w-10 text-white relative z-10" />
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
            My Tasks
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            Organize, prioritize, and conquer your goals with precision
          </p>
        </motion.div>

        {/* Enhanced Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
            {/* Search and Actions Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Enhanced Search Bar */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search tasks by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-6 py-7 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base font-medium shadow-sm hover:shadow-md"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <span className="text-sm font-medium">Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="flex gap-3">
                {/* Sort Button */}
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="rounded-2xl px-6 h-14 border-2 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="h-5 w-5 mr-2" />
                  ) : (
                    <SortDesc className="h-5 w-5 mr-2" />
                  )}
                  <span className="hidden sm:inline">Sort by Date</span>
                </Button>

                {/* View Toggle */}
                <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl shadow-inner">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-xl h-11 w-11 transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-md scale-105' 
                        : 'hover:bg-white/50'
                    }`}
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={`rounded-xl h-11 w-11 transition-all ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-md scale-105' 
                        : 'hover:bg-white/50'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>

                {/* Create Task Button - More Prominent */}
                <Button 
                  onClick={() => setIsFormOpen(true)} 
                  className="rounded-2xl px-8 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 font-semibold"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">New Task</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex gap-3 flex-wrap">
              {quickFilters.map((qf) => (
                <motion.button
                  key={qf.id}
                  onClick={() => setFilter(qf.id as typeof filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    filter === qf.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border-2 border-gray-100'
                  }`}
                >
                  <qf.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                    filter === qf.id ? '' : 'text-gray-500'
                  }`} />
                  <span>{qf.label}</span>
                  <Badge 
                    variant="secondary" 
                    className={`min-w-[28px] h-7 flex items-center justify-center font-bold ${
                      filter === qf.id 
                        ? 'bg-white/20 text-white border-white/30' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {qf.count}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tasks Display */}
        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-20 text-center shadow-2xl border-0 bg-white/80 backdrop-blur-md">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-8 shadow-lg">
                    <Target className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {searchQuery ? 'No tasks found' : 'No tasks yet'}
                  </h3>
                  <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    {searchQuery 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Start by creating your first task and take control of your productivity'
                    }
                  </p>
                  {!searchQuery && (
                    <Button 
                      onClick={() => setIsFormOpen(true)}
                      size="lg"
                      className="rounded-2xl px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create Your First Task
                    </Button>
                  )}
                </motion.div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="tasks"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'flex flex-col gap-4'
              }
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEdit}
                    onDelete={onDeleteTask}
                    onToggleStatus={onToggleStatus}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Productivity Insights */}
        {filteredTasks.length > 0 && (
          <motion.div
            className="mt-12 grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="p-6 bg-gradient-to-br from-green-600 to-emerald-600 border-0 shadow-2xl text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Progress Rate</h4>
                    <p className="text-white/90 leading-relaxed">
                      You've completed <strong>{completionRate}%</strong> of your tasks. {completionRate >= 70 ? 'Outstanding!' : 'Keep going!'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 border-0 shadow-2xl text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Today's Focus</h4>
                    <p className="text-white/90 leading-relaxed">
                      You have <strong>{todayTasks}</strong> {todayTasks === 1 ? 'task' : 'tasks'} scheduled for today. Stay focused!
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
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Upcoming Tasks</h4>
                    <p className="text-white/90 leading-relaxed">
                      <strong>{upcomingTasks}</strong> future {upcomingTasks === 1 ? 'task' : 'tasks'} to plan for. Stay ahead!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Task Form Dialog */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />
    </AnimatedSection>
  );
}