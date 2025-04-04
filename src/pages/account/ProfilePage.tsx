
import React from "react";
import Layout from "@/components/Layout";
import AccountLayout from "./AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <AccountLayout activeTab="profile">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000&auto=format&fit=crop" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-eco-600 text-white flex items-center justify-center">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Jane Doe</h2>
              <p className="text-muted-foreground">
                Member since April 2024
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Jane" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="jane.doe@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" className="mt-1" />
                </div>
              </div>
              
              <Button className="bg-eco-600 hover:bg-eco-700">
                Save Changes
              </Button>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Change Password</h3>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-1" />
                </div>
              </div>
              
              <Button className="bg-eco-600 hover:bg-eco-700">
                Update Password
              </Button>
            </div>
          </div>
          
          <div className="border-t border-earth-200 pt-8">
            <h3 className="text-lg font-semibold mb-4">Email Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderUpdates"
                  className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                  defaultChecked
                />
                <label htmlFor="orderUpdates" className="ml-2 block text-sm text-muted-foreground">
                  Order updates and shipping notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="promotions"
                  className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                  defaultChecked
                />
                <label htmlFor="promotions" className="ml-2 block text-sm text-muted-foreground">
                  Promotions, discounts, and sales
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                  defaultChecked
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-muted-foreground">
                  Sustainability newsletter and tips
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="productUpdates"
                  className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                />
                <label htmlFor="productUpdates" className="ml-2 block text-sm text-muted-foreground">
                  New product announcements
                </label>
              </div>
            </div>
            
            <Button className="mt-4 bg-eco-600 hover:bg-eco-700">
              Save Preferences
            </Button>
          </div>
          
          <div className="border-t border-earth-200 pt-8">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Delete Account</h3>
            <p className="text-muted-foreground mb-4">
              Once you delete your account, there is no going back. This action is permanent.
            </p>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default ProfilePage;
