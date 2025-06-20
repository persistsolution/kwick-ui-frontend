// useViewDiscountInvoiceReport2025.ts
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchDiscountReportApi } from "../../api/FranchiseReport2025/FranchiseReport2025Api";

export interface DiscountInvoiceItem {
  id: number;
  Name?: string;
  invoiceNo?: string;
  franchise?: string;
  totalAmount?: number;
  discount?: number;
  paymentType?: string;
  date?: string;
  [key: string]: unknown; 
}

export interface SelectOption {
  label: string;
  value: string | number;
  id?: number;
}

const useViewDiscountInvoiceReport2025 = () => {
  const [DiscountInvoiceReport2025, setDiscountInvoiceReport2025] = useState<DiscountInvoiceItem[]>([]);
  const [filteredDiscountInvoiceReport2025, setFilteredDiscountInvoiceReport2025] = useState<DiscountInvoiceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [DiscountInvoiceReport2025PerPage, setDiscountInvoiceReport2025PerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [franchiseArray, setfranchiseArray] = useState<SelectOption[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [reportTypeArray] = useState<SelectOption[]>([
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "This Week", value: "Week" },
    { label: "This Month", value: "Month" },
    { label: "Custom", value: "Custom" },
  ]);
  const [paymentTypeArray] = useState<SelectOption[]>([
    { label: "All", value: "all" },
    { label: "Cash", value: "Cash" },
    { label: "Phone Pay", value: "Phone Pay" },
    { label: "Google Pay", value: "UPI" },
    { label: "Paytm", value: "Paytm" },
    { label: "Other UPI", value: "Other UPI" },
    { label: "Credit / उधार", value: "Borrowing" },
    { label: "Zomato", value: "Zomato" },
  ]);
  const [countryArray, setcountryArray] = useState<any[]>([]);

  // selections
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settodate] = useState<string>("");
  const [selectState, setSelectState] = useState<string>("");
  const [selectFranchise, setSelectFranchise] = useState<string>("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState<string>("");
  const [selectReport, setSelectReport] = useState<string>("");
  const [selectPaymentType, setSelectPaymentType] = useState<string>("");

  // sorting
  const [sortConfig, setSortConfig] = useState<{ key: keyof DiscountInvoiceItem | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    handleFetchDiscountInvoiceReport2025();
  }, []);

  const handleFetchDiscountInvoiceReport2025 = async () => {
    setLoading(true);
    try {
      const response: any = await fetchDiscountReportApi();
      const data: DiscountInvoiceItem[] = response?.data?.data || [];
      setDiscountInvoiceReport2025(data);
      setFilteredDiscountInvoiceReport2025(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching DiscountInvoiceReport2025:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowered = term.toLowerCase();
    setFilteredDiscountInvoiceReport2025(
      DiscountInvoiceReport2025.filter(
        (item) => item?.Name?.toLowerCase().includes(lowered) || item.id.toString().includes(lowered)
      )
    );
  };

  const handleSort = (key: keyof DiscountInvoiceItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

    const sorted = [...filteredDiscountInvoiceReport2025].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredDiscountInvoiceReport2025(sorted);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const exportToExcel = () => {
    const table = document.getElementById("DiscountInvoiceReport2025-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "DiscountInvoiceReport2025_data.xlsx");
  };

  const totalPages = Math.ceil(filteredDiscountInvoiceReport2025.length / DiscountInvoiceReport2025PerPage);
  const indexOfLast = currentPage * DiscountInvoiceReport2025PerPage;
  const indexOfFirst = indexOfLast - DiscountInvoiceReport2025PerPage;
  const currentData = filteredDiscountInvoiceReport2025.slice(indexOfFirst, indexOfLast);

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    indexOfFirstDiscountInvoiceReport2025: indexOfFirst,
    indexOfLastDiscountInvoiceReport2025: indexOfLast,
    currentDiscountInvoiceReport2025: currentData,
    totalPages,
    getVisiblePages,
    DiscountInvoiceReport2025,
    filteredDiscountInvoiceReport2025,
    searchTerm,
    currentPage,
    DiscountInvoiceReport2025PerPage,
    sortConfig,
    loading,
    franchiseList,
    categoryList,
    franchiseArray,
    godownProductArray,
    reportTypeArray,
    paymentTypeArray,
    countryArray,
    fromDate,
    toDate,
    selectState,
    selectFranchise,
    selectFranchiseProduct,
    selectReport,
    selectPaymentType,
    setDiscountInvoiceReport2025PerPage,
    setfromDate,
    settodate,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
    setSelectReport,
    setSelectPaymentType,
    setfranchiseList,
    setcategoryList,
    setfranchiseArray,
    setgodownProductArray,
    setcountryArray,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
  };
};

export default useViewDiscountInvoiceReport2025;
