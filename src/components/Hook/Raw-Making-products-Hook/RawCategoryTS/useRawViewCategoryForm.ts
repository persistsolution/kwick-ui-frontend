import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchRawCategories,
  deleteRawCategory,
} from "../../../api/Raw-Making-Products-Api/RawCategoryApi/RawCategortApi";

const useRawViewCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [toggleAddRawCategory, settoggleAddRawCategory] = useState(false);
  const [toggleEditRawCategory, settoggleEditRawCategory] = useState(false);

  useEffect(() => {
    handelfetchCategories();
  }, []);

  const handelToggleEditRawCategory = (id: number) => {
    settoggleEditRawCategory(!toggleEditRawCategory);
    if (typeof id === "number") {
      localStorage.setItem("rawCatId", id.toString());
    } else {
      localStorage.removeItem("rawCatId");
    }
  };

  const handelfetchCategories = async () => {
    try {
      const response: any = await fetchRawCategories();
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredCategories(
      categories.filter(
        (category: any) =>
          category?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          category?.id?.toString().includes(term.toLowerCase())
      )
    );
  };
  const modalAddRawCategory = () => {
    settoggleAddRawCategory(!toggleAddRawCategory);
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedCategories = [...filteredCategories].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
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
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "category_data.xlsx");
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
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

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
  };
};

export default useRawViewCategoryForm;
