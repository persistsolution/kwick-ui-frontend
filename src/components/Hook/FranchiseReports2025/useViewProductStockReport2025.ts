// useViewProductStockReport2025.ts
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchFranchiseStockReportApi } from "../../api/FranchiseReport2025/FranchiseReport2025Api";

type ProductStockItem = {
  id: number;
  franchise: string;
  productName: string;
  cateName: string;
  minQty: number;
  credit: number;
  debit: number;
  balance: number;
  srno:string
};

type SortKey = keyof ProductStockItem | null;
type SortDirection = "asc" | "desc";

const useViewProductStockReport2025 = () => {
  const [ProductStockReport2025, setProductStockReport2025] = useState<ProductStockItem[]>([]);
  const [filteredProductStockReport2025, setFilteredProductStockReport2025] = useState<ProductStockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductStockReport2025PerPage, setProductStockReport2025PerPage] = useState(5);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [franchiseArray, setfranchiseArray] = useState<any[]>([]);
  const [godownProductArray, setgodownProductArray] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settodate] = useState<string>("");
  const [selectState, setSelectState] = useState("");
  const [selectFranchise, setSelectFranchise] = useState("");
  const [selectFranchiseProduct, setSelectFranchiseProduct] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: null, direction: "asc" });
  const [countryArray, setcountryArray] = useState<any[]>([]);
  const [loading , setloading]=useState<boolean>(false);

  useEffect(() => {
    handleFetchProductStockReport2025();
  }, []);

  const handleFetchProductStockReport2025 = async () => {
    setloading(true)
    try {
      const response: any = await fetchFranchiseStockReportApi();
      const data: ProductStockItem[] = response?.data?.data || []
      setProductStockReport2025(data);
      setFilteredProductStockReport2025(data);
      setloading(!data)
    } catch (error) {
      console.error("Error fetching ProductStockReport2025:", error);
      setloading(false)
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const loweredTerm = term.toLowerCase();
    setFilteredProductStockReport2025(
      ProductStockReport2025.filter(item =>
        item.productName.toLowerCase().includes(loweredTerm) ||
        item.id.toString().includes(loweredTerm)
      )
    );
  };

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...filteredProductStockReport2025].sort((a, b) => {
      if (!key) return 0;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredProductStockReport2025(sortedData);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductStockReport2025-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "ProductStockReport2025_data.xlsx");
    }
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const indexOfLastProductStockReport2025 = currentPage * ProductStockReport2025PerPage;
  const indexOfFirstProductStockReport2025 = indexOfLastProductStockReport2025 - ProductStockReport2025PerPage;
  const currentProductStockReport2025 = filteredProductStockReport2025.slice(indexOfFirstProductStockReport2025, indexOfLastProductStockReport2025);
  const totalPages = Math.ceil(filteredProductStockReport2025.length / ProductStockReport2025PerPage);

  return {
    indexOfLastProductStockReport2025,
    indexOfFirstProductStockReport2025,
    ProductStockReport2025,
    filteredProductStockReport2025,
    currentProductStockReport2025,
    searchTerm,
    currentPage,
    ProductStockReport2025PerPage,
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
    loading,
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
    setSelectFranchiseProduct,
    sortConfig
  };
};

export default useViewProductStockReport2025;
