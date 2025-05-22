import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useTransferStockToCocoFr = () => {
  const [TransferStockToCocoFr, setTransferStockToCocoFr] = useState([]);
  const [filteredTransferStockToCocoFr, setFilteredTransferStockToCocoFr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [TransferStockToCocoFrPerPage, setTransferStockToCocoFrPerPage] = useState(5);
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
    handleFetchTransferStockToCocoFr();
  }, []);

  const handleFetchTransferStockToCocoFr = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setTransferStockToCocoFr(data);
      setFilteredTransferStockToCocoFr(data);
    } catch (error) {
      console.error("Error fetching TransferStockToCocoFr:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTransferStockToCocoFr(
      TransferStockToCocoFr.filter(
        (TransferStockToCocoFr: any) =>
          TransferStockToCocoFr?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          TransferStockToCocoFr?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedTransferStockToCocoFr = [...filteredTransferStockToCocoFr].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredTransferStockToCocoFr(sortedTransferStockToCocoFr);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferStockToCocoFr-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TransferStockToCocoFr_data.xlsx");
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

  const indexOfLastTransferStockToCocoFr = currentPage * TransferStockToCocoFrPerPage;
  const indexOfFirstTransferStockToCocoFr =
    indexOfLastTransferStockToCocoFr - TransferStockToCocoFrPerPage;
  const currentTransferStockToCocoFr = filteredTransferStockToCocoFr.slice(
    indexOfFirstTransferStockToCocoFr,
    indexOfLastTransferStockToCocoFr
  );
  const totalPages = Math.ceil(
    filteredTransferStockToCocoFr.length / TransferStockToCocoFrPerPage
  );

  return {
    indexOfLastTransferStockToCocoFr,
    indexOfFirstTransferStockToCocoFr,
    TransferStockToCocoFr,
    filteredTransferStockToCocoFr,
    searchTerm,
    currentPage,
    TransferStockToCocoFrPerPage,
    sortConfig,
    currentTransferStockToCocoFr,
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
    setTransferStockToCocoFrPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useTransferStockToCocoFr;
