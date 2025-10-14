import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Link2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  // PLACEHOLDER FUNCTION - Connect to registration API
  const handleSubmit = (e: React.FormEvent) => {
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

    // TODO: API call for user registration
    console.log('Sign up attempt:', formData);
    toast.success('Account created successfully! (Placeholder)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // PLACEHOLDER FUNCTION - Connect to OAuth providers
  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    toast.info('Google sign up (Placeholder)');
  };

  const handleGithubSignUp = () => {
    // TODO: Implement GitHub OAuth
    toast.info('GitHub sign up (Placeholder)');
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
              />
              <p className="text-xs text-neutral-500 mt-1">
                Must be at least 8 characters
              </p>
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
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
                className="mt-0.5"
              />
              <label htmlFor="acceptTerms" className="text-sm text-neutral-700">
                I agree to the{' '}
                <a href="#" className="text-neutral-900 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-neutral-900 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-neutral-800 text-white h-12"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-50 text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full border-neutral-200 hover:bg-white h-12"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              onClick={handleGithubSignUp}
              variant="outline"
              className="w-full border-neutral-200 hover:bg-white h-12"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </Button>
          </div>
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-6 text-sm text-neutral-600"
        >
          Already have an account?{' '}
          <button 
            onClick={() => window.location.hash = '#signin'} 
            className="text-neutral-900 hover:underline"
          >
            Sign in
          </button>
        </motion.p>
      </div>
    </motion.div>
  );
}
