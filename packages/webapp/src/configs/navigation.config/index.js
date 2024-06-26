import {
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from "@/constants/navigation.constant";

const navigationConfig = [
  {
    key: "home",
    path: "/home",
    title: "Home",
    translateKey: "nav.home",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "home-loans",
    path: "/home-loans",
    title: "Home Loans",
    translateKey: "nav.home-loan",
    icon: "home-loan",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "rental-income",
    path: "/rental-income",
    title: "Rental Income",
    translateKey: "nav.rental-income",
    icon: "rental-income",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "repairs-and-maintenance",
    path: "/repairs-and-maintenance",
    title: "Repairs & Maintenance",
    translateKey: "nav.repairs-and-maintenance",
    icon: "repairs-and-maintenance",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "home-office-expenses",
    path: "/home-office-expenses",
    title: "Home Office Expenses",
    translateKey: "nav.home-office-expenses",
    icon: "home-office-expenses",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "complex-levies",
    path: "/complex-levies",
    title: "Complex Levies",
    translateKey: "nav.complex-levies",
    icon: "complex-levies",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "municipal-rates-and-taxes",
    path: "/municipal-rates-and-taxes",
    title: "Municipal Rates & Taxes",
    translateKey: "nav.municipal-rates-and-taxes",
    icon: "municipal-rates-and-taxes",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "vacancy-period",
    path: "/vacancy-period",
    title: "Vacancy Period",
    translateKey: "nav.vacancy-period",
    icon: "vacancy-period",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "bad-debts",
    path: "/bad-debts",
    title: "Bad Debts",
    translateKey: "nav.bad-debts",
    icon: "bad-debts",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "advertising",
    path: "/advertising",
    title: "Advertising",
    translateKey: "nav.advertising",
    icon: "advertising",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "settings",
    title: "Settings",
    icon: "settings",
    type: NAV_ITEM_TYPE_TITLE,
    subMenu: [
      {
        key: "viewsetting",
        title: "Theme Setting",
        translateKey: "nav.viewsetting",
        icon: "viewsetting",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
        onClick: "togglePanel",
      },
      {
        key: "accountsetting",
        path: `/profile`,
        title: "Account Setting",
        translateKey: "nav.accountsetting",
        icon: "accountsetting",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "logout",
        title: "Sign Out",
        translateKey: "nav.logout",
        icon: "logout",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
        onClick: "signOut",
      },
    ],
  },
  /** Example purpose only */
  // {
  //     key: 'singleMenuItem',
  // 	path: '/single-menu-view',
  // 	title: 'Single menu item',
  // 	translateKey: 'nav.singleMenuItem',
  // 	icon: 'singleMenu',
  // 	type: NAV_ITEM_TYPE_ITEM,
  // 	authority: [],
  //     subMenu: []
  // },
  // {
  //     key: 'collapseMenu',
  // 	path: '',
  // 	title: 'Collapse Menu',
  // 	translateKey: 'nav.collapseMenu.collapseMenu',
  // 	icon: 'collapseMenu',
  // 	type: NAV_ITEM_TYPE_COLLAPSE,
  // 	authority: [],
  //     subMenu: [
  //         {
  //             key: 'collapseMenu.item1',
  //             path: '/collapse-menu-item-view-1',
  //             title: 'Collapse menu item 1',
  //             translateKey: 'nav.collapseMenu.item1',
  //             icon: '',
  //             type: NAV_ITEM_TYPE_ITEM,
  //             authority: [],
  //             subMenu: []
  //         },
  //         {
  //             key: 'collapseMenu.item2',
  //             path: '/collapse-menu-item-view-2',
  //             title: 'Collapse menu item 2',
  //             translateKey: 'nav.collapseMenu.item2',
  //             icon: '',
  //             type: NAV_ITEM_TYPE_ITEM,
  //             authority: [],
  //             subMenu: []
  //         },
  //     ]
  // },
  // {
  // 	key: 'groupMenu',
  // 	path: '',
  // 	title: 'Group Menu',
  // 	translateKey: 'nav.groupMenu.groupMenu',
  // 	icon: '',
  // 	type: NAV_ITEM_TYPE_TITLE,
  // 	authority: [],
  // 	subMenu: [
  //         {
  //             key: 'groupMenu.single',
  //             path: '/group-single-menu-item-view',
  //             title: 'Group single menu item',
  //             translateKey: 'nav.groupMenu.single',
  //             icon: 'groupSingleMenu',
  //             type: NAV_ITEM_TYPE_ITEM,
  //             authority: [],
  //             subMenu: []
  //         },
  // 		{
  // 			key: 'groupMenu.collapse',
  // 			path: '',
  // 			title: 'Group collapse menu',
  // 			translateKey: 'nav.groupMenu.collapse.collapse',
  // 			icon: 'groupCollapseMenu',
  // 			type: NAV_ITEM_TYPE_COLLAPSE,
  // 			authority: [],
  // 			subMenu: [
  // 				{
  // 					key: 'groupMenu.collapse.item1',
  // 					path: '/group-collapse-menu-item-view-1',
  // 					title: 'Menu item 1',
  // 					translateKey: 'nav.groupMenu.collapse.item1',
  // 					icon: '',
  // 					type: NAV_ITEM_TYPE_ITEM,
  // 					authority: [],
  // 					subMenu: []
  // 				},
  //                 {
  // 					key: 'groupMenu.collapse.item2',
  // 					path: '/group-collapse-menu-item-view-2',
  // 					title: 'Menu item 2',
  // 					translateKey: 'nav.groupMenu.collapse.item2',
  // 					icon: '',
  // 					type: NAV_ITEM_TYPE_ITEM,
  // 					authority: [],
  // 					subMenu: []
  // 				},
  //             ]
  //         }
  //     ]
  // }
];

export default navigationConfig;
