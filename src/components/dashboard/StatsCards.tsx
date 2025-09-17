import { motion } from "framer-motion";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";

const stats = [
  {
    name: "Total Tasks",
    value: "24",
    change: "+12%",
    changeType: "positive",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    name: "Completed",
    value: "18",
    change: "+75%",
    changeType: "positive", 
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    name: "In Progress",
    value: "6",
    change: "-8%",
    changeType: "negative",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    name: "Productivity",
    value: "87%",
    change: "+23%",
    changeType: "positive",
    icon: TrendingUp,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dashboard-card group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};