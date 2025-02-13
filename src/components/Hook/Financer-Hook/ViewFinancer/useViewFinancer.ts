import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchFinancer,
  deletFinancer,
} from "../../../api/Financer-Api/FinancerAccount/FinancerAccountApi";

const useViewFinancer = () => {
  const [Financers, setFinancers] = useState([]);
  const [filteredFinancer, setfilteredFinancer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [FinancerPerPage, setFinancerPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchFinancers();
  }, []);

  const handleFetchFinancers = async () => {
    try {
      const response: any = await fetchFinancer();
      setFinancers(response.data);
      setfilteredFinancer(response.data);
    } catch (error) {
      console.error("Error fetching Financers:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setfilteredFinancer(
      Financers.filter(
        (Financer: any) =>
          Financer?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Financer?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedFinancers = [...filteredFinancer].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setfilteredFinancer(sortedFinancers);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Financer-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Financer_data.xlsx");
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

  const handleDeleteFinancer = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Financer?"
      );
      if (!confirmDelete) return;
      const response = await deletFinancer(id);
      if (response.status === 201) {
        handleFetchFinancers();
      } else {
        console.error("Failed to delete the Financer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Financer:", error);
      alert("An error occurred while deleting the Financer. Please try again.");
    }
  };

  // const handleEdit = (id: number) => {
  //   // navigate(`/Products/EditFinancer/${id}`);
  // };

  const handleEdit = () => {
    // navigate(`/Products/EditFinancer/${id}`);
  };

  const indexOfLastFinancer = currentPage * FinancerPerPage;
  const indexOfFirstFinancer = indexOfLastFinancer - FinancerPerPage;
  const currentFinancers = filteredFinancer.slice(
    indexOfFirstFinancer,
    indexOfLastFinancer
  );
  const totalPages = Math.ceil(filteredFinancer.length / FinancerPerPage);

  return {
    indexOfLastFinancer,
    indexOfFirstFinancer,
    Financers,
    filteredFinancer,
    searchTerm,
    currentPage,
    FinancerPerPage,
    sortConfig,
    currentFinancers,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteFinancer,
    handleEdit,
    getVisiblePages,
    setFinancerPerPage,
  };
};

export default useViewFinancer;
