import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import ATSChecker from "./pages/ATSChecker";
import ResumeUpload from "./pages/ResumeUpload";
import GrantPermissions from "./pages/GrantPermissions";
import NotFound from "./pages/NotFound";
import InterviewResults from "./pages/InterviewResults";
import Vlog from "./pages/Vlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/vlog" element={<Vlog />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-upload" element={<ResumeUpload />} />
            <Route path="/grant-permissions" element={<GrantPermissions />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/InterviewResults" element={<InterviewResults />} />
            <Route path="/ats-checker" element={<ATSChecker />} />

            {/* Catch-all / 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
