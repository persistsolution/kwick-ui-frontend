import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewRawProductGRN = () => {
  const [RawProductGRN, setRawProductGRN] = useState([]);
  const [vendorOptions , setvendorOptions] = useState([]);
  const [filteredRawProductGRN, setFilteredRawProductGRN] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RawProductGRNPerPage, setRawProductGRNPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [vendorId , setVendorId]= useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchRawProductGRN();
  }, []);

  const handleFetchRawProductGRN = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setRawProductGRN(data);
      setFilteredRawProductGRN(data);
    } catch (error) {
      console.error("Error fetching RawProductGRN:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRawProductGRN(
      RawProductGRN.filter(
        (RawProductGRN: any) =>
          RawProductGRN?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RawProductGRN?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRawProductGRN = [...filteredRawProductGRN].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRawProductGRN(sortedRawProductGRN);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RawProductGRN-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RawProductGRN_data.xlsx");
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


  const indexOfLastRawProductGRN = currentPage * RawProductGRNPerPage;
  const indexOfFirstRawProductGRN = indexOfLastRawProductGRN - RawProductGRNPerPage;
  const currentRawProductGRN = filteredRawProductGRN.slice(
    indexOfFirstRawProductGRN,
    indexOfLastRawProductGRN
  );
  const totalPages = Math.ceil(filteredRawProductGRN.length / RawProductGRNPerPage);

  return {
    vendorOptions,
    indexOfLastRawProductGRN,
    indexOfFirstRawProductGRN,
    RawProductGRN,
    filteredRawProductGRN,
    searchTerm,
    currentPage,
    RawProductGRNPerPage,
    sortConfig,
    currentRawProductGRN,
    totalPages,
    fromDate,
    toDate,
    vendorId,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setRawProductGRNPerPage,
    setvendorOptions,
    setVendorId
  };
};

export default useViewRawProductGRN;
