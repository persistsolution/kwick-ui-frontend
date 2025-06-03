import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchTodaysOnlineOrderApi } from "../../../../api/SubFranchise-API/Orders-Api/TodaysOnlineOrderApi/TodaysOnlineOrderApi";

const usetodaysOnlineOrder = () => {
  const [todaysOnlineOrder, settodaysOnlineOrder] = useState([]);
  const [filteredtodaysOnlineOrder, setFilteredtodaysOnlineOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todaysOnlineOrderPerPage, settodaysOnlineOrderPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState("");
  const [toDate , settodate] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchtodaysOnlineOrder();
  }, []);

  const handleFetchtodaysOnlineOrder = async () => {
    try {
      const response: any = await fetchTodaysOnlineOrderApi();
      settodaysOnlineOrder(response.data);
      setFilteredtodaysOnlineOrder(response.data);
    } catch (error) {
      console.error("Error fetching todaysOnlineOrder:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredtodaysOnlineOrder(
      todaysOnlineOrder.filter(
        (todaysOnlineOrder: any) =>
          todaysOnlineOrder?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          todaysOnlineOrder?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedtodaysOnlineOrder = [...filteredtodaysOnlineOrder].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredtodaysOnlineOrder(sortedtodaysOnlineOrder);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("todaysOnlineOrder-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "todaysOnlineOrder_data.xlsx");
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


  const indexOfLasttodaysOnlineOrder = currentPage * todaysOnlineOrderPerPage;
  const indexOfFirsttodaysOnlineOrder = indexOfLasttodaysOnlineOrder - todaysOnlineOrderPerPage;
  const currenttodaysOnlineOrder = filteredtodaysOnlineOrder.slice(
    indexOfFirsttodaysOnlineOrder,
    indexOfLasttodaysOnlineOrder
  );
  const totalPages = Math.ceil(filteredtodaysOnlineOrder.length / todaysOnlineOrderPerPage);

  return {
    indexOfLasttodaysOnlineOrder,
    indexOfFirsttodaysOnlineOrder,
    todaysOnlineOrder,
    filteredtodaysOnlineOrder,
    searchTerm,
    currentPage,
    todaysOnlineOrderPerPage,
    sortConfig,
    currenttodaysOnlineOrder,
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
    settodaysOnlineOrderPerPage,
  };
};

export default usetodaysOnlineOrder;
