import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCashBookApi } from "../../../api/SubFranchise-API/CashBookApi/CashBookApi";

interface CashBookItem {
  id: number;
  Name: string;
  [key: string]: any; 
}

interface SortConfig {
  key: keyof CashBookItem | null;
  direction: "asc" | "desc";
}

const useViewCashBook = () => {
  const [cashBook, setCashBook] = useState<CashBookItem[]>([]);
  const [filteredCashBook, setFilteredCashBook] = useState<CashBookItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cashBookPerPage, setCashBookPerPage] = useState<number>(5);
  const [fromDate, setFromDate] = useState<Date | any>(null);
  const [toDate, setToDate] = useState<Date | any>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });



  useEffect(() => {
    handleFetchCashBook();
    
  }, []);

  const handleFetchCashBook = async () => {
    const frId = localStorage.getItem("frId")
    try {
      const response : any = await fetchCashBookApi(Number(frId));
      const data: CashBookItem[] = response?.data?.data ||[];
      setCashBook(data);
      setFilteredCashBook(data);
    } catch (error) {
      console.error("Error fetching cashBook:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = cashBook.filter((item) =>
      item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
      item?.id?.toString().includes(term)
    );
    setFilteredCashBook(filtered);
  };

  const handleSort = (key: keyof CashBookItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredCashBook].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCashBook(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("cashBook-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "cashBook_data.xlsx");
  };

  const totalPages = Math.ceil(filteredCashBook.length / cashBookPerPage);
  const indexOfLastCashBook = currentPage * cashBookPerPage;
  const indexOfFirstCashBook = indexOfLastCashBook - cashBookPerPage;
  const currentCashBook = filteredCashBook.slice(
    indexOfFirstCashBook,
    indexOfLastCashBook
  );

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return {
    indexOfLastCashBook,
    indexOfFirstCashBook,
    cashBook,
    filteredCashBook,
    searchTerm,
    currentPage,
    cashBookPerPage,
    sortConfig,
    currentCashBook,
    totalPages,
    fromDate,
    toDate,
    handleSearch,
    setToDate,
    setFromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setCashBookPerPage,
  };
};

export default useViewCashBook;
