
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  const handleEnableTwoFactor = () => {
    setTwoFactorAuth(true);
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure",
    });
  };
  
  return (
    <div className="p-6 border border-earth-200 rounded-lg dark:border-gray-700">
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
            className="w-full dark:border-gray-700 dark:hover:bg-gray-700"
            onClick={handleEnableTwoFactor}
          >
            Enable Two-factor Authentication
          </Button>
        )}
        
        <div className="pt-2 border-t border-earth-200 dark:border-gray-700">
          <Button variant="outline" className="w-full dark:border-gray-700 dark:hover:bg-gray-700">
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
