import { CheckCircle, ParkingCircle, Accessibility, DollarSign, Info } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../InputComponent";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { updateAdditionalInfo } from "@/redux/slices/addEventSlice";
// import { FormDataType } from "./types";

export interface EntryRequirements {
  dressCode: string;
  isRequired: boolean;
  additionalRequirements: string[];
}

export interface Parking {
  available: boolean;
  information: string;
  fee: number | "";
}

export interface Accessibility {
  wheelchairAccessible: boolean;
  assistanceAvailable: boolean;
  additionalInfo: string;
}

export interface FormDataType {
  entryRequirements: EntryRequirements;
  parking: Parking;
  accessibility: Accessibility;
}

const AdditionalInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { additionalInfo } = useSelector((state: RootState) => state.addEvent);

  const [formData, setFormData] = useState<FormDataType>(additionalInfo);

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

  const handleSave = () => {
    dispatch(updateAdditionalInfo(formData));
  };

  return (
    <form className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800">Additional Information</h1>

      {/* Entry Requirements Section */}
      <Section title="Entry Requirements" icon={<CheckCircle />}>
        <InputComponent
          type="text"
          Icon={CheckCircle}
          placeholder="Dress Code"
          value={formData.entryRequirements.dressCode}
          onChange={(e) => handleChange("entryRequirements", "dressCode", e.target.value)}
        />
        <SwitchField
          label="Is Required?"
          checked={formData.entryRequirements.isRequired}
          onChange={(value) => handleChange("entryRequirements", "isRequired", value)}
        />
        <InputComponent
          type="text"
          Icon={Info}
          placeholder="Additional Requirements (comma separated)"
          value={formData.entryRequirements.additionalRequirements.join(", ")}
          onChange={(e) =>
            handleChange("entryRequirements", "additionalRequirements", e.target.value.split(", "))
          }
        />
      </Section>

      {/* Parking Section */}
      <Section title="Parking" icon={<ParkingCircle />}>
        <SwitchField
          label="Parking Available?"
          checked={formData.parking.available}
          onChange={(value) => handleChange("parking", "available", value)}
        />
        <InputComponent
          Icon={Info}
          type="text"
          placeholder="Parking Information"
          value={formData.parking.information}
          onChange={(e) => handleChange("parking", "information", e.target.value)}
        />
        <InputComponent
          type="number"
          Icon={DollarSign}
          placeholder="Parking Fee"
          value={formData.parking.fee}
          onChange={(e) => handleChange("parking", "fee", e.target.value === "" ? "" : Number(e.target.value))}
        />
      </Section>

      {/* Accessibility Section */}
      <Section title="Accessibility" icon={<Accessibility />}>
        <SwitchField
          label="Wheelchair Accessible?"
          checked={formData.accessibility.wheelchairAccessible}
          onChange={(value) => handleChange("accessibility", "wheelchairAccessible", value)}
        />
        <SwitchField
          label="Assistance Available?"
          checked={formData.accessibility.assistanceAvailable}
          onChange={(value) => handleChange("accessibility", "assistanceAvailable", value)}
        />
        <InputComponent
          type="text"
          Icon={Info}
          placeholder="Additional Accessibility Info"
          value={formData.accessibility.additionalInfo}
          onChange={(e) => handleChange("accessibility", "additionalInfo", e.target.value)}
        />
      </Section>

      {/* Save Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>
        Save Data
      </Button>
    </form>
  );
};

// Sub-components for better modularity
const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children,
}) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const SwitchField: React.FC<{
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-2">
    <Switch id={label.toLowerCase().replace(/\s+/g, '-')} checked={checked} onCheckedChange={onChange} />
    <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-gray-700">
      {label}
    </label>
  </div>
);

export default AdditionalInfo;