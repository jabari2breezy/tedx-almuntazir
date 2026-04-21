/**
 * TEDxAlMuntazirSchoolsYouth 2026 — App Router
 * Design: Neo-Brutalist Editorial | Dark theme throughout
 * Routes: Home, Theme, Speakers, About
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Theme from "./pages/Theme";
import Speakers from "./pages/Speakers";
import About from "./pages/About";
import Inspiration from "./pages/Inspiration";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/theme" component={Theme} />
      <Route path="/speakers" component={Speakers} />
      <Route path="/inspiration" component={Inspiration} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div
            className="min-h-screen flex flex-col"
            style={{ background: "#000000" }}
          >
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
