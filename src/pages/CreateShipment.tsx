import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";

const CreateShipment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Sender details
    senderName: "",
    senderAddress: "",
    senderCity: "",
    senderZip: "",
    // Recipient details
    recipientName: "",
    recipientAddress: "",
    recipientCity: "",
    recipientZip: "",
    // Package details
    weight: "",
    dimensions: "",
    packageType: "",
    description: "",
    // Service
    serviceType: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Shipment Created!",
      description: "Your shipment has been successfully created. Tracking number: SHP-2024-NEW",
    });
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Shipment</h1>
          <p className="text-muted-foreground">Fill in the details to create your shipment</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: "Sender & Recipient" },
            { num: 2, label: "Package Details" },
            { num: 3, label: "Service & Review" },
          ].map((s) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s.num
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary-light text-muted-foreground"
                }`}
              >
                {s.num}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step >= s.num ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {s.num < 3 && (
                <div
                  className={`w-24 h-1 mx-4 rounded ${
                    step > s.num ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Sender & Recipient Information"}
              {step === 2 && "Package Details"}
              {step === 3 && "Service Selection & Review"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter sender and recipient addresses"}
              {step === 2 && "Provide package specifications"}
              {step === 3 && "Choose service type and review details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Sender & Recipient */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sender Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Full Name</Label>
                      <Input
                        id="senderName"
                        value={formData.senderName}
                        onChange={(e) => handleInputChange("senderName", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderAddress">Address</Label>
                      <Input
                        id="senderAddress"
                        value={formData.senderAddress}
                        onChange={(e) => handleInputChange("senderAddress", e.target.value)}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderCity">City</Label>
                      <Input
                        id="senderCity"
                        value={formData.senderCity}
                        onChange={(e) => handleInputChange("senderCity", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderZip">ZIP Code</Label>
                      <Input
                        id="senderZip"
                        value={formData.senderZip}
                        onChange={(e) => handleInputChange("senderZip", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recipient Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Full Name</Label>
                      <Input
                        id="recipientName"
                        value={formData.recipientName}
                        onChange={(e) => handleInputChange("recipientName", e.target.value)}
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientAddress">Address</Label>
                      <Input
                        id="recipientAddress"
                        value={formData.recipientAddress}
                        onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                        placeholder="456 Oak Ave"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientCity">City</Label>
                      <Input
                        id="recipientCity"
                        value={formData.recipientCity}
                        onChange={(e) => handleInputChange("recipientCity", e.target.value)}
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientZip">ZIP Code</Label>
                      <Input
                        id="recipientZip"
                        value={formData.recipientZip}
                        onChange={(e) => handleInputChange("recipientZip", e.target.value)}
                        placeholder="90001"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Package Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      placeholder="5.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (L x W x H in inches)</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange("dimensions", e.target.value)}
                      placeholder="12 x 8 x 6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packageType">Package Type</Label>
                  <Select
                    value={formData.packageType}
                    onValueChange={(value) => handleInputChange("packageType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="envelope">Envelope</SelectItem>
                      <SelectItem value="pallet">Pallet</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Package Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the contents of your package"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Service & Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleInputChange("serviceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (5-7 days) - $15</SelectItem>
                      <SelectItem value="express">Express (2-3 days) - $35</SelectItem>
                      <SelectItem value="overnight">Overnight - $65</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-6 rounded-lg bg-muted/50 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Shipment Summary
                  </h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From:</span>
                      <span className="font-medium">
                        {formData.senderCity || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-medium">
                        {formData.recipientCity || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{formData.weight || "0"} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium capitalize">
                        {formData.serviceType || "Not selected"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {step < 3 ? (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2">
                  Create Shipment
                  <Package className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateShipment;
