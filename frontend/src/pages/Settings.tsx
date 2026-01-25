import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { useState } from 'react';

export function Settings() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'SmartLink Inc',
    website: 'smartlink.com',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
  });

  // PLACEHOLDER FUNCTIONS - Connect to API
  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updating profile:', profileData);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Password updated successfully!');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion not implemented');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-neutral-50 pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl text-neutral-900 mb-2">Settings</h1>
          <p className="text-neutral-600">Manage your account preferences and security settings.</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-black text-white text-xl">JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl text-neutral-900">Profile Information</h2>
                <p className="text-neutral-600">Update your personal details</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button type="submit" className="bg-black text-white hover:bg-neutral-800">
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Password Settings */}
          <Card className="p-6">
            <h2 className="text-xl text-neutral-900 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
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
              <Button type="submit" className="bg-black text-white hover:bg-neutral-800">
                Update Password
              </Button>
            </form>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-xl text-neutral-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-900">Email Notifications</p>
                  <p className="text-sm text-neutral-600">Get notified about link activity</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-900">Marketing Emails</p>
                  <p className="text-sm text-neutral-600">Receive product updates and tips</p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-900">Weekly Reports</p>
                  <p className="text-sm text-neutral-600">Weekly analytics summary</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-200">
            <h2 className="text-xl text-red-600 mb-4">Danger Zone</h2>
            <p className="text-neutral-600 mb-4">Once you delete your account, there is no going back.</p>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
