import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchdailySellReport } from "../../api/Report-Api/dailySellReport";

const usedailySellReport = () => {
  const [dailySellReport, setdailySellReport] = useState([]);
  const [filtereddailySellReport, setFiltereddailySellReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dailySellReportPerPage, setdailySellReportPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchdailySellReport();
  }, []);

  const handleFetchdailySellReport = async () => {
    try {
      const response: any = await fetchdailySellReport();
      setdailySellReport(response.data);
      setFiltereddailySellReport(response.data);
    } catch (error) {
      console.error("Error fetching dailySellReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFiltereddailySellReport(
      dailySellReport.filter(
        (dailySellReport: any) =>
          dailySellReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          dailySellReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorteddailySellReport = [...filtereddailySellReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFiltereddailySellReport(sorteddailySellReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("dailySellReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "dailySellReport_data.xlsx");
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

  const indexOfLastdailySellReport = currentPage * dailySellReportPerPage;
  const indexOfFirstdailySellReport =
    indexOfLastdailySellReport - dailySellReportPerPage;
  const currentdailySellReport = filtereddailySellReport.slice(
    indexOfFirstdailySellReport,
    indexOfLastdailySellReport
  );
  const totalPages = Math.ceil(
    filtereddailySellReport.length / dailySellReportPerPage
  );

  return {
    indexOfLastdailySellReport,
    indexOfFirstdailySellReport,
    dailySellReport,
    filtereddailySellReport,
    searchTerm,
    currentPage,
    dailySellReportPerPage,
    sortConfig,
    currentdailySellReport,
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
    setdailySellReportPerPage,
    setfranchiseList,
    setcategoryList,
  };
};

export default usedailySellReport;
