import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useWeeklySaleReport2 = () => {
  const [weeklySaleReport2, setweeklySaleReport2] = useState([]);
  const [filteredweeklySaleReport2, setFilteredweeklySaleReport2] = useState(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [weeklySaleReport2PerPage, setweeklySaleReport2PerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [zoneArray, setZoneArray] = useState([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [selectZone, setSelectZone] = useState("");
  const [monthArray, setmonthArray] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [yearArray, setyearArray] = useState([
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
  ]);
  useEffect(() => {
    handleFetchweeklySaleReport2();
  }, []);

  const handleFetchweeklySaleReport2 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setweeklySaleReport2(data);
      setFilteredweeklySaleReport2(data);
    } catch (error) {
      console.error("Error fetching weeklySaleReport2:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredweeklySaleReport2(
      weeklySaleReport2.filter(
        (weeklySaleReport2: any) =>
          weeklySaleReport2?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          weeklySaleReport2?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedweeklySaleReport2 = [...filteredweeklySaleReport2].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredweeklySaleReport2(sortedweeklySaleReport2);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("weeklySaleReport2-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "weeklySaleReport2_data.xlsx");
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

  const indexOfLastweeklySaleReport2 = currentPage * weeklySaleReport2PerPage;
  const indexOfFirstweeklySaleReport2 =
    indexOfLastweeklySaleReport2 - weeklySaleReport2PerPage;
  const currentweeklySaleReport2 = filteredweeklySaleReport2.slice(
    indexOfFirstweeklySaleReport2,
    indexOfLastweeklySaleReport2
  );
  const totalPages = Math.ceil(
    filteredweeklySaleReport2.length / weeklySaleReport2PerPage
  );

  return {
    indexOfLastweeklySaleReport2,
    indexOfFirstweeklySaleReport2,
    weeklySaleReport2,
    filteredweeklySaleReport2,
    searchTerm,
    currentPage,
    weeklySaleReport2PerPage,
    sortConfig,
    currentweeklySaleReport2,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    zoneArray,
    selectZone,
    selectMonth,
    monthArray,
    yearArray,
    selectYear,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setweeklySaleReport2PerPage,
    setfranchiseList,
    setcategoryList,
    setZoneArray,
    setSelectZone,
    setSelectMonth,
    setSelectYear,
  };
};

export default useWeeklySaleReport2;
