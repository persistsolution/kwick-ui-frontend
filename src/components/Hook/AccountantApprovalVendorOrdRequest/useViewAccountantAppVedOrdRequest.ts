import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAccountantAppVedOrdRequest = () => {
  const [AccountantAppVedOrdRequest, setAccountantAppVedOrdRequest] = useState([]);
  const [filteredAccountantAppVedOrdRequest, setFilteredAccountantAppVedOrdRequest] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AccountantAppVedOrdRequestPerPage, setAccountantAppVedOrdRequestPerPage] =
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
  const [toggleAddAccountantAppVedOrdRequest, settoggleAddAccountantAppVedOrdRequest] =
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
    handleFetchAccountantAppVedOrdRequest();
  }, []);

  const handleFetchAccountantAppVedOrdRequest = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setAccountantAppVedOrdRequest(data);
      setFilteredAccountantAppVedOrdRequest(data);
    } catch (error) {
      console.error("Error fetching AccountantAppVedOrdRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAccountantAppVedOrdRequest(
      AccountantAppVedOrdRequest.filter(
        (AccountantAppVedOrdRequest: any) =>
          AccountantAppVedOrdRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || AccountantAppVedOrdRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAccountantAppVedOrdRequest = [...filteredAccountantAppVedOrdRequest].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredAccountantAppVedOrdRequest(sortedAccountantAppVedOrdRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AccountantAppVedOrdRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AccountantAppVedOrdRequest_data.xlsx");
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

  const indexOfLastAccountantAppVedOrdRequest =
    currentPage * AccountantAppVedOrdRequestPerPage;
  const indexOfFirstAccountantAppVedOrdRequest =
    indexOfLastAccountantAppVedOrdRequest - AccountantAppVedOrdRequestPerPage;
  const currentAccountantAppVedOrdRequest = filteredAccountantAppVedOrdRequest.slice(
    indexOfFirstAccountantAppVedOrdRequest,
    indexOfLastAccountantAppVedOrdRequest
  );
  const totalPages = Math.ceil(
    filteredAccountantAppVedOrdRequest.length / AccountantAppVedOrdRequestPerPage
  );

  return {
    indexOfLastAccountantAppVedOrdRequest,
    indexOfFirstAccountantAppVedOrdRequest,
    AccountantAppVedOrdRequest,
    filteredAccountantAppVedOrdRequest,
    searchTerm,
    currentPage,
    AccountantAppVedOrdRequestPerPage,
    sortConfig,
    currentAccountantAppVedOrdRequest,
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
    toggleAddAccountantAppVedOrdRequest,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAccountantAppVedOrdRequestPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handelfetchDiscount,
  };
};

export default useViewAccountantAppVedOrdRequest;
