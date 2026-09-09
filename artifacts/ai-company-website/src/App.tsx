import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { IS_MOBILE } from '@/lib/device';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { lazy, Suspense, type ReactNode } from 'react';
import Home from '@/pages/Home';
import { AdminAuthProvider } from '@/admin/AuthContext';
import RequireAuth from '@/admin/RequireAuth';

// Public pages other than home load on demand so the first visit only
// downloads what it needs.
const OurWork = lazy(() => import('@/pages/OurWork'));
const Clients = lazy(() => import('@/pages/Clients'));
const About = lazy(() => import('@/pages/About'));
const ServicesOverview = lazy(() => import('@/pages/services/ServicesOverview'));
const AIService = lazy(() => import('@/pages/services/AIService'));
const SoftwareService = lazy(() => import('@/pages/services/SoftwareService'));
const MobileService = lazy(() => import('@/pages/services/MobileService'));
const UIUXService = lazy(() => import('@/pages/services/UIUXService'));
const MarketingService = lazy(() => import('@/pages/services/MarketingService'));
const MarketingDetail = lazy(() => import('@/pages/services/MarketingDetail'));
const CloudService = lazy(() => import('@/pages/services/CloudService'));

const Login = lazy(() => import('@/admin/Login'));
const Dashboard = lazy(() => import('@/admin/Dashboard'));
const Queries = lazy(() => import('@/admin/Queries'));
const PagesList = lazy(() => import('@/admin/PagesList'));
const PageEditor = lazy(() => import('@/admin/PageEditor'));
const ClientsAdmin = lazy(() => import('@/admin/ClientsAdmin'));
const MarketingServicesAdmin = lazy(() => import('@/admin/MarketingServicesAdmin'));
const WorkAdmin = lazy(() => import('@/admin/WorkAdmin'));

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
      <Route path="/admin/work">
        <AdminRoute>
          <WorkAdmin />
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
      {/* On mobile, disable framer-motion transform/layout animations globally —
          they are the main cause of scroll lag on low-power devices. Content
          still appears (opacity), it just doesn't slide/scale around. */}
      <MotionConfig reducedMotion={IS_MOBILE ? 'always' : 'never'}>
        <TooltipProvider>
          <AdminAuthProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Suspense fallback={<AdminFallback />}>
                <Router />
              </Suspense>
            </WouterRouter>
            <Toaster />
          </AdminAuthProvider>
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default App;
