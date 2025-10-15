import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Link2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function SignUp() {
  const { signUp, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  // Handle sign up with authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // Auto-redirect handled in App.tsx
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Sign up failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // OAuth placeholders
  const handleGoogleSignUp = () => {
    toast.info('Google sign up coming soon');
  };

  const handleGithubSignUp = () => {
    toast.info('GitHub sign up coming soon');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex items-center justify-center py-32 px-6"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Link2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl text-neutral-900">SmartLink</span>
          </div>
          <h1 className="text-3xl text-neutral-900 mb-2">Create your account</h1>
          <p className="text-neutral-600">Start managing your links in minutes</p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-2 bg-white border-neutral-200"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 bg-white border-neutral-200"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 bg-white border-neutral-200"
                required
                minLength={8}
                disabled={isLoading}
              />
              <p className="text-xs text-neutral-600 mt-1">At least 8 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 bg-white border-neutral-200"
                required
                disabled={isLoading}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
                disabled={isLoading}
              />
              <Label htmlFor="acceptTerms" className="text-sm cursor-pointer leading-tight">
                I agree to the{' '}
                <a href="#" className="text-black hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-black hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-50 text-neutral-600">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignUp}
              className="bg-white"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGithubSignUp}
              className="bg-white"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'signin' }))}
              className="text-black hover:underline"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
