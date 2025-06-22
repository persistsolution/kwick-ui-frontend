import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownProductStockReport } from "../../api/Report-Api/dailySellReport";

interface GodownProductStockItem {
  id: number | string;
  Name: string;
  [key: string]: any;
}

interface SortConfig {
  key: keyof GodownProductStockItem | null;
  direction: "asc" | "desc";
}

const useGodownProductStockReport = () => {
  const [GodownProductStockReport, setGodownProductStockReport] = useState<GodownProductStockItem[]>([]);
  const [filteredGodownProductStockReport, setFilteredGodownProductStockReport] = useState<GodownProductStockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [GodownProductStockReportPerPage, setGodownProductStockReportPerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [godownArray, setgodownArray] = useState<any[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<any>(null);
  const [toDate, settodate] = useState<any>(null);
  const [selectState, setSelectState] = useState<string>("");
  const [selectGodown, setselectGodown] = useState<string>("");
  const [selectGodownProduct, setselectGodownProduct] = useState<string>("");
  const [countryArray, setcountryArray] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    handleFetchGodownProductStockReport();
  }, []);

  const handleFetchGodownProductStockReport = async () => {
    setLoading(true)
    try {
      const response: any = await fetchGodownProductStockReport();
      const data: GodownProductStockItem[] = response?.data?.data || [];
      setGodownProductStockReport(data);
      setFilteredGodownProductStockReport(data);
      setLoading(!data)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching GodownProductStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lower = term.toLowerCase();
    setFilteredGodownProductStockReport(
      GodownProductStockReport.filter(
        (item) =>
          item?.Name?.toLowerCase().includes(lower) ||
          item?.id?.toString().includes(lower)
      )
    );
  };

  const handleSort = (key: keyof GodownProductStockItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredGodownProductStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredGodownProductStockReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownProductStockReport-table") as HTMLTableElement | null;
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownProductStockReport_data.xlsx");
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    const totalPages = Math.ceil(filteredGodownProductStockReport.length / GodownProductStockReportPerPage);
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const indexOfLastGodownProductStockReport = currentPage * GodownProductStockReportPerPage;
  const indexOfFirstGodownProductStockReport = indexOfLastGodownProductStockReport - GodownProductStockReportPerPage;
  const currentGodownProductStockReport = filteredGodownProductStockReport.slice(
    indexOfFirstGodownProductStockReport,
    indexOfLastGodownProductStockReport
  );
  const totalPages = Math.ceil(filteredGodownProductStockReport.length / GodownProductStockReportPerPage);

  return {
    indexOfLastGodownProductStockReport,
    indexOfFirstGodownProductStockReport,
    GodownProductStockReport,
    filteredGodownProductStockReport,
    searchTerm,
    currentPage,
    GodownProductStockReportPerPage,
    sortConfig,
    currentGodownProductStockReport,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    countryArray,
    selectState,
    godownArray,
    selectGodown,
    selectGodownProduct,
    godownProductArray,
    loading,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setGodownProductStockReportPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setselectGodown,
    setselectGodownProduct
  } as const;
};

export default useGodownProductStockReport;
