/**
 * TEDxAlMuntazirSchoolsYouth 2026 — App Router
 * Design: Neo-Brutalist Editorial | Dark theme throughout
 * Routes: Home, Theme, Speakers, About
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Theme from "./pages/Theme";
import Speakers from "./pages/Speakers";
import About from "./pages/About";
import Inspiration from "./pages/Inspiration";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/theme" component={Theme} />
      <Route path="/speakers" component={Speakers} />
      <Route path="/inspiration" component={Inspiration} />
      <Route path="/about" component={About} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router hook={useHashLocation}>
            <div
              className="min-h-screen flex flex-col"
              style={{ background: "#000000" }}
            >
              <Navigation />
              <main className="flex-1">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
