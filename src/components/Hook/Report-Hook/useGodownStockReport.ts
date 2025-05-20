import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useGodownStockReport = () => {
  const [GodownStockReport, setGodownStockReport] = useState([]);
  const [filteredGodownStockReport, setFilteredGodownStockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [GodownStockReportPerPage, setGodownStockReportPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [godownArray , setgodownArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState , setSelectState] = useState("");
  const [selectGodown , setselectGodown]= useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [countryArray , setcountryArray]= useState([]);

  useEffect(() => {
    handleFetchGodownStockReport();
  }, []);

  const handleFetchGodownStockReport = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setGodownStockReport(data);
      setFilteredGodownStockReport(data);
    } catch (error) {
      console.error("Error fetching GodownStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredGodownStockReport(
      GodownStockReport.filter(
        (GodownStockReport: any) =>
          GodownStockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          GodownStockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedGodownStockReport = [...filteredGodownStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredGodownStockReport(sortedGodownStockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownStockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownStockReport_data.xlsx");
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

  const indexOfLastGodownStockReport = currentPage * GodownStockReportPerPage;
  const indexOfFirstGodownStockReport =
    indexOfLastGodownStockReport - GodownStockReportPerPage;
  const currentGodownStockReport = filteredGodownStockReport.slice(
    indexOfFirstGodownStockReport,
    indexOfLastGodownStockReport
  );
  const totalPages = Math.ceil(
    filteredGodownStockReport.length / GodownStockReportPerPage
  );

  return {
    indexOfLastGodownStockReport,
    indexOfFirstGodownStockReport,
    GodownStockReport,
    filteredGodownStockReport,
    searchTerm,
    currentPage,
    GodownStockReportPerPage,
    sortConfig,
    currentGodownStockReport,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    countryArray,
    selectState,
    godownArray,
    selectGodown,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setGodownStockReportPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setselectGodown,
  };
};

export default useGodownStockReport;
