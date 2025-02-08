import {  CheckCircle, ParkingCircle, Accessibility } from "lucide-react";
import { useState } from "react";
import InputComponent from "../InputComponent";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

// Define Types
interface EntryRequirements {
  dressCode: string;
  isRequired: boolean;
  additionalRequirements: string[];
}

interface Parking {
  available: boolean;
  information: string;
  fee: number | "";
}

interface Accessibility {
  wheelchairAccessible: boolean;
  assistanceAvailable: boolean;
  additionalInfo: string;
}

interface FormDataType {
  entryRequirements: EntryRequirements;
  parking: Parking;
  accessibility: Accessibility;
}

const AdditionalInfo: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    entryRequirements: {
      dressCode: "",
      isRequired: false,
      additionalRequirements: [""],
    },
    parking: {
      available: false,
      information: "",
      fee: "",
    },
    accessibility: {
      wheelchairAccessible: false,
      assistanceAvailable: false,
      additionalInfo: "",
    },
  });

  // Generic Change Handler
  const handleChange = <T extends keyof FormDataType, K extends keyof FormDataType[T]>(
    section: T,
    field: K,
    value: FormDataType[T][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <form className="space-y-6 p-4 border rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-black/70">Additional Information</h1>

      {/* Entry Requirements Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle /> Entry Requirements
        </h2>
        <InputComponent
          type="text"
          Icon={CheckCircle}
          placeholder="Dress Code"
          id="dress-code"
          value={formData.entryRequirements.dressCode}
          onChange={(e) => handleChange("entryRequirements", "dressCode", e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Switch
            id="is-required"
            checked={formData.entryRequirements.isRequired}
            onCheckedChange={(value: boolean) => handleChange("entryRequirements", "isRequired", value)}
          />
          <label htmlFor="is-required">Is Required?</label>
        </div>
        <InputComponent
          type="text"
          Icon={CheckCircle}
          placeholder="Additional Requirements (comma separated)"
          id="additional-requirements"
          value={formData.entryRequirements.additionalRequirements.join(", ")}
          onChange={(e) =>
            handleChange("entryRequirements", "additionalRequirements", e.target.value.split(", "))
          }
        />
      </div>

      {/* Parking Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ParkingCircle /> Parking
        </h2>
        <div className="flex items-center gap-2">
          <Switch
            id="parking-available"
            checked={formData.parking.available}
            onCheckedChange={(value: boolean) => handleChange("parking", "available", value)}
          />
          <label htmlFor="parking-available">Parking Available?</label>
        </div>
        <InputComponent
        Icon={CheckCircle}
          type="text"
          placeholder="Parking Information"
          id="parking-info"
          value={formData.parking.information}
          onChange={(e) => handleChange("parking", "information", e.target.value)}
        />
        <InputComponent
          type="number"
          Icon={CheckCircle}
          placeholder="Parking Fee"
          id="parking-fee"
        //   value={formData.parking.fee}
          onChange={(e) => handleChange("parking", "fee", e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      {/* Accessibility Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
        <Accessibility /> Accessibility
        </h2>
        <div className="flex items-center gap-2">
          <Switch
            id="wheelchair-accessible"
            checked={formData.accessibility.wheelchairAccessible}
            onCheckedChange={(value: boolean) => handleChange("accessibility", "wheelchairAccessible", value)}
          />
          <label htmlFor="wheelchair-accessible">Wheelchair Accessible?</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="assistance-available"
            checked={formData.accessibility.assistanceAvailable}
            onCheckedChange={(value: boolean) => handleChange("accessibility", "assistanceAvailable", value)}
          />
          <label htmlFor="assistance-available">Assistance Available?</label>
        </div>
        <InputComponent
          type="text"
          Icon={CheckCircle}
          placeholder="Additional Accessibility Info"
          id="accessibility-info"
          value={formData.accessibility.additionalInfo}
          onChange={(e) => handleChange("accessibility", "additionalInfo", e.target.value)}
        />
      </div>

      {/* Save Button */}
      <Button type="submit" className="w-full mt-4">
        Save Data
      </Button>
    </form>
  );
};

export default AdditionalInfo;
