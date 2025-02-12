// Main Dashboard
import Indexpage from "../components/Dashboard/AddMinDashboard/IndexPage";

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

export interface routeType {
  id: number;
  path: string;
  element: JSX.Element;
  componentName?: string;
}

export const RouteData: routeType[] = [
  // Selling Product
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}Products/ViewBrand`,
    element: <ViewBrand />,
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}Products/ViewAllocateProducts`,
    element: <AllocateProducts />,
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}Dashboard/IndexPage`,
    element: <Indexpage />,
  },

  {
    id: 4,
    path: `${import.meta.env.BASE_URL}Products/ViewCategory`,
    element: <ViewCategory />,
  },
  {
    id: 5,
    path: `${import.meta.env.BASE_URL}Products/ViewProducts`,
    element: <ViewProduct />,
  },

  {
    id: 6,
    path: `${import.meta.env.BASE_URL}Products/ViewSubCategory`,
    element: <ViewSubCategory />,
  },
  {
    id: 7,
    path: `${import.meta.env.BASE_URL}Products/AddProductForm`,
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
    path: `${import.meta.env.BASE_URL}Products/ViewFranchise`,
    element: <ViewFranchise />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}Products/AddFranchise`,
    element: <AddFranchise />,
  },
];
