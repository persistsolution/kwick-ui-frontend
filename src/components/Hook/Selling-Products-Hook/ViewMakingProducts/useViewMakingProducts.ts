import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { deleteMakingProductsApi, fetchMakingProductsApi } from "../../../api/Selling-Products-Api/MakingProducts-Api/MakingProductApi";

// Define types
interface ProductType {
  id: number;
  Name: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useViewMakingProducts = () => {
  const [ProductArray, setProductArray] = useState<ProductType[]>([]);
  const [filteredProductArray, setFilteredProductArray] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productPage, setproductPage] = useState<number>(1);
  const [productPerPage, setproductPerPage] = useState<number>(5);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [subcategoryList, setsubcategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetMRPProduct();
  }, []);

  const fetchGetMRPProduct = async () => {
    setLoading(true)
    try {
      const response: any = await fetchMakingProductsApi();
      const data: ProductType[] = response?.data?.data || [];
      setProductArray(data);
      setFilteredProductArray(data);
      setLoading(!data)
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false)

    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductArray(
      ProductArray.filter(
        (product: ProductType) =>
          product?.ProductName?.toLowerCase().includes(term.toLowerCase()) ||
          product?.id?.toString().includes(term)
      )
    );
  };


  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProduct = [...filteredProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductArray(sortedProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setproductPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("product-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "product_data.xlsx");
  };

  const totalPages = Math.ceil(filteredProductArray.length / productPerPage);

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(productPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const response: any = await deleteMakingProductsApi(id); // Replace with delete API call
      if (response.status === 200) {
        console.log("Product deleted successfully:", response.data);
        fetchGetMRPProduct();
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handelEditProduct = (id: number) => {
    navigate(`/SellingProduct/EditMakingProductForm/${id}`);
  };

  const handelAddProduct = () => {
    navigate(`/SellingProduct/AddMakingProductForm`);
  };

  const indexOfLastproduct = productPage * productPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productPerPage;
  const currentproduct = filteredProductArray.slice(indexOfFirstproduct, indexOfLastproduct);

  return {
    searchTerm,
    currentproduct,
    productPerPage,
    filteredProductArray,
    indexOfFirstproduct,
    indexOfLastproduct,
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
    setproductPerPage,
    handelAddProduct,
  };
};

export default useViewMakingProducts;
