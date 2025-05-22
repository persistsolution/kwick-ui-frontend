import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewDiscountInvoiceReport2024 = () => {
  const [DiscountInvoiceReport2024, setDiscountInvoiceReport2024] = useState(
    []
  );
  const [
    filteredDiscountInvoiceReport2024,
    setFilteredDiscountInvoiceReport2024,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    DiscountInvoiceReport2024PerPage,
    setDiscountInvoiceReport2024PerPage,
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
const [selectReport , setSelectReport] = useState("");
const [reportTypeArray, setReportTypeArray] = useState([
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" },
  { label: "This Week", value: "Week" },
  { label: "This Month", value: "Month" },
  { label: "Custom", value: "Custom" }
]);
const [countryArray, setcountryArray] = useState([]);
const [selectPaymentType , setSelectPaymentType]= useState("");
const [paymentTypeArray, setPaymentTypeArray] = useState([
  { label: "All", value: "all" },
  { label: "Cash", value: "Cash" },
  { label: "Phone Pay", value: "Phone Pay" },
  { label: "Google Pay", value: "UPI" },
  { label: "Paytm", value: "Paytm" },
  { label: "Other UPI", value: "Other UPI" },
  { label: "Credit / उधार", value: "Borrowing" },
  { label: "Zomato", value: "Zomato" }
]);


  useEffect(() => {
    handleFetchDiscountInvoiceReport2024();
  }, []);

  const handleFetchDiscountInvoiceReport2024 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setDiscountInvoiceReport2024(data);
      setFilteredDiscountInvoiceReport2024(data);
    } catch (error) {
      console.error("Error fetching DiscountInvoiceReport2024:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredDiscountInvoiceReport2024(
      DiscountInvoiceReport2024.filter(
        (DiscountInvoiceReport2024: any) =>
          DiscountInvoiceReport2024?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          DiscountInvoiceReport2024?.id
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
    const sortedDiscountInvoiceReport2024 = [
      ...filteredDiscountInvoiceReport2024,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredDiscountInvoiceReport2024(sortedDiscountInvoiceReport2024);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("DiscountInvoiceReport2024-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "DiscountInvoiceReport2024_data.xlsx");
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

  const indexOfLastDiscountInvoiceReport2024 =
    currentPage * DiscountInvoiceReport2024PerPage;
  const indexOfFirstDiscountInvoiceReport2024 =
    indexOfLastDiscountInvoiceReport2024 - DiscountInvoiceReport2024PerPage;
  const currentDiscountInvoiceReport2024 =
    filteredDiscountInvoiceReport2024.slice(
      indexOfFirstDiscountInvoiceReport2024,
      indexOfLastDiscountInvoiceReport2024
    );
  const totalPages = Math.ceil(
    filteredDiscountInvoiceReport2024.length /
      DiscountInvoiceReport2024PerPage
  );

  return {
    indexOfLastDiscountInvoiceReport2024,
    indexOfFirstDiscountInvoiceReport2024,
    DiscountInvoiceReport2024,
    filteredDiscountInvoiceReport2024,
    searchTerm,
    currentPage,
    DiscountInvoiceReport2024PerPage,
    sortConfig,
    currentDiscountInvoiceReport2024,
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
    selectReport,
    reportTypeArray,
    selectPaymentType,
    paymentTypeArray,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setDiscountInvoiceReport2024PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewDiscountInvoiceReport2024;
