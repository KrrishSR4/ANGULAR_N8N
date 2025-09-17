import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  Calendar, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Pomodoro", href: "/pomodoro", icon: Timer },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 250 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full bg-card border-r border-border shadow-elegant z-40"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!isCollapsed && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent"
            >
              ProductivityHub
            </motion.h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "sidebar-nav-item group",
                    isActive && "active"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2",
            isCollapsed ? "justify-center" : ""
          )}>
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};