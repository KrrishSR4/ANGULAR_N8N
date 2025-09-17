import { motion } from "framer-motion";
import { PomodoroTimer } from "@/components/pomodoro/PomodoroTimer";
import { Clock, Target, Award } from "lucide-react";

const Pomodoro = () => {
  const stats = [
    {
      icon: Clock,
      label: "Today's Sessions",
      value: "8",
      color: "text-primary",
    },
    {
      icon: Target,
      label: "Daily Goal",
      value: "12",
      color: "text-info",
    },
    {
      icon: Award,
      label: "Best Streak",
      value: "15",
      color: "text-accent",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Pomodoro Timer</h1>
        <p className="text-muted-foreground">
          Boost your focus and productivity with the Pomodoro Technique.
        </p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="dashboard-card text-center"
          >
            <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <PomodoroTimer />
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Pomodoro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Work Sessions:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Focus on one task</li>
                <li>• Eliminate distractions</li>
                <li>• Take notes of interruptions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-info">Break Time:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Step away from your desk</li>
                <li>• Do light stretching</li>
                <li>• Hydrate and breathe</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Pomodoro;