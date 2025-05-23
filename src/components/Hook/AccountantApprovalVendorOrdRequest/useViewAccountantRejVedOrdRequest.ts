import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAccountantRejVedOrdRequest = () => {
  const [AccountantRejVedOrdRequest, setAccountantRejVedOrdRequest] = useState([]);
  const [filteredAccountantRejVedOrdRequest, setFilteredAccountantRejVedOrdRequest] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AccountantRejVedOrdRequestPerPage, setAccountantRejVedOrdRequestPerPage] =
    useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [franchiseArray, setfranchiseArray] = useState([]);
  const [godownProductArray, setgodownProductArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState, setSelectState] = useState("");
  const [selectFranchise, setSelectFranchise] = useState("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState("");
  const [toggleAddAccountantRejVedOrdRequest, settoggleAddAccountantRejVedOrdRequest] =
    useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [selectReport, setSelectReport] = useState("");
  const [reportTypeArray, setReportTypeArray] = useState([
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "This Week", value: "Week" },
    { label: "This Month", value: "Month" },
    { label: "Custom", value: "Custom" },
  ]);
  const [countryArray, setcountryArray] = useState([]);
  const [selectPaymentType, setSelectPaymentType] = useState("");
  const [paymentTypeArray, setPaymentTypeArray] = useState([
    { label: "All", value: "all" },
    { label: "Cash", value: "Cash" },
    { label: "Phone Pay", value: "Phone Pay" },
    { label: "Google Pay", value: "UPI" },
    { label: "Paytm", value: "Paytm" },
    { label: "Other UPI", value: "Other UPI" },
    { label: "Credit / उधार", value: "Borrowing" },
    { label: "Zomato", value: "Zomato" },
  ]);

  useEffect(() => {
    handleFetchAccountantRejVedOrdRequest();
  }, []);

  const handleFetchAccountantRejVedOrdRequest = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setAccountantRejVedOrdRequest(data);
      setFilteredAccountantRejVedOrdRequest(data);
    } catch (error) {
      console.error("Error fetching AccountantRejVedOrdRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAccountantRejVedOrdRequest(
      AccountantRejVedOrdRequest.filter(
        (AccountantRejVedOrdRequest: any) =>
          AccountantRejVedOrdRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || AccountantRejVedOrdRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAccountantRejVedOrdRequest = [...filteredAccountantRejVedOrdRequest].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredAccountantRejVedOrdRequest(sortedAccountantRejVedOrdRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AccountantRejVedOrdRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AccountantRejVedOrdRequest_data.xlsx");
  };

  const handelfetchDiscount = () => {};

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

  const indexOfLastAccountantRejVedOrdRequest =
    currentPage * AccountantRejVedOrdRequestPerPage;
  const indexOfFirstAccountantRejVedOrdRequest =
    indexOfLastAccountantRejVedOrdRequest - AccountantRejVedOrdRequestPerPage;
  const currentAccountantRejVedOrdRequest = filteredAccountantRejVedOrdRequest.slice(
    indexOfFirstAccountantRejVedOrdRequest,
    indexOfLastAccountantRejVedOrdRequest
  );
  const totalPages = Math.ceil(
    filteredAccountantRejVedOrdRequest.length / AccountantRejVedOrdRequestPerPage
  );

  return {
    indexOfLastAccountantRejVedOrdRequest,
    indexOfFirstAccountantRejVedOrdRequest,
    AccountantRejVedOrdRequest,
    filteredAccountantRejVedOrdRequest,
    searchTerm,
    currentPage,
    AccountantRejVedOrdRequestPerPage,
    sortConfig,
    currentAccountantRejVedOrdRequest,
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
    toggleAddAccountantRejVedOrdRequest,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAccountantRejVedOrdRequestPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handelfetchDiscount,
  };
};

export default useViewAccountantRejVedOrdRequest;
