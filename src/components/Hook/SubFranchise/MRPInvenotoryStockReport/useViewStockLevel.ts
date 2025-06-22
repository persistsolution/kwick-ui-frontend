import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchInventoryStockLevelReport } from "../../../api/SubFranchise-API/InventoryStockReport/InventoryStockReportApi";

interface StockLevelItem {
  id: number | string;
  Name: string;
  [key: string]: any; 
}

type SortDirection = "asc" | "desc";

interface SortConfig {
  key: keyof StockLevelItem | null;
  direction: SortDirection;
}

const useViewStockLevel = () => {
  const [StockLevel, setStockLevel] = useState<StockLevelItem[]>([]);
  const [filteredStockLevel, setFilteredStockLevel] = useState<StockLevelItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [StockLevelPerPage, setStockLevelPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | null>(null);
  const [toDate, settodate] = useState<Date | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    handleFetchStockLevel();
  }, []);

  const handleFetchStockLevel = async (): Promise<void> => {
    const frId = localStorage.getItem("frId")
    try {
      const response: any = await fetchInventoryStockLevelReport(Number(frId));
      const data: StockLevelItem[] = response.data || [];
      setStockLevel(data);
      setFilteredStockLevel(data);
    } catch (error) {
      console.error("Error fetching StockLevel:", error);
    }
  };

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    setFilteredStockLevel(
      StockLevel.filter(
        (item) =>
          item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: keyof StockLevelItem): void => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredStockLevel].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredStockLevel(sorted);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = (): void => {
    const table = document.getElementById("StockLevel-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "StockLevel_data.xlsx");
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const indexOfLastStockLevel = currentPage * StockLevelPerPage;
  const indexOfFirstStockLevel = indexOfLastStockLevel - StockLevelPerPage;
  const currentStockLevel = filteredStockLevel.slice(
    indexOfFirstStockLevel,
    indexOfLastStockLevel
  );
  const totalPages = Math.ceil(filteredStockLevel.length / StockLevelPerPage);

  return {
    indexOfLastStockLevel,
    indexOfFirstStockLevel,
    StockLevel,
    filteredStockLevel,
    currentStockLevel,
    searchTerm,
    currentPage,
    StockLevelPerPage,
    sortConfig,
    totalPages,
    fromDate,
    toDate,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setStockLevelPerPage,
  };
};

export default useViewStockLevel;
