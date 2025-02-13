import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchFinancer,
  deletFinancer,
} from "../../../api/Financer-Api/FinancerAccount/FinancerAccountApi";

const useViewCommission = () => {
  const [Commissions, setCommissions] = useState([]);
  const [filteredCommission, setfilteredCommission] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [CommissionPerPage, setCommissionPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handlefetchFinancers();
  }, []);

  const handlefetchFinancers = async () => {
    try {
      const response: any = await fetchFinancer();
      setCommissions(response.data);
      setfilteredCommission(response.data);
    } catch (error) {
      console.error("Error fetching Commissions:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setfilteredCommission(
      Commissions.filter(
        (Commission: any) =>
          Commission?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Commission?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedCommissions = [...filteredCommission].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setfilteredCommission(sortedCommissions);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Commission-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Commission_data.xlsx");
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

  const handleDeleteCommission = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Commission?"
      );
      if (!confirmDelete) return;
      const response = await deletFinancer(id);
      if (response.status === 201) {
        handlefetchFinancers();
      } else {
        console.error("Failed to delete the Commission:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Commission:", error);
      alert(
        "An error occurred while deleting the Commission. Please try again."
      );
    }
  };

  // const handleEdit = (id: number) => {
  //   // navigate(`/Products/EditCommission/${id}`);
  // };

  const handleEdit = () => {
    // navigate(`/Products/EditCommission/${id}`);
  };

  const indexOfLastCommission = currentPage * CommissionPerPage;
  const indexOfFirstCommission = indexOfLastCommission - CommissionPerPage;
  const currentCommissions = filteredCommission.slice(
    indexOfFirstCommission,
    indexOfLastCommission
  );
  const totalPages = Math.ceil(filteredCommission.length / CommissionPerPage);

  return {
    indexOfLastCommission,
    indexOfFirstCommission,
    Commissions,
    filteredCommission,
    searchTerm,
    currentPage,
    CommissionPerPage,
    sortConfig,
    currentCommissions,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteCommission,
    handleEdit,
    getVisiblePages,
    setCommissionPerPage,
  };
};

export default useViewCommission;
