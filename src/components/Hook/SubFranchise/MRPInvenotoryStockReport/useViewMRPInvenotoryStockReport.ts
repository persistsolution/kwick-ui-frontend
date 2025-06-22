import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchInventoryMRPStockReportApi } from "../../../api/SubFranchise-API/InventoryStockReport/InventoryStockReportApi";

const useViewMRPInvenotoryStockReport = () => {
  const [MRPInvenotoryStockReport, setMRPInvenotoryStockReport] = useState<any[]>([]);
  const [filteredMRPInvenotoryStockReport, setFilteredMRPInvenotoryStockReport] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [MRPInvenotoryStockReportPerPage, setMRPInvenotoryStockReportPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading , setLoading]= useState<boolean>(false);

  useEffect(() => {
    handleFetchMRPInvenotoryStockReport();
  }, []);

  const handleFetchMRPInvenotoryStockReport = async () => {
    setLoading(true)
    const frId = localStorage.getItem("frId")
    try {
      const response: any = await fetchInventoryMRPStockReportApi(Number(frId));
      const data = response?.data?.data || [];
      setMRPInvenotoryStockReport(data);
      setFilteredMRPInvenotoryStockReport(data);
      setLoading(!data)
    } catch (error) {
      setLoading(false)
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

  const totalPages = Math.ceil(filteredMRPInvenotoryStockReport.length / MRPInvenotoryStockReportPerPage);

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  const indexOfLastMRPInvenotoryStockReport = currentPage * MRPInvenotoryStockReportPerPage;
  const indexOfFirstMRPInvenotoryStockReport = indexOfLastMRPInvenotoryStockReport - MRPInvenotoryStockReportPerPage;
  const currentMRPInvenotoryStockReport = filteredMRPInvenotoryStockReport.slice(
    indexOfFirstMRPInvenotoryStockReport,
    indexOfLastMRPInvenotoryStockReport
  );

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
    loading,
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
