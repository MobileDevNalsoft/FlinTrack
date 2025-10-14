import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Pickup = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const [pickups, setPickups] = useState([
    {
      id: "PCK-001",
      address: "123 Main St, New York, NY 10001",
      date: "Jan 18, 2024",
      time: "10:00 AM - 12:00 PM",
      status: "Scheduled",
    },
    {
      id: "PCK-002",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      date: "Jan 20, 2024",
      time: "2:00 PM - 4:00 PM",
      status: "Scheduled",
    },
  ]);

  const [editOpen, setEditOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState("");
  const [editDate, setEditDate] = useState<Date | undefined>(undefined);
  const [editTime, setEditTime] = useState("");

  const openEdit = (id: string) => {
    const current = pickups.find((p) => p.id === id);
    if (!current) return;
    setSelectedId(id);
    setEditAddress(current.address);
    // Parse date string best-effort; default to today if parse fails
    const parsed = new Date(current.date);
    setEditDate(isNaN(parsed.getTime()) ? new Date() : parsed);
    setEditTime(current.time);
    setEditOpen(true);
  };

  const saveEdit = () => {
    if (!selectedId || !editAddress || !editDate || !editTime) {
      toast({ title: "Missing Information", description: "Please complete all fields.", variant: "destructive" });
      return;
    }
    setPickups((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, address: editAddress, date: format(editDate, "PP"), time: editTime }
          : p,
      ),
    );
    setEditOpen(false);
    toast({ title: "Pickup updated", description: `${selectedId} has been updated.` });
  };

  const openCancel = (id: string) => {
    setSelectedId(id);
    setCancelOpen(true);
  };

  const confirmCancel = () => {
    if (!selectedId) return;
    setPickups((prev) => prev.filter((p) => p.id !== selectedId));
    setCancelOpen(false);
    toast({ title: "Pickup cancelled", description: `${selectedId} has been removed.` });
  };

  const handleSchedule = () => {
    if (!date || !time || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to schedule a pickup",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Pickup Scheduled!",
      description: `Your pickup has been scheduled for ${format(date, "PPP")} at ${time}`,
    });

    // Reset form
    setDate(undefined);
    setTime("");
    setAddress("");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Schedule Pickup</h1>
          <p className="text-muted-foreground">
            Arrange for your packages to be picked up at your location
          </p>
        </div>

        {/* Schedule New Pickup */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Schedule New Pickup
            </CardTitle>
            <CardDescription>Choose a date, time, and location for pickup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <div className="flex gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-2.5" />
                <Input
                  id="address"
                  placeholder="123 Main Street, City, State ZIP"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time Window</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select time window" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8-10">8:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="12-14">12:00 PM - 2:00 PM</SelectItem>
                    <SelectItem value="14-16">2:00 PM - 4:00 PM</SelectItem>
                    <SelectItem value="16-18">4:00 PM - 6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSchedule} className="w-full gap-2">
              <CalendarIcon className="h-4 w-4" />
              Schedule Pickup
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Pickups */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Upcoming Pickups</CardTitle>
            <CardDescription>Manage your scheduled pickup appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary-light">
                      <CalendarIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{pickup.id}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {pickup.address}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {pickup.date} • {pickup.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(pickup.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => openCancel(pickup.id)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Pickup Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Pickup</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editAddress">Pickup Address</Label>
                <div className="flex gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-2.5" />
                  <Input
                    id="editAddress"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !editDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editDate ? format(editDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editDate}
                        onSelect={setEditDate}
                        disabled={(d) => d < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Time Window</Label>
                  <Select value={editTime} onValueChange={setEditTime}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select time window" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-10">8:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="12-14">12:00 PM - 2:00 PM</SelectItem>
                      <SelectItem value="14-16">2:00 PM - 4:00 PM</SelectItem>
                      <SelectItem value="16-18">4:00 PM - 6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>Close</Button>
              <Button onClick={saveEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Confirmation */}
        <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel this pickup?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The scheduled pickup will be removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCancel}>Cancel pickup</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Pickup;
