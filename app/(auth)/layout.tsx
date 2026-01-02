import Footer from "@/components/layout/footer";
import GradientOverlay from "@/components/layout/GradientOverlay";
import Navbar from "@/components/layout/navbar";
import NebulaField from "@/components/layout/NebulaField";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {/* Background */}
      <NebulaField />
      <GradientOverlay />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
