import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { fetchPrWisSellReportDateWisApi } from "../../api/SubFranchise-API/Report2025-Api/FrRawInventoryStockReportApi";

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

const useFrProductWiseSellReportDatewis = () => {
  const [ProductWiseSellReport, setProductWiseSellReport] = useState<RawInventoryItem[]>([]);
  const [filteredProductWiseSellReport, setFilteredProductWiseSellReport] = useState<RawInventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ProductWiseSellReportPerPage, setProductWiseSellReportPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<any>("");
  const [toDate, settodate] = useState<any>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const ProductList: FranchiseOption[] = [
    { id: "all", label: "All" },
    { id: 1, label: "COCO Franchise" },
    { id: 2, label: "FOFO Franchise" },
    { id: 0, label: "Other Franchise" },
  ];

  const handelfetchProductWiseSellReport = async () => {
    const frId = localStorage.getItem("frId");
    if (!frId || !fromDate || !toDate) return;

    setLoading(true);
    try {
      const response : any= await fetchPrWisSellReportDateWisApi(Number(frId), fromDate, toDate);
      const data: RawInventoryItem[] = response?.data?.data || [];
      setProductWiseSellReport(data);
      setFilteredProductWiseSellReport(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ProductWiseSellReport:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      handelfetchProductWiseSellReport();
    }
  }, [fromDate, toDate]);

  const handelNavigateAllocatedProduct = (id: number) => {
    navigate(`/SellingProduct/AllocatedProducts/${id}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductWiseSellReport(
      ProductWiseSellReport.filter(
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

    const sorted = [...filteredProductWiseSellReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductWiseSellReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductWiseSellReport-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductWiseSellReport_data.xlsx");
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

  const indexOfLastProductWiseSellReport = currentPage * ProductWiseSellReportPerPage;
  const indexOfFirstProductWiseSellReport = indexOfLastProductWiseSellReport - ProductWiseSellReportPerPage;
  const currentProductWiseSellReport = filteredProductWiseSellReport.slice(
    indexOfFirstProductWiseSellReport,
    indexOfLastProductWiseSellReport
  );
  const totalPages = Math.ceil(filteredProductWiseSellReport.length / ProductWiseSellReportPerPage);

  return {
    indexOfLastProductWiseSellReport,
    indexOfFirstProductWiseSellReport,
    ProductWiseSellReport,
    filteredProductWiseSellReport,
    searchTerm,
    currentPage,
    ProductWiseSellReportPerPage,
    sortConfig,
    currentProductWiseSellReport,
    totalPages,
    fromDate,
    toDate,
    loading,
    ProductList,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setProductWiseSellReportPerPage,
    handelNavigateAllocatedProduct,
    handelfetchProductWiseSellReport,
    setfromDate,
    settodate,
  };
};

export default useFrProductWiseSellReportDatewis;
