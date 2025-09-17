import { motion } from "framer-motion";
import { Bell, Clock, Palette, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const settingsSections = [
    {
      title: "Profile",
      icon: User,
      settings: [
        { label: "Full Name", type: "input", value: "John Doe" },
        { label: "Email", type: "input", value: "john@example.com" },
        { label: "Timezone", type: "select", value: "UTC-5" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { label: "Task Reminders", type: "toggle", value: true },
        { label: "Pomodoro Alerts", type: "toggle", value: true },
        { label: "Daily Summary", type: "toggle", value: false },
        { label: "Email Notifications", type: "toggle", value: true },
      ],
    },
    {
      title: "Pomodoro",
      icon: Clock,
      settings: [
        { label: "Work Duration (minutes)", type: "input", value: "25" },
        { label: "Short Break (minutes)", type: "input", value: "5" },
        { label: "Long Break (minutes)", type: "input", value: "15" },
        { label: "Auto Start Breaks", type: "toggle", value: false },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      settings: [
        { label: "Theme", type: "select", value: "light" },
        { label: "Color Scheme", type: "select", value: "green" },
        { label: "Animations", type: "toggle", value: true },
        { label: "Compact Mode", type: "toggle", value: false },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your productivity dashboard experience.
        </p>
      </div>

      <div className="grid gap-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="dashboard-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <motion.div
                  key={setting.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index * 0.1) + (settingIndex * 0.05) }}
                  className="flex items-center justify-between py-2"
                >
                  <Label htmlFor={`${section.title}-${settingIndex}`} className="text-sm font-medium">
                    {setting.label}
                  </Label>
                  
                  {setting.type === "input" && (
                    <Input
                      id={`${section.title}-${settingIndex}`}
                      defaultValue={setting.value as string}
                      className="w-48"
                    />
                  )}
                  
                  {setting.type === "toggle" && (
                    <Switch
                      id={`${section.title}-${settingIndex}`}
                      defaultChecked={setting.value as boolean}
                    />
                  )}
                  
                  {setting.type === "select" && (
                    <Select defaultValue={setting.value as string}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {section.title === "Timezone" && (
                          <>
                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="UTC+0">UTC (UTC+0)</SelectItem>
                            <SelectItem value="UTC+1">Central European (UTC+1)</SelectItem>
                          </>
                        )}
                        {section.title === "Appearance" && setting.label === "Theme" && (
                          <>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </>
                        )}
                        {section.title === "Appearance" && setting.label === "Color Scheme" && (
                          <>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end gap-3 pt-6"
      >
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-gradient-primary hover:opacity-90">
          Save Changes
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Settings;