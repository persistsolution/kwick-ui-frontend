import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchInventoryStockReportApi } from "../../../api/SubFranchise-API/InventoryStockReport/InventoryStockReportApi";

// Interface for your inventory item
interface RawInventoryItem {
  id: number;
  Name: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useViewRawInventoryStockReport = () => {
  const [RawInventoryStockReport, setRawInventoryStockReport] = useState<RawInventoryItem[]>([]);
  const [filteredRawInventoryStockReport, setFilteredRawInventoryStockReport] = useState<RawInventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RawInventoryStockReportPerPage, setRawInventoryStockReportPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | null>(null);
  const [toDate, settodate] = useState<Date | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchRawInventoryStockReport();
  }, []);

  const handleFetchRawInventoryStockReport = async () => {
    setLoading(true);
    const frId = localStorage.getItem("frId");
    try {
      const response: any = await fetchInventoryStockReportApi(Number(frId));
      const data: RawInventoryItem[] = response?.data?.data || [];
      setRawInventoryStockReport(data);
      setFilteredRawInventoryStockReport(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching RawInventoryStockReport:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim().toLowerCase();
    setSearchTerm(trimmedTerm);
    setFilteredRawInventoryStockReport(
      RawInventoryStockReport.filter((item) =>
        item?.Name?.toLowerCase().includes(trimmedTerm) ||
        item?.id?.toString().includes(trimmedTerm)
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredRawInventoryStockReport].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawInventoryStockReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawInventoryStockReport-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "RawInventoryStockReport_data.xlsx");
    }
  };

  const totalPages = Math.ceil(filteredRawInventoryStockReport.length / RawInventoryStockReportPerPage);

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const indexOfLastRawInventoryStockReport = currentPage * RawInventoryStockReportPerPage;
  const indexOfFirstRawInventoryStockReport = indexOfLastRawInventoryStockReport - RawInventoryStockReportPerPage;
  const currentRawInventoryStockReport = filteredRawInventoryStockReport.slice(
    indexOfFirstRawInventoryStockReport,
    indexOfLastRawInventoryStockReport
  );

  return {
    indexOfLastRawInventoryStockReport,
    indexOfFirstRawInventoryStockReport,
    RawInventoryStockReport,
    filteredRawInventoryStockReport,
    searchTerm,
    currentPage,
    RawInventoryStockReportPerPage,
    sortConfig,
    currentRawInventoryStockReport,
    totalPages,
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
    setRawInventoryStockReportPerPage,
  };
};

export default useViewRawInventoryStockReport;
