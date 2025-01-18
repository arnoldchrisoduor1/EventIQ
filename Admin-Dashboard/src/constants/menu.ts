import { LayoutDashboard, CalendarDays , Ticket , UsersRound , ChartNoAxesCombined , ChartColumnIncreasing , Wrench , ArrowRightLeft, Boxes ,MessageCircleQuestion   } from 'lucide-react';

export const menuItems = [
  {
    menu: "Menu",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, link: "/" },
      { name: "Events", icon: CalendarDays , link: "/events" },
      { name: "Tickets", icon: Ticket , link: "/tickets"},
    ],
  },
  {
    menu: "Management",
    items: [
      { name: "Attendees", icon: UsersRound , link: "/attendees" },
      { name: "Marketing", icon: ChartNoAxesCombined , link: "/marketing" },
      { name: "Analytics", icon: ChartColumnIncreasing , link: "/analytics" },
      { name: "Payments", icon: ArrowRightLeft, link: "/payments" },
    ],
  },
  {
    menu: "Notifications",
    items: [
      { name: "settings", icon: Wrench , link: "/settings" },
      { name: "Teams", icon: Boxes , link: "/teams" },
      { name: "Help", icon: MessageCircleQuestion , link: "/help" },
    ],
  },
];