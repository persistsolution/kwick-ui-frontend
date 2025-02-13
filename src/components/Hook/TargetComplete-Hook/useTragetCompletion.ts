import { useState } from "react";
import { utils, writeFile } from "xlsx";
import { TragetCompletionApi } from "../../api/SetTarget-Api/SetTargetApi";

const useTragetCompletion = () => {
  const [TargetCompletion, setTargetCompletion] = useState([]);
  const [filteredTargetCompletion, setFilteredTargetCompletion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [TargetCompletionPerPage, setTargetCompletionPerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [fromDate, setfromDate] = useState<any>();
  const [toDate, settodate] = useState<any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  const [formValues, setFormValues] = useState({
    month: "",
    year: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files: any = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo: url,
      }));
    } else {
      const updatedValues = {
        ...formValues,
        [name]: value,
      };

      setFormValues(updatedValues);
    }
  };
  const handleFetchTargetCompletion = async () => {
    const raw = {};
    try {
      const response: any = await TragetCompletionApi(raw);
      setTargetCompletion(response.data);
      setFilteredTargetCompletion(response.data);
    } catch (error) {
      console.error("Error fetching TargetCompletion:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTargetCompletion(
      TargetCompletion.filter(
        (TargetCompletion: any) =>
          TargetCompletion?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          TargetCompletion?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedTargetCompletion = [...filteredTargetCompletion].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredTargetCompletion(sortedTargetCompletion);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TargetCompletion-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TargetCompletion_data.xlsx");
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

  const indexOfLastTargetCompletion = currentPage * TargetCompletionPerPage;
  const indexOfFirstTargetCompletion =
    indexOfLastTargetCompletion - TargetCompletionPerPage;
  const currentTargetCompletion = filteredTargetCompletion.slice(
    indexOfFirstTargetCompletion,
    indexOfLastTargetCompletion
  );
  const totalPages = Math.ceil(
    filteredTargetCompletion.length / TargetCompletionPerPage
  );

  return {
    indexOfLastTargetCompletion,
    indexOfFirstTargetCompletion,
    TargetCompletion,
    filteredTargetCompletion,
    searchTerm,
    currentPage,
    TargetCompletionPerPage,
    sortConfig,
    currentTargetCompletion,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    formValues,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setTargetCompletionPerPage,
    handleFetchTargetCompletion,
    handleChange,
    setfranchiseList,
    setcategoryList,
  };
};

export default useTragetCompletion;
