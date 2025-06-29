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

  // Request Selling Product Stock
  {
    // title: "Request Selling Product Stock",
    title:"Request Product Stock",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}RequestProductStock/RequestSellingProductStock`,
        title: "Request Selling Product Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
   
    ],
  },

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
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewMRPProducts`,
        title: "MRP Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },

      {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewMakingProducts`,
        title: "Making Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewOtherProduct`,
        title: "Other Products",
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
       {
        path: `${import.meta.env.BASE_URL}SellingProduct/ViewAllocateProductsToVendor`,
        title: "Allocate Products To Vendor",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Making Products
  {
    title: "Making-Products",
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
       {
        path: `${import.meta.env.BASE_URL}RawProducts/ViewRawAllocateProductsToVendor`,
        title: " Allocate Products To Vendor",
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
        path: `${import.meta.env.BASE_URL}GoDown/ViewGodownAccount`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        // children: [
        //   {
        //     path: `${import.meta.env.BASE_URL}GoDown/CreateGodownAccount`,
        //     title: "Create Account",
        //     //icon: dashboardsvg,
        //     type: "link",
        //     active: false,
        //     selected: false,
        //     dirchange: false,
        //   },
        //   {
        //     path: `${import.meta.env.BASE_URL}GoDown/ViewGodownAccount`,
        //     title: "View Account",
        //     //icon: dashboardsvg,
        //     type: "link",
        //     active: false,
        //     selected: false,
        //     dirchange: false,
        //   },
        // ],
      },

      {
        title: "View Godown Stock",
        //icon: dashboardsvg,
        path: `${import.meta.env.BASE_URL}GoDown/ViewGodownStock`,
        type: "link",
         active: false,
        selected: false,
        dirchange: false,
        // children: [
        //   {
        //     path: `${import.meta.env.BASE_URL}GoDown/AddGodownStock`,
        //     title: "Add Stock",
        //     //icon: dashboardsvg,
        //     type: "link",
        //     active: false,
        //     selected: false,
        //     dirchange: false,
        //   },
        //   {
        //     path: `${import.meta.env.BASE_URL}GoDown/ViewGodownStock`,
        //     title: "View Stock",
        //     //icon: dashboardsvg,
        //     type: "link",
        //     active: false,
        //     selected: false,
        //     dirchange: false,
        //   },
        // ],
      },

      {
            path: `${import.meta.env.BASE_URL}GoDown/AddGodownStock`,
            title: "Add Godown Stock",
            //icon: dashboardsvg,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
      },

      {
        title: "Transfer Stock Godown To Coco Fr",
        //icon: dashboardsvg,
        path: `${import.meta.env.BASE_URL}GoDown/ViewTransferStockToCocoFr`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}GoDown/ViewTransferStockToFofoFr`,
        title: "Transfer Stock Godown To Fofo Fr",
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
        title: "Transfer Stock Godown To Other Fr",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
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

  // Vendor
  {
    title: "Vendor",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Vendor/AddVendor`,
        title: "Add Vendor",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Vendor/ViewVendor`,
        title: "View Vendor",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Production
  {
      title: "Production",
      icon: pagesSvg,
      type: "sub",
      active: false,
      selected: false,
      dirchange: false,
      children: [
        {
          path: `${import.meta.env.BASE_URL}Production/ViewProductionAccount`,
          title: "Production Account",
          //icon: dashboardsvg,
          type: "link",
          active: false,
          selected: false,
          dirchange: false,
        },
        {
          path: `${import.meta.env.BASE_URL}Production/AddProductionProduct`,
          title: "Add Production Products",
          //icon: dashboardsvg,
          type: "link",
          active: false,
          selected: false,
          dirchange: false,
        },
        {
          path: `${import.meta.env.BASE_URL}Production/ViewProductionProducts`,
          title: "View Production Products",
          //icon: dashboardsvg,
          type: "link",
          active: false,
          selected: false,
          dirchange: false,
        },
        {
          path: `${import.meta.env.BASE_URL}Production/AddRawProductionProducts`,
          title: "Add Production Raw Product",
          //icon: dashboardsvg,
          type: "link",
          active: false,
          selected: false,
          dirchange: false,
        },
        {
          path: `${import.meta.env.BASE_URL}Production/ViewProductionRawProduct`,
          title: "View Production Raw Product",
          //icon: dashboardsvg,
          type: "link",
          active: false,
          selected: false,
          dirchange: false,
        },
        {
          path: `${import.meta.env.BASE_URL}Production/ViewRawProductionStock`,
          title: "Manage Raw Production Stocks",
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

  // Request Product Stock
  {
    title: "Request Product Stock",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${
          import.meta.env.BASE_URL
        }RequestSellingProduct/ViewRequestSellingProduct`,
        title: "Request Selling Product Stock",
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
        }FranchiseReport/Report2025/ViewProductStockReport2025`,
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
        title: "Customer Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewDailySaleReport`,
        title: "Daily Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}Report/ViewDailySaleReport2`,
        title: "Daily Sale Report 2 ",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewWeeklySaleReport`,
        title: "Weekly Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewWeeklySaleReport2`,
        title: "Weekly Sale Report 2",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    {
        path: `${import.meta.env.BASE_URL}Report/ViewGodownStockReport`,
        title: "Godown Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewGodownProductStockReport`,
        title: "Godown Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewTransferPrdToCocoFr`,
        title: "Transfer Stock Godown To Franchise Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report/ViewTransferPrdToCocoFr2`,
        title: "Transfer Stock Godown To Franchise Report 2",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      
    ],
  },

  // Report 2024
  {
    title: "Franchise Report 2024",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Report2024/ViewProductStockReport2024`,
        title: "Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2024/ViewRawProductStockReport2024`,
        title: "Raw Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}Report2024/ViewCategoryWiseSaleReport2024`,
        title: "View Category Wise Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2024/ViewProductWiseSaleReport2024`,
        title: "Product Wise Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2024/ViewDiscountInvoiceReport2024`,
        title: "Discount Invoice report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      
    ],
  },

  // Report 2025
  {
    title: "Franchise Report 2025",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Report2025/ViewProductStockReport2025`,
        title: "Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2025/ViewAccountProductStockReport2025`,
        title: "Account Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2025/ViewRawProductStockReport2025`,
        title: "Raw Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}Report2025/ViewCategoryWiseSaleReport2025`,
        title: "Category Wise Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2025/ViewProductWiseSaleReport2025`,
        title: "Product Wise Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}Report2025/ViewMRPProductWiseSaleReport2025`,
        title: "MRP Product Wise Sale Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2025/ViewSellReport2025`,
        title: "Sell Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Report2025/ViewDiscountInvoiceReport2025`,
        title: "Discount Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
     
    ],
  },

  // Discount Percentage
  {
    path: `${import.meta.env.BASE_URL}Discount/ViewDiscountPercentage`,
    title: "Discount Percentage",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },

  // Admin Approval Request Product Stock
  {
    title: "Admin Approval Request Product Stock",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}AdminApprovalRequest/ViewAdminPendingRequest`,
        title: "Admin Pending Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
        {
        path: `${import.meta.env.BASE_URL}AdminApprovalRequest/ViewAdminApprovalRequest`,
        title: "Admin Approval Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}AdminApprovalRequest/ViewAdminRejectRequest`,
        title: "Admin Reject Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Accountant Approval Request Product Stock
  {
    title: "Accountant Approval Request Product Stock",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}AccountantApprovalRequest/ViewAccountantPendingRequest`,
        title: "Accountant Pending Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
        {
        path: `${import.meta.env.BASE_URL}AccountantApprovalRequest/ViewAccountantApprovalRequest`,
        title: "Accountant Approval Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}AccountantApprovalRequest/ViewAccountantRejectRequest`,
        title: "Accountant Reject Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Admin Approval Vendor Order Request
  {
    title: "Admin Approval Vendor Order Request",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}AdminVedOrdRequest/ViewAdminApprovalVedOrdRequest`,
        title: "Admin Pending Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
        {
        path: `${import.meta.env.BASE_URL}AdminVedOrdRequest/ViewAdminPendingVedOrdRequest`,
        title: "Admin Approval Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}AdminVedOrdRequest/ViewAdminRejectVedOrdRequest`,
        title: "Admin Reject Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Accountant Approval Vendor Order Request
  {
    title: "Accountant Approval Vendor Order Request",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}AccountantVedOrdRequest/ViewAccountantAppVedOrdRequest`,
        title: "Accountant Pending Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
        {
        path: `${import.meta.env.BASE_URL}AccountantVedOrdRequest/ViewAccountantPenVedOrdRequest`,
        title: "Accountant Approval Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}AccountantVedOrdRequest/ViewAccountantRejVedOrdRequest`,
        title: "Accountant Reject Request",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Account Settings
  {
    title: "Account Settings",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}AccountanSetting/changePassword`,
        title: "Change Password",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
        {
        path: `${import.meta.env.BASE_URL}AccountanSetting/logOut`,
        title: "Log Out",
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
  

//   // Print Setting
//   {
//     path: `${import.meta.env.BASE_URL}Franchise/PrintSetting`,
//     title: "Print Setting",
//     icon: dashboardsvg,
//     type: "link",
//     active: false,
//     selected: false,
//     dirchange: false,
//   },

//     // Cash Book
//   {
//     path: `${import.meta.env.BASE_URL}Franchise/CashBook`,
//     title: "Cash Book",
//     icon: dashboardsvg,
//     type: "link",
//     active: false,
//     selected: false,
//     dirchange: false,
//   },


//   // Credit Order Accounts
//   {
//     path: `${import.meta.env.BASE_URL}Franchise/CreditOrderAccounts`,
//     title: "Credit Order Accounts",
//     icon: dashboardsvg,
//     type: "link",
//     active: false,
//     selected: false,
//     dirchange: false,
//   },

  

//   // Orders
//   {
//     title:"Orders",
//     icon: pagesSvg,
//     type: "sub",
//     active: false,
//     selected: false,
//     dirchange: false,
//     children: [
//       {
//         path: `${import.meta.env.BASE_URL}Franchise/TodayOrders`,
//         title: "Today Orders",
//         //icon: dashboardsvg,
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//        {
//         path: `${import.meta.env.BASE_URL}Franchise/TodayBarcodeOrders`,
//         title: "  Today Barcode Orders",
//         //icon: dashboardsvg,
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//       {
//         path: `${import.meta.env.BASE_URL}Franchise/TodayOnlineOrders`,
//         title: "Today Online Orders",
//         //icon: dashboardsvg,
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//       {
//         path: `${import.meta.env.BASE_URL}Franchise/TodayOnlineOrders`,
//         title: "Today Online Orders",
//         //icon: dashboardsvg,
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//       {
//         path: `${import.meta.env.BASE_URL}Franchise/AllOrders`,
//         title: "All Orders",
//         //icon: dashboardsvg,
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//            {
//         path: `${import.meta.env.BASE_URL}Franchise/TodayOnlineOrders`,
//         title: "Today Online Orders",
//         //icon: dashboardsvg,
//         type: "link",
//         active: false,
//         selected: false,
//         dirchange: false,
//       },
//     ], 
//   },
// ];


const frDashboardMenu: MenuItemtype[] = [
  {
    menutitle: "Franchise",
  },
  // Dashboard
  {
    path: `${import.meta.env.BASE_URL}Franchises/frDashboard/:id`,
    title: "Dashboard",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },

  // Print Setting
  {
    path: `${import.meta.env.BASE_URL}Franchises/Setting/PrintSetting`,
    title: "Print Setting",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },

  //  Credit Order Accounts
  {
    path: `${import.meta.env.BASE_URL}Franchises/ViewCreditOrderAccount`,
    title: " Credit Order Accounts",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },


  // Inventory Reports
  {
    title: "Inventory Reports",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchises/ViewMRPInvenotoryStockReport`,
        title: "MRP Invenotory Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/ViewRawInventoryStockReport`,
        title: " Raw Invenotory Stock Report ",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}Franchises/ViewAssetsInventoryStockReport`,
        title: "  Assets Invenotory Stock Report ",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${import.meta.env.BASE_URL}Franchises/ViewMinMRPInventoryStockReport`,
        title: "  Min MRP Invenotory Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/ViewTopSellingProduct`,
        title: " Top Selling Product",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/ViewStockLevel`,
        title: "Stock Level",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      }, 
    ],
  },

  // GRN
  {
    title: "GRN",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchises/GRN/ViewMRPProductGRN`,
        title: "MRP Product GRN",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/GRN/ViewRawProductGRN`,
        title: "Raw Product GRN",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },


  // Cash Book
  {
    title: "Cash Book",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchises/CashBook/AddCashBook`,
        title: "Add CashBook",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/CashBook/ViewCashBook`,
        title: "View CashBook",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Orders
  {
    title: "Orders",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchises/Orders/TodaysOrder`,
        title: "Todays Orders",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/Orders/TodaysPendingOrder`,
        title: "Todays Pending Orders",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/Orders/AllOrders`,
        title: "All Orders",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/Orders/TodaysBarcodeOrder`,
        title: "Todays Barcode Orders",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/Orders/TodaysOnlineOrders`,
        title: "Todays Online Orders",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Selling Products
  {
    title: "Selling Products",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/SellingProducts/ViewProduct`,
        title: "Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/SellingProducts/ViewManageProduct`,
        title: "Manage Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Raw Making Products
  {
    title: "Raw / Making Products",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/RawMakingProducts/ViewRawProducts`,
        title: "Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/RawMakingProducts/ViewRawManageStock`,
        title: "Manage Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Request Product Stock
  {
    path: `${
      import.meta.env.BASE_URL
    }Franchises/RequestProductStock/ViewRequestProductStock`,
    title: "Request Product Stock",
    icon: dashboardsvg,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
  },

  // Employees
  {
    title: "Employees",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchises/Employees/AddFrEmployee`,
        title: "Add Employees",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/Employees/ViewFrEmployee`,
        title: "View Employees",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Reports
  {
    title: "Reports 2025",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: `${import.meta.env.BASE_URL}Franchises/report2025/FrRawInventoryStockReport`,
        title: "Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${import.meta.env.BASE_URL}Franchises/report2025/FrAccountProductStockReport`,
        title: "Account Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/report2025/FrRawProductStockReport`,
        title: "Raw Product Stock Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/report2025/FrCategoryWiseSellReport`,
        title: "Category Wise Sell Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/report2025/FrProductWiseSellReport`,
        title: "Product Wise Sell Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/report2025/FrProductWiseSellReportDatewis`,
        title: "Product Wise Sell Report Date Wise",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
        {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/report2025/FrDiscountReport`,
        title: "Discount Report",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  // Customer Products 2025
  {
    title: "Customer Products 2025",
    icon: pagesSvg,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
        {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/CustomerProducts2025/FrCustomerproducts`,
        title: "Customer Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
       {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/CustomerProducts2025/FrOtherproducts`,
        title: "Other Products",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/CustomerProducts2025/FrDownloadCustomerPrdts`,
        title: "Download Customer Products Excel",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/CustomerProducts2025/FrManageStock`,
        title: "Manage Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }Franchises/CustomerProducts2025/FrWastageStock`,
        title: "Wastage Stock",
        //icon: dashboardsvg,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
];

export const MENUITEMS = window.location.pathname.includes("/Franchises/")
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
