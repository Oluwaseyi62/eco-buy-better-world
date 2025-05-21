
import React from "react";
import Layout from "@/components/Layout";
import AccountLayout from "./AccountLayout";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import DisplaySettings from "@/components/settings/DisplaySettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import RegionalSettings from "@/components/settings/RegionalSettings";

const SettingsPage: React.FC = () => {
  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
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
            <DisplaySettings />
            <SecuritySettings />
            <NotificationSettings />
            <RegionalSettings />
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t border-earth-200 dark:border-gray-700">
            <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-700">Cancel</Button>
            <Button 
              className="bg-eco-600 hover:bg-eco-700"
              onClick={handleSaveChanges}
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
