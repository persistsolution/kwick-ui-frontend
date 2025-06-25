import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchAccountProductStockReportApi } from "../../api/SubFranchise-API/Report2025-Api/FrRawInventoryStockReportApi";

const useFrAccountProductStockReport = () => {
  const [FrAccountProductStock, setFrAccountProductStock] = useState([]);
  const [vendorOptions , setvendorOptions] = useState([]);
  const [filteredFrAccountProductStock, setFilteredFrAccountProductStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [FrAccountProductStockPerPage, setFrAccountProductStockPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [vendorId , setVendorId]= useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading, setLoading]= useState(false);

  useEffect(() => {
    handleFetchFrAccountProductStock();
  }, []);

  const handleFetchFrAccountProductStock = async () => {
    const frId = localStorage.getItem("frId")
    setLoading(true)
    try {
      const response: any = await fetchAccountProductStockReportApi(Number(frId));
      const data = response?.data?.data ||[]
      setFrAccountProductStock(data);
      setFilteredFrAccountProductStock(data);
          setLoading(!data)
    } catch (error) {
          setLoading(false)
      console.error("Error fetching FrAccountProductStock:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredFrAccountProductStock(
      FrAccountProductStock.filter(
        (FrAccountProductStock: any) =>
          FrAccountProductStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          FrAccountProductStock?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedFrAccountProductStock = [...filteredFrAccountProductStock].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredFrAccountProductStock(sortedFrAccountProductStock);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("FrAccountProductStock-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "FrAccountProductStock_data.xlsx");
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


  const indexOfLastFrAccountProductStock = currentPage * FrAccountProductStockPerPage;
  const indexOfFirstFrAccountProductStock = indexOfLastFrAccountProductStock - FrAccountProductStockPerPage;
  const currentFrAccountProductStock = filteredFrAccountProductStock.slice(
    indexOfFirstFrAccountProductStock,
    indexOfLastFrAccountProductStock
  );
  const totalPages = Math.ceil(filteredFrAccountProductStock.length / FrAccountProductStockPerPage);

  return {
    vendorOptions,
    indexOfLastFrAccountProductStock,
    indexOfFirstFrAccountProductStock,
    FrAccountProductStock,
    filteredFrAccountProductStock,
    searchTerm,
    currentPage,
    FrAccountProductStockPerPage,
    sortConfig,
    currentFrAccountProductStock,
    totalPages,
    fromDate,
    toDate,
    vendorId,
    loading,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setFrAccountProductStockPerPage,
    setvendorOptions,
    setVendorId
  };
};

export default useFrAccountProductStockReport;
