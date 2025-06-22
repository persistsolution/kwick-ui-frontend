import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchWeeklySellReport2Api } from "../../api/Report-Api/dailySellReport";

export interface WeeklySaleReportItem {
  id: number | string;
  Name: string;
  [key: string]: unknown;
}

type SortDirection = "asc" | "desc";

interface SortConfig {
  key: keyof WeeklySaleReportItem | null;
  direction: SortDirection;
}

const useWeeklySaleReport = () => {
  const [weeklySaleReport, setweeklySaleReport] = useState<WeeklySaleReportItem[]>([]);
  const [filteredweeklySaleReport, setFilteredweeklySaleReport] = useState<WeeklySaleReportItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [weeklySaleReportPerPage, setweeklySaleReportPerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<unknown[]>([]);
  const [categoryList, setcategoryList] = useState<unknown[]>([]);
  const [fromDate, setfromDate] = useState<Date | null>(null);
  const [toDate, settodate] = useState<Date | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchweeklySaleReport();
  }, []);


  const handleFetchweeklySaleReport = async (): Promise<void> => {
    setLoading(true);
    try {
      const response :any = await fetchWeeklySellReport2Api();
      const data: WeeklySaleReportItem[] = response?.data?.data ?? [];
      setweeklySaleReport(data);
      setFilteredweeklySaleReport(data);
    } catch (error) {
      console.error("Error fetching weeklySaleReport:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (term: string): void => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredweeklySaleReport(weeklySaleReport);
      return;
    }

    const lower = term.toLowerCase();
    setFilteredweeklySaleReport(
      weeklySaleReport.filter(
        (item) =>
          item?.Name?.toLowerCase().includes(lower) ||
          item?.id?.toString().includes(lower),
      ),
    );
  };

  const handleSort = (key: keyof WeeklySaleReportItem): void => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredweeklySaleReport].sort((a, b) => {
      if (a[key] === b[key]) return 0;
      if (a[key] == null) return 1;
      if (b[key] == null) return -1;
      return (a[key] < b[key] ? -1 : 1) * (direction === "asc" ? 1 : -1);
    });

    setSortConfig({ key, direction });
    setFilteredweeklySaleReport(sorted);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

 
  const exportToExcel = (): void => {
    const table = document.getElementById("weeklySaleReport-table") as HTMLTableElement | null;
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "weeklySaleReport_data.xlsx");
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    const totalPages = Math.ceil(filteredweeklySaleReport.length / weeklySaleReportPerPage);

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
  };

  const indexOfLastweeklySaleReport = currentPage * weeklySaleReportPerPage;
  const indexOfFirstweeklySaleReport = indexOfLastweeklySaleReport - weeklySaleReportPerPage;
  const currentweeklySaleReport = filteredweeklySaleReport.slice(
    indexOfFirstweeklySaleReport,
    indexOfLastweeklySaleReport,
  );
  const totalPages = Math.ceil(filteredweeklySaleReport.length / weeklySaleReportPerPage);

  return {
    indexOfLastweeklySaleReport,
    indexOfFirstweeklySaleReport,
    weeklySaleReport,
    filteredweeklySaleReport,
    searchTerm,
    currentPage,
    weeklySaleReportPerPage,
    sortConfig,
    currentweeklySaleReport,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    loading,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setweeklySaleReportPerPage,
    setfranchiseList,
    setcategoryList,
  } as const;
};

export default useWeeklySaleReport;
