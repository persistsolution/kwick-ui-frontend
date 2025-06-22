import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchInventoryAssetsStockReportApi } from "../../../api/SubFranchise-API/InventoryStockReport/InventoryStockReportApi";

interface AssetsInventoryStockItem {
  id: string | number;
  Name: string;
  [key: string]: any; 
}

interface SortConfig {
  key: keyof AssetsInventoryStockItem | null;
  direction: "asc" | "desc";
}

const useViewAssetsInventoryStockReport = () => {
  const [AssetsInventoryStockReport, setAssetsInventoryStockReport] =
    useState<AssetsInventoryStockItem[]>([]);
  const [
    filteredAssetsInventoryStockReport,
    setFilteredAssetsInventoryStockReport,
  ] = useState<AssetsInventoryStockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [AssetsInventoryStockReportPerPage, setAssetsInventoryStockReportPerPage] =
    useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | undefined>();
  const [toDate, settodate] = useState<Date | undefined>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchAssetsInventoryStockReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchAssetsInventoryStockReport = async (): Promise<void> => {
    const frId = localStorage.getItem("frId");
    setLoading(true);
    try {
      const response: any = await fetchInventoryAssetsStockReportApi(
        Number(frId),
      );
      const data: AssetsInventoryStockItem[] = response?.data?.data || [];
      setAssetsInventoryStockReport(data);
      setFilteredAssetsInventoryStockReport(data);
      setLoading(!data);
    } catch (error) {
      console.error("Error fetching AssetsInventoryStockReport:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    setFilteredAssetsInventoryStockReport(
      AssetsInventoryStockReport.filter(
        (AssetsInventoryStockReport: AssetsInventoryStockItem) =>
          AssetsInventoryStockReport?.Name?.toLowerCase().includes(
            term.toLowerCase(),
          ) ||
          AssetsInventoryStockReport?.id?.toString().includes(
            term.toLowerCase(),
          ),
      ),
    );
  };

  const handleSort = (key: keyof AssetsInventoryStockItem): void => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedAssetsInventoryStockReport = [
      ...filteredAssetsInventoryStockReport,
    ].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredAssetsInventoryStockReport(sortedAssetsInventoryStockReport);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = (): void => {
    const table = document.getElementById("AssetsInventoryStockReport-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "AssetsInventoryStockReport_data.xlsx");
    }
  };

  const totalPages = Math.ceil(
    filteredAssetsInventoryStockReport.length /
      AssetsInventoryStockReportPerPage,
  );

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(
      currentPage - Math.floor(maxVisiblePages / 2),
      1,
    );
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index,
    );
  };

  const indexOfLastAssetsInventoryStockReport =
    currentPage * AssetsInventoryStockReportPerPage;
  const indexOfFirstAssetsInventoryStockReport =
    indexOfLastAssetsInventoryStockReport - AssetsInventoryStockReportPerPage;
  const currentAssetsInventoryStockReport =
    filteredAssetsInventoryStockReport.slice(
      indexOfFirstAssetsInventoryStockReport,
      indexOfLastAssetsInventoryStockReport,
    );

  return {
    indexOfLastAssetsInventoryStockReport,
    indexOfFirstAssetsInventoryStockReport,
    AssetsInventoryStockReport,
    filteredAssetsInventoryStockReport,
    searchTerm,
    currentPage,
    AssetsInventoryStockReportPerPage,
    sortConfig,
    currentAssetsInventoryStockReport,
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
    setAssetsInventoryStockReportPerPage,
  };
};

export default useViewAssetsInventoryStockReport;
