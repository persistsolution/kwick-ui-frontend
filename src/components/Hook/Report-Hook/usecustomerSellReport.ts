import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCustomerSellReportApi } from "../../api/Report-Api/customerSellReportApi";

const usecustomerSellReport = () => {
  const [customerSellReport, setcustomerSellReport] = useState([]);
  const [filteredcustomerSellReport, setFilteredcustomerSellReport] = useState(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customerSellReportPerPage, setcustomerSellReportPerPage] = useState(5);
  const [customerList, setcustomerList] = useState([]);
  const [fromDate, setfromDate] = useState<any>(null);
  const [toDate, settodate] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchcustomerSellReport();
  }, []);

  const handleFetchcustomerSellReport = async () => {
    try {
      const response: any = await fetchCustomerSellReportApi();
      setcustomerSellReport(response.data);
      setFilteredcustomerSellReport(response.data);
    } catch (error) {
      console.error("Error fetching customerSellReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredcustomerSellReport(
      customerSellReport.filter(
        (customerSellReport: any) =>
          customerSellReport?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || customerSellReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedcustomerSellReport = [...filteredcustomerSellReport].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredcustomerSellReport(sortedcustomerSellReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("customerSellReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "customerSellReport_data.xlsx");
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

  const indexOfLastcustomerSellReport = currentPage * customerSellReportPerPage;
  const indexOfFirstcustomerSellReport =
    indexOfLastcustomerSellReport - customerSellReportPerPage;
  const currentcustomerSellReport = filteredcustomerSellReport.slice(
    indexOfFirstcustomerSellReport,
    indexOfLastcustomerSellReport
  );
  const totalPages = Math.ceil(
    filteredcustomerSellReport.length / customerSellReportPerPage
  );

  return {
    indexOfLastcustomerSellReport,
    indexOfFirstcustomerSellReport,
    customerSellReport,
    filteredcustomerSellReport,
    searchTerm,
    currentPage,
    customerSellReportPerPage,
    sortConfig,
    currentcustomerSellReport,
    totalPages,
    customerList,
    fromDate,
    toDate,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setcustomerSellReportPerPage,
    setcustomerList,
  };
};

export default usecustomerSellReport;
