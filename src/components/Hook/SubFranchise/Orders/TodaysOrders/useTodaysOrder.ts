import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchTodaysOrderApi } from "../../../../api/SubFranchise-API/Orders-Api/TodaysOrderApi/TodaysOrderApi";

const useTodaysOrder = () => {
  const [todaysOrder, settodaysOrder] = useState([]);
  const [filteredtodaysOrder, setFilteredtodaysOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todaysOrderPerPage, settodaysOrderPerPage] = useState(5);
  const [franchiseList , setfranchiseList] = useState([])
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchtodaysOrder();
  }, []);

  const handleFetchtodaysOrder = async () => {
    try {
      const response: any = await fetchTodaysOrderApi();
      settodaysOrder(response.data);
      setFilteredtodaysOrder(response.data);
    } catch (error) {
      console.error("Error fetching todaysOrder:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredtodaysOrder(
      todaysOrder.filter(
        (todaysOrder: any) =>
          todaysOrder?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          todaysOrder?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedtodaysOrder = [...filteredtodaysOrder].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredtodaysOrder(sortedtodaysOrder);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("todaysOrder-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "todaysOrder_data.xlsx");
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


  const indexOfLasttodaysOrder = currentPage * todaysOrderPerPage;
  const indexOfFirsttodaysOrder = indexOfLasttodaysOrder - todaysOrderPerPage;
  const currenttodaysOrder = filteredtodaysOrder.slice(
    indexOfFirsttodaysOrder,
    indexOfLasttodaysOrder
  );
  const totalPages = Math.ceil(filteredtodaysOrder.length / todaysOrderPerPage);

  return {
    indexOfLasttodaysOrder,
    indexOfFirsttodaysOrder,
    todaysOrder,
    filteredtodaysOrder,
    searchTerm,
    currentPage,
    todaysOrderPerPage,
    sortConfig,
    currenttodaysOrder,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    settodaysOrderPerPage,
  };
};

export default useTodaysOrder;
