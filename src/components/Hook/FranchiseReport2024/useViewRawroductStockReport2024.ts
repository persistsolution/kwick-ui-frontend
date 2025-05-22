import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewRawProductStockReport2024 = () => {
  const [RawProductStockReport2024, setRawProductStockReport2024] = useState([]);
  const [filteredRawProductStockReport2024, setFilteredRawProductStockReport2024] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RawProductStockReport2024PerPage, setRawProductStockReport2024PerPage] = useState(5);
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
    handleFetchRawProductStockReport2024();
  }, []);

  const handleFetchRawProductStockReport2024 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setRawProductStockReport2024(data);
      setFilteredRawProductStockReport2024(data);
    } catch (error) {
      console.error("Error fetching RawProductStockReport2024:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawProductStockReport2024(
      RawProductStockReport2024.filter(
        (RawProductStockReport2024: any) =>
          RawProductStockReport2024?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RawProductStockReport2024?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRawProductStockReport2024 = [...filteredRawProductStockReport2024].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawProductStockReport2024(sortedRawProductStockReport2024);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawProductStockReport2024-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawProductStockReport2024_data.xlsx");
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

  const indexOfLastRawProductStockReport2024 = currentPage * RawProductStockReport2024PerPage;
  const indexOfFirstRawProductStockReport2024 =
    indexOfLastRawProductStockReport2024 - RawProductStockReport2024PerPage;
  const currentRawProductStockReport2024 = filteredRawProductStockReport2024.slice(
    indexOfFirstRawProductStockReport2024,
    indexOfLastRawProductStockReport2024
  );
  const totalPages = Math.ceil(
    filteredRawProductStockReport2024.length / RawProductStockReport2024PerPage
  );

  return {
    indexOfLastRawProductStockReport2024,
    indexOfFirstRawProductStockReport2024,
    RawProductStockReport2024,
    filteredRawProductStockReport2024,
    searchTerm,
    currentPage,
    RawProductStockReport2024PerPage,
    sortConfig,
    currentRawProductStockReport2024,
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
    setRawProductStockReport2024PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useViewRawProductStockReport2024;
