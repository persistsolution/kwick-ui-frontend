import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewDiscountInvoiceReport2025 = () => {
  const [DiscountInvoiceReport2025, setDiscountInvoiceReport2025] = useState(
    []
  );
  const [
    filteredDiscountInvoiceReport2025,
    setFilteredDiscountInvoiceReport2025,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    DiscountInvoiceReport2025PerPage,
    setDiscountInvoiceReport2025PerPage,
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
    handleFetchDiscountInvoiceReport2025();
  }, []);

  const handleFetchDiscountInvoiceReport2025 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setDiscountInvoiceReport2025(data);
      setFilteredDiscountInvoiceReport2025(data);
    } catch (error) {
      console.error("Error fetching DiscountInvoiceReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredDiscountInvoiceReport2025(
      DiscountInvoiceReport2025.filter(
        (DiscountInvoiceReport2025: any) =>
          DiscountInvoiceReport2025?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          DiscountInvoiceReport2025?.id
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
    const sortedDiscountInvoiceReport2025 = [
      ...filteredDiscountInvoiceReport2025,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredDiscountInvoiceReport2025(sortedDiscountInvoiceReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("DiscountInvoiceReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "DiscountInvoiceReport2025_data.xlsx");
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

  const indexOfLastDiscountInvoiceReport2025 =
    currentPage * DiscountInvoiceReport2025PerPage;
  const indexOfFirstDiscountInvoiceReport2025 =
    indexOfLastDiscountInvoiceReport2025 - DiscountInvoiceReport2025PerPage;
  const currentDiscountInvoiceReport2025 =
    filteredDiscountInvoiceReport2025.slice(
      indexOfFirstDiscountInvoiceReport2025,
      indexOfLastDiscountInvoiceReport2025
    );
  const totalPages = Math.ceil(
    filteredDiscountInvoiceReport2025.length /
      DiscountInvoiceReport2025PerPage
  );

  return {
    indexOfLastDiscountInvoiceReport2025,
    indexOfFirstDiscountInvoiceReport2025,
    DiscountInvoiceReport2025,
    filteredDiscountInvoiceReport2025,
    searchTerm,
    currentPage,
    DiscountInvoiceReport2025PerPage,
    sortConfig,
    currentDiscountInvoiceReport2025,
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
    setDiscountInvoiceReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewDiscountInvoiceReport2025;
