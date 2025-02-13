// Main Dashboard
import Indexpage from "../components/Client-side/Dashboard/AddMinDashboard/IndexPage";

// Selling Product
import ViewProduct from "../components/Client-side/Selling-Products/Products/ViewProduct";
import ViewSubCategory from "../components/Client-side/Selling-Products/SubCategory/ViewSubCategory";
import AddProductForm from "../components/Client-side/Selling-Products/Products/AddProductForm";
import ViewCategory from "../components/Client-side/Selling-Products/Category/ViewCategory";
import EditProductForm from "../components/Client-side/Selling-Products/Products/EditProductForm";
import AllocateProducts from "../components/Client-side/Selling-Products/AllocateProducts/AllocateProducts";
import ViewBrand from "../components/Client-side/Selling-Products/Brand/ViewBrand";

// Franchise
import ViewFranchise from "../components/Client-side/Franchise/ViewFranchise";
import AddFranchise from "../components/Client-side/Franchise/AddFranchise";

// Bar Code
import ViewUpdateBarcode from "../components/Client-side/UpdateBarcode/ViewUpdateBarcode";

// Raw Products
import ViewRawCategory from "../components/Client-side/Raw-Making-Products/RawCategory/ViewRawCategory";
import ViewRawSubCategory from "../components/Client-side/Raw-Making-Products/RawSubCategory/ViewRawSubCategory";
import ViewRawProduct from "../components/Client-side/Raw-Making-Products/RawProducts/ViewRawProduct";
import RawAllocateProducts from "../components/Client-side/Raw-Making-Products/RawAllocateProducts/RawAllocateProducts";

// Employee
import AddEmployee from "../components/Client-side/Employee/AddEmployee/AddEmployee";
import ViewEmployee from "../components/Client-side/Employee/ViewEmployee/ViewEmployee";

// Financer
import ViewFinancer from "../components/Client-side/Financer/ViewFinancer/ViewFinancer";
import CreateFinancer from "../components/Client-side/Financer/CreateFinancer/CreateFinancer";
import AddCommissionNote from "../components/Client-side/Financer/AddCommissionNote/AddCommissionNote";
import ViewCommission from "../components/Client-side/Financer/ViewCommission/ViewCommission";

// Retailer
import AddRetailer from "../components/Client-side/Retailer/AddRetailer/AddRetailer";
import ViewRetailer from "../components/Client-side/Retailer/ViewRetailer/ViewRetailer";
import CreateRetailerAccount from "../components/Client-side/Retailer/CreateRetailerAccount/CreateRetailerAccount";
import ViewSellToRetailer from "../components/Client-side/Retailer/ViewSellToRetailer/ViewSellToRetailer";

// GoDown
import CreateGodownAccount from "../components/Client-side/GoDown/GodownAccount/CreateGodownAccount";
import ViewGodownAccount from "../components/Client-side/GoDown/GodownAccount/ViewGodownAccount";
import AddGodownStock from "../components/Client-side/GoDown/GodownStock/AddGodownStock";
import ViewGodownStock from "../components/Client-side/GoDown/GodownStock/ViewGodownStock";
import ViewTransferStockToCocoFr from "../components/Client-side/GoDown/Transfer-Stock/ViewTransferStockToCocoFr";
import ViewTransferStockToOtherFr from "../components/Client-side/GoDown/Transfer-Stock/ViewTransferStockToOtherFr";
import ViewGodownApproveRequest from "../components/Client-side/GoDown/GodownApproveRequest/ViewGodownApproveRequest";
import CreateInvoiceProductStock from "../components/Client-side/GoDown/CreateInvoiceProductStock/CreateInvoiceProductStock";
import ViewGodownPendingRequest from "../components/Client-side/GoDown/GodownPendingRequest/ViewGodownPendingRequest";
import ViewGodownReturnProduct from "../components/Client-side/GoDown/GodownReturnProduct/ViewGodownReturnProduct";

// Target Complete
import ViewSetTarget from "../components/Client-side/TargetComplete/ViewSetTarget";
import SetTarget from "../components/Client-side/TargetComplete/SetTarget";
import TragetCompletion from "../components/Client-side/TargetComplete/TragetCompletion";
import ViewTargetCompletionReport from "../components/Client-side/TargetComplete/ViewTargetCompletionReport";

// Vendor Payments
import AddVendorPayment from "../components/Client-side/VendorPayment/AddVendorPayment";
import ViewVendorPayment from "../components/Client-side/VendorPayment/ViewVendorPayment";

