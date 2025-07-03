import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchGodownApi,
  deleteGodownAccount,
} from "../../../api/GoDown-Api/CreateGoDown/CreateGoDownApi";
import { useNavigate } from "react-router-dom";

// Interfaces for types
interface GodownAccount {
  id: number;
  Name: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useViewGodownAccount = () => {
  const [viewGodownAccount, setviewGodownAccount] = useState<GodownAccount[]>([]);
  const [filteredviewGodownAccount, setFilteredviewGodownAccount] = useState<GodownAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewGodownAccountPerPage, setviewGodownAccountPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchviewGodownAccount();
  }, []);

  const handleFetchviewGodownAccount = async () => {
    setLoading(true);
    try {
      const response: any = await fetchGodownApi();
      const data: GodownAccount[] = response?.data?.data || [];
      setviewGodownAccount(data);
      setFilteredviewGodownAccount(data);
      setLoading(!data.length);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching viewGodownAccount:", error);
    }
  };

  const handleAddGodownAccount = () => {
    navigate("/GoDown/CreateGodownAccount");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownAccount(
      viewGodownAccount.filter(
        (GodownAccount: GodownAccount) =>
          GodownAccount?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          GodownAccount?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewGodownAccount = [...filteredviewGodownAccount].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownAccount(sortedviewGodownAccount);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownAccount-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownAccount_data.xlsx");
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handleDeleteGodownAccount = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Godown Account?"
      );
      if (!confirmDelete) return;

      const response = await deleteGodownAccount(id);
      if (response.status === 200) {
        handleFetchviewGodownAccount();
      } else {
        console.error("Failed to delete the Godown Account:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Godown Account:", error);
      alert("An error occurred while deleting the Godown Account. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/GoDown/EditGodownAccount/${id}`);
  };

  const indexOfLastGodownAccount = currentPage * viewGodownAccountPerPage;
  const indexOfFirstGodownAccount = indexOfLastGodownAccount - viewGodownAccountPerPage;
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
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteGodownAccount,
    handleEdit,
    getVisiblePages,
    setviewGodownAccountPerPage,
    handleAddGodownAccount,
  };
};

export default useViewGodownAccount;
