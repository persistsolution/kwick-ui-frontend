import {  useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchSubCategories  , deleteSubCategory} from '../../../api/Selling-Products-Api/SubCategory/subCategoryApi';

const useViewSubCategory = () => {
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
  const [modal, setModal] = useState(false);
  const [subcategoriesEditId ,setsubcategoriesEditId]= useState(0)
  const [toggleAddSubCategory , setToggleAddSubCategory] = useState(false)

  const toggle = (id: any) => {
    setModal(!modal);
    setsubcategoriesEditId(id)
    if (typeof id === "number") {
      localStorage.setItem("subCategoryId", id.toString());
    } else{
      localStorage.removeItem("subCategoryId");
    }
  };

  const modalAddSubCategory =()=>{
    setToggleAddSubCategory(!toggleAddSubCategory)
  }

  useEffect(() => {
    handelfetchSubCategories();
  }, []);

  const handelfetchSubCategories = async () => {
    try {
      const response = await fetchSubCategories();
      setSubCategories(response.data);
      setFilteredSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
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
    const sortedSubCategories = [...filteredSubCategories].sort((a:any, b:any) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredSubCategories(sortedSubCategories);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      const response = await deleteSubCategory(id)
      // if (response.status === 200) {
        // handelfetchSubCategories();
      // }
            if (response) {
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
    toggle,
    modal,
    subcategoriesEditId,
    handelfetchSubCategories,
    modalAddSubCategory,
    toggleAddSubCategory
  }
};

export default useViewSubCategory;
