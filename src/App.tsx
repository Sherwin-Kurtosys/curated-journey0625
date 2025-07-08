import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { TopBar } from "@/components/TopBar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleActivities from "./pages/RoleActivities";
import ReportStatus from "./pages/ReportStatus";
import ReportWorkflows from "./pages/ReportWorkflows";
import ReportTemplates from "./pages/ReportTemplates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="pt-14">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/role/:roleId" element={<RoleActivities />} />
          <Route path="/report-status" element={<ReportStatus />} />
          <Route path="/report-workflows" element={<ReportWorkflows />} />
          <Route path="/report-templates" element={<ReportTemplates />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </NotificationProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
