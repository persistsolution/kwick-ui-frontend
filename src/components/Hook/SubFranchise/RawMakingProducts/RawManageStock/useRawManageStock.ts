import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchrawManageStockApi } from "../../../../api/SubFranchise-API/RawMakingProduct/RawManageStockApi/RawManageStockApi";

const userawManageStocks = () => {
  const [rawManageStock, setrawManageStock] = useState([]);
  const [filteredrawManageStock, setFilteredrawManageStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rawManageStockPerPage, setrawManageStockPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchrawManageStock();
  }, []);

  const handleFetchrawManageStock = async () => {
    try {
      const response: any = await fetchrawManageStockApi();
      setrawManageStock(response.data);
      setFilteredrawManageStock(response.data);
    } catch (error) {
      console.error("Error fetching rawManageStock:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredrawManageStock(
      rawManageStock.filter(
        (rawManageStock: any) =>
          rawManageStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          rawManageStock?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedrawManageStock = [...filteredrawManageStock].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredrawManageStock(sortedrawManageStock);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("rawManageStock-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "rawManageStock_data.xlsx");
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


  const indexOfLastrawManageStock = currentPage * rawManageStockPerPage;
  const indexOfFirstrawManageStock = indexOfLastrawManageStock - rawManageStockPerPage;
  const currentrawManageStock = filteredrawManageStock.slice(
    indexOfFirstrawManageStock,
    indexOfLastrawManageStock
  );
  const totalPages = Math.ceil(filteredrawManageStock.length / rawManageStockPerPage);

  return {
    indexOfLastrawManageStock,
    indexOfFirstrawManageStock,
    rawManageStock,
    filteredrawManageStock,
    searchTerm,
    currentPage,
    rawManageStockPerPage,
    sortConfig,
    currentrawManageStock,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setrawManageStockPerPage,
  };
};

export default userawManageStocks;
