import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Gavel } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { updatePolicies } from "@/redux/slices/addEventSlice";

// Define Types
interface Policies {
  refund: string;
  cancellation: string;
  photography: string;
  weather: string;
}

const PoliciesForm: React.FC = () => {

  const { policies } = useSelector((state: RootState) => state.addEvent);

  const dispatch = useAppDispatch();

  const [policiesState, setPoliciesState] = useState<Policies>({
    refund: "",
    cancellation: "",
    photography: "",
    weather: "",
  });

  // Generic Change Handler
  const handleChange = (field: keyof Policies, value: string) => {
    setPoliciesState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Thepolicies are beng updated with: ", policiesState);
    await dispatch(updatePolicies(policiesState));
  }

  useEffect(() => {
    console.log("Policies have been updated with:", policies);
  }, [policies]);

  return (
    <Card className="max-w-lg mx-auto mt-6 p-4 border border-gray-200 shadow-sm">
      <CardContent className="space-y-4">
        <form>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Gavel size={18} /> Policies
        </h2>

        <div className="space-y-2">
          <Label htmlFor="refund">Refund Policy</Label>
          <Input
            id="refund"
            placeholder="Enter refund policy"
            value={policiesState.refund}
            onChange={(e) => handleChange("refund", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cancellation">Cancellation Policy</Label>
          <Input
            id="cancellation"
            placeholder="Enter cancellation policy"
            value={policiesState.cancellation}
            onChange={(e) => handleChange("cancellation", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photography">Photography Policy</Label>
          <Input
            id="photography"
            placeholder="Enter photography policy"
            value={policiesState.photography}
            onChange={(e) => handleChange("photography", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weather">Weather Policy</Label>
          <Input
            id="weather"
            placeholder="Enter weather policy"
            value={policiesState.weather}
            onChange={(e) => handleChange("weather", e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn-primary mt-5">Save</button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PoliciesForm;
