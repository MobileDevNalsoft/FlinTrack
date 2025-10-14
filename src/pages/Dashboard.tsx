import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Package, TruckIcon, CheckCircle2, Clock, Plus, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft">Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      title: "In Transit",
      value: "12",
      icon: TruckIcon,
      color: "text-status-inTransit",
      bgColor: "bg-primary-light",
      description: "Active shipments",
    },
    {
      title: "Delivered",
      value: "48",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success-light",
      description: "This month",
    },
    {
      title: "Pending",
      value: "5",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning-light",
      description: "Awaiting pickup",
    },
    {
      title: "Total Shipments",
      value: "156",
      icon: Package,
      color: "text-primary",
      bgColor: "bg-secondary-light",
      description: "All time",
    },
  ];

  const recentShipments = [
    { id: "SHP-2024-001", status: "In Transit", destination: "New York, NY", date: "Jan 15, 2024" },
    { id: "SHP-2024-002", status: "Delivered", destination: "Los Angeles, CA", date: "Jan 14, 2024" },
    { id: "SHP-2024-003", status: "Pending", destination: "Chicago, IL", date: "Jan 13, 2024" },
    { id: "SHP-2024-004", status: "In Transit", destination: "Houston, TX", date: "Jan 12, 2024" },
    { id: "SHP-2024-005", status: "Delivered", destination: "Phoenix, AZ", date: "Jan 11, 2024" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-primary-light text-primary";
      case "Delivered": return "bg-success-light text-success";
      case "Pending": return "bg-warning-light text-warning";
      default: return "bg-secondary-light text-secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div className="relative h-64 rounded-2xl overflow-hidden card-shadow">
          <img
            src={heroImage}
            alt="Logistics Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/70 flex items-center">
            <div className="container px-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Welcome to ShipFast
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Manage your shipments with confidence and ease
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/create-shipment")}
                className="gap-2"
              >
                <Plus className="h-5 w-5" />
                Create New Shipment
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="hover-lift card-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Shipments */}
        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Track your latest shipping activity</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate("/track")} className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/track")}
                >
                  <div className="flex items-center gap-4">
                    <Package className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-semibold">{shipment.id}</p>
                      <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`status-badge ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">{shipment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
