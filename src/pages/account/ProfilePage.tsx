import React, { useState } from "react";
import Layout from "@/components/Layout";
import AccountLayout from "./AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await updateProfile({
        firstName,
        lastName,
        phone
      });
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (user?.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      } else if (nameParts.length === 1) {
        return nameParts[0][0].toUpperCase();
      }
    }
    return "U";
  };

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
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-eco-600 text-white flex items-center justify-center">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name || `${firstName} ${lastName}`}</h2>
              <p className="text-muted-foreground">
                Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    disabled 
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1" 
                  />
                </div>
              </div>
              
              <Button 
                className="bg-eco-600 hover:bg-eco-700"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
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
