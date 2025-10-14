import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, TruckIcon, CheckCircle2, MapPin } from "lucide-react";

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
      status: "Delivered",
      location: "Los Angeles, CA",
      date: "Jan 15, 2024",
      time: "2:45 PM",
      icon: CheckCircle2,
      color: "text-success",
      active: true,
    },
    {
      status: "Out for Delivery",
      location: "Los Angeles Distribution Center",
      date: "Jan 15, 2024",
      time: "8:30 AM",
      icon: TruckIcon,
      color: "text-primary",
      active: true,
    },
    {
      status: "In Transit",
      location: "Phoenix, AZ",
      date: "Jan 14, 2024",
      time: "11:20 AM",
      icon: Package,
      color: "text-primary",
      active: true,
    },
    {
      status: "Picked Up",
      location: "New York, NY",
      date: "Jan 13, 2024",
      time: "3:15 PM",
      icon: MapPin,
      color: "text-muted-foreground",
      active: true,
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
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">From</p>
                    <p className="font-medium">New York, NY 10001</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">To</p>
                    <p className="font-medium">Los Angeles, CA 90001</p>
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
                <div className="space-y-0">
                  {trackingEvents.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="flex gap-4 pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index < trackingEvents.length - 1 && (
                          <div className="absolute left-5 top-12 h-full w-0.5 bg-border" />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            event.active ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <event.icon
                            className={`h-5 w-5 ${
                              event.active ? "text-primary-foreground" : "text-muted-foreground"
                            }`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold">{event.status}</p>
                              <p className="text-sm text-muted-foreground">{event.location}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>{event.date}</p>
                              <p>{event.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
