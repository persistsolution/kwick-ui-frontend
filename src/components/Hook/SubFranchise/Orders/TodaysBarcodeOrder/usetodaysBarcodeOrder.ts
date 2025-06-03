import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchTodaysBarcodeOrderApi } from "../../../../api/SubFranchise-API/Orders-Api/TodaysBarcodeOrderApi/TodaysBarcodeOrderApi";

const usetodaysBarcodeOrder = () => {
  const [todaysBarcodeOrder, settodaysBarcodeOrder] = useState([]);
  const [filteredtodaysBarcodeOrder, setFilteredtodaysBarcodeOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todaysBarcodeOrderPerPage, settodaysBarcodeOrderPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState("");
  const [toDate , settodate] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchtodaysBarcodeOrder();
  }, []);

  const handleFetchtodaysBarcodeOrder = async () => {
    try {
      const response: any = await fetchTodaysBarcodeOrderApi();
      settodaysBarcodeOrder(response.data);
      setFilteredtodaysBarcodeOrder(response.data);
    } catch (error) {
      console.error("Error fetching todaysBarcodeOrder:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredtodaysBarcodeOrder(
      todaysBarcodeOrder.filter(
        (todaysBarcodeOrder: any) =>
          todaysBarcodeOrder?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          todaysBarcodeOrder?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedtodaysBarcodeOrder = [...filteredtodaysBarcodeOrder].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredtodaysBarcodeOrder(sortedtodaysBarcodeOrder);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("todaysBarcodeOrder-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "todaysBarcodeOrder_data.xlsx");
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


  const indexOfLasttodaysBarcodeOrder = currentPage * todaysBarcodeOrderPerPage;
  const indexOfFirsttodaysBarcodeOrder = indexOfLasttodaysBarcodeOrder - todaysBarcodeOrderPerPage;
  const currenttodaysBarcodeOrder = filteredtodaysBarcodeOrder.slice(
    indexOfFirsttodaysBarcodeOrder,
    indexOfLasttodaysBarcodeOrder
  );
  const totalPages = Math.ceil(filteredtodaysBarcodeOrder.length / todaysBarcodeOrderPerPage);

  return {
    indexOfLasttodaysBarcodeOrder,
    indexOfFirsttodaysBarcodeOrder,
    todaysBarcodeOrder,
    filteredtodaysBarcodeOrder,
    searchTerm,
    currentPage,
    todaysBarcodeOrderPerPage,
    sortConfig,
    currenttodaysBarcodeOrder,
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
    settodaysBarcodeOrderPerPage,
  };
};

export default usetodaysBarcodeOrder;
