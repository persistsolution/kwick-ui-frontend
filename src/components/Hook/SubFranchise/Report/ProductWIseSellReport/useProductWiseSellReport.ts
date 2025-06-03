import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchProductWiseSellReportApi } from "../../../../api/SubFranchise-API/Report/ProductWiseSellReportApi/ProductWiseSellReportApi";

const useProductWiseSellReport = () => {
  const [productWiseSellReport, setproductWiseSellReport] = useState([]);
  const [filteredproductWiseSellReport, setFilteredproductWiseSellReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productWiseSellReportPerPage, setproductWiseSellReportPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [productList ,setProductList ]= useState([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchproductWiseSellReport();
  }, []);

  const handleFetchproductWiseSellReport = async () => {
    try {
      const response: any = await fetchProductWiseSellReportApi();
      setproductWiseSellReport(response.data);
      setFilteredproductWiseSellReport(response.data);
    } catch (error) {
      console.error("Error fetching productWiseSellReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredproductWiseSellReport(
      productWiseSellReport.filter(
        (productWiseSellReport: any) =>
          productWiseSellReport?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          productWiseSellReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedproductWiseSellReport = [...filteredproductWiseSellReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredproductWiseSellReport(sortedproductWiseSellReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("productWiseSellReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "productWiseSellReport_data.xlsx");
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


  const indexOfLastproductWiseSellReport = currentPage * productWiseSellReportPerPage;
  const indexOfFirstproductWiseSellReport = indexOfLastproductWiseSellReport - productWiseSellReportPerPage;
  const currentproductWiseSellReport = filteredproductWiseSellReport.slice(
    indexOfFirstproductWiseSellReport,
    indexOfLastproductWiseSellReport
  );
  const totalPages = Math.ceil(filteredproductWiseSellReport.length / productWiseSellReportPerPage);

  return {
    indexOfLastproductWiseSellReport,
    indexOfFirstproductWiseSellReport,
    productWiseSellReport,
    filteredproductWiseSellReport,
    searchTerm,
    currentPage,
    productWiseSellReportPerPage,
    sortConfig,
    currentproductWiseSellReport,
    totalPages,
    fromDate,
    toDate,
    productList,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setproductWiseSellReportPerPage,
  };
};

export default useProductWiseSellReport;
