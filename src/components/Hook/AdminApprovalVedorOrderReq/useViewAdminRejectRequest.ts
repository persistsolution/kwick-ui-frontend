import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAdminRejectVedOrdRequest = () => {
  const [AdminRejectVedOrdRequest, setAdminRejectVedOrdRequest] = useState([]);
  const [filteredAdminRejectVedOrdRequest, setFilteredAdminRejectVedOrdRequest] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AdminRejectVedOrdRequestPerPage, setAdminRejectVedOrdRequestPerPage] =
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
  const [toggleAddAdminRejectVedOrdRequest, settoggleAddAdminRejectVedOrdRequest] =
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
    handleFetchAdminRejectVedOrdRequest();
  }, []);

  const handleFetchAdminRejectVedOrdRequest = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setAdminRejectVedOrdRequest(data);
      setFilteredAdminRejectVedOrdRequest(data);
    } catch (error) {
      console.error("Error fetching Admin Reject Request:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAdminRejectVedOrdRequest(
      AdminRejectVedOrdRequest.filter(
        (AdminRejectVedOrdRequest: any) =>
          AdminRejectVedOrdRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || AdminRejectVedOrdRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAdminRejectVedOrdRequest = [...filteredAdminRejectVedOrdRequest].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredAdminRejectVedOrdRequest(sortedAdminRejectVedOrdRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AdminRejectVedOrdRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AdminRejectVedOrdRequest_data.xlsx");
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

  const indexOfLastAdminRejectVedOrdRequest =
    currentPage * AdminRejectVedOrdRequestPerPage;
  const indexOfFirstAdminRejectVedOrdRequest =
    indexOfLastAdminRejectVedOrdRequest - AdminRejectVedOrdRequestPerPage;
  const currentAdminRejectVedOrdRequest = filteredAdminRejectVedOrdRequest.slice(
    indexOfFirstAdminRejectVedOrdRequest,
    indexOfLastAdminRejectVedOrdRequest
  );
  const totalPages = Math.ceil(
    filteredAdminRejectVedOrdRequest.length / AdminRejectVedOrdRequestPerPage
  );

  return {
    indexOfLastAdminRejectVedOrdRequest,
    indexOfFirstAdminRejectVedOrdRequest,
    AdminRejectVedOrdRequest,
    filteredAdminRejectVedOrdRequest,
    searchTerm,
    currentPage,
    AdminRejectVedOrdRequestPerPage,
    sortConfig,
    currentAdminRejectVedOrdRequest,
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
    toggleAddAdminRejectVedOrdRequest,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAdminRejectVedOrdRequestPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handelfetchDiscount,
  };
};

export default useViewAdminRejectVedOrdRequest;
