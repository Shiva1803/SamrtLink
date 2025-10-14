import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  User, 
  Palette, 
  Shield, 
  CreditCard,
  Upload,
  Globe,
  Lock,
  Bell,
  Trash2,
  Save,
  Link2,
  LogOut,
  Home,
  BarChart3,
  Settings as SettingsIcon
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Alex Morrison',
    email: 'alex@example.com',
    bio: 'Digital marketer and link optimization enthusiast',
    company: 'SmartLink Inc',
    website: 'https://alexmorrison.com',
  });

  // Branding state
  const [brandingData, setBrandingData] = useState({
    customDomain: 'links.mycompany.com',
    brandColor: '#000000',
    logoUrl: '',
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    weeklyReports: true,
    securityAlerts: true,
  });

  // ============================================
  // PLACEHOLDER FUNCTIONS - Connect to API
  // ============================================

  // TODO: API call to update profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', profileData);
    toast.success('Profile updated successfully!');
  };

  // TODO: API call to upload avatar
  const handleAvatarUpload = () => {
    console.log('Uploading avatar');
    toast.success('Avatar uploaded!');
  };

  // TODO: API call to update branding
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving branding:', brandingData);
    toast.success('Branding settings saved!');
  };

  // TODO: API call to update password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    console.log('Updating password');
    toast.success('Password updated successfully!');
    setSecurityData({ ...securityData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // TODO: API call to toggle 2FA
  const handleToggle2FA = () => {
    setSecurityData({ ...securityData, twoFactorEnabled: !securityData.twoFactorEnabled });
    toast.success(securityData.twoFactorEnabled ? '2FA disabled' : '2FA enabled!');
  };

  // TODO: API call to delete account
  const handleDeleteAccount = () => {
    console.log('Deleting account');
    toast.error('Account deletion requires confirmation');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* ============================================ */}
      {/* SIDEBAR NAVIGATION */}
      {/* ============================================ */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex w-64 bg-white border-r border-neutral-200 flex-col fixed h-screen z-50"
      >
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl text-neutral-900">SmartLink</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Home, label: 'Dashboard', href: '/dashboard' },
            { icon: Link2, label: 'Links', href: '/dashboard' },
            { icon: BarChart3, label: 'Analytics', href: '/dashboard' },
            { icon: SettingsIcon, label: 'Settings', active: true },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                item.active
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <main className="flex-1 lg:ml-64">
        <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl text-neutral-900 mb-4">Settings</h1>
              <p className="text-lg text-neutral-600">Manage your account settings and preferences.</p>
            </ScrollReveal>
          </div>

          {/* Settings Tabs */}
          <ScrollReveal delay={0.2}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-neutral-100 p-1 rounded-xl">
                <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="branding" className="rounded-lg data-[state=active]:bg-white">
                  <Palette className="w-4 h-4 mr-2" />
                  Branding
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="subscription" className="rounded-lg data-[state=active]:bg-white">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Plan
                </TabsTrigger>
              </TabsList>

              {/* ============================================ */}
              {/* PROFILE TAB */}
              {/* ============================================ */}
              <TabsContent value="profile">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 bg-white border-neutral-200">
                    <h2 className="text-2xl text-neutral-900 mb-6">Profile Information</h2>
                    
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-neutral-100">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" />
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg text-neutral-900 mb-2">Profile Picture</h3>
                        <p className="text-sm text-neutral-600 mb-3">JPG, PNG or GIF. Max size 2MB.</p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={handleAvatarUpload} variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload New Photo
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="mt-2 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="mt-2 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={3}
                          className="mt-2 bg-neutral-50 border-neutral-200"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                            className="mt-2 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                            className="mt-2 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                        <p className="text-sm text-neutral-500">
                          Last updated: 2 days ago
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button type="submit" className="bg-black hover:bg-neutral-800 text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* ============================================ */}
              {/* BRANDING TAB */}
              {/* ============================================ */}
              <TabsContent value="branding">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 bg-white border-neutral-200">
                    <h2 className="text-2xl text-neutral-900 mb-6">Branding Settings</h2>
                    
                    <form onSubmit={handleSaveBranding} className="space-y-6">
                      {/* Custom Domain */}
                      <div>
                        <Label htmlFor="domain" className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Custom Domain
                        </Label>
                        <Input
                          id="domain"
                          value={brandingData.customDomain}
                          onChange={(e) => setBrandingData({ ...brandingData, customDomain: e.target.value })}
                          placeholder="links.yourdomain.com"
                          className="mt-2 bg-neutral-50 border-neutral-200"
                        />
                        <p className="text-sm text-neutral-500 mt-2">
                          Use your own domain for branded short links
                        </p>
                      </div>

                      {/* Brand Color */}
                      <div>
                        <Label htmlFor="brandColor">Brand Color</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Input
                            id="brandColor"
                            type="color"
                            value={brandingData.brandColor}
                            onChange={(e) => setBrandingData({ ...brandingData, brandColor: e.target.value })}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            value={brandingData.brandColor}
                            onChange={(e) => setBrandingData({ ...brandingData, brandColor: e.target.value })}
                            className="flex-1 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                      </div>

                      {/* Logo Upload */}
                      <div>
                        <Label>Brand Logo</Label>
                        <div className="mt-2 border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-neutral-300 transition-colors">
                          <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                          <p className="text-sm text-neutral-600 mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-neutral-500">
                            SVG, PNG or JPG (max. 800x400px)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-6 border-t border-neutral-100">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button type="submit" className="bg-black hover:bg-neutral-800 text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save Branding
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* ============================================ */}
              {/* SECURITY TAB */}
              {/* ============================================ */}
              <TabsContent value="security">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Change Password */}
                  <Card className="p-8 bg-white border-neutral-200">
                    <h2 className="text-2xl text-neutral-900 mb-6">Change Password</h2>
                    
                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={securityData.currentPassword}
                          onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                          className="mt-2 bg-neutral-50 border-neutral-200"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={securityData.newPassword}
                            onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                            className="mt-2 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                            className="mt-2 bg-neutral-50 border-neutral-200"
                          />
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" className="bg-black hover:bg-neutral-800 text-white">
                          <Lock className="w-4 h-4 mr-2" />
                          Update Password
                        </Button>
                      </motion.div>
                    </form>
                  </Card>

                  {/* Two-Factor Authentication */}
                  <Card className="p-8 bg-white border-neutral-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl text-neutral-900 mb-2">Two-Factor Authentication</h3>
                        <p className="text-sm text-neutral-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={securityData.twoFactorEnabled}
                        onCheckedChange={handleToggle2FA}
                      />
                    </div>
                  </Card>

                  {/* Notification Preferences */}
                  <Card className="p-8 bg-white border-neutral-200">
                    <h2 className="text-2xl text-neutral-900 mb-6">
                      <Bell className="w-6 h-6 inline mr-2" />
                      Notifications
                    </h2>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your links' },
                        { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly analytics summaries' },
                        { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0">
                          <div>
                            <p className="text-neutral-900">{item.label}</p>
                            <p className="text-sm text-neutral-500">{item.desc}</p>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={(checked) => 
                              setNotifications({ ...notifications, [item.key]: checked })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="p-8 bg-white border-red-200">
                    <h2 className="text-2xl text-red-600 mb-4">Danger Zone</h2>
                    <p className="text-neutral-600 mb-6">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={handleDeleteAccount}
                        variant="outline" 
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </motion.div>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* ============================================ */}
              {/* SUBSCRIPTION TAB */}
              {/* ============================================ */}
              <TabsContent value="subscription">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 bg-white border-neutral-200">
                    <h2 className="text-2xl text-neutral-900 mb-6">Current Plan</h2>
                    
                    {/* Current Plan Info */}
                    <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl text-neutral-900">Professional</h3>
                          <p className="text-neutral-600">Billed monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl text-neutral-900">$29</p>
                          <p className="text-sm text-neutral-600">per month</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                        <p className="text-sm text-neutral-600">Next billing date: Jan 15, 2025</p>
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Plan Features */}
                    <div className="mb-8">
                      <h3 className="text-lg text-neutral-900 mb-4">Your Plan Includes:</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          '10,000 links per month',
                          'Advanced analytics',
                          'Custom branded domains',
                          'Priority support',
                          'Team collaboration (5 members)',
                          'A/B testing',
                          'API access',
                          'Password protection',
                        ].map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="bg-black hover:bg-neutral-800 text-white">
                          Upgrade Plan
                        </Button>
                      </motion.div>
                      <Button variant="outline" className="border-neutral-200">
                        Cancel Subscription
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
}
