import { IconFileDescription, IconLayoutDashboard, IconListCheck, IconReportAnalytics, IconSettings } from "@tabler/icons-react";

export const navIcons = [
    {
      title: "Dashboard",
      Icon: <IconLayoutDashboard />,
      link: "/pages/user-dashboard",
    },
    { title: "Tasks", Icon: <IconListCheck />, link: "/pages/tasks" },
    {
      title: "Applications",
      Icon: <IconFileDescription />,
      link: "/pages/applications",
    },
    { title: "Analytics", Icon: <IconReportAnalytics />, link: "/pages/data" },
  ];

  export const mobileNavLinks = [
    {
      title: "Dashboard",
      link: "/pages/user-dashboard",
      icon: <IconLayoutDashboard size={48} />,
    },
    {
      title: "Applications",
      link: "/pages/applications",
      icon: <IconFileDescription size={48} />,
    },
    { title: "Tasks", link: "/pages/tasks", icon: <IconListCheck size={48} /> },
    { title: "Analytics", link: "/pages/data", icon: <IconReportAnalytics size={48} /> },
    { title: "Settings", link: "/pages/user-dashboard", icon: <IconSettings size={48} /> },
  ];