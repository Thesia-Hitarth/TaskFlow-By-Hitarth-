'use client';

import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Eye
} from 'lucide-react';
import { format, isToday, isTomorrow, isPast, formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const isPastDue = isPast(task.dueDate) && !isToday(task.dueDate) && task.status === 'pending';
  const isDueToday = isToday(task.dueDate);
  const isDueTomorrow = isTomorrow(task.dueDate);

  const getStatusColor = () => {
    if (task.status === 'completed') return 'border-l-green-500 bg-gradient-to-r from-green-50/50 to-transparent';
    if (isPastDue) return 'border-l-red-500 bg-gradient-to-r from-red-50/50 to-transparent';
    if (isDueToday) return 'border-l-orange-500 bg-gradient-to-r from-orange-50/50 to-transparent';
    return 'border-l-blue-600 bg-gradient-to-r from-blue-50/50 to-transparent';
  };

  const getStatusBadge = () => {
    if (task.status === 'completed') {
      return { 
        text: 'Completed', 
        icon: CheckCircle2,
        className: 'bg-green-500 text-white hover:bg-green-600 border-green-600' 
      };
    }
    if (isPastDue) {
      return { 
        text: 'Overdue', 
        icon: AlertCircle,
        className: 'bg-red-500 text-white hover:bg-red-600 border-red-600 animate-pulse' 
      };
    }
    if (isDueToday) {
      return { 
        text: 'Due Today', 
        icon: Clock,
        className: 'bg-orange-500 text-white hover:bg-orange-600 border-orange-600' 
      };
    }
    return { 
      text: 'Pending', 
      icon: Clock,
      className: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-600' 
    };
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteDialog(false);
  };

  const getTimeUntilDue = () => {
    try {
      return formatDistanceToNow(task.dueDate, { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        whileHover={{ y: -6, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="h-full"
      >
        <Card className={`h-[340px] flex flex-col hover:shadow-2xl transition-all duration-300 border-l-4 ${getStatusColor()} relative overflow-hidden group`}>
          {/* Content Container */}
          <div className="flex-1 flex flex-col p-6 min-h-0">
            {/* Header with Title, Badge, and Menu */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 
                  className={`text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight ${
                    task.status === 'completed' ? 'line-through opacity-60' : ''
                  }`}
                  title={task.title}
                >
                  {task.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge className={`${statusBadge.className} font-semibold px-3 py-1 shadow-md flex items-center gap-1.5`}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {statusBadge.text}
                </Badge>

                {/* More Options Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onEdit(task)} className="cursor-pointer">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {showFullDescription ? 'Hide' : 'View'} Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setShowDeleteDialog(true)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Description - Fixed height with ellipsis */}
            <div className="flex-1 mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                {showFullDescription ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-sm leading-relaxed overflow-y-auto max-h-[120px] pr-2 custom-scrollbar"
                  >
                    {task.description || 'No description provided.'}
                  </motion.div>
                ) : (
                  <motion.p
                    key="truncated"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                    title={task.description}
                  >
                    {task.description || 'No description provided.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Date with time indicator */}
            <div className="space-y-3 pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="font-semibold text-gray-700">
                  {format(task.dueDate, 'MMM dd, yyyy')}
                </span>
                {isDueToday && (
                  <Badge variant="outline" className="ml-auto text-xs border-orange-300 text-orange-700 bg-orange-50 font-semibold">
                    Today
                  </Badge>
                )}
                {isDueTomorrow && (
                  <Badge variant="outline" className="ml-auto text-xs border-blue-300 text-blue-700 bg-blue-50 font-semibold">
                    Tomorrow
                  </Badge>
                )}
              </div>
              
              {task.status === 'pending' && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {isPastDue ? 'Was due' : 'Due'} {getTimeUntilDue()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleStatus(task.id)}
                className={`flex-1 font-semibold transition-all h-10 ${
                  task.status === 'completed'
                    ? 'border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600'
                    : 'border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600'
                }`}
              >
                {task.status === 'pending' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Complete
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    Mark Pending
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(task)}
                className="hover:bg-gray-50 transition-all h-10 px-3"
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all h-10 px-3"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <motion.div
            className={`absolute inset-0 pointer-events-none ${
              task.status === 'completed'
                ? 'bg-green-500'
                : isPastDue
                ? 'bg-red-500'
                : isDueToday
                ? 'bg-orange-500'
                : 'bg-blue-500'
            }`}
            animate={{ opacity: isHovered ? 0.04 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Completion Checkmark Animation */}
          {task.status === 'completed' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-1 shadow-lg"
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
}