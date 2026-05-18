import { Router as WouterRouter, Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ServicesPage from "@/pages/Services";
import GalleryPage from "@/pages/Gallery";
import TestimonialsPage from "@/pages/Testimonials";
import ContactPage from "@/pages/Contact";
import BookingPage from "@/pages/Booking";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/testimonials" component={TestimonialsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/booking" component={BookingPage} />
        </Switch>
      </WouterRouter>
    </QueryClientProvider>
  );
}
