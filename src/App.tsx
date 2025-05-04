
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Services from "./pages/Services";
import Staff from "./pages/Staff";
import Schedule from "./pages/Schedule";
import Jobs from "./pages/Jobs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import Invoicing from "./pages/finance/Invoicing";
import Expenses from "./pages/finance/Expenses";
import Payroll from "./pages/finance/Payroll";
import FinanceDashboard from "./pages/finance/FinanceDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients/:id" element={<ClientDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="staff" element={<Staff />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="settings" element={<Settings />} />
              <Route path="finance" element={<FinanceDashboard />} />
              <Route path="finance/invoicing" element={<Invoicing />} />
              <Route path="finance/expenses" element={<Expenses />} />
              <Route path="finance/payroll" element={<Payroll />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
