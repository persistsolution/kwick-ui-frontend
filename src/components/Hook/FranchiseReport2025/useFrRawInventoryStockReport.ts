import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { fetchFrRawInvStockReportApi } from "../../api/SubFranchise-API/Report2025-Api/FrRawInventoryStockReportApi";

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

const useFrRawInventoryStockReport = () => {
  const [RawInventoryStockReport, setRawInventoryStockReport] = useState<RawInventoryItem[]>([]);
  const [filteredRawInventoryStockReport, setFilteredRawInventoryStockReport] = useState<RawInventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RawInventoryStockReportPerPage, setRawInventoryStockReportPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | string | undefined>();
  const [toDate, settodate] = useState<Date | string | undefined>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  const categoryList: FranchiseOption[] = [
    {
      id: "all",
      label: "All",
    },
    {
      id: 1,
      label: "COCO Franchise",
    },
    {
      id: 2,
      label: "FOFO Franchise",
    },
    {
      id: 0,
      label: "Other Franchise ",
    },
  ];

  useEffect(() => {
    handelfetchRawInventoryStockReport();
  }, []);

  const handelfetchRawInventoryStockReport = async () => {
    const frId = localStorage.getItem("frId");
    try {
      const response: any = await fetchFrRawInvStockReportApi(Number(frId));
      const data: RawInventoryItem[] = response?.data?.data || [];
      setRawInventoryStockReport(data);
      setFilteredRawInventoryStockReport(data);
    } catch (error) {
      console.error("Error fetching RawInventoryStockReport:", error);
    }
  };

  const handelNavigateAllocatedProduct = (id: number) => {
    navigate(`/SellingProduct/AllocatedProducts/${id}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawInventoryStockReport(
      RawInventoryStockReport.filter(
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

    const sorted = [...filteredRawInventoryStockReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawInventoryStockReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawInventoryStockReport-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawInventoryStockReport_data.xlsx");
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

  const indexOfLastRawInventoryStockReport = currentPage * RawInventoryStockReportPerPage;
  const indexOfFirstRawInventoryStockReport = indexOfLastRawInventoryStockReport - RawInventoryStockReportPerPage;
  const currentRawInventoryStockReport = filteredRawInventoryStockReport.slice(
    indexOfFirstRawInventoryStockReport,
    indexOfLastRawInventoryStockReport
  );
  const totalPages = Math.ceil(filteredRawInventoryStockReport.length / RawInventoryStockReportPerPage);

  return {
    indexOfLastRawInventoryStockReport,
    indexOfFirstRawInventoryStockReport,
    RawInventoryStockReport,
    filteredRawInventoryStockReport,
    searchTerm,
    currentPage,
    RawInventoryStockReportPerPage,
    sortConfig,
    currentRawInventoryStockReport,
    totalPages,
    categoryList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setRawInventoryStockReportPerPage,
    handelNavigateAllocatedProduct,
    handelfetchRawInventoryStockReport,
    setfromDate,
    settodate,
  };
};

export default useFrRawInventoryStockReport;
