import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useSellReport2025 = () => {
  const [SellReport2025, setSellReport2025] = useState([]);
  const [filteredSellReport2025, setFilteredSellReport2025] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [SellReport2025PerPage, setSellReport2025PerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [selectFranchise , setSelectFranchise] = useState([]);
  const [franchiseArray , setfranchiseArray]= useState([]);
  const [toDate, settoDate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchSellReport2025();
  }, []);

  const handleFetchSellReport2025 = async () => {
    try {
      const response: any = await ""
      const data =  response.data || []
      setSellReport2025(data);
      setFilteredSellReport2025(data);
    } catch (error) {
      console.error("Error fetching SellReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredSellReport2025(
      SellReport2025.filter(
        (SellReport2025: any) =>
          SellReport2025?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          SellReport2025?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedSellReport2025 = [...filteredSellReport2025].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredSellReport2025(sortedSellReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("SellReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "SellReport2025_data.xlsx");
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

  const indexOfLastSellReport2025 = currentPage * SellReport2025PerPage;
  const indexOfFirstSellReport2025 =
    indexOfLastSellReport2025 - SellReport2025PerPage;
  const currentSellReport2025 = filteredSellReport2025.slice(
    indexOfFirstSellReport2025,
    indexOfLastSellReport2025
  );
  const totalPages = Math.ceil(
    filteredSellReport2025.length / SellReport2025PerPage
  );

  return {
    indexOfLastSellReport2025,
    indexOfFirstSellReport2025,
    SellReport2025,
    filteredSellReport2025,
    searchTerm,
    currentPage,
    SellReport2025PerPage,
    sortConfig,
    currentSellReport2025,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    selectFranchise,
    franchiseArray,
    setSelectFranchise,
    setfromDate,
    handleSearch,
    settoDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setSellReport2025PerPage,
    setfranchiseList,
    setcategoryList,
  };
};

export default useSellReport2025;
