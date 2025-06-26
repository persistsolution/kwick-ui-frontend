import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { fetctRawProductStockReportApi } from "../../api/SubFranchise-API/Report2025-Api/FrRawInventoryStockReportApi";

interface RawInventoryItem {
  id: number;
  Name?: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: string;
}

interface FranchiseOption {
  id: string | number;
  label: string;
}

const useFrRawProductStockReport = () => {
  const [RawProductStockReport, setRawProductStockReport] = useState<RawInventoryItem[]>([]);
  const [filteredRawProductStockReport, setFilteredRawProductStockReport] = useState<RawInventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RawProductStockReportPerPage, setRawProductStockReportPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | string | undefined>();
  const [toDate, settodate] = useState<Date | string | undefined>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading , setLoading]= useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    handelfetchRawProductStockReport();
  }, []);

  const handelfetchRawProductStockReport = async () => {
    const frId = localStorage.getItem("frId");
    setLoading(true)
    try {
      const response: any = await fetctRawProductStockReportApi(Number(frId));
      const data: RawInventoryItem[] = response?.data?.data || [];
      setLoading(!data)
      setRawProductStockReport(data);
      setFilteredRawProductStockReport(data);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching RawProductStockReport:", error);
    }
  };

  const handelNavigateAllocatedProduct = (id: number) => {
    navigate(`/SellingProduct/AllocatedProducts/${id}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawProductStockReport(
      RawProductStockReport.filter(
        (item: RawInventoryItem) =>
          item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredRawProductStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawProductStockReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawProductStockReport-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawProductStockReport_data.xlsx");
  };

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

  const indexOfLastRawProductStockReport = currentPage * RawProductStockReportPerPage;
  const indexOfFirstRawProductStockReport = indexOfLastRawProductStockReport - RawProductStockReportPerPage;
  const currentRawProductStockReport = filteredRawProductStockReport.slice(
    indexOfFirstRawProductStockReport,
    indexOfLastRawProductStockReport
  );
  const totalPages = Math.ceil(filteredRawProductStockReport.length / RawProductStockReportPerPage);

  return {
    indexOfLastRawProductStockReport,
    indexOfFirstRawProductStockReport,
    RawProductStockReport,
    filteredRawProductStockReport,
    searchTerm,
    currentPage,
    RawProductStockReportPerPage,
    sortConfig,
    currentRawProductStockReport,
    totalPages,
    fromDate,
    toDate,
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setRawProductStockReportPerPage,
    handelNavigateAllocatedProduct,
    handelfetchRawProductStockReport,
    setfromDate,
    settodate,
  };
};

export default useFrRawProductStockReport;
