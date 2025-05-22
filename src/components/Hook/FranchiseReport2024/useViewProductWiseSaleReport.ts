import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewProductWiseSaleReport2024 = () => {
  const [ProductWiseSaleReport2024, setProductWiseSaleReport2024] = useState(
    []
  );
  const [
    filteredProductWiseSaleReport2024,
    setFilteredProductWiseSaleReport2024,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    ProductWiseSaleReport2024PerPage,
    setProductWiseSaleReport2024PerPage,
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
    handleFetchProductWiseSaleReport2024();
  }, []);

  const handleFetchProductWiseSaleReport2024 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setProductWiseSaleReport2024(data);
      setFilteredProductWiseSaleReport2024(data);
    } catch (error) {
      console.error("Error fetching ProductWiseSaleReport2024:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductWiseSaleReport2024(
      ProductWiseSaleReport2024.filter(
        (ProductWiseSaleReport2024: any) =>
          ProductWiseSaleReport2024?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          ProductWiseSaleReport2024?.id
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
    const sortedProductWiseSaleReport2024 = [
      ...filteredProductWiseSaleReport2024,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductWiseSaleReport2024(sortedProductWiseSaleReport2024);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductWiseSaleReport2024-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductWiseSaleReport2024_data.xlsx");
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

  const indexOfLastProductWiseSaleReport2024 =
    currentPage * ProductWiseSaleReport2024PerPage;
  const indexOfFirstProductWiseSaleReport2024 =
    indexOfLastProductWiseSaleReport2024 - ProductWiseSaleReport2024PerPage;
  const currentProductWiseSaleReport2024 =
    filteredProductWiseSaleReport2024.slice(
      indexOfFirstProductWiseSaleReport2024,
      indexOfLastProductWiseSaleReport2024
    );
  const totalPages = Math.ceil(
    filteredProductWiseSaleReport2024.length /
      ProductWiseSaleReport2024PerPage
  );

  return {
    indexOfLastProductWiseSaleReport2024,
    indexOfFirstProductWiseSaleReport2024,
    ProductWiseSaleReport2024,
    filteredProductWiseSaleReport2024,
    searchTerm,
    currentPage,
    ProductWiseSaleReport2024PerPage,
    sortConfig,
    currentProductWiseSaleReport2024,
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
    setProductWiseSaleReport2024PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewProductWiseSaleReport2024;
