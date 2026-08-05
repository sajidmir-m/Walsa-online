import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import ServicesOverview from '@/pages/services/ServicesOverview';
import AIService from '@/pages/services/AIService';
import SoftwareService from '@/pages/services/SoftwareService';
import MobileService from '@/pages/services/MobileService';
import UIUXService from '@/pages/services/UIUXService';
import MarketingService from '@/pages/services/MarketingService';
import CloudService from '@/pages/services/CloudService';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesOverview} />
      <Route path="/services/ai" component={AIService} />
      <Route path="/services/software" component={SoftwareService} />
      <Route path="/services/mobile" component={MobileService} />
      <Route path="/services/uiux" component={UIUXService} />
      <Route path="/services/marketing" component={MarketingService} />
      <Route path="/services/cloud" component={CloudService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
