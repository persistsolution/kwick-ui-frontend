// useViewRawProductStockReport2025.ts
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchFranchiseRawStockReportApi } from "../../api/FranchiseReport2025/FranchiseReport2025Api";

interface StockReportItem {
  id: number;
  Name?: string;
  franchise?: string;
  productName?: string;
  cateName?: string;
  minQty?: number;
  credit?: number;
  debit?: number;
  balance?: number;
  SrNo?:string
}

interface SelectOption {
  id: number;
  label: string;
}

const useViewRawProductStockReport2025 = () => {
  const [RawProductStockReport2025, setRawProductStockReport2025] = useState<StockReportItem[]>([]);
  const [filteredRawProductStockReport2025, setFilteredRawProductStockReport2025] = useState<StockReportItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RawProductStockReport2025PerPage, setRawProductStockReport2025PerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [franchiseArray, setfranchiseArray] = useState<SelectOption[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [countryArray, setcountryArray] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settodate] = useState<string>("");
  const [selectState, setSelectState] = useState<string>("");
  const [selectFranchise, setSelectFranchise] = useState<string>("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof StockReportItem | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });
  const [loading ,setLoading]= useState<boolean>(false);

  useEffect(() => {
    handleFetchRawProductStockReport2025();
  }, []);

  const handleFetchRawProductStockReport2025 = async () => {
    setLoading(true)
    try {
      const response: any = await fetchFranchiseRawStockReportApi();
      const data: StockReportItem[] = response?.data?.data || [];
      setRawProductStockReport2025(data);
      setFilteredRawProductStockReport2025(data);
      setLoading(!data)
    } catch (error) {
      console.error("Error fetching RawProductStockReport2025:", error);
      setLoading(false)
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawProductStockReport2025(
      RawProductStockReport2025.filter((item) =>
        item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: keyof StockReportItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredRawProductStockReport2025].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawProductStockReport2025(sorted);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawProductStockReport2025-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawProductStockReport2025_data.xlsx");
  };

  const totalPages = Math.ceil(filteredRawProductStockReport2025.length / RawProductStockReport2025PerPage);
  const indexOfLast = currentPage * RawProductStockReport2025PerPage;
  const indexOfFirst = indexOfLast - RawProductStockReport2025PerPage;
  const currentData = filteredRawProductStockReport2025.slice(indexOfFirst, indexOfLast);

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  return {
    RawProductStockReport2025,
    filteredRawProductStockReport2025,
    currentData,
    currentPage,
    RawProductStockReport2025PerPage,
    searchTerm,
    sortConfig,
    franchiseList,
    categoryList,
    franchiseArray,
    godownProductArray,
    countryArray,
    fromDate,
    toDate,
    selectState,
    selectFranchise,
    selectFranchiseProduct,
    indexOfFirst,
    indexOfLast,
    totalPages,
    loading,
    setRawProductStockReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setfranchiseArray,
    setgodownProductArray,
    setcountryArray,
    setfromDate,
    settodate,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
  };
};

export default useViewRawProductStockReport2025;