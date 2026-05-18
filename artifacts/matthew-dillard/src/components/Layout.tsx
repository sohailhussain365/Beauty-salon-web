import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingBooking from "@/components/FloatingBooking";

interface LayoutProps {
  children: React.ReactNode;
  transparentNav?: boolean;
  lightNav?: boolean;
}

export default function Layout({ children, transparentNav = false, lightNav = false }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar transparentTop={transparentNav} lightTop={lightNav} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <FloatingBooking />
    </>
  );
}
