import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchdailySellReportApi } from "../../api/Report-Api/dailySellReport";

interface DailySellReportItem {
  id: number;
  Name: string;
  [key: string]: any;
}

const useDailySellReport = () => {
  const [dailySellReport, setDailySellReport] = useState<DailySellReportItem[]>([]);
  const [filteredDailySellReport, setFilteredDailySellReport] = useState<DailySellReportItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dailySellReportPerPage, setDailySellReportPerPage] = useState<number>(5);
  const [franchiseList, setFranchiseList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<Date | string | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | string | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handlefetchdailySellReport();
  }, []);

  const handlefetchdailySellReport = async () => {
    setLoading(true)
    try {
      const response: any = await fetchdailySellReportApi();
      const data: DailySellReportItem[] = response?.data?.data || [];
      setDailySellReport(data);
      setFilteredDailySellReport(data);
      setLoading(!data)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching dailySellReport:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredDailySellReport(
      dailySellReport.filter((item: DailySellReportItem) =>
        item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedReport = [...filteredDailySellReport].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredDailySellReport(sortedReport);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("dailysellreport-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "dailySellReport_data.xlsx");
    }
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  const indexOfLastDailySellReport = currentPage * dailySellReportPerPage;
  const indexOfFirstDailySellReport = indexOfLastDailySellReport - dailySellReportPerPage;
  const currentDailySellReport = filteredDailySellReport.slice(
    indexOfFirstDailySellReport,
    indexOfLastDailySellReport
  );
  const totalPages = Math.ceil(filteredDailySellReport.length / dailySellReportPerPage);

  return {
    indexOfLastDailySellReport,
    indexOfFirstDailySellReport,
    dailySellReport,
    filteredDailySellReport,
    searchTerm,
    currentPage,
    dailySellReportPerPage,
    sortConfig,
    currentDailySellReport,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    loading,
    handleSearch,
    setToDate,
    setFromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setDailySellReportPerPage,
    setFranchiseList,
    setCategoryList,
  };
};

export default useDailySellReport;