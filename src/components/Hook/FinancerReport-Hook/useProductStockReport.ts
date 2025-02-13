import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchFinancerStockReport } from "../../api/FinancerReport-Api/FinancerReportApi";

const useProductStockReport = () => {
  const [stockReport, setstockReport] = useState([]);
  const [filteredstockReport, setFilteredstockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stockReportPerPage, setstockReportPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<any>();
  const [toDate, settodate] = useState<any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchstockReport();
  }, []);

  const handleFetchstockReport = async () => {
    try {
      const response: any = await fetchFinancerStockReport();
      setstockReport(response.data);
      setFilteredstockReport(response.data);
    } catch (error) {
      console.error("Error fetching stockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredstockReport(
      stockReport.filter(
        (stockReport: any) =>
          stockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          stockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedstockReport = [...filteredstockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredstockReport(sortedstockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("stockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "stockReport_data.xlsx");
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

  const indexOfLaststockReport = currentPage * stockReportPerPage;
  const indexOfFirststockReport = indexOfLaststockReport - stockReportPerPage;
  const currentstockReport = filteredstockReport.slice(
    indexOfFirststockReport,
    indexOfLaststockReport
  );
  const totalPages = Math.ceil(filteredstockReport.length / stockReportPerPage);

  return {
    indexOfLaststockReport,
    indexOfFirststockReport,
    stockReport,
    filteredstockReport,
    searchTerm,
    currentPage,
    stockReportPerPage,
    sortConfig,
    currentstockReport,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setstockReportPerPage,
    setfranchiseList,
    setcategoryList,
  };
};

export default useProductStockReport;
