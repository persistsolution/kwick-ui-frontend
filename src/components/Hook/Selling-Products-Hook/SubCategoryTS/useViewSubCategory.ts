import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchSubCategories,
  deleteSubCategory,
} from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";

// Define subcategory type
interface SubCategory {
  id: number;
  Name: string;
  [key: string]: any; // allows sorting with dynamic keys
}

const useViewSubCategory = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [subcategoriesPerPage, setSubCategoriesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [subcategoriesEditId, setsubcategoriesEditId] = useState<number>(0);
  const [toggleAddSubCategory, setToggleAddSubCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleEdit = (id: number) => {
    setModal(!modal);
    const subCatId = Number(id);
    setsubcategoriesEditId(subCatId);
    if (!isNaN(subCatId)) {
      localStorage.setItem("subCategoryId", subCatId.toString());
    } else {
      localStorage.removeItem("subCategoryId");
    }
  };

  const modalAddSubCategory = () => {
    setToggleAddSubCategory(!toggleAddSubCategory);
  };

  useEffect(() => {
    handelfetchSubCategories();
  }, []);

  const handelfetchSubCategories = async () => {
    setLoading(true);
    try {
      const response :any = await fetchSubCategories();
      const data: SubCategory[] = response?.data?.data || [];
      setSubCategories(data);
      setFilteredSubCategories(data);
      setLoading(!data.length);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredSubCategories(
      subcategories.filter(
        (subcategory) =>
          subcategory?.subcategory_name?.toLowerCase().includes(term.toLowerCase()) ||
          subcategory?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    const direction: "asc" | "desc" =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedSubCategories = [...filteredSubCategories].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredSubCategories(sortedSubCategories);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      const response = await deleteSubCategory(id);
      if (response?.status === 200) {
        handelfetchSubCategories();
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("subcategory-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "subcategory_data.xlsx");
    }
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const indexOfLastSubCategory = currentPage * subcategoriesPerPage;
  const indexOfFirstSubCategory = indexOfLastSubCategory - subcategoriesPerPage;
  const currentSubCategories = filteredSubCategories.slice(
    indexOfFirstSubCategory,
    indexOfLastSubCategory
  );
  const totalPages = Math.ceil(filteredSubCategories.length / subcategoriesPerPage);

  return {
    searchTerm,
    setSubCategoriesPerPage,
    handleSearch,
    handleSort,
    handleDelete,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    currentSubCategories,
    subcategoriesPerPage,
    filteredSubCategories,
    indexOfFirstSubCategory,
    currentPage,
    indexOfLastSubCategory,
    totalPages,
    toggleEdit,
    modal,
    subcategoriesEditId,
    loading,
    handelfetchSubCategories,
    modalAddSubCategory,
    toggleAddSubCategory,
  };
};

export default useViewSubCategory;
