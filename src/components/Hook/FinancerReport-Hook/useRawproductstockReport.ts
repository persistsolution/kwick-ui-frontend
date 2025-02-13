import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchRawFinancerstockReport } from "../../api/FinancerReport-Api/FinancerReportApi";

const useRawproductstockReport = () => {
  const [RawstockReport, setRawstockReport] = useState([]);
  const [filteredRawstockReport, setFilteredRawstockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RawstockReportPerPage, setRawstockReportPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<any>();
  const [toDate, settodate] = useState<any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchRawstockReport();
  }, []);

  const handleFetchRawstockReport = async () => {
    try {
      const response: any = await fetchRawFinancerstockReport();
      setRawstockReport(response.data);
      setFilteredRawstockReport(response.data);
    } catch (error) {
      console.error("Error fetching RawstockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawstockReport(
      RawstockReport.filter(
        (RawstockReport: any) =>
          RawstockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RawstockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRawstockReport = [...filteredRawstockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawstockReport(sortedRawstockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawstockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawstockReport_data.xlsx");
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

  const indexOfLastRawstockReport = currentPage * RawstockReportPerPage;
  const indexOfFirstRawstockReport =
    indexOfLastRawstockReport - RawstockReportPerPage;
  const currentRawstockReport = filteredRawstockReport.slice(
    indexOfFirstRawstockReport,
    indexOfLastRawstockReport
  );
  const totalPages = Math.ceil(
    filteredRawstockReport.length / RawstockReportPerPage
  );

  return {
    indexOfLastRawstockReport,
    indexOfFirstRawstockReport,
    RawstockReport,
    filteredRawstockReport,
    searchTerm,
    currentPage,
    RawstockReportPerPage,
    sortConfig,
    currentRawstockReport,
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
    setRawstockReportPerPage,
    setfranchiseList,
    setcategoryList,
  };
};

export default useRawproductstockReport;
