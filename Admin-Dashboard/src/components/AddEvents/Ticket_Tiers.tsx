import { DollarSign, Edit, Trash2, Type, Users, Calendar } from "lucide-react";
import InputComponent from "../InputComponent";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { addTicketTier, removeTicketTier, updateTicketTier } from "@/redux/slices/addEventSlice";

interface TicketTier {
  name: string;
  price: number;
  quantity: number;
  description: string;
  earlyBirdDeadline: string;
  earlyBirdPrice: number;
}

const emptyTicketTier: TicketTier = {
  name: '',
  price: 0,
  quantity: 0,
  description: '',
  earlyBirdDeadline: '',
  earlyBirdPrice: 0
};

const TicketTiers = () => {
  const { ticketing } = useSelector((state: RootState) => state.addEvent);
  const dispatch = useAppDispatch();

  const [currentTicketTier, setCurrentTicketTier] = useState<TicketTier>(emptyTicketTier);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (field: keyof TicketTier, value: string | number) => {
    setCurrentTicketTier(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveTicketTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      await dispatch(updateTicketTier({ index: editingIndex, item: currentTicketTier }));
    } else {
      await dispatch(addTicketTier(currentTicketTier));
    }
    setCurrentTicketTier(emptyTicketTier);
    setEditingIndex(null);
  };

  const handleEditTicketTier = (index: number) => {
    setCurrentTicketTier(ticketing[index]);
    setEditingIndex(index);
  };

  const handleRemoveTicketTier = async (index: number) => {
    await dispatch(removeTicketTier(index));
  };

  console.log("Ticketing tiers: ", ticketing);

  return (
    <div>
      {/* Display Existing Ticket Tiers */}
      {ticketing.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black/50 mb-4">Ticket Tiers</h2>
          <div className="space-y-4">
            {ticketing.map((tier, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{tier.name}</h3>
                    <p className="text-sm text-gray-600">Price: ${tier.price}</p>
                    <p className="text-sm text-gray-600">Early Bird Price: ${tier.earlyBirdPrice}</p>
                    <p className="text-sm text-gray-600">Early Bird Deadline: {tier.earlyBirdDeadline}</p>
                    <p className="text-sm mt-1">Quantity Available: {tier.quantity}</p>
                    <p className="text-sm">{tier.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditTicketTier(index)}
                      className="p-2 text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveTicketTier(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ticket Tier Form */}
      <form onSubmit={handleSaveTicketTier} className="border border-slate-300 mt-5 p-4">
        <h1 className="text-3xl font-semibold text-black/50">
          {editingIndex !== null ? 'Edit Ticket Tier' : 'Add New Ticket Tier'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <InputComponent
            type="text"
            placeholder="Name"
            Icon={Type}
            value={currentTicketTier.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <InputComponent
            type="number"
            placeholder="Price"
            Icon={DollarSign}
            value={currentTicketTier.price.toString()}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <InputComponent
            type="number"
            placeholder="Quantity"
            Icon={Users}
            value={currentTicketTier.quantity.toString()}
            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
          />
          <InputComponent
            type="date"
            placeholder="Early Bird Deadline"
            Icon={Calendar}
            value={currentTicketTier.earlyBirdDeadline}
            onChange={(e) => handleInputChange('earlyBirdDeadline', e.target.value)}
          />
        </div>

        <div className="mt-3">
          <InputComponent
            type="number"
            placeholder="Early Bird Price"
            Icon={DollarSign}
            value={currentTicketTier.earlyBirdPrice.toString()}
            onChange={(e) => handleInputChange('earlyBirdPrice', parseFloat(e.target.value))}
          />
        </div>

        <div className="mt-3">
          <textarea
            className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Description"
            value={currentTicketTier.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary mt-6 w-[150px]"
        >
          {editingIndex !== null ? 'Update Tier' : 'Add Tier'}
        </button>
      </form>
    </div>
  );
};

export default TicketTiers;