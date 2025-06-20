// useViewMRPProductWiseSaleReport2025.ts
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchMRPPrdWiseSaleReportApi } from "../../api/FranchiseReport2025/FranchiseReport2025Api";

export interface ProductSaleItem {
  id: number;
  Name?: string;
  franchise?: string;
  productName?: string;
  qty?: number;
  amount?: number;
  paymentType?: string;
  [key: string]: unknown; 
}

export interface SelectOption {
  label: string;
  value: string | number;
  id?: number;
}

const useViewMRPProductWiseSaleReport2025 = () => {
  const [MRPProductWiseSaleReport2025, setMRPProductWiseSaleReport2025] = useState<ProductSaleItem[]>([]);
  const [filteredMRPProductWiseSaleReport2025, setFilteredMRPProductWiseSaleReport2025] = useState<ProductSaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [MRPProductWiseSaleReport2025PerPage, setMRPProductWiseSaleReport2025PerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [franchiseArray, setfranchiseArray] = useState<SelectOption[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [productArray, setproductArray] = useState<SelectOption[]>([]);
  const [countryArray, setcountryArray] = useState<any[]>([]);
  const [paymentTypeArray, setPaymentTypeArray] = useState<SelectOption[]>([
    { label: "All", value: "All" },
    { label: "Cash", value: "Cash" },
    { label: "Online", value: "Online" },
  ]);
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settodate] = useState<string>("");
  const [selectState, setSelectState] = useState<string>("");
  const [selectFranchise, setSelectFranchise] = useState<string>("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState<string>("");
  const [selectProduct, setSelectProduct] = useState<string>("");
  const [selectPaymentType, setSelectPaymentType] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof ProductSaleItem | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    handleFetchMRPProductWiseSaleReport2025();
  }, []);

  const handleFetchMRPProductWiseSaleReport2025 = async () => {
    setLoading(true);
    try {
      const response: any = await fetchMRPPrdWiseSaleReportApi();
      const data: ProductSaleItem[] = response?.data?.data || [];
      setMRPProductWiseSaleReport2025(data);
      setFilteredMRPProductWiseSaleReport2025(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching MRPProductWiseSaleReport2025:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowered = term.toLowerCase();
    setFilteredMRPProductWiseSaleReport2025(
      MRPProductWiseSaleReport2025.filter(
        (item) => item?.Name?.toLowerCase().includes(lowered) || item.id.toString().includes(lowered)
      )
    );
  };

  const handleSort = (key: keyof ProductSaleItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

    const sorted = [...filteredMRPProductWiseSaleReport2025].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredMRPProductWiseSaleReport2025(sorted);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const exportToExcel = () => {
    const table = document.getElementById("MRPProductWiseSaleReport2025-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "MRPProductWiseSaleReport2025_data.xlsx");
  };

  const totalPages = Math.ceil(filteredMRPProductWiseSaleReport2025.length / MRPProductWiseSaleReport2025PerPage);
  const indexOfLast = currentPage * MRPProductWiseSaleReport2025PerPage;
  const indexOfFirst = indexOfLast - MRPProductWiseSaleReport2025PerPage;
  const currentData = filteredMRPProductWiseSaleReport2025.slice(indexOfFirst, indexOfLast);

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
    indexOfFirstMRPProductWiseSaleReport2025: indexOfFirst,
    indexOfLastMRPProductWiseSaleReport2025: indexOfLast,
    currentMRPProductWiseSaleReport2025: currentData,
    totalPages,
    getVisiblePages,
    MRPProductWiseSaleReport2025,
    filteredMRPProductWiseSaleReport2025,
    searchTerm,
    currentPage,
    MRPProductWiseSaleReport2025PerPage,
    sortConfig,
    franchiseList,
    categoryList,
    franchiseArray,
    godownProductArray,
    productArray,
    countryArray,
    paymentTypeArray,
    fromDate,
    toDate,
    selectState,
    selectFranchise,
    selectFranchiseProduct,
    selectProduct,
    selectPaymentType,
    loading,
    setMRPProductWiseSaleReport2025PerPage,
    handleFetchMRPProductWiseSaleReport2025,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    setSelectProduct,
    setSelectPaymentType,
    setfromDate,
    settodate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
  };
};

export default useViewMRPProductWiseSaleReport2025;
