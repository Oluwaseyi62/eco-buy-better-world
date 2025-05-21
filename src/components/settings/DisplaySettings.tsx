
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";

const DisplaySettings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [language, setLanguage] = React.useState("english");
  
  const handleDarkModeChange = (checked: boolean) => {
    toggleDarkMode();
    toast({
      title: checked ? "Dark mode enabled" : "Dark mode disabled",
      description: "Your preference has been saved",
    });
  };
  
  return (
    <div className="p-6 border border-earth-200 rounded-lg dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="h-5 w-5 text-eco-600" />
        <h2 className="text-lg font-semibold">Display Settings</h2>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Switch to a darker theme to reduce eye strain.
            </p>
          </div>
          <Switch 
            id="dark-mode" 
            checked={darkMode}
            onCheckedChange={handleDarkModeChange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="language" className="font-medium">Language</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Select your preferred language.
            </p>
          </div>
          <select 
            id="language"
            className="rounded-md border border-earth-200 dark:border-gray-700 px-3 py-2 text-sm dark:bg-gray-800"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;
