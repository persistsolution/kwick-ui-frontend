import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useWeeklySaleReport = () => {
  const [weeklySaleReport, setweeklySaleReport] = useState([]);
  const [filteredweeklySaleReport, setFilteredweeklySaleReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [weeklySaleReportPerPage, setweeklySaleReportPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchweeklySaleReport();
  }, []);

  const handleFetchweeklySaleReport = async () => {
    try {
      const response: any = await ""
      const data = response.data ||[]
      setweeklySaleReport(data);
      setFilteredweeklySaleReport(data);
    } catch (error) {
      console.error("Error fetching weeklySaleReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredweeklySaleReport(
      weeklySaleReport.filter(
        (weeklySaleReport: any) =>
          weeklySaleReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          weeklySaleReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedweeklySaleReport = [...filteredweeklySaleReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredweeklySaleReport(sortedweeklySaleReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("weeklySaleReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "weeklySaleReport_data.xlsx");
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

  const indexOfLastweeklySaleReport = currentPage * weeklySaleReportPerPage;
  const indexOfFirstweeklySaleReport =
    indexOfLastweeklySaleReport - weeklySaleReportPerPage;
  const currentweeklySaleReport = filteredweeklySaleReport.slice(
    indexOfFirstweeklySaleReport,
    indexOfLastweeklySaleReport
  );
  const totalPages = Math.ceil(
    filteredweeklySaleReport.length / weeklySaleReportPerPage
  );

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
  };
};

export default useWeeklySaleReport;
