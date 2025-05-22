import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";

const useTransferPrdToCocoFr2 = () => {
  const [TransferPrdToCocoFr2, setTransferPrdToCocoFr2] = useState([]);
  const [filteredTransferPrdToCocoFr2, setFilteredTransferPrdToCocoFr2] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [TransferPrdToCocoFr2PerPage, setTransferPrdToCocoFr2PerPage] = useState(5);
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
const navigate = useNavigate()
  useEffect(() => {
    handleFetchTransferPrdToCocoFr2();
  }, []);

  const handleFetchTransferPrdToCocoFr2 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setTransferPrdToCocoFr2(data);
      setFilteredTransferPrdToCocoFr2(data);
    } catch (error) {
      console.error("Error fetching TransferPrdToCocoFr2:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTransferPrdToCocoFr2(
      TransferPrdToCocoFr2.filter(
        (TransferPrdToCocoFr2: any) =>
          TransferPrdToCocoFr2?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          TransferPrdToCocoFr2?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedTransferPrdToCocoFr2 = [...filteredTransferPrdToCocoFr2].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredTransferPrdToCocoFr2(sortedTransferPrdToCocoFr2);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferPrdToCocoFr2-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TransferPrdToCocoFr2_data.xlsx");
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

  const handelAddStock = ()=>{
    navigate("/Report/AddPrdToCocoFr2")
  }

  const indexOfLastTransferPrdToCocoFr2 = currentPage * TransferPrdToCocoFr2PerPage;
  const indexOfFirstTransferPrdToCocoFr2 =
    indexOfLastTransferPrdToCocoFr2 - TransferPrdToCocoFr2PerPage;
  const currentTransferPrdToCocoFr2 = filteredTransferPrdToCocoFr2.slice(
    indexOfFirstTransferPrdToCocoFr2,
    indexOfLastTransferPrdToCocoFr2
  );
  const totalPages = Math.ceil(
    filteredTransferPrdToCocoFr2.length / TransferPrdToCocoFr2PerPage
  );

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
