// import { useLocation } from "react-router-dom";

// const location = useLocation();

// let dashboardsvg = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="side-menu__icon"
//     height="24px"
//     viewBox="0 0 24 24"
//     width="24px"
//     fill="#000000"
//   >
//     <path d="M0 0h24v24H0V0z" fill="none" />
//     <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
//   </svg>
// );
let pagesSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="side-menu__icon"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path>
  </svg>
);

export interface MenuItemtype {
  menutitle?: string;
  path?: string;
  title?: string;
  icon?: any;
  type?: "link" | "empty" | "sub";
  active?: boolean;
  selected?: boolean;
  dirchange?: boolean;
  children?: MenuItemtype[];
  badgetxt?: string;
  class?: string;
  menusub?: boolean;
}

const defaultMenu: MenuItemtype[] = [
  {
    menutitle: "MAIN",
  },

  // // Dashboard
  // {
  //   path: `${import.meta.env.BASE_URL}Dashboard/IndexPage`,
  //   title: "Dashboard",
  //   icon: dashboardsvg,
  //   type: "link",
  //   active: false,
  //   selected: false,
  //   dirchange: false,
  // },

  // Selling Product
  {
    title: "Selling-Products",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Products/ViewBrand`,
        title: "Brand",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Products/ViewCategory`,
        title: "View Category",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Products/ViewSubCategory`,
        title: "View Sub Categories",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Products/ViewProducts`,
        title: "View Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Products/ViewAllocateProducts`,
        title: "Allocate Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Franchise
  {
    title: "Franchise",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Products/AddFranchise`,
        title: "Add Franchise",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Products/ViewFranchise`,
        title: "View Franchise",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
];

const frDashboardMenu: MenuItemtype[] = [
  {
    menutitle: "Franchise",
  },

  // Dashboard
  {
    title: "Franchise",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchise/ViewFranchise`,
        title: "View Franchise",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
];

export const MENUITEMS = window.location.pathname.includes("/Franchise/")
  ? frDashboardMenu
  : defaultMenu;

// export const MENUITEMS = location.pathname.includes("/Franchise/")
// ? frDashboardMenu
// : defaultMenu;

export interface MenuItem {
  label: string;
  type: string;
  href?: string;
  isOpen?: boolean;
  class?: string;
  childrenClass?: string;
  children?: MenuItem[];
}

export const LandingMenuData: MenuItem[] = [
  { label: "Home", type: "link", href: "#home" },
  { label: "Features", type: "link", href: "#features" },
  { label: "About", type: "link", href: "#about" },
  { label: "Clients", type: "link", href: "#clients" },
  { label: "Faq's", type: "link", href: "#faqs" },
  { label: "Contact", type: "link", href: "#contact" },
];
