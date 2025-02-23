// import { useLocation } from "react-router-dom";

// const location = useLocation();

let dashboardsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="side-menu__icon"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
  </svg>
);
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

  // Dashboard
  {
    path: `${import.meta.env.BASE_URL}Dashboard/IndexPage`,
    title: "Dashboard",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },

  // Bar Code
  /* {
    path: `${import.meta.env.BASE_URL}BarCode/ViewUpdateBarcode`,
    title: "Update Barcode",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },*/

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
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewBrand`,
        title: "Brand",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewCategory`,
        title: "View Category",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewSubCategory`,
        title: "View Sub Categories",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewProducts`,
        title: "View Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewAllocateProducts`,
        title: "Allocate Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Raw Product
  {
    title: "Raw/Making-Products",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}RawProducts/ViewRawCategory`,
        title: "View Category",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}RawProducts/ViewRawSubCategory`,
        title: "View Sub Categories",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}RawProducts/ViewRawProduct`,
        title: "View Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}RawProducts/ViewRawAllocateProducts`,
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
        path: `${import.meta.env.BASE_URL}Franchise/AddFranchise`,
        title: "Add Franchise",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchise/ViewFranchise`,
        title: "View Franchise",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Go Down
  {
    title: "Go Down",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        title: "Godown Account",
        //icon: dashboardsvg,
        type: "sub",
        active: false,
        selected: false,
        dirchange: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}GoDown/CreateGodownAccount`,
            title: "Create Account",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
          },
          {
            path: `${import.meta.env.BASE_URL}GoDown/ViewGodownAccount`,
            title: "View Account",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
          },
        ],
      },

      {
        title: "Godown Stock",
        //icon: dashboardsvg,
        type: "sub",
        active: false,
        selected: false,
        dirchange: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}GoDown/AddGodownStock`,
            title: "Add Stock",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
          },
          {
            path: `${import.meta.env.BASE_URL}GoDown/ViewGodownStock`,
            title: "View Stock",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
          },
        ],
      },

      {
        title: "Transfer Stock",
        //icon: dashboardsvg,
        type: "sub",
        active: false,
        selected: false,
        dirchange: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}GoDown/ViewTransferStockToCocoFr`,
            title: "Godown To Coco Fr",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
          },
          {
            path: `${
              import.meta.env.BASE_URL
            }GoDown/ViewTransferStockToOtherFr`,
            title: "Godown To Other Fr",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
          },
        ],
      },

      {
        path: `${import.meta.env.BASE_URL}GoDown/ViewGodownPendingRequest`,
        title: "Pending Request For Product Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}GoDown/ViewGodownApproveRequest`,
        title: "Approve Request For Product Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}GoDown/CreateInvoiceProductStock`,
        title: "Create Invoice For Product Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}GoDown/ViewGodownReturnProduct`,
        title: "Return Godown Product",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Employee
  {
    title: "Employee",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Employee/AddEmployee`,
        title: "Add Employee",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Employee/ViewEmployee`,
        title: "View Employee",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Financer
  {
    title: "Financer",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Financer/CreateFinancer`,
        title: "Create Financer Account",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Financer/ViewFinancer`,
        title: "View Financer",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Financer/AddCommissionNote`,
        title: "Add Commission Note",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Financer/ViewCommissionNote`,
        title: "View Commission Note",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Retailer
  {
    title: "Retailer",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Retailer/AddRetailer`,
        title: "Add Retailer",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Retailer/ViewRetailer`,
        title: "View Retailer",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Retailer/CreateRetailerAccount`,
        title: "Create Retailer Account",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}Retailer/ViewSellToRetailer`,
        title: "Sell To Retailer",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Set Target
  {
    title: "Set Target",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Target/ViewSetTarget`,
        title: "View Set Target",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Target/SetTarget`,
        title: "Set Target",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Target/TragetCompletion`,
        title: "Target Completion",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Target/ViewTargetCompletionReport`,
        title: "Target Completion Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Vendor Payments
  {
    title: "Vendor Payments",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}VendorPayment/AddVendorPayment`,
        title: "Add Vendor Payments",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}VendorPayment/ViewVendorPayment`,
        title: "View Vendor Payments",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Financer Patner
  {
    title: "Financer Patner",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${
          import.meta.env.BASE_URL
        }FinancerPatner/AddFinancerPartnerAccount`,
        title: "Add Financer Patner / Account",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }FinancerPatner/ViewFinancerPatnerAccount`,
        title: "View Financer Patner / Account",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}FinancerPatner/ViewCommisionNote`,
        title: "View Commission Note",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Franchise Report
  {
    title: "Franchise Report",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}FranchiseReport/ViewFinancerReport`,
        title: "Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }FranchiseReport/ViewRawFinancerstockReport`,
        title: "Raw Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Report
  {
    title: "Report",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Report/ViewCustomerSellReport`,
        title: "Customer Sell Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewDailySellReport`,
        title: "Daily Sell Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
];

// const frDashboardMenu: MenuItemtype[] = [
//   {
//     menutitle: "Franchise",
//   },

//   // Dashboard
//   {
//     title: "Franchise",
//     icon: pagesSvg,
//     type: "sub",
//     active: false,
//     selected: false,
//     dirchange: false,
//     children: [
//       {
//         path: `${import.meta.env.BASE_URL}Franchise/ViewFranchise`,
//         title: "View Franchise",
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//     ],
//   },
// ];

export const MENUITEMS = window.location.pathname.includes("/Franchise/")
  ? defaultMenu
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
