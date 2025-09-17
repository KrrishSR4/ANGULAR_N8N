import { motion } from "framer-motion";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProductivityChart } from "@/components/dashboard/ProductivityChart";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your productivity.
        </p>
      </div>

      <StatsCards />
      <ProductivityChart />
    </motion.div>
  );
};

export default Dashboard;