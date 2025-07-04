import { useEffect, useState } from "react";
import { utils, writeFile, WorkBook } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  fetchRawProducts,
  deleteRawProducts,
} from "../../../api/Raw-Making-Products-Api/RawProductsApi/RawProductsApi";

export interface RawProduct {
  id: number;
  name: string;
  [key: string]: any;
}

type SortDirection = "asc" | "desc";

interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

const useViewRawProduct = () => {
  const [ProductArray, setProductArray] = useState<RawProduct[]>([]);
  const [filteredProductArray, setFilteredProductArray] = useState<RawProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<SortConfig<RawProduct>>({
    key: null,
    direction: "asc",
  });
  const [loading, setloading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetProduct();
  }, []);

  const fetchGetProduct = async (): Promise<void> => {
    setloading(true)
    try {
      const response: any = await fetchRawProducts();
      const data: RawProduct[] = response?.data?.data || [];
      setProductArray(data);
      setFilteredProductArray(data);
      setloading(!data)
    } catch (error) {
      console.error("Error fetching products:", error);
      setloading(false)
    }
  };

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    const lower = term.toLowerCase();
    setFilteredProductArray(
      ProductArray.filter(
        (product) =>
          product?.ProductName?.toLowerCase().includes(lower) ||
          product?.id?.toString().includes(lower)
      )
    );
  };

  const handleSort = (key: keyof RawProduct): void => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredProductArray(sorted);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handelNavigateAddMore = (): void => {
    navigate("/RawProducts/AddRawMakingProducts");
  };

  const exportToExcel = (): void => {
    const table = document.getElementById("category-table") as HTMLTableElement | null;
    if (!table) return;
    const workbook: WorkBook = utils.table_to_book(table);
    writeFile(workbook, "product_data.xlsx");
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    const totalPages = Math.ceil(filteredProductArray.length / categoriesPerPage);

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handleDeleteProduct = async (id: number): Promise<void> => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      const response = await deleteRawProducts(id);
      if (response.status === 200) {
        fetchGetProduct();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handelEditProduct = (id: number): void => {
    navigate(`/RawProducts/EditRawProducts/${id}`);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredProductArray.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredProductArray.length / categoriesPerPage);

  return {
    searchTerm,
    currentCategories,
    categoriesPerPage,
    filteredProductArray,
    indexOfFirstCategory,
    indexOfLastCategory,
    currentPage,
    totalPages,
    loading,
    handelEditProduct,
    handleDeleteProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setCategoriesPerPage,
    handelNavigateAddMore,
  } ;
};

export default useViewRawProduct;
