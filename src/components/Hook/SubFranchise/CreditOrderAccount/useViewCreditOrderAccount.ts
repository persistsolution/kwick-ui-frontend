import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewCreditOrderAccount = () => {
  const [creditOrder, setcreditOrder] = useState([]);
  const [filteredcreditOrder, setFilteredcreditOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [creditOrderPerPage, setcreditOrderPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchcreditOrder();
  }, []);

  const handleFetchcreditOrder = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setcreditOrder(data);
      setFilteredcreditOrder(data);
    } catch (error) {
      console.error("Error fetching creditOrder:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredcreditOrder(
      creditOrder.filter(
        (creditOrder: any) =>
          creditOrder?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          creditOrder?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedcreditOrder = [...filteredcreditOrder].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredcreditOrder(sortedcreditOrder);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("creditOrder-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "creditOrder_data.xlsx");
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


  const indexOfLastcreditOrder = currentPage * creditOrderPerPage;
  const indexOfFirstcreditOrder = indexOfLastcreditOrder - creditOrderPerPage;
  const currentcreditOrder = filteredcreditOrder.slice(
    indexOfFirstcreditOrder,
    indexOfLastcreditOrder
  );
  const totalPages = Math.ceil(filteredcreditOrder.length / creditOrderPerPage);

  return {
    indexOfLastcreditOrder,
    indexOfFirstcreditOrder,
    creditOrder,
    filteredcreditOrder,
    searchTerm,
    currentPage,
    creditOrderPerPage,
    sortConfig,
    currentcreditOrder,
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
    setcreditOrderPerPage,
  };
};

export default useViewCreditOrderAccount;
