import { useState, ChangeEvent, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import { TargetCompletionReportApi } from "../../api/SetTarget-Api/SetTargetApi";

// Define types
interface TargetCompletionItem {
  id: number;
  Name: string;
  [key: string]: any;
}

interface FormValues {
  month: string;
  year: string;
  photo?: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useTargetCompletionReport = () => {
  const [TargetCompletionReport, setTargetCompletionReport] = useState<TargetCompletionItem[]>([]);
  const [filteredTargetCompletionReport, setFilteredTargetCompletionReport] = useState<TargetCompletionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TargetCompletionReportPerPage, setTargetCompletionReportPerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<Date | null>(null);
  const [toDate, settodate] = useState<Date | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [loading ,setLoading]= useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormValues>({
    month: "",
    year: "",
  });

  useEffect(() => {
    handleFetchTargetCompletionReport();
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      if (files && files[0]) {
        const url = URL.createObjectURL(files[0]);
        setFormValues((prev) => ({
          ...prev,
          photo: url,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFetchTargetCompletionReport = async () => {
    setLoading(true)
    try {
      const response: any = await TargetCompletionReportApi({});
      const data = response?.data?.data || []
      setTargetCompletionReport(data);
      setFilteredTargetCompletionReport(data);
      setLoading(!response)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching TargetCompletionReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = TargetCompletionReport.filter((item) =>
      item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
      item?.id?.toString().includes(term.toLowerCase())
    );
    setFilteredTargetCompletionReport(filtered);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredTargetCompletionReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredTargetCompletionReport(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TargetCompletionReport-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TargetCompletionReport_data.xlsx");
  };

  const totalPages = Math.ceil(
    filteredTargetCompletionReport.length / TargetCompletionReportPerPage
  );

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const indexOfLastTargetCompletionReport = currentPage * TargetCompletionReportPerPage;
  const indexOfFirstTargetCompletionReport = indexOfLastTargetCompletionReport - TargetCompletionReportPerPage;
  const currentTargetCompletionReport = filteredTargetCompletionReport.slice(
    indexOfFirstTargetCompletionReport,
    indexOfLastTargetCompletionReport
  );

  return {
    indexOfLastTargetCompletionReport,
    indexOfFirstTargetCompletionReport,
    TargetCompletionReport,
    filteredTargetCompletionReport,
    searchTerm,
    currentPage,
    TargetCompletionReportPerPage,
    sortConfig,
    currentTargetCompletionReport,
    totalPages,
    franchiseList,
    loading,
    categoryList,
    fromDate,
    toDate,
    formValues,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setTargetCompletionReportPerPage,
    handleFetchTargetCompletionReport,
    handleChange,
    setfranchiseList,
    setcategoryList,
  };
};

export default useTargetCompletionReport;
