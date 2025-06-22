import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import { fetchGodownFranchiseReport2Api } from "../../../api/Report-Api/dailySellReport";

const useTransferPrdToCocoFr2 = () => {
  const [TransferPrdToCocoFr2, setTransferPrdToCocoFr2] = useState<any[]>([]);
  const [filteredTransferPrdToCocoFr2, setFilteredTransferPrdToCocoFr2] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TransferPrdToCocoFr2PerPage, setTransferPrdToCocoFr2PerPage] = useState<number>(5);
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

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchTransferPrdToCocoFr2();
  }, []);

  const handleFetchTransferPrdToCocoFr2 = async () => {
    setLoading(true)
    try {
      const response: any = await fetchGodownFranchiseReport2Api();
      const data = response?.data?.data || [];
      setTransferPrdToCocoFr2(data);
      setFilteredTransferPrdToCocoFr2(data);
      setLoading(!data)
    } catch (error) {
      console.error("Error fetching TransferPrdToCocoFr2:", error);
      setLoading(false)
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTransferPrdToCocoFr2(
      TransferPrdToCocoFr2.filter((item: any) =>
        item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredTransferPrdToCocoFr2].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredTransferPrdToCocoFr2(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferPrdToCocoFr2-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "TransferPrdToCocoFr2_data.xlsx");
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

  const handelAddStock = () => {
    navigate("/Report/AddPrdToCocoFr2");
  };

  const indexOfLastTransferPrdToCocoFr2 = currentPage * TransferPrdToCocoFr2PerPage;
  const indexOfFirstTransferPrdToCocoFr2 = indexOfLastTransferPrdToCocoFr2 - TransferPrdToCocoFr2PerPage;
  const currentTransferPrdToCocoFr2 = filteredTransferPrdToCocoFr2.slice(indexOfFirstTransferPrdToCocoFr2, indexOfLastTransferPrdToCocoFr2);
  const totalPages = Math.ceil(filteredTransferPrdToCocoFr2.length / TransferPrdToCocoFr2PerPage);

  return {
    indexOfLastTransferPrdToCocoFr2,
    indexOfFirstTransferPrdToCocoFr2,
    TransferPrdToCocoFr2,
    filteredTransferPrdToCocoFr2,
    searchTerm,
    currentPage,
    TransferPrdToCocoFr2PerPage,
    sortConfig,
    currentTransferPrdToCocoFr2,
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
    loading,
    handleSearch,
    handelAddStock,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setTransferPrdToCocoFr2PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useTransferPrdToCocoFr2;
