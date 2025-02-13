import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchGodownApi,
  deleteGodownAccount,
} from "../../../api/GoDown-Api/CreateGoDown/CreateGoDownApi";

const useViewGodownAccount = () => {
  const [viewGodownAccount, setviewGodownAccount] = useState([]);
  const [filteredviewGodownAccount, setFilteredviewGodownAccount] = useState(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGodownAccountPerPage, setviewGodownAccountPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchviewGodownAccount();
  }, []);

  const handleFetchviewGodownAccount = async () => {
    try {
      const response: any = await fetchGodownApi();
      setviewGodownAccount(response.data);
      setFilteredviewGodownAccount(response.data);
    } catch (error) {
      console.error("Error fetching viewGodownAccount:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownAccount(
      viewGodownAccount.filter(
        (GodownAccount: any) =>
          GodownAccount?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          GodownAccount?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewGodownAccount = [...filteredviewGodownAccount].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredviewGodownAccount(sortedviewGodownAccount);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownAccount-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownAccount_data.xlsx");
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

  const handleDeleteGodownAccount = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Godown Account?"
      );
      if (!confirmDelete) return;
      const response = await deleteGodownAccount(id);
      if (response.status === 201) {
        handleFetchviewGodownAccount();
      } else {
        console.error(
          "Failed to delete the Godown Account:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting the Godown Account:", error);
      alert(
        "An error occurred while deleting the Godown Account. Please try again."
      );
    }
  };

  const handleEdit = () => {};

  const indexOfLastGodownAccount = currentPage * viewGodownAccountPerPage;
  const indexOfFirstGodownAccount =
    indexOfLastGodownAccount - viewGodownAccountPerPage;
  const currentviewGodownAccount = filteredviewGodownAccount.slice(
    indexOfFirstGodownAccount,
    indexOfLastGodownAccount
  );
  const totalPages = Math.ceil(
    filteredviewGodownAccount.length / viewGodownAccountPerPage
  );

  return {
    indexOfLastGodownAccount,
    indexOfFirstGodownAccount,
    viewGodownAccount,
    filteredviewGodownAccount,
    searchTerm,
    currentPage,
    viewGodownAccountPerPage,
    sortConfig,
    currentviewGodownAccount,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteGodownAccount,
    handleEdit,
    getVisiblePages,
    setviewGodownAccountPerPage,
  };
};

export default useViewGodownAccount;
