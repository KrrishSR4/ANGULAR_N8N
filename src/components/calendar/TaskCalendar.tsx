import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  priority: "low" | "medium" | "high";
  type: "task" | "meeting" | "break";
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Design new landing page",
    start: new Date(2024, 8, 20, 9, 0),
    end: new Date(2024, 8, 20, 11, 0),
    priority: "high",
    type: "task",
  },
  {
    id: "2",
    title: "Team standup meeting",
    start: new Date(2024, 8, 19, 10, 0),
    end: new Date(2024, 8, 19, 10, 30),
    priority: "medium",
    type: "meeting",
  },
  {
    id: "3",
    title: "Write blog post",
    start: new Date(2024, 8, 22, 14, 0),
    end: new Date(2024, 8, 22, 16, 0),
    priority: "medium",
    type: "task",
  },
  {
    id: "4",
    title: "Coffee break",
    start: new Date(2024, 8, 21, 15, 0),
    end: new Date(2024, 8, 21, 15, 15),
    priority: "low",
    type: "break",
  },
];

const eventStyleGetter = (event: CalendarEvent) => {
  let backgroundColor = "#4CAF50";
  let borderColor = "#4CAF50";
  
  switch (event.priority) {
    case "high":
      backgroundColor = "#f87171";
      borderColor = "#ef4444";
      break;
    case "medium":
      backgroundColor = "#fbbf24";
      borderColor = "#f59e0b";
      break;
    case "low":
      backgroundColor = "#60a5fa";
      borderColor = "#3b82f6";
      break;
  }

  if (event.type === "break") {
    backgroundColor = "#a78bfa";
    borderColor = "#8b5cf6";
  }

  return {
    style: {
      backgroundColor,
      borderColor,
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: "6px",
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
    },
  };
};

export const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.WEEK);

  const CustomToolbar = ({ label, onNavigate, onView }: any) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{label}</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("TODAY")}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {["month", "week", "day"].map((view) => (
          <Button
            key={view}
            variant={currentView === view ? "default" : "outline"}
            size="sm"
            onClick={() => onView(view)}
            className="capitalize"
          >
            {view}
          </Button>
        ))}
      </div>
    </motion.div>
  );

  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <div className="flex items-center gap-1 h-full">
      <span className="text-xs font-medium truncate">{event.title}</span>
      <Badge
        variant="secondary"
        className="text-[10px] px-1 py-0 h-auto bg-white/20 text-white border-white/30"
      >
        {event.priority}
      </Badge>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[600px]"
    >
      <style>{`
        .rbc-calendar {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 12px;
          padding: 16px;
          font-family: inherit;
        }
        
        .rbc-header {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
          border: none;
          padding: 12px 8px;
          font-weight: 600;
          border-radius: 6px;
          margin-bottom: 4px;
        }
        
        .rbc-time-view {
          border: none;
        }
        
        .rbc-time-header {
          border-bottom: 1px solid hsl(var(--border));
        }
        
        .rbc-time-content {
          border-top: none;
        }
        
        .rbc-timeslot-group {
          border-bottom: 1px solid hsl(var(--border));
        }
        
        .rbc-time-slot {
          border-top: 1px solid hsl(var(--border));
        }
        
        .rbc-day-slot {
          border-right: 1px solid hsl(var(--border));
        }
        
        .rbc-today {
          background-color: hsl(var(--primary) / 0.1);
        }
        
        .rbc-off-range-bg {
          background: hsl(var(--muted) / 0.5);
        }
        
        .rbc-event {
          border: none !important;
          border-radius: 6px;
          padding: 2px 6px;
        }
        
        .rbc-event:focus {
          outline: 2px solid hsl(var(--ring));
        }
        
        .rbc-month-view {
          border: none;
        }
        
        .rbc-month-row {
          border-bottom: 1px solid hsl(var(--border));
        }
        
        .rbc-date-cell {
          padding: 8px;
          border-right: 1px solid hsl(var(--border));
        }
        
        .rbc-date-cell.rbc-off-range {
          background: hsl(var(--muted) / 0.3);
        }
      `}</style>
      
      <Calendar
        localizer={localizer}
        events={mockEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        view={currentView}
        onView={setCurrentView}
        date={currentDate}
        onNavigate={setCurrentDate}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
          event: EventComponent,
        }}
        formats={{
          timeGutterFormat: "HH:mm",
          eventTimeRangeFormat: ({ start, end }) =>
            `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
          dayHeaderFormat: "ddd DD MMM",
        }}
        step={30}
        timeslots={2}
        min={new Date(1970, 1, 1, 7, 0, 0)}
        max={new Date(1970, 1, 1, 22, 0, 0)}
        dayLayoutAlgorithm="no-overlap"
      />
    </motion.div>
  );
};