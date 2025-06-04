import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewMRPProductGRN = () => {
  const [MRPProductGRN, setMRPProductGRN] = useState([]);
  const [vendorOptions , setvendorOptions] = useState([]);
  const [filteredMRPProductGRN, setFilteredMRPProductGRN] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [MRPProductGRNPerPage, setMRPProductGRNPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState<Date | any>();
  const [toDate , settodate] = useState<Date | any>();
  const [vendorId , setVendorId]= useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchMRPProductGRN();
  }, []);

  const handleFetchMRPProductGRN = async () => {
    try {
      const response: any = await "";
      const data = response.data ||[]
      setMRPProductGRN(data);
      setFilteredMRPProductGRN(data);
    } catch (error) {
      console.error("Error fetching MRPProductGRN:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredMRPProductGRN(
      MRPProductGRN.filter(
        (MRPProductGRN: any) =>
          MRPProductGRN?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          MRPProductGRN?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedMRPProductGRN = [...filteredMRPProductGRN].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredMRPProductGRN(sortedMRPProductGRN);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("MRPProductGRN-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "MRPProductGRN_data.xlsx");
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


  const indexOfLastMRPProductGRN = currentPage * MRPProductGRNPerPage;
  const indexOfFirstMRPProductGRN = indexOfLastMRPProductGRN - MRPProductGRNPerPage;
  const currentMRPProductGRN = filteredMRPProductGRN.slice(
    indexOfFirstMRPProductGRN,
    indexOfLastMRPProductGRN
  );
  const totalPages = Math.ceil(filteredMRPProductGRN.length / MRPProductGRNPerPage);

  return {
    vendorOptions,
    indexOfLastMRPProductGRN,
    indexOfFirstMRPProductGRN,
    MRPProductGRN,
    filteredMRPProductGRN,
    searchTerm,
    currentPage,
    MRPProductGRNPerPage,
    sortConfig,
    currentMRPProductGRN,
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
    setMRPProductGRNPerPage,
    setvendorOptions,
    setVendorId
  };
};

export default useViewMRPProductGRN;
