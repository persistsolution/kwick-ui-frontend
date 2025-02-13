import {useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCategories , deleteCategory } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";

const useViewCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [modalEdit, setModalEdit] = useState(false);
  const [categoriesEditId ,setcategoriesEditId]= useState(0)
  const[toggleAddCategory , settoggleAddCategory] = useState(false)


  const toggleEdit = (id: number) => {
    setModalEdit(!modalEdit);
    setcategoriesEditId(id)
    if (typeof id === "number") {
      localStorage.setItem("categoryId", id.toString());
    } else{
      localStorage.removeItem("categoryId");
    }
  };

  const modalAddCategory = ()=>{
    settoggleAddCategory(!toggleAddCategory)
  }  

  useEffect(() => {
    handelfetchCategories();
  }, []);

  const handelfetchCategories = async () => {
    try {
      const response :any = await fetchCategories();
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
      const response = await deleteCategory(id);
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
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteProduct,
    getVisiblePages,
    setCategoriesPerPage,
    toggleEdit,
    modalEdit,
    categoriesEditId,
    handelfetchCategories,
    toggleAddCategory,
    modalAddCategory
  };
};

export default useViewCategoryForm;
