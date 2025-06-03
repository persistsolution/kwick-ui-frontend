import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCashBookApi } from "../../../api/SubFranchise-API/CashBookApi/CashBookApi";

const useViewCashBook = () => {
  const [cashBook, setcashBook] = useState([]);
  const [filteredcashBook, setFilteredcashBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cashBookPerPage, setcashBookPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchcashBook();
  }, []);

  const handleFetchcashBook = async () => {
    try {
      const response: any = await fetchCashBookApi();
      setcashBook(response.data);
      setFilteredcashBook(response.data);
    } catch (error) {
      console.error("Error fetching cashBook:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredcashBook(
      cashBook.filter(
        (cashBook: any) =>
          cashBook?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          cashBook?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedcashBook = [...filteredcashBook].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredcashBook(sortedcashBook);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("cashBook-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "cashBook_data.xlsx");
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


  const indexOfLastcashBook = currentPage * cashBookPerPage;
  const indexOfFirstcashBook = indexOfLastcashBook - cashBookPerPage;
  const currentcashBook = filteredcashBook.slice(
    indexOfFirstcashBook,
    indexOfLastcashBook
  );
  const totalPages = Math.ceil(filteredcashBook.length / cashBookPerPage);

  return {
    indexOfLastcashBook,
    indexOfFirstcashBook,
    cashBook,
    filteredcashBook,
    searchTerm,
    currentPage,
    cashBookPerPage,
    sortConfig,
    currentcashBook,
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
    setcashBookPerPage,
  };
};

export default useViewCashBook;
