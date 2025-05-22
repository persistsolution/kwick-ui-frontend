import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewAdminPendingRequest = () => {
  const [AdminPendingRequest, setAdminPendingRequest] = useState([]);
  const [filteredAdminPendingRequest, setFilteredAdminPendingRequest] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AdminPendingRequestPerPage, setAdminPendingRequestPerPage] =
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
  const [toggleAddAdminPendingRequest, settoggleAddAdminPendingRequest] =
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
    handleFetchAdminPendingRequest();
  }, []);

  const handleFetchAdminPendingRequest = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setAdminPendingRequest(data);
      setFilteredAdminPendingRequest(data);
    } catch (error) {
      console.error("Error fetching AdminPendingRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredAdminPendingRequest(
      AdminPendingRequest.filter(
        (AdminPendingRequest: any) =>
          AdminPendingRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || AdminPendingRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAdminPendingRequest = [...filteredAdminPendingRequest].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredAdminPendingRequest(sortedAdminPendingRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AdminPendingRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AdminPendingRequest_data.xlsx");
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

  const indexOfLastAdminPendingRequest =
    currentPage * AdminPendingRequestPerPage;
  const indexOfFirstAdminPendingRequest =
    indexOfLastAdminPendingRequest - AdminPendingRequestPerPage;
  const currentAdminPendingRequest = filteredAdminPendingRequest.slice(
    indexOfFirstAdminPendingRequest,
    indexOfLastAdminPendingRequest
  );
  const totalPages = Math.ceil(
    filteredAdminPendingRequest.length / AdminPendingRequestPerPage
  );

  return {
    indexOfLastAdminPendingRequest,
    indexOfFirstAdminPendingRequest,
    AdminPendingRequest,
    filteredAdminPendingRequest,
    searchTerm,
    currentPage,
    AdminPendingRequestPerPage,
    sortConfig,
    currentAdminPendingRequest,
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
    toggleAddAdminPendingRequest,
    setSelectPaymentType,
    setSelectReport,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAdminPendingRequestPerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    handelfetchDiscount,
  };
};

export default useViewAdminPendingRequest;