// Financer Patner
import AddFinancerPartnerAccount from "../components/Client-side/FinancerPatner/FinancerPatnerAccount/AddFinancerPartnerAccount";
import ViewFinancerPatnerAccount from "../components/Client-side/FinancerPatner/FinancerPatnerAccount/ViewFinancerPatnerAccount";
import ViewCommisionNote from "../components/Client-side/FinancerPatner/CommissionNote/ViewCommisionNote";

// Franchise Report
import ViewFinancerReport from "../components/Client-side/FinancerReport/ViewFinancerReport";
import ViewRawFinancerstockReport from "../components/Client-side/FinancerReport/ViewRawFinancerStockReport";

// Report
import ViewCustomerSellReport from "../components/Client-side/Report/ViewCustomerSellReport";
import ViewDailySellReport from "../components/Client-side/Report/ViewDailySellReport";

export interface routeType {
  id: number;
  path: string;
  element: JSX.Element;
  componentName?: string;
}

export const RouteData: routeType[] = [
  // Dashboard
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}Dashboard/IndexPage`,
    element: <Indexpage />,
  },
  // Selling Product
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}SellingProduct/ViewBrand`,
    element: <ViewBrand />,
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}SellingProduct/ViewAllocateProducts`,
    element: <AllocateProducts />,
  },

  {
    id: 4,
    path: `${import.meta.env.BASE_URL}SellingProduct/ViewCategory`,
    element: <ViewCategory />,
  },
  {
    id: 5,
    path: `${import.meta.env.BASE_URL}SellingProduct/ViewProducts`,
    element: <ViewProduct />,
  },

  {
    id: 6,
    path: `${import.meta.env.BASE_URL}SellingProduct/ViewSubCategory`,
    element: <ViewSubCategory />,
  },
  {
    id: 7,
    path: `${import.meta.env.BASE_URL}SellingProduct/AddProductForm`,
    element: <AddProductForm />,
  },

  {
    id: 8,
    path: `${import.meta.env.BASE_URL}Products/EditProductFrom/:id`,
    element: <EditProductForm />,
  },

  // Franchise
  {
    id: 9,
    path: `${import.meta.env.BASE_URL}Franchise/ViewFranchise`,
    element: <ViewFranchise />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}Franchise/AddFranchise`,
    element: <AddFranchise />,
  },

  // Bar Code
  {
    id: 11,
    path: `${import.meta.env.BASE_URL}BarCode/ViewUpdateBarcode`,
    element: <ViewUpdateBarcode />,
  },

  // Raw Products
  {
    id: 12,
    path: `${import.meta.env.BASE_URL}RawProducts/ViewRawCategory`,
    element: <ViewRawCategory />,
  },
  {
    id: 13,
    path: `${import.meta.env.BASE_URL}RawProducts/ViewRawSubCategory`,
    element: <ViewRawSubCategory />,
  },
  {
    id: 14,
    path: `${import.meta.env.BASE_URL}RawProducts/ViewRawProduct`,
    element: <ViewRawProduct />,
  },
  {
    id: 15,
    path: `${import.meta.env.BASE_URL}RawProducts/ViewRawAllocateProducts`,
    element: <RawAllocateProducts />,
  },

  // Employee
  {
    id: 16,
    path: `${import.meta.env.BASE_URL}Employee/AddEmployee`,
    element: <AddEmployee />,
  },
  {
    id: 17,
    path: `${import.meta.env.BASE_URL}Employee/ViewEmployee`,
    element: <ViewEmployee />,
  },

  // Financer
  {
    id: 18,
    path: `${import.meta.env.BASE_URL}Financer/ViewFinancer`,
    element: <ViewFinancer />,
  },
  {
    id: 19,
    path: `${import.meta.env.BASE_URL}Financer/CreateFinancer`,
    element: <CreateFinancer />,
  },
  {
    id: 20,
    path: `${import.meta.env.BASE_URL}Financer/AddCommissionNote`,
    element: <AddCommissionNote />,
  },
  {
    id: 21,
    path: `${import.meta.env.BASE_URL}Financer/ViewCommissionNote`,
    element: <ViewCommission />,
  },

  // Retailer
  {
    id: 22,
    path: `${import.meta.env.BASE_URL}Retailer/AddRetailer`,
    element: <AddRetailer />,
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}Retailer/ViewRetailer`,
    element: <ViewRetailer />,
  },
  {
    id: 24,
    path: `${import.meta.env.BASE_URL}Retailer/CreateRetailerAccount`,
    element: <CreateRetailerAccount />,
  },
  {
    id: 25,
    path: `${import.meta.env.BASE_URL}Retailer/ViewSellToRetailer`,
    element: <ViewSellToRetailer />,
  },

  // GoDown
  {
    id: 26,
    path: `${import.meta.env.BASE_URL}GoDown/CreateGodownAccount`,
    element: <CreateGodownAccount />,
  },
  {
    id: 27,
    path: `${import.meta.env.BASE_URL}GoDown/ViewGodownAccount`,
    element: <ViewGodownAccount />,
  },
  {
    id: 28,
    path: `${import.meta.env.BASE_URL}GoDown/AddGodownStock`,
    element: <AddGodownStock />,
  },
  {
    id: 29,
    path: `${import.meta.env.BASE_URL}GoDown/ViewGodownStock`,
    element: <ViewGodownStock />,
  },
  {
    id: 30,
    path: `${import.meta.env.BASE_URL}GoDown/ViewTransferStockToCocoFr`,
    element: <ViewTransferStockToCocoFr />,
  },
  {
    id: 31,
    path: `${import.meta.env.BASE_URL}GoDown/ViewTransferStockToOtherFr`,
    element: <ViewTransferStockToOtherFr />,
  },
  {
    id: 32,
    path: `${import.meta.env.BASE_URL}GoDown/ViewGodownPendingRequest`,
    element: <ViewGodownPendingRequest />,
  },
  {
    id: 33,
    path: `${import.meta.env.BASE_URL}GoDown/ViewGodownApproveRequest`,
    element: <ViewGodownApproveRequest />,
  },
  {
    id: 34,
    path: `${import.meta.env.BASE_URL}GoDown/CreateInvoiceProductStock`,
    element: <CreateInvoiceProductStock />,
  },
  {
    id: 35,
    path: `${import.meta.env.BASE_URL}GoDown/ViewGodownReturnProduct`,
    element: <ViewGodownReturnProduct />,
  },

  // Target
  {
    id: 36,
    path: `${import.meta.env.BASE_URL}Target/ViewSetTarget`,
    element: <ViewSetTarget />,
  },
  {
    id: 37,
    path: `${import.meta.env.BASE_URL}Target/SetTarget`,
    element: <SetTarget />,
  },
  {
    id: 38,
    path: `${import.meta.env.BASE_URL}Target/TragetCompletion`,
    element: <TragetCompletion />,
  },
  {
    id: 39,
    path: `${import.meta.env.BASE_URL}Target/ViewTargetCompletionReport`,
    element: <ViewTargetCompletionReport />,
  },

  // Vendor Payments
  {
    id: 40,
    path: `${import.meta.env.BASE_URL}VendorPayment/AddVendorPayment`,
    element: <AddVendorPayment />,
  },
  {
    id: 41,
    path: `${import.meta.env.BASE_URL}VendorPayment/ViewVendorPayment`,
    element: <ViewVendorPayment />,
  },

  // Financer Patner
  {
    id: 42,
    path: `${import.meta.env.BASE_URL}FinancerPatner/AddFinancerPartnerAccount`,
    element: <AddFinancerPartnerAccount />,
  },
  {
    id: 43,
    path: `${import.meta.env.BASE_URL}FinancerPatner/ViewFinancerPatnerAccount`,
    element: <ViewFinancerPatnerAccount />,
  },
  {
    id: 44,
    path: `${import.meta.env.BASE_URL}FinancerPatner/ViewCommisionNote`,
    element: <ViewCommisionNote />,
  },

  // Franchise Report
  {
    id: 45,
    path: `${import.meta.env.BASE_URL}FranchiseReport/ViewFinancerReport`,
    element: <ViewFinancerReport />,
  },
  {
    id: 46,
    path: `${
      import.meta.env.BASE_URL
    }FranchiseReport/ViewRawFinancerstockReport`,
    element: <ViewRawFinancerstockReport />,
  },

  //  Report
  {
    id: 47,
    path: `${import.meta.env.BASE_URL}Report/ViewCustomerSellReport`,
    element: <ViewCustomerSellReport />,
  },
  {
    id: 48,
    path: `${import.meta.env.BASE_URL}Report/ViewDailySellReport`,
    element: <ViewDailySellReport />,
  },
];
