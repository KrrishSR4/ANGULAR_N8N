import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", completed: 8, planned: 10 },
  { day: "Tue", completed: 12, planned: 15 },
  { day: "Wed", completed: 6, planned: 8 },
  { day: "Thu", completed: 14, planned: 16 },
  { day: "Fri", completed: 10, planned: 12 },
  { day: "Sat", completed: 5, planned: 6 },
  { day: "Sun", completed: 3, planned: 4 },
];

const categoryData = [
  { name: "Work", value: 45, color: "#4CAF50" },
  { name: "Personal", value: 25, color: "#2196F3" },
  { name: "Health", value: 20, color: "#FF9800" },
  { name: "Learning", value: 10, color: "#9C27B0" },
];

const productivityData = [
  { time: "9AM", focus: 85 },
  { time: "10AM", focus: 92 },
  { time: "11AM", focus: 78 },
  { time: "12PM", focus: 65 },
  { time: "1PM", focus: 45 },
  { time: "2PM", focus: 88 },
  { time: "3PM", focus: 95 },
  { time: "4PM", focus: 82 },
  { time: "5PM", focus: 70 },
];

export const ProductivityChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="dashboard-card"
      >
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
            <Legend />
            <Bar dataKey="completed" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            <Bar dataKey="planned" fill="#2196F3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Task Categories */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="dashboard-card"
      >
        <h3 className="text-lg font-semibold mb-4">Task Categories</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Focus Timeline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card lg:col-span-2"
      >
        <h3 className="text-lg font-semibold mb-4">Daily Focus Level</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="focus" 
              stroke="#FF9800" 
              strokeWidth={3}
              dot={{ fill: '#FF9800', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#FF9800', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};