
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  return (
    <div className="p-6 border border-earth-200 rounded-lg dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="h-5 w-5 text-eco-600" />
        <h2 className="text-lg font-semibold">Notification Settings</h2>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Receive order updates and promotions via email.
            </p>
          </div>
          <Switch 
            id="email-notifications" 
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Receive notifications on your device.
            </p>
          </div>
          <Switch 
            id="push-notifications" 
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
