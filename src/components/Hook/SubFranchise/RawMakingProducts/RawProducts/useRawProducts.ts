import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchRawProductApi } from "../../../../api/SubFranchise-API/RawMakingProduct/RawProductApi/RawProductApi";
const useRawProducts = () => {
  const [rawProduct, setrawProduct] = useState([]);
  const [filteredrawProduct, setFilteredrawProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rawProductPerPage, setrawProductPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchrawProduct();
  }, []);

  const handleFetchrawProduct = async () => {
    try {
      const response: any = await fetchRawProductApi();
      setrawProduct(response.data);
      setFilteredrawProduct(response.data);
    } catch (error) {
      console.error("Error fetching rawProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredrawProduct(
      rawProduct.filter(
        (rawProduct: any) =>
          rawProduct?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          rawProduct?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedrawProduct = [...filteredrawProduct].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredrawProduct(sortedrawProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("rawProduct-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "rawProduct_data.xlsx");
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


  const indexOfLastrawProduct = currentPage * rawProductPerPage;
  const indexOfFirstrawProduct = indexOfLastrawProduct - rawProductPerPage;
  const currentrawProduct = filteredrawProduct.slice(
    indexOfFirstrawProduct,
    indexOfLastrawProduct
  );
  const totalPages = Math.ceil(filteredrawProduct.length / rawProductPerPage);

  return {
    indexOfLastrawProduct,
    indexOfFirstrawProduct,
    rawProduct,
    filteredrawProduct,
    searchTerm,
    currentPage,
    rawProductPerPage,
    sortConfig,
    currentrawProduct,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setrawProductPerPage,
  };
};

export default useRawProducts;
