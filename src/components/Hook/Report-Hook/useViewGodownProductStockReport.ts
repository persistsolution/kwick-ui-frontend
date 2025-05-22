import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useGodownProductStockReport = () => {
  const [GodownProductStockReport, setGodownProductStockReport] = useState([]);
  const [filteredGodownProductStockReport, setFilteredGodownProductStockReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [GodownProductStockReportPerPage, setGodownProductStockReportPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [godownArray , setgodownArray] = useState([]);
  const [godownProductArray , setgodownProductArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState , setSelectState] = useState("");
  const [selectGodown , setselectGodown]= useState("");
  const [selectGodownProduct , setselectGodownProduct]= useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [countryArray , setcountryArray]= useState([]);

  useEffect(() => {
    handleFetchGodownProductStockReport();
  }, []);

  const handleFetchGodownProductStockReport = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setGodownProductStockReport(data);
      setFilteredGodownProductStockReport(data);
    } catch (error) {
      console.error("Error fetching GodownProductStockReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredGodownProductStockReport(
      GodownProductStockReport.filter(
        (GodownProductStockReport: any) =>
          GodownProductStockReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          GodownProductStockReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedGodownProductStockReport = [...filteredGodownProductStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredGodownProductStockReport(sortedGodownProductStockReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownProductStockReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownProductStockReport_data.xlsx");
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

  const indexOfLastGodownProductStockReport = currentPage * GodownProductStockReportPerPage;
  const indexOfFirstGodownProductStockReport =
    indexOfLastGodownProductStockReport - GodownProductStockReportPerPage;
  const currentGodownProductStockReport = filteredGodownProductStockReport.slice(
    indexOfFirstGodownProductStockReport,
    indexOfLastGodownProductStockReport
  );
  const totalPages = Math.ceil(
    filteredGodownProductStockReport.length / GodownProductStockReportPerPage
  );

  return {
    indexOfLastGodownProductStockReport,
    indexOfFirstGodownProductStockReport,
    GodownProductStockReport,
    filteredGodownProductStockReport,
    searchTerm,
    currentPage,
    GodownProductStockReportPerPage,
    sortConfig,
    currentGodownProductStockReport,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    countryArray,
    selectState,
    godownArray,
    selectGodown,
    selectGodownProduct,
    godownProductArray,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setGodownProductStockReportPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setselectGodown,
    setselectGodownProduct
  };
};

export default useGodownProductStockReport;
