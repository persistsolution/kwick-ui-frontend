import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  fetchTransferStockToOtherFrApi,
  deleteTransferStockToOtherFr,
} from "../../../../api/GoDown-Api/Transfer-Stock/TransferStockApi";
import { useNavigate } from "react-router-dom";

const useViewTransferStockToOtherFr = () => {
  const [viewTransferStockToOtherFr, setviewTransferStockToOtherFr] = useState(
    []
  );
  const [
    filteredviewTransferStockToOtherFr,
    setFilteredviewTransferStockToOtherFr,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    viewTransferStockToOtherFrPerPage,
    setviewTransferStockToOtherFrPerPage,
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
    handleFetchviewTransferStockToOtherFr();
  }, []);

  const handleFetchviewTransferStockToOtherFr = async () => {
    try {
      const response: any = await fetchTransferStockToOtherFrApi();
      setviewTransferStockToOtherFr(response.data);
      setFilteredviewTransferStockToOtherFr(response.data);
    } catch (error) {
      console.error("Error fetching viewTransferStockToOtherFr:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewTransferStockToOtherFr(
      viewTransferStockToOtherFr.filter(
        (TransferStockToOtherFr: any) =>
          TransferStockToOtherFr?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          TransferStockToOtherFr?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewTransferStockToOtherFr = [
      ...filteredviewTransferStockToOtherFr,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewTransferStockToOtherFr(sortedviewTransferStockToOtherFr);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TransferStockToOtherFr-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TransferStockToOtherFr_data.xlsx");
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

  const handleDeleteTransferStockToOtherFr = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Godown Stock?"
      );
      if (!confirmDelete) return;
      const response = await deleteTransferStockToOtherFr(id);
      if (response.status === 201) {
        handleFetchviewTransferStockToOtherFr();
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

  const handelNavigatetoTransferOther = () => {
    navigate("/GoDown/TransferStockGodownToOtherFr");
  };

  const handleEdit = () => {};

  const indexOfLastTransferStockToOtherFr =
    currentPage * viewTransferStockToOtherFrPerPage;
  const indexOfFirstTransferStockToOtherFr =
    indexOfLastTransferStockToOtherFr - viewTransferStockToOtherFrPerPage;
  const currentviewTransferStockToOtherFr =
    filteredviewTransferStockToOtherFr.slice(
      indexOfFirstTransferStockToOtherFr,
      indexOfLastTransferStockToOtherFr
    );
  const totalPages = Math.ceil(
    filteredviewTransferStockToOtherFr.length /
      viewTransferStockToOtherFrPerPage
  );

  return {
    indexOfLastTransferStockToOtherFr,
    indexOfFirstTransferStockToOtherFr,
    viewTransferStockToOtherFr,
    filteredviewTransferStockToOtherFr,
    searchTerm,
    currentPage,
    viewTransferStockToOtherFrPerPage,
    sortConfig,
    currentviewTransferStockToOtherFr,
    totalPages,
    fromDate,
    toDate,
    FranchiseList,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteTransferStockToOtherFr,
    handleEdit,
    getVisiblePages,
    setviewTransferStockToOtherFrPerPage,
    setfromDate,
    settodate,
    setFranchiseList,
    handelNavigatetoTransferOther,
  };
};

export default useViewTransferStockToOtherFr;
