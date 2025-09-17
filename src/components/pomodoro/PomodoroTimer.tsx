import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const WORK_TIME = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60; // 5 minutes  
const LONG_BREAK = 15 * 60; // 15 minutes

type TimerState = "work" | "shortBreak" | "longBreak";
type TimerStatus = "idle" | "running" | "paused";

export const PomodoroTimer = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [timerState, setTimerState] = useState<TimerState>("work");
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("idle");
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTimerDuration = (state: TimerState) => {
    switch (state) {
      case "work": return WORK_TIME;
      case "shortBreak": return SHORT_BREAK;
      case "longBreak": return LONG_BREAK;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const totalTime = getTimerDuration(timerState);
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const startTimer = () => {
    setTimerStatus("running");
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setTimerStatus("paused");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    setTimerStatus("idle");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeLeft(getTimerDuration(timerState));
  };

  const handleTimerComplete = () => {
    setTimerStatus("idle");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timerState === "work") {
      const newSessionCount = completedSessions + 1;
      setCompletedSessions(newSessionCount);
      
      // Determine next state
      const nextState = newSessionCount % 4 === 0 ? "longBreak" : "shortBreak";
      setTimerState(nextState);
      setTimeLeft(getTimerDuration(nextState));
      
      toast({
        title: "Work session completed! 🎉",
        description: `Time for a ${nextState === "longBreak" ? "long" : "short"} break.`,
      });
    } else {
      setTimerState("work");
      setTimeLeft(getTimerDuration("work"));
      
      toast({
        title: "Break finished! ☕",
        description: "Ready for the next work session?",
      });
    }
  };

  const switchMode = (mode: TimerState) => {
    resetTimer();
    setTimerState(mode);
    setTimeLeft(getTimerDuration(mode));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getStateColor = () => {
    switch (timerState) {
      case "work": return "text-primary";
      case "shortBreak": return "text-info";
      case "longBreak": return "text-accent";
    }
  };

  const getStateIcon = () => {
    switch (timerState) {
      case "work": return Briefcase;
      case "shortBreak": 
      case "longBreak": return Coffee;
    }
  };

  const StateIcon = getStateIcon();

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="dashboard-card text-center"
      >
        {/* Timer State Tabs */}
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          {(["work", "shortBreak", "longBreak"] as TimerState[]).map((mode) => (
            <button
              key={mode}
              onClick={() => switchMode(mode)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                timerState === mode
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "work" ? "Work" : mode === "shortBreak" ? "Short Break" : "Long Break"}
            </button>
          ))}
        </div>

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-muted"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className={getStateColor()}
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 283" }}
              animate={{ 
                strokeDasharray: `${(getProgress() / 100) * 283} 283`,
                stroke: timerState === "work" ? "#4CAF50" : timerState === "shortBreak" ? "#2196F3" : "#FF9800"
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <StateIcon className={`h-8 w-8 mb-2 ${getStateColor()}`} />
            <motion.div
              key={`${timerState}-${timeLeft}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold"
            >
              {formatTime(timeLeft)}
            </motion.div>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {timerState === "shortBreak" ? "Short Break" : 
               timerState === "longBreak" ? "Long Break" : "Focus Time"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <AnimatePresence mode="wait">
            {timerStatus === "running" ? (
              <motion.div
                key="pause"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Button
                  onClick={pauseTimer}
                  size="lg"
                  className="pomodoro-button bg-accent hover:bg-accent-dark"
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Button
                  onClick={startTimer}
                  size="lg"
                  className="pomodoro-button bg-gradient-primary hover:opacity-90"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {timerStatus === "paused" ? "Resume" : "Start"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            onClick={resetTimer}
            size="lg"
            variant="outline"
            className="pomodoro-button"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Progress 
            value={getProgress()} 
            className="h-2"
          />
        </div>

        {/* Session Counter */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Sessions completed:</span>
            <motion.span
              key={completedSessions}
              initial={{ scale: 1.2, color: "#4CAF50" }}
              animate={{ scale: 1, color: "inherit" }}
              className="font-bold"
            >
              {completedSessions}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};