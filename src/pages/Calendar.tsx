import { motion } from "framer-motion";
import { TaskCalendar } from "@/components/calendar/TaskCalendar";

const Calendar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          View and manage your tasks and events in calendar format.
        </p>
      </div>

      <TaskCalendar />
    </motion.div>
  );
};

export default Calendar;