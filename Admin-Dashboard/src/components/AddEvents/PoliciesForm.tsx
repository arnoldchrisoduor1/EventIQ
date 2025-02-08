import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Gavel } from "lucide-react";

// Define Types
interface Policies {
  refund: string;
  cancellation: string;
  photography: string;
  weather: string;
}

const PoliciesForm: React.FC = () => {
  const [policies, setPolicies] = useState<Policies>({
    refund: "",
    cancellation: "",
    photography: "",
    weather: "",
  });

  // Generic Change Handler
  const handleChange = (field: keyof Policies, value: string) => {
    setPolicies((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="max-w-lg mx-auto mt-6 p-4 border border-gray-200 shadow-sm">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Gavel size={18} /> Policies
        </h2>

        <div className="space-y-2">
          <Label htmlFor="refund">Refund Policy</Label>
          <Input
            id="refund"
            placeholder="Enter refund policy"
            value={policies.refund}
            onChange={(e) => handleChange("refund", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cancellation">Cancellation Policy</Label>
          <Input
            id="cancellation"
            placeholder="Enter cancellation policy"
            value={policies.cancellation}
            onChange={(e) => handleChange("cancellation", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photography">Photography Policy</Label>
          <Input
            id="photography"
            placeholder="Enter photography policy"
            value={policies.photography}
            onChange={(e) => handleChange("photography", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weather">Weather Policy</Label>
          <Input
            id="weather"
            placeholder="Enter weather policy"
            value={policies.weather}
            onChange={(e) => handleChange("weather", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PoliciesForm;
