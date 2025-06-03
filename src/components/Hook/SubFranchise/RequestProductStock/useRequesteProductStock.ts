import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchRequestProductStockApi } from "../../../api/SubFranchise-API/RequestProductStockApi/RequestProductStockAPi";

const useRequesteProductStock = () => {
  const [rawReqProductStock, setrawReqProductStock] = useState([]);
  const [filteredrawReqProductStock, setFilteredrawReqProductStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rawReqProductStockPerPage, setrawReqProductStockPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchrawReqProductStock();
  }, []);

  const handleFetchrawReqProductStock = async () => {
    try {
      const response: any = await fetchRequestProductStockApi();
      setrawReqProductStock(response.data);
      setFilteredrawReqProductStock(response.data);
    } catch (error) {
      console.error("Error fetching rawReqProductStock:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredrawReqProductStock(
      rawReqProductStock.filter(
        (rawReqProductStock: any) =>
          rawReqProductStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          rawReqProductStock?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedrawReqProductStock = [...filteredrawReqProductStock].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredrawReqProductStock(sortedrawReqProductStock);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("rawReqProductStock-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "rawReqProductStock_data.xlsx");
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


  const indexOfLastrawReqProductStock = currentPage * rawReqProductStockPerPage;
  const indexOfFirstrawReqProductStock = indexOfLastrawReqProductStock - rawReqProductStockPerPage;
  const currentrawReqProductStock = filteredrawReqProductStock.slice(
    indexOfFirstrawReqProductStock,
    indexOfLastrawReqProductStock
  );
  const totalPages = Math.ceil(filteredrawReqProductStock.length / rawReqProductStockPerPage);

  return {
    indexOfLastrawReqProductStock,
    indexOfFirstrawReqProductStock,
    rawReqProductStock,
    filteredrawReqProductStock,
    searchTerm,
    currentPage,
    rawReqProductStockPerPage,
    sortConfig,
    currentrawReqProductStock,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setrawReqProductStockPerPage,
  };
};

export default useRequesteProductStock;
