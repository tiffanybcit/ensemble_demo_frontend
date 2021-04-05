import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaIcons.FaProjectDiagram />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Summary of Sales",
        path: "/reports/summaryofsales",
        icon: <IoIcons.IoIosAnalytics />,
      },
      {
        title: "Sales by Department",
        path: "/reports/salesbydepartment",
        icon: <IoIcons.IoIosAnalytics />,
      },
      {
        title: "Labour / Sales",
        path: "/reports/labourbysales",
        icon: <IoIcons.IoIosAnalytics />,
      },
    ],
  },
  {
    title: "Upload",
    path: "/upload",
    icon: <IoIcons.IoIosAddCircle />,
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "Todo List",
    path: "/todolist",
    icon: <IoIcons.IoMdNotificationsOutline />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <IoIcons.IoIosLogOut />,
  },
];
