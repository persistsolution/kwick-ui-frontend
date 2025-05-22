import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewCategoryWiseSaleReport2025 = () => {
  const [CategoryWiseSaleReport2025, setCategoryWiseSaleReport2025] = useState(
    []
  );
  const [
    filteredCategoryWiseSaleReport2025,
    setFilteredCategoryWiseSaleReport2025,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    CategoryWiseSaleReport2025PerPage,
    setCategoryWiseSaleReport2025PerPage,
  ] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [franchiseArray, setfranchiseArray] = useState([]);
  const [godownProductArray, setgodownProductArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState, setSelectState] = useState("");
  const [selectFranchise, setSelectFranchise] = useState("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [selectCategory , setSelectCategory] = useState("");
const [categoryArray, setCategoryArray] = useState([]);
const [countryArray, setcountryArray] = useState([]);

  useEffect(() => {
    handleFetchCategoryWiseSaleReport2025();
  }, []);

  const handleFetchCategoryWiseSaleReport2025 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setCategoryWiseSaleReport2025(data);
      setFilteredCategoryWiseSaleReport2025(data);
    } catch (error) {
      console.error("Error fetching CategoryWiseSaleReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredCategoryWiseSaleReport2025(
      CategoryWiseSaleReport2025.filter(
        (CategoryWiseSaleReport2025: any) =>
          CategoryWiseSaleReport2025?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          CategoryWiseSaleReport2025?.id
            ?.toString()
            .includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedCategoryWiseSaleReport2025 = [
      ...filteredCategoryWiseSaleReport2025,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCategoryWiseSaleReport2025(sortedCategoryWiseSaleReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("CategoryWiseSaleReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "CategoryWiseSaleReport2025_data.xlsx");
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

  const indexOfLastCategoryWiseSaleReport2025 =
    currentPage * CategoryWiseSaleReport2025PerPage;
  const indexOfFirstCategoryWiseSaleReport2025 =
    indexOfLastCategoryWiseSaleReport2025 - CategoryWiseSaleReport2025PerPage;
  const currentCategoryWiseSaleReport2025 =
    filteredCategoryWiseSaleReport2025.slice(
      indexOfFirstCategoryWiseSaleReport2025,
      indexOfLastCategoryWiseSaleReport2025
    );
  const totalPages = Math.ceil(
    filteredCategoryWiseSaleReport2025.length /
      CategoryWiseSaleReport2025PerPage
  );

  return {
    indexOfLastCategoryWiseSaleReport2025,
    indexOfFirstCategoryWiseSaleReport2025,
    CategoryWiseSaleReport2025,
    filteredCategoryWiseSaleReport2025,
    searchTerm,
    currentPage,
    CategoryWiseSaleReport2025PerPage,
    sortConfig,
    currentCategoryWiseSaleReport2025,
    totalPages,
    franchiseList,
    categoryList,
    fromDate,
    toDate,
    countryArray,
    selectState,
    franchiseArray,
    selectFranchise,
    selectFranchiseProduct,
    godownProductArray,
    selectCategory,
    categoryArray,
    setSelectCategory,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setCategoryWiseSaleReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewCategoryWiseSaleReport2025;
