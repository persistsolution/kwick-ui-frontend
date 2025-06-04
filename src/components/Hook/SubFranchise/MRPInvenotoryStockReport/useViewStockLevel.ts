import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewStockLevel = () => {
  const [StockLevel, setStockLevel] = useState([]);
  const [filteredStockLevel, setFilteredStockLevel] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [StockLevelPerPage, setStockLevelPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchStockLevel();
  }, []);

  const handleFetchStockLevel = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setStockLevel(data);
      setFilteredStockLevel(data);
    } catch (error) {
      console.error("Error fetching StockLevel:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredStockLevel(
      StockLevel.filter(
        (StockLevel: any) =>
          StockLevel?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          StockLevel?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedStockLevel = [...filteredStockLevel].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredStockLevel(sortedStockLevel);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("StockLevel-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "StockLevel_data.xlsx");
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
    searchTerm,
    currentPage,
    StockLevelPerPage,
    sortConfig,
    currentStockLevel,
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
