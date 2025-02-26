import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchTransferStockToCocoFrApi,
  deleteTransferStockToCocoFr,
} from "../../../../api/GoDown-Api/Transfer-Stock/TransferStockApi";

const useViewTransferStockToCocoFr = () => {
  const [viewTransferStockToCocoFr, setviewTransferStockToCocoFr] = useState(
    []
  );
  const [
    filteredviewTransferStockToCocoFr,
    setFilteredviewTransferStockToCocoFr,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    viewTransferStockToCocoFrPerPage,
    setviewTransferStockToCocoFrPerPage,
  ] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [FranchiseList, setFranchiseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchviewTransferStockToCocoFr();
  }, []);

  const handelNavigatetoTransferCoco = () => {
    navigate("/GoDown/TransferStockGodownToFr");
  };

  const handleFetchviewTransferStockToCocoFr = async () => {
    try {
      const response: any = await fetchTransferStockToCocoFrApi();
      setviewTransferStockToCocoFr(response.data);
      setFilteredviewTransferStockToCocoFr(response.data);
    } catch (error) {
      console.error("Error fetching viewTransferStockToCocoFr:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewTransferStockToCocoFr(
      viewTransferStockToCocoFr.filter(
        (TransferStockToCocoFr: any) =>
          TransferStockToCocoFr?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          TransferStockToCocoFr?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewTransferStockToCocoFr = [
      ...filteredviewTransferStockToCocoFr,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewTransferStockToCocoFr(sortedviewTransferStockToCocoFr);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferStockToCocoFr-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TransferStockToCocoFr_data.xlsx");
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

  const handleDeleteTransferStockToCocoFr = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Godown Stock?"
      );
      if (!confirmDelete) return;
      const response = await deleteTransferStockToCocoFr(id);
      if (response.status === 201) {
        handleFetchviewTransferStockToCocoFr();
      } else {
        console.error(
          "Failed to delete the Godown Stock:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting the Godown Stock:", error);
      alert(
        "An error occurred while deleting the Godown Stock. Please try again."
      );
    }
  };

  const handleEdit = () => {};

  const indexOfLastTransferStockToCocoFr =
    currentPage * viewTransferStockToCocoFrPerPage;
  const indexOfFirstTransferStockToCocoFr =
    indexOfLastTransferStockToCocoFr - viewTransferStockToCocoFrPerPage;
  const currentviewTransferStockToCocoFr =
    filteredviewTransferStockToCocoFr.slice(
      indexOfFirstTransferStockToCocoFr,
      indexOfLastTransferStockToCocoFr
    );
  const totalPages = Math.ceil(
    filteredviewTransferStockToCocoFr.length / viewTransferStockToCocoFrPerPage
  );

  return {
    indexOfLastTransferStockToCocoFr,
    indexOfFirstTransferStockToCocoFr,
    viewTransferStockToCocoFr,
    filteredviewTransferStockToCocoFr,
    searchTerm,
    currentPage,
    viewTransferStockToCocoFrPerPage,
    sortConfig,
    currentviewTransferStockToCocoFr,
    totalPages,
    fromDate,
    toDate,
    FranchiseList,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteTransferStockToCocoFr,
    handleEdit,
    getVisiblePages,
    setviewTransferStockToCocoFrPerPage,
    setfromDate,
    settodate,
    setFranchiseList,
    handelNavigatetoTransferCoco,
  };
};

export default useViewTransferStockToCocoFr;
