import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAccountantApprovalRequest = () => {
  const [AccountantApprovalRequest, setAccountantApprovalRequest] = useState([]);
  const [filteredAccountantApprovalRequest, setFilteredAccountantApprovalRequest] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AccountantApprovalRequestPerPage, setAccountantApprovalRequestPerPage] =
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
  const [toggleAddAccountantApprovalRequest, settoggleAddAccountantApprovalRequest] =
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
    handleFetchAccountantApprovalRequest();
  }, []);

  const handleFetchAccountantApprovalRequest = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setAccountantApprovalRequest(data);
      setFilteredAccountantApprovalRequest(data);
    } catch (error) {
      console.error("Error fetching AccountantApprovalRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAccountantApprovalRequest(
      AccountantApprovalRequest.filter(
        (AccountantApprovalRequest: any) =>
          AccountantApprovalRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || AccountantApprovalRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAccountantApprovalRequest = [...filteredAccountantApprovalRequest].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredAccountantApprovalRequest(sortedAccountantApprovalRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AccountantApprovalRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AccountantApprovalRequest_data.xlsx");
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

  const indexOfLastAccountantApprovalRequest =
    currentPage * AccountantApprovalRequestPerPage;
  const indexOfFirstAccountantApprovalRequest =
    indexOfLastAccountantApprovalRequest - AccountantApprovalRequestPerPage;
  const currentAccountantApprovalRequest = filteredAccountantApprovalRequest.slice(
    indexOfFirstAccountantApprovalRequest,
    indexOfLastAccountantApprovalRequest
  );
  const totalPages = Math.ceil(
    filteredAccountantApprovalRequest.length / AccountantApprovalRequestPerPage
  );

  return {
    indexOfLastAccountantApprovalRequest,
    indexOfFirstAccountantApprovalRequest,
    AccountantApprovalRequest,
    filteredAccountantApprovalRequest,
    searchTerm,
    currentPage,
    AccountantApprovalRequestPerPage,
    sortConfig,
    currentAccountantApprovalRequest,
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
    toggleAddAccountantApprovalRequest,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAccountantApprovalRequestPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handelfetchDiscount,
  };
};

export default useViewAccountantApprovalRequest;
