import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchFinancerPatnerAccountApi } from "../../../api/FinancerPatner-Api/FinancerPatnerApi";
import { useNavigate } from "react-router-dom";

const useFinancerPatnerAccount = () => {
  const [FinancerPatnerAccount, setFinancerPatnerAccount] = useState<any[]>([]);
  const [filteredFinancerPatnerAccount, setFilteredFinancerPatnerAccount] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [FinancerPatnerAccountPerPage, setFinancerPatnerAccountPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchFinancerPatnerAccount();
  }, []);

  const handleFetchFinancerPatnerAccount = async () => {
    setLoading(true)
    try {
      const response: any = await fetchFinancerPatnerAccountApi();
      const data = response?.data?.data || []
      setFinancerPatnerAccount(data);
      setFilteredFinancerPatnerAccount(data);
      setLoading(!data)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching FinancerPatnerAccount:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredFinancerPatnerAccount(
      FinancerPatnerAccount.filter(
        (account: any) =>
          account?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          account?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedAccounts = [...filteredFinancerPatnerAccount].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredFinancerPatnerAccount(sortedAccounts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("financer-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "financer_excel.xlsx");
    }
  };

  const handleAddFinancerPatnerAccount = () => {
    navigate("/FinancerPatner/AddFinancerPartnerAccount");
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
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setFinancerPatnerAccountPerPage,
    handleAddFinancerPatnerAccount,
  };
};

export default useFinancerPatnerAccount;
