import React from "react";
import InputComponent from "../InputComponent";
import { MapPin } from "lucide-react";

const Ticket_Tiers = () => {
  return (
    <>
      <div className="mt-5 border border-slate-300 p-4">
        <h1 className="text-3xl font-semibold text-black/50">
          Ticket Pricing Tiers
        </h1>
        <div>
          <div>
            <InputComponent type="text" placeholder="Name" Icon={MapPin} />
            <InputComponent
              type="number"
              placeholder="Quantity"
              Icon={MapPin}
            />
          </div>
          <div>
            <InputComponent
              type="text"
              placeholder="Descrition"
              Icon={MapPin}
            />
            <InputComponent
              type="text"
              placeholder="Early Bird Date"
              Icon={MapPin}
            />
          </div>
          <div>
            <InputComponent
              type="float"
              placeholder="Early Bird Price"
              Icon={MapPin}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket_Tiers;
