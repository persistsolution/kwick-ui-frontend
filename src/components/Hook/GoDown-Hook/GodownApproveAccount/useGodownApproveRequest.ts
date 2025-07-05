import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownApproveRequestApi } from "../../../api/GoDown-Api/Transfer-Stock/TransferStockApi";

interface GodownApproveRequest {
  id: number;
  Name?: string;
  [key: string]: any;
}

const useGodownApproveRequest = () => {
  const [viewGodownApproveRequest, setviewGodownApproveRequest] = useState<GodownApproveRequest[]>([]);
  const [filteredviewGodownApproveRequest, setFilteredviewGodownApproveRequest] = useState<GodownApproveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewGodownApproveRequestPerPage, setviewGodownApproveRequestPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchviewGodownApproveRequest();
  }, []);

  const handleFetchviewGodownApproveRequest = async () => {
    setLoading(true);
    try {
      const response: any = await fetchGodownApproveRequestApi();
      const data: GodownApproveRequest[] = response?.data?.data || [];
      setviewGodownApproveRequest(data);
      setFilteredviewGodownApproveRequest(data);
      setLoading(!data); 
    } catch (error) {
      setLoading(false);
      console.error("Error fetching viewGodownApproveRequest:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownApproveRequest(
      viewGodownApproveRequest.filter((item: GodownApproveRequest) =>
        item?.godown_name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredviewGodownApproveRequest].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownApproveRequest(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownApproveRequest-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "GodownApproveRequest_data.xlsx");
    }
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  const indexOfLastGodownApproveRequest = currentPage * viewGodownApproveRequestPerPage;
  const indexOfFirstGodownApproveRequest = indexOfLastGodownApproveRequest - viewGodownApproveRequestPerPage;
  const currentviewGodownApproveRequest = filteredviewGodownApproveRequest.slice(
    indexOfFirstGodownApproveRequest,
    indexOfLastGodownApproveRequest
  );
  const totalPages = Math.ceil(filteredviewGodownApproveRequest.length / viewGodownApproveRequestPerPage);

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
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setviewGodownApproveRequestPerPage,
  };
};

export default useGodownApproveRequest;
