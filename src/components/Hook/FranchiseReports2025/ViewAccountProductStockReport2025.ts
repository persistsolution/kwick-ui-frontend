import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAccountProductStockReport2025 = () => {
  const [AccountProductStockReport2025, setAccountProductStockReport2025] = useState([]);
  const [filteredAccountProductStockReport2025, setFilteredAccountProductStockReport2025] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AccountProductStockReport2025PerPage, setAccountProductStockReport2025PerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [franchiseArray , setfranchiseArray] = useState([]);
  const [godownProductArray , setgodownProductArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState , setSelectState] = useState("");
  const [selectFranchise , setSelectFranchise]= useState("");
  const [selectFranchiseProduct , setSelectFranchiseProduct]= useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [countryArray , setcountryArray]= useState([]);

  useEffect(() => {
    handleFetchAccountProductStockReport2025();
  }, []);

  const handleFetchAccountProductStockReport2025 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setAccountProductStockReport2025(data);
      setFilteredAccountProductStockReport2025(data);
    } catch (error) {
      console.error("Error fetching AccountProductStockReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAccountProductStockReport2025(
      AccountProductStockReport2025.filter(
        (AccountProductStockReport2025: any) =>
          AccountProductStockReport2025?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          AccountProductStockReport2025?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAccountProductStockReport2025 = [...filteredAccountProductStockReport2025].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredAccountProductStockReport2025(sortedAccountProductStockReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AccountProductStockReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AccountProductStockReport2025_data.xlsx");
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

  const indexOfLastAccountProductStockReport2025 = currentPage * AccountProductStockReport2025PerPage;
  const indexOfFirstAccountProductStockReport2025 =
    indexOfLastAccountProductStockReport2025 - AccountProductStockReport2025PerPage;
  const currentAccountProductStockReport2025 = filteredAccountProductStockReport2025.slice(
    indexOfFirstAccountProductStockReport2025,
    indexOfLastAccountProductStockReport2025
  );
  const totalPages = Math.ceil(
    filteredAccountProductStockReport2025.length / AccountProductStockReport2025PerPage
  );

  return {
    indexOfLastAccountProductStockReport2025,
    indexOfFirstAccountProductStockReport2025,
    AccountProductStockReport2025,
    filteredAccountProductStockReport2025,
    searchTerm,
    currentPage,
    AccountProductStockReport2025PerPage,
    sortConfig,
    currentAccountProductStockReport2025,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    countryArray,
    selectState,
    franchiseArray,
    selectFranchise,
    selectFranchiseProduct,
    godownProductArray,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAccountProductStockReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useViewAccountProductStockReport2025;
