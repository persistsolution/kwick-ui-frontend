// useViewCategoryWiseSaleReport2025.ts
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCategoryWiseSaleReportApi } from "../../api/FranchiseReport2025/FranchiseReport2025Api";

export interface CategorySaleItem {
  id: number;
  Name?: string;
  franchise?: string;
  cateName?: string;
  qty?: number;
  amount?: number;
  Category:string;
  totalSell:string;
  Amount:string;
  srNo:string
}

export interface SelectOption {
  id: number;
  label: string;
}

const useViewCategoryWiseSaleReport2025 = () => {
  const [CategoryWiseSaleReport2025, setCategoryWiseSaleReport2025] = useState<CategorySaleItem[]>([]);
  const [filteredCategoryWiseSaleReport2025, setFilteredCategoryWiseSaleReport2025] = useState<CategorySaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [CategoryWiseSaleReport2025PerPage, setCategoryWiseSaleReport2025PerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [franchiseArray, setfranchiseArray] = useState<SelectOption[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [categoryArray, setCategoryArray] = useState<SelectOption[]>([]);
  const [countryArray, setcountryArray] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settodate] = useState<string>("");
  const [selectState, setSelectState] = useState<string>("");
  const [selectFranchise, setSelectFranchise] = useState<string>("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof CategorySaleItem | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchCategoryWiseSaleReport2025();
  }, []);

  const handleFetchCategoryWiseSaleReport2025 = async () => {
    setLoading(true);
    try {
      const response: any = await fetchCategoryWiseSaleReportApi();
      const data: CategorySaleItem[] = response?.data?.data || [];
      setCategoryWiseSaleReport2025(data);
      setFilteredCategoryWiseSaleReport2025(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching CategoryWiseSaleReport2025:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowered = term.toLowerCase();
    setFilteredCategoryWiseSaleReport2025(
      CategoryWiseSaleReport2025.filter(
        (item) => item?.Name?.toLowerCase().includes(lowered) || item.id.toString().includes(lowered)
      )
    );
  };

  const handleSort = (key: keyof CategorySaleItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

    const sorted = [...filteredCategoryWiseSaleReport2025].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCategoryWiseSaleReport2025(sorted);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const exportToExcel = () => {
    const table = document.getElementById("CategoryWiseSaleReport2025-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "CategoryWiseSaleReport2025_data.xlsx");
  };

  const totalPages = Math.ceil(filteredCategoryWiseSaleReport2025.length / CategoryWiseSaleReport2025PerPage);
  const indexOfLast = currentPage * CategoryWiseSaleReport2025PerPage;
  const indexOfFirst = indexOfLast - CategoryWiseSaleReport2025PerPage;
  const currentData = filteredCategoryWiseSaleReport2025.slice(indexOfFirst, indexOfLast);

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    indexOfFirstCategoryWiseSaleReport2025: indexOfFirst,
    indexOfLastCategoryWiseSaleReport2025: indexOfLast,
    currentCategoryWiseSaleReport2025: currentData,
    totalPages,
    getVisiblePages,
    CategoryWiseSaleReport2025,
    filteredCategoryWiseSaleReport2025,
    searchTerm,
    currentPage,
    CategoryWiseSaleReport2025PerPage,
    sortConfig,
    franchiseList,
    categoryList,
    categoryArray,
    franchiseArray,
    godownProductArray,
    countryArray,
    fromDate,
    toDate,
    selectState,
    selectFranchise,
    selectFranchiseProduct,
    selectCategory,
    loading,
    setCategoryWiseSaleReport2025PerPage,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    setSelectCategory,
    setfromDate,
    settodate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
  };
};

export default useViewCategoryWiseSaleReport2025;