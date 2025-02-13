import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCommisionNoteApi } from "../../../api/FinancerPatner-Api/CommisionNoteApi";

const useCommisionNote = () => {
  const [CommisionNote, setCommisionNote] = useState([]);
  const [filteredCommisionNote, setFilteredCommisionNote] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [CommisionNotePerPage, setCommisionNotePerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchCommisionNote();
  }, []);

  const handleFetchCommisionNote = async () => {
    try {
      const response: any = await fetchCommisionNoteApi();
      setCommisionNote(response.data);
      setFilteredCommisionNote(response.data);
    } catch (error) {
      console.error("Error fetching Commision Note:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredCommisionNote(
      CommisionNote.filter(
        (CommisionNote: any) =>
          CommisionNote?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          CommisionNote?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedCommisionNote = [...filteredCommisionNote].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCommisionNote(sortedCommisionNote);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("CommisionNote-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "CommisionNote_data.xlsx");
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


  const indexOfLastCommisionNote = currentPage * CommisionNotePerPage;
  const indexOfFirstCommisionNote = indexOfLastCommisionNote - CommisionNotePerPage;
  const currentCommisionNote = filteredCommisionNote.slice(
    indexOfFirstCommisionNote,
    indexOfLastCommisionNote
  );
  const totalPages = Math.ceil(filteredCommisionNote.length / CommisionNotePerPage);

  return {
    indexOfLastCommisionNote,
    indexOfFirstCommisionNote,
    CommisionNote,
    filteredCommisionNote,
    searchTerm,
    currentPage,
    CommisionNotePerPage,
    sortConfig,
    currentCommisionNote,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setCommisionNotePerPage,
  };
};

export default useCommisionNote;
