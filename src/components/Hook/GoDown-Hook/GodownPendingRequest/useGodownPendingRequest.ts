import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownPendingRequestApi } from "../../../api/GoDown-Api/Transfer-Stock/TransferStockApi";

const useGodownPendingRequest = () => {
  const [viewGodownPendingRequest, setviewGodownPendingRequest] = useState([]);
  const [
    filteredviewGodownPendingRequest,
    setFilteredviewGodownPendingRequest,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGodownPendingRequestPerPage, setviewGodownPendingRequestPerPage] =
    useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchviewGodownPendingRequest();
  }, []);

  const handleFetchviewGodownPendingRequest = async () => {
    try {
      const response: any = await fetchGodownPendingRequestApi();
      setviewGodownPendingRequest(response.data);
      setFilteredviewGodownPendingRequest(response.data);
    } catch (error) {
      console.error("Error fetching viewGodownPendingRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownPendingRequest(
      viewGodownPendingRequest.filter(
        (GodownPendingRequest: any) =>
          GodownPendingRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || GodownPendingRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewGodownPendingRequest = [
      ...filteredviewGodownPendingRequest,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownPendingRequest(sortedviewGodownPendingRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownPendingRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownPendingRequest_data.xlsx");
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

  const indexOfLastGodownPendingRequest =
    currentPage * viewGodownPendingRequestPerPage;
  const indexOfFirstGodownPendingRequest =
    indexOfLastGodownPendingRequest - viewGodownPendingRequestPerPage;
  const currentviewGodownPendingRequest =
    filteredviewGodownPendingRequest.slice(
      indexOfFirstGodownPendingRequest,
      indexOfLastGodownPendingRequest
    );
  const totalPages = Math.ceil(
    filteredviewGodownPendingRequest.length / viewGodownPendingRequestPerPage
  );

  return {
    indexOfLastGodownPendingRequest,
    indexOfFirstGodownPendingRequest,
    viewGodownPendingRequest,
    filteredviewGodownPendingRequest,
    searchTerm,
    currentPage,
    viewGodownPendingRequestPerPage,
    sortConfig,
    currentviewGodownPendingRequest,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setviewGodownPendingRequestPerPage,
  };
};

export default useGodownPendingRequest;
