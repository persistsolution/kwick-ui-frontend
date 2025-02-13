import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownApproveRequestApi } from "../../../api/GoDown-Api/Transfer-Stock/TransferStockApi";

const useGodownApproveRequest = () => {
  const [viewGodownApproveRequest, setviewGodownApproveRequest] = useState([]);
  const [
    filteredviewGodownApproveRequest,
    setFilteredviewGodownApproveRequest,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGodownApproveRequestPerPage, setviewGodownApproveRequestPerPage] =
    useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchviewGodownApproveRequest();
  }, []);

  const handleFetchviewGodownApproveRequest = async () => {
    try {
      const response: any = await fetchGodownApproveRequestApi();
      setviewGodownApproveRequest(response.data);
      setFilteredviewGodownApproveRequest(response.data);
    } catch (error) {
      console.error("Error fetching viewGodownApproveRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownApproveRequest(
      viewGodownApproveRequest.filter(
        (GodownApproveRequest: any) =>
          GodownApproveRequest?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || GodownApproveRequest?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewGodownApproveRequest = [
      ...filteredviewGodownApproveRequest,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownApproveRequest(sortedviewGodownApproveRequest);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownApproveRequest-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownApproveRequest_data.xlsx");
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

  const indexOfLastGodownApproveRequest =
    currentPage * viewGodownApproveRequestPerPage;
  const indexOfFirstGodownApproveRequest =
    indexOfLastGodownApproveRequest - viewGodownApproveRequestPerPage;
  const currentviewGodownApproveRequest =
    filteredviewGodownApproveRequest.slice(
      indexOfFirstGodownApproveRequest,
      indexOfLastGodownApproveRequest
    );
  const totalPages = Math.ceil(
    filteredviewGodownApproveRequest.length / viewGodownApproveRequestPerPage
  );

  return {
    indexOfLastGodownApproveRequest,
    indexOfFirstGodownApproveRequest,
    viewGodownApproveRequest,
    filteredviewGodownApproveRequest,
    searchTerm,
    currentPage,
    viewGodownApproveRequestPerPage,
    sortConfig,
    currentviewGodownApproveRequest,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setviewGodownApproveRequestPerPage,
  };
};

export default useGodownApproveRequest;
