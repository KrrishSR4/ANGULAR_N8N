import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
  SortableContext as SortableProvider,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { 
  Calendar, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Circle,
  AlertCircle,
  Clock,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  pomodoroSessions: number;
  completedSessions: number;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new product landing page",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-09-20",
    pomodoroSessions: 4,
    completedSessions: 2,
  },
  {
    id: "2", 
    title: "Write blog post about productivity",
    description: "Research and write a comprehensive blog post about productivity techniques",
    status: "todo",
    priority: "medium",
    dueDate: "2024-09-22",
    pomodoroSessions: 3,
    completedSessions: 0,
  },
  {
    id: "3",
    title: "Review pull requests",
    description: "Review and provide feedback on pending pull requests",
    status: "completed",
    priority: "high",
    dueDate: "2024-09-18",
    pomodoroSessions: 2,
    completedSessions: 2,
  },
  {
    id: "4",
    title: "Team standup meeting",
    description: "Daily standup meeting with the development team",
    status: "todo",
    priority: "low",
    dueDate: "2024-09-19",
    pomodoroSessions: 1,
    completedSessions: 0,
  },
];

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  high: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  todo: Circle,
  "in-progress": Clock,
  completed: CheckCircle2,
};

interface SortableTaskProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const SortableTask = ({ task, onEdit, onDelete, onToggleComplete }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const StatusIcon = statusIcons[task.status];
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "task-item relative",
        isDragging && "opacity-50 scale-105 shadow-2xl z-50",
        task.status === "completed" && "opacity-75"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={cn(
              "mt-1 transition-colors",
              task.status === "completed" ? "text-success" : "text-muted-foreground"
            )}
          >
            <StatusIcon className="h-5 w-5" />
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={cn(
                "font-medium",
                task.status === "completed" && "line-through"
              )}>
                {task.title}
              </h4>
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              {isOverdue && (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {task.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className={isOverdue ? "text-destructive" : ""}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-12 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(task.completedSessions / task.pomodoroSessions) * 100}%` 
                    }}
                  />
                </div>
                <span>{task.completedSessions}/{task.pomodoroSessions}</span>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(task.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export const TaskList = ({ onEditTask }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === "completed" ? "todo" : "completed" as const,
            completedSessions: task.status === "completed" ? 0 : task.pomodoroSessions
          }
        : task
    ));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map((task) => (
              <SortableTask
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </div>
  );
};