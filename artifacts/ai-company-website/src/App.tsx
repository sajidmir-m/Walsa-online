import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { lazy, Suspense, type ReactNode } from 'react';
import Home from '@/pages/Home';
import OurWork from '@/pages/OurWork';
import Clients from '@/pages/Clients';
import About from '@/pages/About';
import ServicesOverview from '@/pages/services/ServicesOverview';
import AIService from '@/pages/services/AIService';
import SoftwareService from '@/pages/services/SoftwareService';
import MobileService from '@/pages/services/MobileService';
import UIUXService from '@/pages/services/UIUXService';
import MarketingService from '@/pages/services/MarketingService';
import MarketingDetail from '@/pages/services/MarketingDetail';
import CloudService from '@/pages/services/CloudService';
import { AdminAuthProvider } from '@/admin/AuthContext';
import RequireAuth from '@/admin/RequireAuth';

const Login = lazy(() => import('@/admin/Login'));
const Dashboard = lazy(() => import('@/admin/Dashboard'));
const Queries = lazy(() => import('@/admin/Queries'));
const PagesList = lazy(() => import('@/admin/PagesList'));
const PageEditor = lazy(() => import('@/admin/PageEditor'));
const ClientsAdmin = lazy(() => import('@/admin/ClientsAdmin'));
const MarketingServicesAdmin = lazy(() => import('@/admin/MarketingServicesAdmin'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AdminFallback() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center text-slate-400">
      <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <Suspense fallback={<AdminFallback />}>{children}</Suspense>
    </RequireAuth>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={OurWork} />
      <Route path="/clients" component={Clients} />
      <Route path="/about" component={About} />
      <Route path="/services" component={ServicesOverview} />
      <Route path="/services/ai" component={AIService} />
      <Route path="/services/software" component={SoftwareService} />
      <Route path="/services/mobile" component={MobileService} />
      <Route path="/services/uiux" component={UIUXService} />
      <Route path="/services/marketing/:slug" component={MarketingDetail} />
      <Route path="/services/marketing" component={MarketingService} />
      <Route path="/services/cloud" component={CloudService} />

      <Route path="/admin/login">
        <Suspense fallback={<AdminFallback />}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/admin/queries">
        <AdminRoute>
          <Queries />
        </AdminRoute>
      </Route>
      <Route path="/admin/pages/:slug">
        <AdminRoute>
          <PageEditor />
        </AdminRoute>
      </Route>
      <Route path="/admin/pages">
        <AdminRoute>
          <PagesList />
        </AdminRoute>
      </Route>
      <Route path="/admin/clients">
        <AdminRoute>
          <ClientsAdmin />
        </AdminRoute>
      </Route>
      <Route path="/admin/marketing">
        <AdminRoute>
          <MarketingServicesAdmin />
        </AdminRoute>
      </Route>
      <Route path="/admin">
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
