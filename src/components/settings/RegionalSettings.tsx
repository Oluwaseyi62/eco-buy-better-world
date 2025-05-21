
import React from "react";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

const RegionalSettings = () => {
  return (
    <div className="p-6 border border-earth-200 rounded-lg dark:border-gray-700">
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
            className="rounded-md border border-earth-200 dark:border-gray-700 px-3 py-2 text-sm dark:bg-gray-800"
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
            className="rounded-md border border-earth-200 dark:border-gray-700 px-3 py-2 text-sm dark:bg-gray-800"
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
  );
};

export default RegionalSettings;
