import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  deleteFranchise,
  fetchFranchise,
} from "../../api/Franchise-Api/FranchiseApi";

const useViewFranchise = () => {
  const [franchises, setFranchises] = useState<String[]>([]);
  const [filteredFranchises, setFilteredFranchises] = useState<String[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [franchisesPerPage, setFranchisesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  // const [franchiseList, setfranchiseList] = useState<String[]>([]);
  const [franchiseList] = useState<String[]>([]);
  const [fromDate, setfromDate] = useState<any | undefined>();
  const [toDate, settodate] = useState<any | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchFranchises();
  }, []);

  const handleFetchFranchises = async () => {
    try {
      const response: any = await fetchFranchise();
      setFranchises(response.data);
      setFilteredFranchises(response.data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredFranchises(
      franchises.filter(
        (franchise: any) =>
          franchise?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          franchise?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedFranchises = [...filteredFranchises].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredFranchises(sortedFranchises);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("franchise-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "franchise_data.xlsx");
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

  const handleDeleteFranchise = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this franchise?"
      );
      if (!confirmDelete) return;
      const response = await deleteFranchise(id);
      if (response.status === 200) {
        handleFetchFranchises();
      } else {
        console.error("Failed to delete the franchise:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the franchise:", error);
      alert(
        "An error occurred while deleting the franchise. Please try again."
      );
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/Franchise/EditFranchise/${id}`);
  };

  const indexOfLastFranchise = currentPage * franchisesPerPage;
  const indexOfFirstFranchise = indexOfLastFranchise - franchisesPerPage;
  const currentFranchises = filteredFranchises.slice(
    indexOfFirstFranchise,
    indexOfLastFranchise
  );
  const totalPages = Math.ceil(filteredFranchises.length / franchisesPerPage);

  return {
    indexOfLastFranchise,
    indexOfFirstFranchise,
    franchises,
    filteredFranchises,
    searchTerm,
    currentPage,
    franchisesPerPage,
    sortConfig,
    currentFranchises,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteFranchise,
    handleEdit,
    getVisiblePages,
    setFranchisesPerPage,
    setfromDate,
    settodate,
  };
};

export default useViewFranchise;
