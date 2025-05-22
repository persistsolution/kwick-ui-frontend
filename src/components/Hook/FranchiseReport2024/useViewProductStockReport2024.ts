import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewProductStockReport2024 = () => {
  const [ProductStockReport2024, setProductStockReport2024] = useState([]);
  const [filteredProductStockReport2024, setFilteredProductStockReport2024] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductStockReport2024PerPage, setProductStockReport2024PerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [franchiseArray , setfranchiseArray] = useState([]);
  const [godownProductArray , setgodownProductArray] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [selectState , setSelectState] = useState("");
  const [selectFranchise , setSelectFranchise]= useState("");
  const [selectFranchiseProduct , setSelectFranchiseProduct]= useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
const [countryArray , setcountryArray]= useState([]);

  useEffect(() => {
    handleFetchProductStockReport2024();
  }, []);

  const handleFetchProductStockReport2024 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setProductStockReport2024(data);
      setFilteredProductStockReport2024(data);
    } catch (error) {
      console.error("Error fetching ProductStockReport2024:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductStockReport2024(
      ProductStockReport2024.filter(
        (ProductStockReport2024: any) =>
          ProductStockReport2024?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          ProductStockReport2024?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedProductStockReport2024 = [...filteredProductStockReport2024].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductStockReport2024(sortedProductStockReport2024);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductStockReport2024-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductStockReport2024_data.xlsx");
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

  const indexOfLastProductStockReport2024 = currentPage * ProductStockReport2024PerPage;
  const indexOfFirstProductStockReport2024 =
    indexOfLastProductStockReport2024 - ProductStockReport2024PerPage;
  const currentProductStockReport2024 = filteredProductStockReport2024.slice(
    indexOfFirstProductStockReport2024,
    indexOfLastProductStockReport2024
  );
  const totalPages = Math.ceil(
    filteredProductStockReport2024.length / ProductStockReport2024PerPage
  );

  return {
    indexOfLastProductStockReport2024,
    indexOfFirstProductStockReport2024,
    ProductStockReport2024,
    filteredProductStockReport2024,
    searchTerm,
    currentPage,
    ProductStockReport2024PerPage,
    sortConfig,
    currentProductStockReport2024,
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
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setProductStockReport2024PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useViewProductStockReport2024;
