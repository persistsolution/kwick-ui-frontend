import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  fetchMRPProductsApi,
  deleteMRPProductsApi,
} from "../../../api/Selling-Products-Api/MRPProduct-Api/MRPProductApi";

// Define product type
interface Product {
  id: number;
  Name: string;
  [key: string]: any; // To allow dynamic key access for sorting
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useViewMRPProducts = () => {
  const [ProductArray, setProductArray] = useState<Product[]>([]);
  const [filteredProductArray, setFilteredProductArray] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productPage, setProductPage] = useState<number>(1);
  const [productPerPage, setProductPerPage] = useState<number>(5);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [subcategoryList, setSubcategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchGetMRPProduct();
  }, []);

  const fetchGetMRPProduct = async () => {
    setLoading(true);
    try {
      const response: any = await fetchMRPProductsApi();
      const data: Product[] = response?.data?.data || [];
      setProductArray(data);
      setFilteredProductArray(data);
      setLoading(!data.length);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowerCaseTerm = term.toLowerCase();
    setFilteredProductArray(
      ProductArray.filter(
        (product) =>
          product?.Name?.toLowerCase().includes(lowerCaseTerm) ||
          product?.id?.toString().includes(lowerCaseTerm)
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProducts = [...filteredProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductArray(sortedProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setProductPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("product-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "product_data.xlsx");
  };

  const totalPages = Math.ceil(filteredProductArray.length / productPerPage);

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(productPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const response: any = await deleteMRPProductsApi(id);
      if (response.status === 200) {
        console.log("Product deleted successfully:", response.data);
        fetchGetMRPProduct();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handelEditProduct = (id: number) => {
    navigate(`/SellingProduct/EditMRPProductForm/${id}`);
  };

  const handelAddProduct = () => {
    navigate(`/SellingProduct/AddMRPProductForm`);
  };

  const indexOfLastProduct = productPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = filteredProductArray.slice(indexOfFirstProduct, indexOfLastProduct);

  return {
    searchTerm,
    currentProduct,
    productPerPage,
    filteredProductArray,
    indexOfFirstProduct,
    indexOfLastProduct,
    productPage,
    totalPages,
    categoryList,
    subcategoryList,
    loading,
    handelEditProduct,
    handleDeleteProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductPerPage,
    handelAddProduct,
  };
};

export default useViewMRPProducts;
