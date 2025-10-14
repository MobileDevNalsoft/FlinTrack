import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, FileText, Package } from "lucide-react";

const Returns = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const activeReturns = [
    {
      id: "RET-2024-001",
      orderNumber: "SHP-2024-045",
      status: "Processing",
      date: "Jan 12, 2024",
      trackingNumber: "RET-TRK-001",
    },
    {
      id: "RET-2024-002",
      orderNumber: "SHP-2024-038",
      status: "Label Generated",
      date: "Jan 10, 2024",
      trackingNumber: "RET-TRK-002",
    },
  ];

  const handleSubmit = () => {
    if (!orderNumber || !reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Return Initiated!",
      description: "Your return request has been submitted. You'll receive a return label via email.",
    });

    // Reset form
    setOrderNumber("");
    setReason("");
    setDescription("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-warning-light text-warning";
      case "Label Generated": return "bg-primary-light text-primary";
      case "Completed": return "bg-success-light text-success";
      default: return "bg-secondary-light text-secondary";
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Returns</h1>
          <p className="text-muted-foreground">
            Initiate a return or track existing return shipments
          </p>
        </div>

        {/* Initiate Return */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              Initiate New Return
            </CardTitle>
            <CardDescription>
              Start a return request and receive a prepaid return label
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Original Order/Tracking Number *</Label>
              <Input
                id="orderNumber"
                placeholder="SHP-2024-XXX"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Return *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="damaged">Damaged in Transit</SelectItem>
                  <SelectItem value="wrong-item">Wrong Item Received</SelectItem>
                  <SelectItem value="defective">Defective Product</SelectItem>
                  <SelectItem value="not-needed">No Longer Needed</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Details (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Please provide any additional information about your return..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                What Happens Next?
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  We'll review your return request within 24 hours
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  You'll receive a prepaid return label via email
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Pack the item and attach the label
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Drop off at any authorized location
                </li>
              </ul>
            </div>

            <Button onClick={handleSubmit} className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Submit Return Request
            </Button>
          </CardContent>
        </Card>

        {/* Active Returns */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Active Returns</CardTitle>
            <CardDescription>Track your current return shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeReturns.map((returnItem) => (
                <div
                  key={returnItem.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary-light">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{returnItem.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Order: {returnItem.orderNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tracking: {returnItem.trackingNumber}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {returnItem.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`status-badge ${getStatusColor(returnItem.status)}`}>
                      {returnItem.status}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

export default Returns;
