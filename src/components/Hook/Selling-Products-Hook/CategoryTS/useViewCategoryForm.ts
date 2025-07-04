import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCategories, deleteCategory } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";

// Define Category type
interface Category {
  id: number;
  Name: string;
  [key: string]: any; // for dynamic keys used in sorting
}

const useViewCategoryForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [categoriesEditId, setcategoriesEditId] = useState<number>(0);
  const [toggleAddCategory, settoggleAddCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteAlert, setshowDeleteAlert] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  const toggleEdit = (id: number) => {
    const catId = Number(id);
    setModalEdit(!modalEdit);
    setcategoriesEditId(catId);
    if (typeof catId === "number") {
      localStorage.setItem("categoryId", catId.toString());
    } else {
      localStorage.removeItem("categoryId");
    }
  };

  const modalAddCategory = () => {
    settoggleAddCategory(!toggleAddCategory);
  };

  useEffect(() => {
    handelfetchCategories();
  }, []);

  const handelfetchCategories = async () => {
    setLoading(true);
    try {
      const response :any = await fetchCategories();
      const data: Category[] = response?.data?.data || [];
      setCategories(data);
      setFilteredCategories(data);
      setLoading(!data.length);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
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

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
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
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "category_data.xlsx");
    }
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

  const handleDeleteProduct = async () => {
    try {
      const response = await deleteCategory(deleteId);
      if (response.status === 200) {
        handelfetchCategories();
        setshowDeleteAlert(false);
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handleOpenCloseDltAlrt = (id: number) => {
    setshowDeleteAlert(!showDeleteAlert);
    setDeleteId(id);
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
    loading,
    showDeleteAlert,
    deleteId,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteProduct,
    getVisiblePages,
    setCategoriesPerPage,
    handleOpenCloseDltAlrt,
    toggleEdit,
    modalEdit,
    categoriesEditId,
    handelfetchCategories,
    toggleAddCategory,
    modalAddCategory,
  };
};

export default useViewCategoryForm;
