import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewMinMRPInventoryStockReport = () => {
  const [MinMRPInventoryStockReport, setMinMRPInventoryStockReport] = useState([]);
  const [filteredMinMRPInventoryStockReport, setFilteredMinMRPInventoryStockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [MinMRPInventoryStockReportPerPage, setMinMRPInventoryStockReportPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchMinMRPInventoryStockReport();
  }, []);

  const handleFetchMinMRPInventoryStockReport = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setMinMRPInventoryStockReport(data);
      setFilteredMinMRPInventoryStockReport(data);
    } catch (error) {
      console.error("Error fetching MinMRPInventoryStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredMinMRPInventoryStockReport(
      MinMRPInventoryStockReport.filter(
        (MinMRPInventoryStockReport: any) =>
          MinMRPInventoryStockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          MinMRPInventoryStockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedMinMRPInventoryStockReport = [...filteredMinMRPInventoryStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredMinMRPInventoryStockReport(sortedMinMRPInventoryStockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("MinMRPInventoryStockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "MinMRPInventoryStockReport_data.xlsx");
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


  const indexOfLastMinMRPInventoryStockReport = currentPage * MinMRPInventoryStockReportPerPage;
  const indexOfFirstMinMRPInventoryStockReport = indexOfLastMinMRPInventoryStockReport - MinMRPInventoryStockReportPerPage;
  const currentMinMRPInventoryStockReport = filteredMinMRPInventoryStockReport.slice(
    indexOfFirstMinMRPInventoryStockReport,
    indexOfLastMinMRPInventoryStockReport
  );
  const totalPages = Math.ceil(filteredMinMRPInventoryStockReport.length / MinMRPInventoryStockReportPerPage);

  return {
    indexOfLastMinMRPInventoryStockReport,
    indexOfFirstMinMRPInventoryStockReport,
    MinMRPInventoryStockReport,
    filteredMinMRPInventoryStockReport,
    searchTerm,
    currentPage,
    MinMRPInventoryStockReportPerPage,
    sortConfig,
    currentMinMRPInventoryStockReport,
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
    setMinMRPInventoryStockReportPerPage,
  };
};

export default useViewMinMRPInventoryStockReport;
