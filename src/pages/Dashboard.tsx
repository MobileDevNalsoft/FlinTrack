import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Package, TruckIcon, CheckCircle2, Clock, Plus, ArrowRight, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chartReady, setChartReady] = useState(false);

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

  useEffect(() => {
    const t = setTimeout(() => setChartReady(true), 50);
    return () => clearTimeout(t);
  }, []);

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

  // Current week data (sample)
  const weeklyShipments = [
    { day: "Mon", value: 12 },
    { day: "Tue", value: 19 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 23 },
    { day: "Fri", value: 29 },
    { day: "Sat", value: 18 },
    { day: "Sun", value: 16 },
  ];
  // Previous week data for trend comparison (sample)
  const prevWeekShipments = [10, 17, 13, 21, 25, 14, 12];
  const weeklyTotal = weeklyShipments.reduce((s, d) => s + d.value, 0);
  const weeklyAvg = Math.round(weeklyTotal / weeklyShipments.length);
  const prevTotal = prevWeekShipments.reduce((s, v) => s + v, 0);
  const weeklyTrendPct = prevTotal === 0 ? 0 : Math.round(((weeklyTotal - prevTotal) / prevTotal) * 100);
  const weeklyMax = Math.max(...weeklyShipments.map((d) => d.value));

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
                Welcome to FlinTrack
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

        {/* Analytics + Recent Shipments */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weekly Shipments Analytics */}
          <Card className="card-shadow lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Weekly Shipments</CardTitle>
                <CardDescription>Last 7 days activity</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className={`text-xs px-2 py-0.5 rounded-full ${weeklyTrendPct >= 0 ? "bg-success-light text-success" : "bg-destructive/10 text-destructive"}`}>
                  {weeklyTrendPct >= 0 ? "+" : ""}{weeklyTrendPct}%
                </div>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent className="pt-1 pb-0 h-64">
              <div className="h-full w-full relative mb-0">
                {/* grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="h-full w-full grid grid-rows-4 grid-cols-7">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="border-b border-muted-foreground/10" />
                    ))}
                  </div>
                </div>
                {/* simple responsive bar chart */}
                <div className="relative h-full w-full flex items-end justify-between gap-3 border-l border-b border-muted-foreground/20 pl-2 pb-0">
                  {weeklyShipments.map((d) => {
                    const heightPct = Math.round((d.value / weeklyMax) * 100);
                    return (
                      <div key={d.day} className="group flex h-full flex-col items-center gap-1 justify-end flex-1">
                        <div className="relative w-full h-full flex items-end">
                          <div
                            className="w-full rounded-lg bg-primary/50 hover:bg-primary/70 transition-colors shadow-sm"
                            style={{
                              height: chartReady ? `${heightPct}%` : "0%",
                              transition: "height 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            title={`${d.day}: ${d.value}`}
                            aria-label={`${d.day} ${d.value}`}
                          />
                          <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-popover px-1.5 py-0.5 text-[10px] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-popover-foreground">
                            {d.value}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* metrics */}
              <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-md bg-secondary-light">
                  <div className="text-muted-foreground">Total</div>
                  <div className="text-lg font-semibold">{weeklyTotal}</div>
                </div>
                <div className="p-3 rounded-md bg-secondary-light">
                  <div className="text-muted-foreground">Avg / day</div>
                  <div className="text-lg font-semibold">{weeklyAvg}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Shipments */}
          <Card className="card-shadow lg:col-span-1">
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
      </div>
    </Layout>
  );
};

export default Dashboard;
