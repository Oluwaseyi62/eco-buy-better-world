
import React, { useState } from "react";
import Layout from "@/components/Layout";
import AccountLayout from "./AccountLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Settings, Lock, Bell, Palette, Globe } from "lucide-react";

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState("english");
  
  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Dark mode enabled" : "Dark mode disabled",
      description: "Your preference has been saved",
    });
  };
  
  const handleEnableTwoFactor = () => {
    setTwoFactorAuth(true);
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure",
    });
  };
  
  return (
    <Layout>
      <AccountLayout activeTab="settings">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
            <p className="text-muted-foreground">
              Configure your account preferences and settings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Display Settings */}
            <div className="p-6 border border-earth-200 rounded-lg">
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
                    className="rounded-md border border-earth-200 px-3 py-2 text-sm"
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
            
            {/* Security Settings */}
            <div className="p-6 border border-earth-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-eco-600" />
                <h2 className="text-lg font-semibold">Security Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor" className="font-medium">Two-factor Authentication</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <Switch 
                    id="two-factor" 
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                    disabled={twoFactorAuth}
                  />
                </div>
                
                {!twoFactorAuth && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleEnableTwoFactor}
                  >
                    Enable Two-factor Authentication
                  </Button>
                )}
                
                <div className="pt-2 border-t border-earth-200">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="p-6 border border-earth-200 rounded-lg">
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
            
            {/* Regional Settings */}
            <div className="p-6 border border-earth-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-eco-600" />
                <h2 className="text-lg font-semibold">Regional Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="currency" className="font-medium">Currency</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select your preferred currency.
                    </p>
                  </div>
                  <select 
                    id="currency"
                    className="rounded-md border border-earth-200 px-3 py-2 text-sm"
                    defaultValue="usd"
                  >
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="cad">CAD ($)</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="timezone" className="font-medium">Time Zone</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select your local time zone.
                    </p>
                  </div>
                  <select 
                    id="timezone"
                    className="rounded-md border border-earth-200 px-3 py-2 text-sm"
                    defaultValue="utc"
                  >
                    <option value="utc">UTC (GMT+0)</option>
                    <option value="est">EST (GMT-5)</option>
                    <option value="pst">PST (GMT-8)</option>
                    <option value="cet">CET (GMT+1)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t border-earth-200">
            <Button variant="outline">Cancel</Button>
            <Button 
              className="bg-eco-600 hover:bg-eco-700"
              onClick={() => {
                toast({
                  title: "Settings saved",
                  description: "Your preferences have been updated",
                });
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default SettingsPage;
