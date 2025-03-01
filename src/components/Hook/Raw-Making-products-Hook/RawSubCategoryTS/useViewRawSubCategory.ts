import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchRawSubCategories,
  deleteRawSubCategory,
} from "../../../api/Raw-Making-Products-Api/RawSubCategoryApi/RawSubCategoryApi";

const useViewRawSubCategory = () => {
  interface SubCategory {
    id: number;
    name: string;
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [subcategoriesPerPage, setSubCategoriesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<
    SubCategory[]
  >([]);
  const [toggleaddRawSubCategory, settoggleaddRawSubCategory] = useState(false);
  const [toggleEditRawSubCategory, settoggleEditRawSubCategory] =
    useState(false);

  useEffect(() => {
    handelfetchSubCategories();
  }, []);

  const handelfetchSubCategories = async () => {
    try {
      const response = await fetchRawSubCategories();
      setSubCategories(response.data);
      setFilteredSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const modalAddRawSubCategory = () => {
    settoggleaddRawSubCategory(!toggleaddRawSubCategory);
  };

  const modaltoggleEditRawSubCategory = () => {
    settoggleEditRawSubCategory(!toggleEditRawSubCategory);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredSubCategories(
      subcategories.filter(
        (subcategory: any) =>
          subcategory?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          subcategory?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: keyof SubCategory | string) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedSubCategories = [...filteredSubCategories].sort(
      (a: any, b: any) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );
    setSortConfig({ key, direction });
    setFilteredSubCategories(sortedSubCategories);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      const response = await deleteRawSubCategory(id);
      if (response.status === 200) {
        handelfetchSubCategories();
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleEdit = (id: number) => {
    settoggleEditRawSubCategory(!toggleEditRawSubCategory);
    if (typeof id === "number") {
      localStorage.setItem("subCatId", id.toString());
    } else {
      localStorage.removeItem("subCatId");
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("subcategory-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "subcategory_data.xlsx");
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

  const indexOfLastSubCategory = currentPage * subcategoriesPerPage;
  const indexOfFirstSubCategory = indexOfLastSubCategory - subcategoriesPerPage;
  const currentSubCategories = filteredSubCategories.slice(
    indexOfFirstSubCategory,
    indexOfLastSubCategory
  );
  const totalPages = Math.ceil(
    filteredSubCategories.length / subcategoriesPerPage
  );

  return {
    searchTerm,
    setSubCategoriesPerPage,
    handleSearch,
    handleSort,
    handleDelete,
    handleEdit,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    modalAddRawSubCategory,
    handelfetchSubCategories,
    modaltoggleEditRawSubCategory,
    toggleEditRawSubCategory,
    currentSubCategories,
    subcategoriesPerPage,
    filteredSubCategories,
    indexOfFirstSubCategory,
    currentPage,
    indexOfLastSubCategory,
    totalPages,
    toggleaddRawSubCategory,
  };
};

export default useViewRawSubCategory;
