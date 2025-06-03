import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchTodaysPendingOrderApi } from './../../../../api/SubFranchise-API/Orders-Api/TodaysPendingOrdersApi/TodaysPendingOrderAPi';

const useTodaysPendingOrder = () => {
  const [todaysPendingOrder, settodaysPendingOrder] = useState([]);
  const [filteredtodaysPendingOrder, setFilteredtodaysPendingOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todaysPendingOrderPerPage, settodaysPendingOrderPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchtodaysPendingOrder();
  }, []);

  const handleFetchtodaysPendingOrder = async () => {
    try {
      const response: any = await fetchTodaysPendingOrderApi();
      settodaysPendingOrder(response.data);
      setFilteredtodaysPendingOrder(response.data);
    } catch (error) {
      console.error("Error fetching todaysPendingOrder:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredtodaysPendingOrder(
      todaysPendingOrder.filter(
        (todaysPendingOrder: any) =>
          todaysPendingOrder?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          todaysPendingOrder?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedtodaysPendingOrder = [...filteredtodaysPendingOrder].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredtodaysPendingOrder(sortedtodaysPendingOrder);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("todaysPendingOrder-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "todaysPendingOrder_data.xlsx");
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


  const indexOfLasttodaysPendingOrder = currentPage * todaysPendingOrderPerPage;
  const indexOfFirsttodaysPendingOrder = indexOfLasttodaysPendingOrder - todaysPendingOrderPerPage;
  const currenttodaysPendingOrder = filteredtodaysPendingOrder.slice(
    indexOfFirsttodaysPendingOrder,
    indexOfLasttodaysPendingOrder
  );
  const totalPages = Math.ceil(filteredtodaysPendingOrder.length / todaysPendingOrderPerPage);

  return {
    indexOfLasttodaysPendingOrder,
    indexOfFirsttodaysPendingOrder,
    todaysPendingOrder,
    filteredtodaysPendingOrder,
    searchTerm,
    currentPage,
    todaysPendingOrderPerPage,
    sortConfig,
    currenttodaysPendingOrder,
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
    settodaysPendingOrderPerPage,
  };
};

export default useTodaysPendingOrder;
