import { useState } from "react";
import { utils, writeFile } from "xlsx";
import { TargetCompletionReportApi } from "../../api/SetTarget-Api/SetTargetApi";

const useTargetCompletionReport = () => {
  const [TargetCompletionReport, setTargetCompletionReport] = useState([]);
  const [filteredTargetCompletionReport, setFilteredTargetCompletionReport] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [TargetCompletionReportPerPage, setTargetCompletionReportPerPage] =
    useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<any>();
  const [toDate, settodate] = useState<any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  const [formValues, setFormValues] = useState({
    month: "",
    year: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files: any = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo: url,
      }));
    } else {
      const updatedValues = {
        ...formValues,
        [name]: value,
      };

      setFormValues(updatedValues);
    }
  };
  const handleFetchTargetCompletionReport = async () => {
    const raw = {};
    try {
      const response: any = await TargetCompletionReportApi(raw);
      setTargetCompletionReport(response.data);
      setFilteredTargetCompletionReport(response.data);
    } catch (error) {
      console.error("Error fetching TargetCompletionReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTargetCompletionReport(
      TargetCompletionReport.filter(
        (TargetCompletionReport: any) =>
          TargetCompletionReport?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          TargetCompletionReport?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedTargetCompletionReport = [
      ...filteredTargetCompletionReport,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredTargetCompletionReport(sortedTargetCompletionReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TargetCompletionReport-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TargetCompletionReport_data.xlsx");
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

  const indexOfLastTargetCompletionReport =
    currentPage * TargetCompletionReportPerPage;
  const indexOfFirstTargetCompletionReport =
    indexOfLastTargetCompletionReport - TargetCompletionReportPerPage;
  const currentTargetCompletionReport = filteredTargetCompletionReport.slice(
    indexOfFirstTargetCompletionReport,
    indexOfLastTargetCompletionReport
  );
  const totalPages = Math.ceil(
    filteredTargetCompletionReport.length / TargetCompletionReportPerPage
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
