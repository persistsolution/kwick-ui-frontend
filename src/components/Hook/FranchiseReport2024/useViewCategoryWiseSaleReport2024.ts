import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewCategoryWiseSaleReport2024 = () => {
  const [CategoryWiseSaleReport2024, setCategoryWiseSaleReport2024] = useState(
    []
  );
  const [
    filteredCategoryWiseSaleReport2024,
    setFilteredCategoryWiseSaleReport2024,
  ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    CategoryWiseSaleReport2024PerPage,
    setCategoryWiseSaleReport2024PerPage,
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
    handleFetchCategoryWiseSaleReport2024();
  }, []);

  const handleFetchCategoryWiseSaleReport2024 = async () => {
    try {
      const response: any = await "";
      const data = response.data || [];
      setCategoryWiseSaleReport2024(data);
      setFilteredCategoryWiseSaleReport2024(data);
    } catch (error) {
      console.error("Error fetching CategoryWiseSaleReport2024:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredCategoryWiseSaleReport2024(
      CategoryWiseSaleReport2024.filter(
        (CategoryWiseSaleReport2024: any) =>
          CategoryWiseSaleReport2024?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) ||
          CategoryWiseSaleReport2024?.id
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
    const sortedCategoryWiseSaleReport2024 = [
      ...filteredCategoryWiseSaleReport2024,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredCategoryWiseSaleReport2024(sortedCategoryWiseSaleReport2024);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("CategoryWiseSaleReport2024-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "CategoryWiseSaleReport2024_data.xlsx");
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

  const indexOfLastCategoryWiseSaleReport2024 =
    currentPage * CategoryWiseSaleReport2024PerPage;
  const indexOfFirstCategoryWiseSaleReport2024 =
    indexOfLastCategoryWiseSaleReport2024 - CategoryWiseSaleReport2024PerPage;
  const currentCategoryWiseSaleReport2024 =
    filteredCategoryWiseSaleReport2024.slice(
      indexOfFirstCategoryWiseSaleReport2024,
      indexOfLastCategoryWiseSaleReport2024
    );
  const totalPages = Math.ceil(
    filteredCategoryWiseSaleReport2024.length /
      CategoryWiseSaleReport2024PerPage
  );

  return {
    indexOfLastCategoryWiseSaleReport2024,
    indexOfFirstCategoryWiseSaleReport2024,
    CategoryWiseSaleReport2024,
    filteredCategoryWiseSaleReport2024,
    searchTerm,
    currentPage,
    CategoryWiseSaleReport2024PerPage,
    sortConfig,
    currentCategoryWiseSaleReport2024,
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
    setCategoryWiseSaleReport2024PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct,
  };
};

export default useViewCategoryWiseSaleReport2024;
