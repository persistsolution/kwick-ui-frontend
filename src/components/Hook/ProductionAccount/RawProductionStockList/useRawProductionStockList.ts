import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

const useViewRawProductionStock = () => {
  const [RawProductionStocks, setRawProductionStocks] = useState<String[]>([]);
  const [filteredRawProductionStocks, setFilteredRawProductionStocks] = useState<String[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RawProductionStocksPerPage, setRawProductionStocksPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  // const [RawProductionStockList, setRawProductionStockList] = useState<String[]>([]);
  const [RawProductionStockList] = useState<String[]>([]);
  const [fromDate, setfromDate] = useState<any | undefined>();
  const [toDate, settodate] = useState<any | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchRawProductionStocks();
  }, []);

  const handleFetchRawProductionStocks = async () => {
    try {
      const response: any = await ""
      const data = response?.data || []
      setRawProductionStocks(data);
      setFilteredRawProductionStocks(data);
    } catch (error) {
      console.error("Error fetching RawProductionStocks:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawProductionStocks(
      RawProductionStocks.filter(
        (RawProductionStock: any) =>
          RawProductionStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RawProductionStock?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRawProductionStocks = [...filteredRawProductionStocks].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawProductionStocks(sortedRawProductionStocks);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawProductionStock-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawProductionStock_data.xlsx");
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

  const handleDeleteRawProductionStock = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this RawProductionStock?"
      );
      if (!confirmDelete) return;
      const response : any = await "" 
      if (response.status === 200) {
        handleFetchRawProductionStocks();
      } else {
        console.error("Failed to delete the RawProductionStock:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the RawProductionStock:", error);
      alert(
        "An error occurred while deleting the RawProductionStock. Please try again."
      );
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/RawProductionStock/EditRawProductionStock/${id}`);
  };

  const handleAddRAwProductionStock = ()=>{
        navigate(`/Production/AddRawProductionStock`);

  }

  const indexOfLastRawProductionStock = currentPage * RawProductionStocksPerPage;
  const indexOfFirstRawProductionStock = indexOfLastRawProductionStock - RawProductionStocksPerPage;
  const currentRawProductionStocks = filteredRawProductionStocks.slice(
    indexOfFirstRawProductionStock,
    indexOfLastRawProductionStock
  );
  const totalPages = Math.ceil(filteredRawProductionStocks.length / RawProductionStocksPerPage);

  return {
    indexOfLastRawProductionStock,
    indexOfFirstRawProductionStock,
    RawProductionStocks,
    filteredRawProductionStocks,
    searchTerm,
    currentPage,
    RawProductionStocksPerPage,
    sortConfig,
    currentRawProductionStocks,
    totalPages,
    RawProductionStockList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteRawProductionStock,
    handleEdit,
    getVisiblePages,
    setRawProductionStocksPerPage,
    setfromDate,
    settodate,
    handleAddRAwProductionStock
  };
};

export default useViewRawProductionStock;
