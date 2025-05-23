import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAdminApprovalVedOrdRequest = () => {
  const [AdminApprovalVedOrdRequest, setAdminApprovalVedOrdRequest] = useState([]);
  const [filteredAdminApprovalVedOrdRequest, setFilteredAdminApprovalVedOrdRequest] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AdminApprovalVedOrdRequestPerPage, setAdminApprovalVedOrdRequestPerPage] =
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
  const [toggleAddAdminApprovalVedOrdRequest, settoggleAddAdminApprovalVedOrdRequest] =
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
    handleFetchAdminApprovalVedOrdRequest();
  }, []);

  const handleFetchAdminApprovalVedOrdRequest = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setAdminApprovalVedOrdRequest(data);
      setFilteredAdminApprovalVedOrdRequest(data);
    } catch (error) {
      console.error("Error fetching AdminApprovalVedOrdRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAdminApprovalVedOrdRequest(
      AdminApprovalVedOrdRequest.filter(
        (AdminApprovalVedOrdRequest: any) =>
          AdminApprovalVedOrdRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || AdminApprovalVedOrdRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAdminApprovalVedOrdRequest = [...filteredAdminApprovalVedOrdRequest].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredAdminApprovalVedOrdRequest(sortedAdminApprovalVedOrdRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AdminApprovalVedOrdRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AdminApprovalVedOrdRequest_data.xlsx");
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

  const indexOfLastAdminApprovalVedOrdRequest =
    currentPage * AdminApprovalVedOrdRequestPerPage;
  const indexOfFirstAdminApprovalVedOrdRequest =
    indexOfLastAdminApprovalVedOrdRequest - AdminApprovalVedOrdRequestPerPage;
  const currentAdminApprovalVedOrdRequest = filteredAdminApprovalVedOrdRequest.slice(
    indexOfFirstAdminApprovalVedOrdRequest,
    indexOfLastAdminApprovalVedOrdRequest
  );
  const totalPages = Math.ceil(
    filteredAdminApprovalVedOrdRequest.length / AdminApprovalVedOrdRequestPerPage
  );

  return {
    indexOfLastAdminApprovalVedOrdRequest,
    indexOfFirstAdminApprovalVedOrdRequest,
    AdminApprovalVedOrdRequest,
    filteredAdminApprovalVedOrdRequest,
    searchTerm,
    currentPage,
    AdminApprovalVedOrdRequestPerPage,
    sortConfig,
    currentAdminApprovalVedOrdRequest,
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
    toggleAddAdminApprovalVedOrdRequest,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAdminApprovalVedOrdRequestPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handelfetchDiscount,
  };
};

export default useViewAdminApprovalVedOrdRequest;
