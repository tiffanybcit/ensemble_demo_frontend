import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Overview',
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  // {
  //   title: 'Reports',
  //   path: '/reports',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Profit & Loss',
  //       path: '/reports/profit&loss',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Reports 2',
  //       path: '/reports/reports2',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Reports 3',
  //       path: '/reports/reports3',
  //       icon: <IoIcons.IoIosPaper />
  //     }
  //   ]
  // },
  // {
  //   title: 'Products',
  //   path: '/products',
  //   icon: <FaIcons.FaCartPlus />
  // },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />
  // },
  {
    title: 'Graphs',
    path: '/graphs',
    icon: <FaIcons.FaProjectDiagram />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Summary of Sales',
        path: '/graphs/summaryofsales',
        icon: <IoIcons.IoIosAnalytics />
      },
      {
        title: 'Sales by Department',
        path: '/graphs/salesbydepartment',
        icon: <IoIcons.IoIosAnalytics />
      },
      {
        title: 'Labour / Sales',
        path: '/graphs/labourbysales',
        icon: <IoIcons.IoIosAnalytics />
      }
    ]
  },
  {
    title: 'Upload',
    path: '/upload',
    icon: <IoIcons.IoIosAddCircle />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Notebook',
    path:"/notebook",
    icon: <IoIcons.IoMdNotificationsOutline />
  },
  {
    title: 'Logout',
    path:'/logout',
    icon: <IoIcons.IoIosLogOut />
  }
];