import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchFinancerPatnerAccountApi } from "../../../api/FinancerPatner-Api/FinancerPatnerApi";

const useFinancerPatnerAccount = () => {
  const [FinancerPatnerAccount, setFinancerPatnerAccount] = useState([]);
  const [filteredFinancerPatnerAccount, setFilteredFinancerPatnerAccount] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [FinancerPatnerAccountPerPage, setFinancerPatnerAccountPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchFinancerPatnerAccount();
  }, []);

  const handleFetchFinancerPatnerAccount = async () => {
    try {
      const response: any = await fetchFinancerPatnerAccountApi();
      setFinancerPatnerAccount(response.data);
      setFilteredFinancerPatnerAccount(response.data);
    } catch (error) {
      console.error("Error fetching FinancerPatnerAccount:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredFinancerPatnerAccount(
      FinancerPatnerAccount.filter(
        (FinancerPatnerAccount: any) =>
          FinancerPatnerAccount?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          FinancerPatnerAccount?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedFinancerPatnerAccount = [...filteredFinancerPatnerAccount].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredFinancerPatnerAccount(sortedFinancerPatnerAccount);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("FinancerPatnerAccount-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "FinancerPatnerAccount_data.xlsx");
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


  const indexOfLastFinancerPatnerAccount = currentPage * FinancerPatnerAccountPerPage;
  const indexOfFirstFinancerPatnerAccount = indexOfLastFinancerPatnerAccount - FinancerPatnerAccountPerPage;
  const currentFinancerPatnerAccount = filteredFinancerPatnerAccount.slice(
    indexOfFirstFinancerPatnerAccount,
    indexOfLastFinancerPatnerAccount
  );
  const totalPages = Math.ceil(filteredFinancerPatnerAccount.length / FinancerPatnerAccountPerPage);

  return {
    indexOfLastFinancerPatnerAccount,
    indexOfFirstFinancerPatnerAccount,
    FinancerPatnerAccount,
    filteredFinancerPatnerAccount,
    searchTerm,
    currentPage,
    FinancerPatnerAccountPerPage,
    sortConfig,
    currentFinancerPatnerAccount,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setFinancerPatnerAccountPerPage,
  };
};

export default useFinancerPatnerAccount;
