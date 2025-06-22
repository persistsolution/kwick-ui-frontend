import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchInventoryTopSellingPrdApi } from "../../../api/SubFranchise-API/InventoryStockReport/InventoryStockReportApi";

interface TopSellingProductType {
  id?: string | number;
  Name?: string;
  [key: string]: any;
}

const useViewTopSellingProduct = () => {
  const [TopSellingProduct, setTopSellingProduct] = useState<TopSellingProductType[]>([]);
  const [filteredTopSellingProduct, setFilteredTopSellingProduct] = useState<TopSellingProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TopSellingProductPerPage, setTopSellingProductPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | undefined>();
  const [toDate, settodate] = useState<Date | undefined>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchTopSellingProduct();
  }, []);

  const handleFetchTopSellingProduct = async () => {
    const frId = localStorage.getItem("frId")
    try {
      const response: any = await fetchInventoryTopSellingPrdApi(Number(frId));
      const data: TopSellingProductType[] = response?.data?.data || [];
      setTopSellingProduct(data);
      setFilteredTopSellingProduct(data);
    } catch (error) {
      console.error("Error fetching TopSellingProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredTopSellingProduct(
      TopSellingProduct.filter(
        (TopSellingProduct: TopSellingProductType) =>
          TopSellingProduct?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          TopSellingProduct?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedTopSellingProduct = [...filteredTopSellingProduct].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredTopSellingProduct(sortedTopSellingProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("TopSellingProduct-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "TopSellingProduct_data.xlsx");
    }
  };

  const totalPages = Math.ceil(filteredTopSellingProduct.length / TopSellingProductPerPage);

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

  const indexOfLastTopSellingProduct = currentPage * TopSellingProductPerPage;
  const indexOfFirstTopSellingProduct = indexOfLastTopSellingProduct - TopSellingProductPerPage;
  const currentTopSellingProduct = filteredTopSellingProduct.slice(
    indexOfFirstTopSellingProduct,
    indexOfLastTopSellingProduct
  );

  return {
    indexOfLastTopSellingProduct,
    indexOfFirstTopSellingProduct,
    TopSellingProduct,
    filteredTopSellingProduct,
    searchTerm,
    currentPage,
    TopSellingProductPerPage,
    sortConfig,
    currentTopSellingProduct,
    totalPages,
    fromDate,
    toDate,
    handleSearch,
    settodate,
    setfromDate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setTopSellingProductPerPage,
  };
};

export default useViewTopSellingProduct;
