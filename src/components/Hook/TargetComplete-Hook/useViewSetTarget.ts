import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchSetTarget } from "../../api/SetTarget-Api/SetTargetApi";
const useViewSetTarget = () => {
  const [SetTarget, setSetTarget] = useState([]);
  const [filteredSetTarget, setFilteredSetTarget] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [SetTargetPerPage, setSetTargetPerPage] = useState(5);
  const [accountList, setaccountList] = useState([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchSetTarget();
  }, []);

  const handleFetchSetTarget = async () => {
    try {
      const response: any = await fetchSetTarget();
      setSetTarget(response.data);
      setFilteredSetTarget(response.data);
    } catch (error) {
      console.error("Error fetching SetTarget:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredSetTarget(
      SetTarget.filter(
        (SetTarget: any) =>
          SetTarget?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          SetTarget?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedSetTarget = [...filteredSetTarget].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredSetTarget(sortedSetTarget);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("SetTarget-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "SetTarget_data.xlsx");
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

  const indexOfLastSetTarget = currentPage * SetTargetPerPage;
  const indexOfFirstSetTarget = indexOfLastSetTarget - SetTargetPerPage;
  const currentSetTarget = filteredSetTarget.slice(
    indexOfFirstSetTarget,
    indexOfLastSetTarget
  );
  const totalPages = Math.ceil(filteredSetTarget.length / SetTargetPerPage);

  return {
    indexOfLastSetTarget,
    indexOfFirstSetTarget,
    SetTarget,
    filteredSetTarget,
    searchTerm,
    currentPage,
    SetTargetPerPage,
    sortConfig,
    currentSetTarget,
    totalPages,
    accountList,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setSetTargetPerPage,
    setaccountList,
  };
};

export default useViewSetTarget;
