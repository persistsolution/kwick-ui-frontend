import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownFranchiseReportApi } from "../../api/Report-Api/dailySellReport";
import { fetchFranchiseApi } from "../../api/Franchise-Api/FranchiseApi";


const useTransferStockToCocoFr = () => {
  const [TransferStockToCocoFr, setTransferStockToCocoFr] = useState<any[]>([]);
  const [filteredTransferStockToCocoFr, setFilteredTransferStockToCocoFr] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TransferStockToCocoFrPerPage, setTransferStockToCocoFrPerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [franchiseArray, setfranchiseArray] = useState<any[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<string | Date | any>();
  const [toDate, settodate] = useState<string | Date | any>();
  const [selectState, setSelectState] = useState<string>("");
  const [selectFranchise, setSelectFranchise] = useState<string>("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string }>({ key: null, direction: "asc" });
  const [countryArray, setcountryArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [franchisesList ,setFranchisesList]=useState<any[]>([]);

  useEffect(() => {
    handleFetchTransferStockToCocoFr();
    handleFetchFranchises();
  }, []);

  const handleFetchTransferStockToCocoFr = async () => {
    setLoading(true)
    try {
      const response: any = await fetchGodownFranchiseReportApi();
      const data = response?.data?.data || [];
      setTransferStockToCocoFr(data);
      setFilteredTransferStockToCocoFr(data);
      setLoading(!data)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching TransferStockToCocoFr:", error);
    }
  };

    const handleFetchFranchises = async () => {
      try {
        const response: any = await fetchFranchiseApi();
        const data = response?.data?.data || []
        setFranchisesList(data);
      } catch (error) {
        console.error("Error fetching franchises:", error);
      }
    };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTransferStockToCocoFr(
      TransferStockToCocoFr.filter((item: any) =>
        item?.franchise_name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredTransferStockToCocoFr].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredTransferStockToCocoFr(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferStockToCocoFr-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "TransferStockToCocoFr_data.xlsx");
    }
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const indexOfLastTransferStockToCocoFr = currentPage * TransferStockToCocoFrPerPage;
  const indexOfFirstTransferStockToCocoFr = indexOfLastTransferStockToCocoFr - TransferStockToCocoFrPerPage;
  const currentTransferStockToCocoFr = filteredTransferStockToCocoFr.slice(indexOfFirstTransferStockToCocoFr, indexOfLastTransferStockToCocoFr);
  const totalPages = Math.ceil(filteredTransferStockToCocoFr.length / TransferStockToCocoFrPerPage);

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
    franchisesList,
    loading,
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
