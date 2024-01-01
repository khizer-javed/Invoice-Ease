import React from "react";
import authRoute from "./authRoute";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("@/views/home/index.jsx")),
    authority: [],
  },
  {
    key: "home-loans",
    path: "/home-loans",
    component: React.lazy(() => import("@/views/home-loans/index.jsx")),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "rental-income",
    path: "/rental-income",
    component: React.lazy(() => import("@/views/rental-income/index.jsx")),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "repairs-and-maintenance",
    path: "/repairs-and-maintenance",
    component: React.lazy(() =>
      import("@/views/repairs-and-maintenance/index.jsx")
    ),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "home-office-expenses",
    path: "/home-office-expenses",
    component: React.lazy(() =>
      import("@/views/home-office-expenses/index.jsx")
    ),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "complex-levies",
    path: "/complex-levies",
    component: React.lazy(() => import("@/views/complex-levies/index.jsx")),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "municipal-rates-and-taxes",
    path: "/municipal-rates-and-taxes",
    component: React.lazy(() =>
      import("@/views/municipal-rates-and-taxes/index.jsx")
    ),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "vacancy-period",
    path: "/vacancy-period",
    component: React.lazy(() => import("@/views/vacancy-period/index.jsx")),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "bad-debts",
    path: "/bad-debts",
    component: React.lazy(() => import("@/views/bad-debts/index.jsx")),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "advertising",
    path: "/advertising",
    component: React.lazy(() => import("@/views/advertising/index.jsx")),
    authority: [],
    meta: {
      pageContainerType: "gutterless",
    },
  },

  {
    key: "viewsetting",
    path: "/viewsetting",
    component: React.lazy(() =>
      import("@/views/admin-settings/view-setting/index.jsx")
    ),
    authority: [],
    admin: true,
  },
  {
    key: "sitesetting",
    path: "/sitesetting",
    component: React.lazy(() =>
      import("@/views/admin-settings/site-setting/index.jsx")
    ),
    authority: [],
    admin: true,
  },
  {
    key: "logout",
    path: "/logout",
    component: React.lazy(() =>
      import("@/views/admin-settings/logout/index.jsx")
    ),
    authority: [],
    admin: true,
  },
];
