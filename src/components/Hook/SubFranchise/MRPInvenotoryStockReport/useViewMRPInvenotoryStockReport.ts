import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewMRPInvenotoryStockReport = () => {
  const [MRPInvenotoryStockReport, setMRPInvenotoryStockReport] = useState([]);
  const [filteredMRPInvenotoryStockReport, setFilteredMRPInvenotoryStockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [MRPInvenotoryStockReportPerPage, setMRPInvenotoryStockReportPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchMRPInvenotoryStockReport();
  }, []);

  const handleFetchMRPInvenotoryStockReport = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setMRPInvenotoryStockReport(data);
      setFilteredMRPInvenotoryStockReport(data);
    } catch (error) {
      console.error("Error fetching MRPInvenotoryStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredMRPInvenotoryStockReport(
      MRPInvenotoryStockReport.filter(
        (MRPInvenotoryStockReport: any) =>
          MRPInvenotoryStockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          MRPInvenotoryStockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedMRPInvenotoryStockReport = [...filteredMRPInvenotoryStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredMRPInvenotoryStockReport(sortedMRPInvenotoryStockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("MRPInvenotoryStockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "MRPInvenotoryStockReport_data.xlsx");
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


  const indexOfLastMRPInvenotoryStockReport = currentPage * MRPInvenotoryStockReportPerPage;
  const indexOfFirstMRPInvenotoryStockReport = indexOfLastMRPInvenotoryStockReport - MRPInvenotoryStockReportPerPage;
  const currentMRPInvenotoryStockReport = filteredMRPInvenotoryStockReport.slice(
    indexOfFirstMRPInvenotoryStockReport,
    indexOfLastMRPInvenotoryStockReport
  );
  const totalPages = Math.ceil(filteredMRPInvenotoryStockReport.length / MRPInvenotoryStockReportPerPage);

  return {
    indexOfLastMRPInvenotoryStockReport,
    indexOfFirstMRPInvenotoryStockReport,
    MRPInvenotoryStockReport,
    filteredMRPInvenotoryStockReport,
    searchTerm,
    currentPage,
    MRPInvenotoryStockReportPerPage,
    sortConfig,
    currentMRPInvenotoryStockReport,
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
    setMRPInvenotoryStockReportPerPage,
  };
};

export default useViewMRPInvenotoryStockReport;
