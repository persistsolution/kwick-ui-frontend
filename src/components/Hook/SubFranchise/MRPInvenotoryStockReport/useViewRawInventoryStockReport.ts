import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewRawInventoryStockReport = () => {
  const [RawInventoryStockReport, setRawInventoryStockReport] = useState([]);
  const [filteredRawInventoryStockReport, setFilteredRawInventoryStockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RawInventoryStockReportPerPage, setRawInventoryStockReportPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchRawInventoryStockReport();
  }, []);

  const handleFetchRawInventoryStockReport = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setRawInventoryStockReport(data);
      setFilteredRawInventoryStockReport(data);
    } catch (error) {
      console.error("Error fetching RawInventoryStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawInventoryStockReport(
      RawInventoryStockReport.filter(
        (RawInventoryStockReport: any) =>
          RawInventoryStockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RawInventoryStockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRawInventoryStockReport = [...filteredRawInventoryStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawInventoryStockReport(sortedRawInventoryStockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawInventoryStockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawInventoryStockReport_data.xlsx");
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


  const indexOfLastRawInventoryStockReport = currentPage * RawInventoryStockReportPerPage;
  const indexOfFirstRawInventoryStockReport = indexOfLastRawInventoryStockReport - RawInventoryStockReportPerPage;
  const currentRawInventoryStockReport = filteredRawInventoryStockReport.slice(
    indexOfFirstRawInventoryStockReport,
    indexOfLastRawInventoryStockReport
  );
  const totalPages = Math.ceil(filteredRawInventoryStockReport.length / RawInventoryStockReportPerPage);

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
