import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAssetsInventoryStockReport = () => {
  const [AssetsInventoryStockReport, setAssetsInventoryStockReport] = useState([]);
  const [filteredAssetsInventoryStockReport, setFilteredAssetsInventoryStockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AssetsInventoryStockReportPerPage, setAssetsInventoryStockReportPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchAssetsInventoryStockReport();
  }, []);

  const handleFetchAssetsInventoryStockReport = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setAssetsInventoryStockReport(data);
      setFilteredAssetsInventoryStockReport(data);
    } catch (error) {
      console.error("Error fetching AssetsInventoryStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAssetsInventoryStockReport(
      AssetsInventoryStockReport.filter(
        (AssetsInventoryStockReport: any) =>
          AssetsInventoryStockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          AssetsInventoryStockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAssetsInventoryStockReport = [...filteredAssetsInventoryStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredAssetsInventoryStockReport(sortedAssetsInventoryStockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AssetsInventoryStockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AssetsInventoryStockReport_data.xlsx");
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


  const indexOfLastAssetsInventoryStockReport = currentPage * AssetsInventoryStockReportPerPage;
  const indexOfFirstAssetsInventoryStockReport = indexOfLastAssetsInventoryStockReport - AssetsInventoryStockReportPerPage;
  const currentAssetsInventoryStockReport = filteredAssetsInventoryStockReport.slice(
    indexOfFirstAssetsInventoryStockReport,
    indexOfLastAssetsInventoryStockReport
  );
  const totalPages = Math.ceil(filteredAssetsInventoryStockReport.length / AssetsInventoryStockReportPerPage);

  return {
    indexOfLastAssetsInventoryStockReport,
    indexOfFirstAssetsInventoryStockReport,
    AssetsInventoryStockReport,
    filteredAssetsInventoryStockReport,
    searchTerm,
    currentPage,
    AssetsInventoryStockReportPerPage,
    sortConfig,
    currentAssetsInventoryStockReport,
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
    setAssetsInventoryStockReportPerPage,
  };
};

export default useViewAssetsInventoryStockReport;
