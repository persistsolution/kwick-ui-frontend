import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  fetchretailer,
  deleteretailer,
} from "../../../api/Retailer-Api/RetailerApi";

const useViewRetailer = () => {
  const [Retailers, setRetailers] = useState([]);
  const [filteredRetailers, setFilteredRetailers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RetailersPerPage, setRetailersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchRetailers();
  }, []);

  const handleFetchRetailers = async () => {
    try {
      const response: any = await fetchretailer();
      setRetailers(response.data);
      setFilteredRetailers(response.data);
    } catch (error) {
      console.error("Error fetching Retailers:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRetailers(
      Retailers.filter(
        (Retailer: any) =>
          Retailer?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Retailer?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRetailers = [...filteredRetailers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRetailers(sortedRetailers);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Retailer-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Retailer_data.xlsx");
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

  const handleDeleteRetailer = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Retailer?"
      );
      if (!confirmDelete) return;
      const response = await deleteretailer(id);
      if (response.status === 201) {
        handleFetchRetailers();
      } else {
        console.error("Failed to delete the Retailer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Retailer:", error);
      alert("An error occurred while deleting the Retailer. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/Products/EditRetailer/${id}`);
  };

  const indexOfLastRetailer = currentPage * RetailersPerPage;
  const indexOfFirstRetailer = indexOfLastRetailer - RetailersPerPage;
  const currentRetailers = filteredRetailers.slice(
    indexOfFirstRetailer,
    indexOfLastRetailer
  );
  const totalPages = Math.ceil(filteredRetailers.length / RetailersPerPage);

  return {
    indexOfLastRetailer,
    indexOfFirstRetailer,
    Retailers,
    filteredRetailers,
    searchTerm,
    currentPage,
    RetailersPerPage,
    sortConfig,
    currentRetailers,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteRetailer,
    handleEdit,
    getVisiblePages,
    setRetailersPerPage,
  };
};

export default useViewRetailer;
