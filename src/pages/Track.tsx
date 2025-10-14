import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, TruckIcon, CheckCircle2, MapPin, Calendar, Clock } from "lucide-react";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  const handleSearch = () => {
    if (trackingNumber.trim()) {
      setShowTracking(true);
    }
  };

  const trackingEvents = [
    {
      status: "In Transit",
      description: "Package is in transit to next facility",
      location: "Philadelphia Distribution Center, PA",
      date: "Oct 14, 2025",
      time: "2:00 PM",
      icon: CheckCircle2,
      tone: "success",
      latest: true,
    },
    {
      status: "In Transit",
      description: "Package arrived at Chicago facility",
      location: "Chicago Hub, IL",
      date: "Oct 13, 2025",
      time: "7:50 PM",
      icon: TruckIcon,
      tone: "primary",
      latest: false,
    },
    {
      status: "Picked Up",
      description: "Package picked up from sender",
      location: "San Francisco, CA",
      date: "Oct 11, 2025",
      time: "2:45 PM",
      icon: Package,
      tone: "secondary",
      latest: false,
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Track Shipment</h1>
          <p className="text-muted-foreground">
            Enter your tracking number to view real-time shipment status
          </p>
        </div>

        {/* Search Card */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Enter Tracking Number</CardTitle>
            <CardDescription>
              Your tracking number can be found in your confirmation email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="SHP-2024-001"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="gap-2">
                <Search className="h-4 w-4" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {showTracking && (
          <div className="space-y-6 animate-scale-in">
            {/* Shipment Info Card */}
            <Card className="card-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-6 w-6 text-primary" />
                      {trackingNumber || "SHP-2024-001"}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <span className="status-badge bg-success-light text-success">
                        Delivered
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Estimated Delivery</p>
                    <p className="font-semibold">Jan 15, 2024</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* From card */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card/50">
                    <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="text-lg font-semibold leading-tight">Acme Corporation</p>
                      <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </div>

                  {/* To card */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card/50">
                    <div className="h-10 w-10 rounded-lg bg-success-light flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="text-lg font-semibold leading-tight">Tech Solutions Inc</p>
                      <p className="text-sm text-muted-foreground">Los Angeles, CA 90001</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
                <CardDescription>Follow your shipment's journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {trackingEvents.map((event, index) => {
                    const isLatest = event.latest;
                    const tone =
                      event.tone === "success"
                        ? { dot: "bg-success", bg: "bg-success-light border-success/30" }
                        : event.tone === "primary"
                        ? { dot: "bg-primary", bg: "bg-card border-border" }
                        : { dot: "bg-muted", bg: "bg-card border-border" };
                    return (
                      <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 120}ms` }}>
                        {/* Vertical line */}
                        {index < trackingEvents.length - 1 && (
                          <div className="absolute left-5 top-12 h-[calc(100%+20px)] w-0.5 bg-border" />
                        )}

                        <div className="flex gap-4">
                          {/* status dot */}
                          <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone.dot}`}>
                            <event.icon className="h-5 w-5 text-primary-foreground" />
                          </div>

                          {/* card */}
                          <div className={`flex-1 p-4 rounded-xl border ${tone.bg} hover-lift` }>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <p className="font-semibold">{event.status}</p>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</span>
                                  <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{event.date}</span>
                                  <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{event.time}</span>
                                </div>
                              </div>
                              {isLatest && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-success-light text-success">Latest</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Package Information */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Package Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-xl font-semibold mt-1">5.5 kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dimensions</p>
                    <p className="text-xl font-semibold mt-1">40×30×20 cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="text-xl font-semibold mt-1">1</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cost</p>
                    <p className="text-xl font-semibold mt-1">$ 45.99</p>
                  </div>
                </div>

                <div className="my-6 h-px w-full bg-border" />

                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-lg font-medium mt-1">Electronic Components</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Track;
