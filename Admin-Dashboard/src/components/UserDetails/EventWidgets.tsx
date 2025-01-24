import { EllipsisVertical, LucideProps  } from "lucide-react";
import { eventWidgetsData } from "../../constants/EventWidgetsData";
import { twMerge } from "tailwind-merge";

interface EventWidgets {
    Icon: React.ComponentType<LucideProps>;
    title: string;
    value: string;
    symbol?: string;
    iconColor: string;
}

const EventWidget: React.FC<EventWidgets> = ({ Icon, title, value, symbol, iconColor }) => {
    return (
        <div className={twMerge(`flex gap-10 floating-card w-[300px] text-start px-4 py-8 relative`)}>
            <div>
              <Icon size={50} className={twMerge(``, iconColor)} />
            </div>
            <div>
              <p className="text-black/50">{title}</p>
              <p className="font-semibold text-xl">{value} {symbol}</p>
            </div>
            <div className="absolute top-4 right-2 cursor-pointer">
                <EllipsisVertical  />
            </div>
          </div>
    )
}

const EventWidgets = () => {
  return (
    <div className="flex justify-between">
      {eventWidgetsData.widgets.map((widget, index) => {
        const WidgetIcon = widget.icon;
        return (
            <div key={index}>
                <EventWidget Icon={WidgetIcon} title={widget.name} value={widget.value} symbol={widget.symbol} iconColor={widget.iconColor} />
          </div>
        );
      })}
    </div>
  );
};

export default EventWidgets;
