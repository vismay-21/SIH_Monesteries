import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RumtekMonastery from "./pages/RumtekMonastery";
import PemayangtseMonastery from "./pages/PemayangtseMonastery";
import TashidingMonastery from "./pages/TashidingMonastery.tsx";
import EncheyMonastery from "./pages/EncheyMonastery.tsx";
import DubdiMonastery from "./pages/DubdiMonastery.tsx";
import SangachoelingMonastery from "./pages/SangachoelingMonastery.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/monastery/rumtek" element={<RumtekMonastery />} />
          <Route path="/monastery/pemayangtse" element={<PemayangtseMonastery/>} />
          <Route path="/monastery/Tashiding" element={<TashidingMonastery/>} />
          <Route path="/monastery/Enchey" element={<EncheyMonastery/>} />
          <Route path="/monastery/Dubdi" element={<DubdiMonastery/>} />
          <Route path="/monastery/Sangachoeling" element={<SangachoelingMonastery/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
