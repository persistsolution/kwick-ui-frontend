import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchTransferStockToFofoFrApi,
  deleteTransferStockToFofoFr,
} from "../../../../api/GoDown-Api/Transfer-Stock/TransferStockFofoFrApi";
import { useNavigate } from "react-router-dom";
import { fetchFranchiseApi } from "../../../../api/Franchise-Api/FranchiseApi";

interface TransferStockToFofoFr {
  id: number;
  Name?: string;
  [key: string]: any;
}

interface Franchise {
  id: number;
  full_name: string;
  [key: string]: any;
}

const useViewTransferStockToFofoFr = () => {
  const [viewTransferStockToFofoFr, setviewTransferStockToFofoFr] = useState<TransferStockToFofoFr[]>([]);
  const [filteredviewTransferStockToFofoFr, setFilteredviewTransferStockToFofoFr] = useState<TransferStockToFofoFr[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewTransferStockToFofoFrPerPage, setviewTransferStockToFofoFrPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [fromDate, setfromDate] = useState<Date | string | any>();
  const [toDate, settodate] = useState<Date | string | any>();
  const [FranchiseList, setFranchiseList] = useState<Franchise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectFranchise, setSelectFranchise] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchviewTransferStockToFofoFr();
    handleFetchFranchises();
  }, []);

  const handleFetchFranchises = async () => {
    try {
      const response: any = await fetchFranchiseApi();
      const data: Franchise[] = response?.data?.data || [];
      setFranchiseList(data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  const handleFetchviewTransferStockToFofoFr = async () => {
    setLoading(true);
    try {
      const response: any = await fetchTransferStockToFofoFrApi();
      const data: TransferStockToFofoFr[] = response?.data?.data || [];
      setviewTransferStockToFofoFr(data);
      setFilteredviewTransferStockToFofoFr(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching viewTransferStockToFofoFr:", error);
      setLoading(false);
    }
  };

  const handelNavigatetoTransferFofo = () => {
    navigate("/GoDown/TransferStockGodownToFofoFr");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewTransferStockToFofoFr(
      viewTransferStockToFofoFr.filter((item) =>
        item?.franchise_name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewTransferStockToFofoFr = [...filteredviewTransferStockToFofoFr].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewTransferStockToFofoFr(sortedviewTransferStockToFofoFr);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferStockToFofoFr-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "TransferStockToFofoFr_data.xlsx");
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

  const handleDeleteTransferStockToFofoFr = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Godown Stock?");
      if (!confirmDelete) return;
      const response = await deleteTransferStockToFofoFr(id);
      if (response.status === 201) {
        handleFetchviewTransferStockToFofoFr();
      } else {
        console.error("Failed to delete the Godown Stock:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Godown Stock:", error);
      alert("An error occurred while deleting the Godown Stock. Please try again.");
    }
  };

  const handleEdit = () => {};

  const indexOfLastTransferStockToFofoFr = currentPage * viewTransferStockToFofoFrPerPage;
  const indexOfFirstTransferStockToFofoFr = indexOfLastTransferStockToFofoFr - viewTransferStockToFofoFrPerPage;
  const currentviewTransferStockToFofoFr = filteredviewTransferStockToFofoFr.slice(
    indexOfFirstTransferStockToFofoFr,
    indexOfLastTransferStockToFofoFr
  );
  const totalPages = Math.ceil(filteredviewTransferStockToFofoFr.length / viewTransferStockToFofoFrPerPage);

  return {
    indexOfLastTransferStockToFofoFr,
    indexOfFirstTransferStockToFofoFr,
    viewTransferStockToFofoFr,
    filteredviewTransferStockToFofoFr,
    searchTerm,
    currentPage,
    viewTransferStockToFofoFrPerPage,
    sortConfig,
    currentviewTransferStockToFofoFr,
    totalPages,
    fromDate,
    toDate,
    FranchiseList,
    loading,
    setSelectFranchise,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteTransferStockToFofoFr,
    handleEdit,
    getVisiblePages,
    setviewTransferStockToFofoFrPerPage,
    setfromDate,
    settodate,
    setFranchiseList,
    handelNavigatetoTransferFofo,
  };
};

export default useViewTransferStockToFofoFr;
