import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  deleteRawProducts,
  fetchRawProducts,
} from "../../../api/Raw-Making-Products-Api/RawProductsApi/RawProductsApi";

const useViewRawProduct = () => {
  const [ProductArray, setProductArray] = useState([]);
  const [filteredProductArray, setFilteredProductArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetProduct();
  }, []);

  const fetchGetProduct = async () => {
    try {
      const response: any = await fetchRawProducts();
      setProductArray(response.data);
      setFilteredProductArray(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductArray(
      ProductArray.filter(
        (category: any) =>
          category?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          category?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedCategories = [...filteredProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductArray(sortedCategories);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handelNavigateAddMore = () => {
    navigate("/RawProducts/AddRawMakingProducts");
  };

  const exportToExcel = () => {
    const table = document.getElementById("category-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "product_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;
      const response = await deleteRawProducts(id);
      if (response.status === 200) {
        console.log("Product deleted successfully:", response.data);
        fetchGetProduct();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handelEditProduct = (id: any) => {
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
    handelEditProduct,
    handleDeleteProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setCategoriesPerPage,
    handelNavigateAddMore,
  };
};

export default useViewRawProduct;
