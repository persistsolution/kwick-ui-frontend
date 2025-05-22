import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useViewProductStockReport2025 = () => {
  const [ProductStockReport2025, setProductStockReport2025] = useState([]);
  const [filteredProductStockReport2025, setFilteredProductStockReport2025] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductStockReport2025PerPage, setProductStockReport2025PerPage] = useState(5);
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
    handleFetchProductStockReport2025();
  }, []);

  const handleFetchProductStockReport2025 = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
      setProductStockReport2025(data);
      setFilteredProductStockReport2025(data);
    } catch (error) {
      console.error("Error fetching ProductStockReport2025:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductStockReport2025(
      ProductStockReport2025.filter(
        (ProductStockReport2025: any) =>
          ProductStockReport2025?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          ProductStockReport2025?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedProductStockReport2025 = [...filteredProductStockReport2025].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductStockReport2025(sortedProductStockReport2025);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductStockReport2025-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductStockReport2025_data.xlsx");
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

  const indexOfLastProductStockReport2025 = currentPage * ProductStockReport2025PerPage;
  const indexOfFirstProductStockReport2025 =
    indexOfLastProductStockReport2025 - ProductStockReport2025PerPage;
  const currentProductStockReport2025 = filteredProductStockReport2025.slice(
    indexOfFirstProductStockReport2025,
    indexOfLastProductStockReport2025
  );
  const totalPages = Math.ceil(
    filteredProductStockReport2025.length / ProductStockReport2025PerPage
  );

  return {
    indexOfLastProductStockReport2025,
    indexOfFirstProductStockReport2025,
    ProductStockReport2025,
    filteredProductStockReport2025,
    searchTerm,
    currentPage,
    ProductStockReport2025PerPage,
    sortConfig,
    currentProductStockReport2025,
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
    setProductStockReport2025PerPage,
    setfranchiseList,
    setcategoryList,
    setSelectState,
    setSelectFranchise,
    setSelectFranchiseProduct
  };
};

export default useViewProductStockReport2025;
