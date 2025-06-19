import { useEffect, useState } from "react";
import { utils, writeFile, WorkBook } from "xlsx";
import {
  fetchRawSubCategories,
  deleteRawSubCategory,
} from "../../../api/Raw-Making-Products-Api/RawSubCategoryApi/RawSubCategoryApi";

export interface RawSubCategory {
  id: number;
  Name: string;
  CatName:string,

}

type SortDirection = "asc" | "desc";

interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

const useViewRawSubCategory = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [subcategoriesPerPage, setSubCategoriesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<SortConfig<RawSubCategory>>({
    key: null,
    direction: "asc",
  });
  const [subcategories, setSubCategories] = useState<RawSubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] =
    useState<RawSubCategory[]>([]);
  const [toggleAddRawSubCategory, setToggleAddRawSubCategory] =
    useState<boolean>(false);
  const [toggleEditRawSubCategory, setToggleEditRawSubCategory] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handlefetchSubCategories();
  }, []);

  const handlefetchSubCategories = async (): Promise<void> => {
    setLoading(true);
    try {
      const response : any = await fetchRawSubCategories();
      const data: RawSubCategory[] = response?.data?.data ?? [];
      setSubCategories(data);
      setFilteredSubCategories(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  const modalAddRawSubCategory = (): void =>
    setToggleAddRawSubCategory((prev) => !prev);

  const modalToggleEditRawSubCategory = (): void =>
    setToggleEditRawSubCategory((prev) => !prev);

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    const lower = term.toLowerCase();
    setFilteredSubCategories(
      subcategories.filter(
        (s :any) =>
          s.name.toLowerCase().includes(lower) ||
          s.id.toString().includes(lower)
      )
    );
  };

  const handleSort = (key: keyof RawSubCategory): void => {
    const direction: SortDirection =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const sorted = [...filteredSubCategories].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredSubCategories(sorted);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      const res = await deleteRawSubCategory(id);
      if (res.status === 200) {
        await handlefetchSubCategories();
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleEdit = (id: number): void => {
    modalToggleEditRawSubCategory();
    localStorage.setItem("subCatId", id.toString());
  };
  const handlePageChange = (page: number): void => setCurrentPage(page);

  const indexOfLastSubCategory = currentPage * subcategoriesPerPage;
  const indexOfFirstSubCategory = indexOfLastSubCategory - subcategoriesPerPage;
  const currentSubCategories = filteredSubCategories.slice(
    indexOfFirstSubCategory,
    indexOfLastSubCategory
  );
  const totalPages = Math.ceil(
    filteredSubCategories.length / subcategoriesPerPage
  );

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(
      currentPage - Math.floor(maxVisiblePages / 2),
      1,
    );
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const exportToExcel = (): void => {
    const table = document.getElementById("subcategory-table") as
      | HTMLTableElement
      | null;
    if (!table) return;
    const workbook: WorkBook = utils.table_to_book(table);
    writeFile(workbook, "subcategory_data.xlsx");
  };

  return {
    searchTerm,
    currentPage,
    subcategoriesPerPage,
    currentSubCategories,
    filteredSubCategories,
    indexOfFirstSubCategory,
    indexOfLastSubCategory,
    totalPages,
    loading,
    toggleAddRawSubCategory,
    toggleEditRawSubCategory,
    setSubCategoriesPerPage,
    handleSearch,
    handleSort,
    handleDelete,
    handleEdit,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    modalAddRawSubCategory,
    handlefetchSubCategories,
    modalToggleEditRawSubCategory,
  } as const;
};

export default useViewRawSubCategory;
