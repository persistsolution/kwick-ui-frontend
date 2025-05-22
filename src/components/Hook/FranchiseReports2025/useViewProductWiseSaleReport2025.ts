import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewProductWiseSaleReport2025 = () => {
  const [ProductWiseSaleReport2025, setProductWiseSaleReport2025] = useState(
    []
  );
  const [
    filteredProductWiseSaleReport2025,
    setFilteredProductWiseSaleReport2025,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    ProductWiseSaleReport2025PerPage,
    setProductWiseSaleReport2025PerPage,
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
    handleFetchProductWiseSaleReport2025();
  }, []);

  const handleFetchProductWiseSaleReport2025 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setProductWiseSaleReport2025(data);
      setFilteredProductWiseSaleReport2025(data);
    } catch (error) {
      console.error("Error fetching ProductWiseSaleReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductWiseSaleReport2025(
      ProductWiseSaleReport2025.filter(
        (ProductWiseSaleReport2025: any) =>
          ProductWiseSaleReport2025?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          ProductWiseSaleReport2025?.id
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
    const sortedProductWiseSaleReport2025 = [
      ...filteredProductWiseSaleReport2025,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductWiseSaleReport2025(sortedProductWiseSaleReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductWiseSaleReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductWiseSaleReport2025_data.xlsx");
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

  const indexOfLastProductWiseSaleReport2025 =
    currentPage * ProductWiseSaleReport2025PerPage;
  const indexOfFirstProductWiseSaleReport2025 =
    indexOfLastProductWiseSaleReport2025 - ProductWiseSaleReport2025PerPage;
  const currentProductWiseSaleReport2025 =
    filteredProductWiseSaleReport2025.slice(
      indexOfFirstProductWiseSaleReport2025,
      indexOfLastProductWiseSaleReport2025
    );
  const totalPages = Math.ceil(
    filteredProductWiseSaleReport2025.length /
      ProductWiseSaleReport2025PerPage
  );

  return {
    indexOfLastProductWiseSaleReport2025,
    indexOfFirstProductWiseSaleReport2025,
    ProductWiseSaleReport2025,
    filteredProductWiseSaleReport2025,
    searchTerm,
    currentPage,
    ProductWiseSaleReport2025PerPage,
    sortConfig,
    currentProductWiseSaleReport2025,
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
    setProductWiseSaleReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewProductWiseSaleReport2025;
