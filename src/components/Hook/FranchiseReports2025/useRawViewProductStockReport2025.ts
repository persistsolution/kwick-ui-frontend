import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewRawProductStockReport2025 = () => {
  const [RawProductStockReport2025, setRawProductStockReport2025] = useState([]);
  const [filteredRawProductStockReport2025, setFilteredRawProductStockReport2025] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RawProductStockReport2025PerPage, setRawProductStockReport2025PerPage] = useState(5);
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
    handleFetchRawProductStockReport2025();
  }, []);

  const handleFetchRawProductStockReport2025 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setRawProductStockReport2025(data);
      setFilteredRawProductStockReport2025(data);
    } catch (error) {
      console.error("Error fetching RawProductStockReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawProductStockReport2025(
      RawProductStockReport2025.filter(
        (RawProductStockReport2025: any) =>
          RawProductStockReport2025?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RawProductStockReport2025?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRawProductStockReport2025 = [...filteredRawProductStockReport2025].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawProductStockReport2025(sortedRawProductStockReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawProductStockReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawProductStockReport2025_data.xlsx");
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

  const indexOfLastRawProductStockReport2025 = currentPage * RawProductStockReport2025PerPage;
  const indexOfFirstRawProductStockReport2025 =
    indexOfLastRawProductStockReport2025 - RawProductStockReport2025PerPage;
  const currentRawProductStockReport2025 = filteredRawProductStockReport2025.slice(
    indexOfFirstRawProductStockReport2025,
    indexOfLastRawProductStockReport2025
  );
  const totalPages = Math.ceil(
    filteredRawProductStockReport2025.length / RawProductStockReport2025PerPage
  );

  return {
    indexOfLastRawProductStockReport2025,
    indexOfFirstRawProductStockReport2025,
    RawProductStockReport2025,
    filteredRawProductStockReport2025,
    searchTerm,
    currentPage,
    RawProductStockReport2025PerPage,
    sortConfig,
    currentRawProductStockReport2025,
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
    setRawProductStockReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useViewRawProductStockReport2025;
