import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useDailySaleReport2 = () => {
  const [DailySaleReport2, setDailySaleReport2] = useState([]);
  const [filteredDailySaleReport2, setFilteredDailySaleReport2] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [DailySaleReport2PerPage, setDailySaleReport2PerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [zoneArray , setZoneArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState , setSelectState] = useState("");
  const [selectZone , setSelectZone]= useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [countryArray , setcountryArray]= useState([]);

  useEffect(() => {
    handleFetchDailySaleReport2();
  }, []);

  const handleFetchDailySaleReport2 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setDailySaleReport2(data);
      setFilteredDailySaleReport2(data);
    } catch (error) {
      console.error("Error fetching DailySaleReport2:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredDailySaleReport2(
      DailySaleReport2.filter(
        (DailySaleReport2: any) =>
          DailySaleReport2?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          DailySaleReport2?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedDailySaleReport2 = [...filteredDailySaleReport2].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredDailySaleReport2(sortedDailySaleReport2);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("DailySaleReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "DailySaleReport2_data.xlsx");
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

  const indexOfLastDailySaleReport2 = currentPage * DailySaleReport2PerPage;
  const indexOfFirstDailySaleReport2 =
    indexOfLastDailySaleReport2 - DailySaleReport2PerPage;
  const currentDailySaleReport2 = filteredDailySaleReport2.slice(
    indexOfFirstDailySaleReport2,
    indexOfLastDailySaleReport2
  );
  const totalPages = Math.ceil(
    filteredDailySaleReport2.length / DailySaleReport2PerPage
  );

  return {
    indexOfLastDailySaleReport2,
    indexOfFirstDailySaleReport2,
    DailySaleReport2,
    filteredDailySaleReport2,
    searchTerm,
    currentPage,
    DailySaleReport2PerPage,
    sortConfig,
    currentDailySaleReport2,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    countryArray,
    selectState,
    zoneArray,
    selectZone,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setDailySaleReport2PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectZone,
  };
};

export default useDailySaleReport2;
