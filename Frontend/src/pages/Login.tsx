import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const DEMO_CREDENTIALS = { email: "demo@test.com", password: "demo@123" };

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fillDemoCredentials = () => {
    setFormData(DEMO_CREDENTIALS);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast({
      title: "Login Successful",
      description: "Welcome back! Redirecting...",
    });

    const redirectTo =
      (location.state?.from as any)?.pathname && (location.state?.from as any)?.pathname !== "/login"
        ? (location.state?.from as any)?.pathname
        : "/dashboard";

    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your AI interview journey"
      heroImage="https://res.cloudinary.com/dks0vhj0j/image/upload/v1763846913/Log_in_page_oybkyb.png"
    >
      <Card className="border-0 shadow-secondary bg-gradient-card backdrop-blur-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Remember / Forgot */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              
              <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary-glow transition-colors">
                  Forgot password?
              </Link>

            </motion.div>

            {/* Submit */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Button type="submit" disabled={isLoading} variant="gradient" className="w-full transition-all duration-300">
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>

            {/* Demo credentials */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              onClick={fillDemoCredentials}
              className="w-full rounded-lg border border-dashed border-border/60 bg-background/30 p-3 text-left text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Demo credentials — click to autofill</p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Email:</span> {DEMO_CREDENTIALS.email}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Password:</span> {DEMO_CREDENTIALS.password}
              </p>
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mt-6 pt-6 border-t border-border/50">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-primary-glow transition-colors font-medium">
                Sign up here
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Login;
