import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { fetchCategoryWiseSellReportApi } from "../../api/SubFranchise-API/Report2025-Api/FrRawInventoryStockReportApi";

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

const useFrCategoryWiseSellReport = () => {
  const [CategoryWiseSellReport, setCategoryWiseSellReport] = useState<RawInventoryItem[]>([]);
  const [filteredCategoryWiseSellReport, setFilteredCategoryWiseSellReport] = useState<RawInventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [CategoryWiseSellReportPerPage, setCategoryWiseSellReportPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading , setLoading]= useState<boolean>(false);
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
    handelfetchCategoryWiseSellReport();
  }, []);

  const handelfetchCategoryWiseSellReport = async () => {
    const frId = localStorage.getItem("frId");
    setLoading(true)
    try {
      const response: any = await fetchCategoryWiseSellReportApi(Number(frId));
      const data: RawInventoryItem[] = response?.data?.data || [];
      setLoading(!data)
      setCategoryWiseSellReport(data);
      setFilteredCategoryWiseSellReport(data);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching CategoryWiseSellReport:", error);
    }
  };

  const handelNavigateAllocatedProduct = (id: number) => {
    navigate(`/SellingProduct/AllocatedProducts/${id}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredCategoryWiseSellReport(
      CategoryWiseSellReport.filter(
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

    const sorted = [...filteredCategoryWiseSellReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCategoryWiseSellReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("CategoryWiseSellReport-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "CategoryWiseSellReport_data.xlsx");
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

  const indexOfLastCategoryWiseSellReport = currentPage * CategoryWiseSellReportPerPage;
  const indexOfFirstCategoryWiseSellReport = indexOfLastCategoryWiseSellReport - CategoryWiseSellReportPerPage;
  const currentCategoryWiseSellReport = filteredCategoryWiseSellReport.slice(
    indexOfFirstCategoryWiseSellReport,
    indexOfLastCategoryWiseSellReport
  );
  const totalPages = Math.ceil(filteredCategoryWiseSellReport.length / CategoryWiseSellReportPerPage);

  return {
    indexOfLastCategoryWiseSellReport,
    indexOfFirstCategoryWiseSellReport,
    CategoryWiseSellReport,
    filteredCategoryWiseSellReport,
    searchTerm,
    currentPage,
    CategoryWiseSellReportPerPage,
    sortConfig,
    currentCategoryWiseSellReport,
    totalPages,
    fromDate,
    toDate,
    loading,
    categoryList,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setCategoryWiseSellReportPerPage,
    handelNavigateAllocatedProduct,
    handelfetchCategoryWiseSellReport,
    setfromDate,
    settodate,
  };
};

export default useFrCategoryWiseSellReport;
