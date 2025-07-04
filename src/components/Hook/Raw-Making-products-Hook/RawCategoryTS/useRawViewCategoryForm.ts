import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchRawCategories,
  deleteRawCategory,
} from "../../../api/Raw-Making-Products-Api/RawCategoryApi/RawCategortApi";

interface Category {
  id: number;
  Name: string;
  [key: string]: any; 
}

const useRawViewCategoryForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Category | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [toggleAddRawCategory, settoggleAddRawCategory] = useState<boolean>(false);
  const [toggleEditRawCategory, settoggleEditRawCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handelfetchCategories = async () => {
    setLoading(true);
    try {
      const response :any = await fetchRawCategories();
      const data =  response?.data?.data || [];
      setCategories(data);
      setFilteredCategories(data);
      setLoading(!data.length);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handelfetchCategories();
  }, []);

  const handelToggleEditRawCategory = (id: number) => {
    settoggleEditRawCategory((prev) => !prev);
    if (typeof id === "number") {
      localStorage.setItem("rawCatId", id.toString());
    } else {
      localStorage.removeItem("rawCatId");
    }
  };

  const modalAddRawCategory = () => {
    settoggleAddRawCategory((prev) => !prev);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredCategories(
      categories.filter(
        (category) =>
          category?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          category?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: keyof Category) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedCategories = [...filteredCategories].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCategories(sortedCategories);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("category-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "category_data.xlsx");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const response = await deleteRawCategory(id);
      if (response.status === 200) {
        handelfetchCategories();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    handelToggleEditRawCategory(id);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  return {
    indexOfLastCategory,
    indexOfFirstCategory,
    categories,
    filteredCategories,
    searchTerm,
    currentPage,
    categoriesPerPage,
    sortConfig,
    currentCategories,
    totalPages,
    toggleAddRawCategory,
    toggleEditRawCategory,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteProduct,
    handleEdit,
    getVisiblePages,
    setCategoriesPerPage,
    modalAddRawCategory,
    handelToggleEditRawCategory,
    handelfetchCategories,
    loading,
  };
};

export default useRawViewCategoryForm;
