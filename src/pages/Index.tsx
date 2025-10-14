import { Button } from "@/components/ui/button";
import { Package, TruckIcon, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-logistics.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src={heroImage}
          alt="Logistics Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-16 w-16" />
              <h1 className="text-6xl font-bold">FlinTrack</h1>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Professional Logistics Made Simple
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Manage shipments, track deliveries, and schedule pickups all in one place. 
              Your complete logistics solution.
            </p>
            <div className="flex gap-4">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TruckIcon, title: "Real-Time Tracking", desc: "Track your shipments in real-time with detailed updates" },
              { icon: Clock, title: "Flexible Scheduling", desc: "Schedule pickups at your convenience" },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your data" },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-lg hover-lift card-shadow">
                <div className="inline-flex p-4 rounded-full bg-primary-light mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
