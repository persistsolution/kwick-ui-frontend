import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewMRPProductWiseSaleReport2025 = () => {
  const [MRPProductWiseSaleReport2025, setMRPProductWiseSaleReport2025] = useState(
    []
  );
  const [
    filteredMRPProductWiseSaleReport2025,
    setFilteredMRPProductWiseSaleReport2025,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    MRPProductWiseSaleReport2025PerPage,
    setMRPProductWiseSaleReport2025PerPage,
  ] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [franchiseArray, setfranchiseArray] = useState([]);
  const [godownProductArray, setgodownProductArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState, setSelectState] = useState("");
  const [selectFranchise, setSelectFranchise] = useState("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [selectProduct , setSelectProduct] = useState("");
const [productArray, setproductArray] = useState([]);
const [countryArray, setcountryArray] = useState([]);
const [selectPaymentType , setSelectPaymentType]= useState("");
const [paymentTypeArray ,setPaymentTypeArray]= useState([
    {label:"All" , value:"All"},
    {label:"Cash" , value:"Cash"},
    {label:"Online" , value:"Online"},

]);

  useEffect(() => {
    handleFetchMRPProductWiseSaleReport2025();
  }, []);

  const handleFetchMRPProductWiseSaleReport2025 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setMRPProductWiseSaleReport2025(data);
      setFilteredMRPProductWiseSaleReport2025(data);
    } catch (error) {
      console.error("Error fetching MRPProductWiseSaleReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredMRPProductWiseSaleReport2025(
      MRPProductWiseSaleReport2025.filter(
        (MRPProductWiseSaleReport2025: any) =>
          MRPProductWiseSaleReport2025?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          MRPProductWiseSaleReport2025?.id
            ?.toString()
            .includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedMRPProductWiseSaleReport2025 = [
      ...filteredMRPProductWiseSaleReport2025,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredMRPProductWiseSaleReport2025(sortedMRPProductWiseSaleReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("MRPProductWiseSaleReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "MRPProductWiseSaleReport2025_data.xlsx");
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

  const indexOfLastMRPProductWiseSaleReport2025 =
    currentPage * MRPProductWiseSaleReport2025PerPage;
  const indexOfFirstMRPProductWiseSaleReport2025 =
    indexOfLastMRPProductWiseSaleReport2025 - MRPProductWiseSaleReport2025PerPage;
  const currentMRPProductWiseSaleReport2025 =
    filteredMRPProductWiseSaleReport2025.slice(
      indexOfFirstMRPProductWiseSaleReport2025,
      indexOfLastMRPProductWiseSaleReport2025
    );
  const totalPages = Math.ceil(
    filteredMRPProductWiseSaleReport2025.length /
      MRPProductWiseSaleReport2025PerPage
  );

  return {
    indexOfLastMRPProductWiseSaleReport2025,
    indexOfFirstMRPProductWiseSaleReport2025,
    MRPProductWiseSaleReport2025,
    filteredMRPProductWiseSaleReport2025,
    searchTerm,
    currentPage,
    MRPProductWiseSaleReport2025PerPage,
    sortConfig,
    currentMRPProductWiseSaleReport2025,
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
    selectProduct,
    productArray,
    selectPaymentType,
    paymentTypeArray,
    setSelectPaymentType,
    setSelectProduct,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setMRPProductWiseSaleReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewMRPProductWiseSaleReport2025;
