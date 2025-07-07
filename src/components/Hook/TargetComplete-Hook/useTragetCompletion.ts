import { useEffect, useState, ChangeEvent } from "react";
import { utils, writeFile } from "xlsx";
import { TragetCompletionApi } from "../../api/SetTarget-Api/SetTargetApi";
import { fetchFranchiseApi } from "../../api/Franchise-Api/FranchiseApi";

// Define types
interface TargetCompletionItem {
  id: number;
  Name: string;
  [key: string]: any;
}

interface FormValues {
  month: string;
  year: string;
  photo?: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useTragetCompletion = () => {
  const [TargetCompletion, setTargetCompletion] = useState<TargetCompletionItem[]>([]);
  const [filteredTargetCompletion, setFilteredTargetCompletion] = useState<TargetCompletionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TargetCompletionPerPage, setTargetCompletionPerPage] = useState<number>(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<Date | null>(null);
  const [toDate, settodate] = useState<Date | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [selectFranchise , setSelectFranchise] = useState<string>("");
  const [formValues, setFormValues] = useState<FormValues>({
    month: "",
    year: "",
  });


    useEffect(() => {
    handleFetchTargetCompletion();
    handleFetchFranchises();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      if (files && files[0]) {
        const url = URL.createObjectURL(files[0]);
        setFormValues((prev) => ({
          ...prev,
          photo: url,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

    const handleFetchFranchises = async () => {
      try {
        const response: any = await fetchFranchiseApi();
        const data = response?.data?.data || [];
        setfranchiseList(data);
      } catch (error) {
        console.error("Error fetching franchises:", error);
      }
    };

  const handleFetchTargetCompletion = async () => {
    try {
      const response: any = await TragetCompletionApi({});
      const data = response?.data?.data || [];
      setTargetCompletion(data);
      setFilteredTargetCompletion(data);
    } catch (error) {
      console.error("Error fetching TargetCompletion:", error);
    }
  };



  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = TargetCompletion.filter((item) =>
      item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
      item?.id?.toString().includes(term.toLowerCase())
    );
    setFilteredTargetCompletion(filtered);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredTargetCompletion].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredTargetCompletion(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TargetCompletion-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "TargetCompletion_data.xlsx");
  };

  const totalPages = Math.ceil(filteredTargetCompletion.length / TargetCompletionPerPage);

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const indexOfLastTargetCompletion = currentPage * TargetCompletionPerPage;
  const indexOfFirstTargetCompletion = indexOfLastTargetCompletion - TargetCompletionPerPage;
  const currentTargetCompletion = filteredTargetCompletion.slice(
    indexOfFirstTargetCompletion,
    indexOfLastTargetCompletion
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
    selectFranchise , 
    setSelectFranchise,
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
