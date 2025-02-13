import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownReturnProductApi } from "../../../api/GoDown-Api/GodownRetunProductApi/GodownRetunProductApi";
const useGoDownReturnProduct = () => {
  const [viewGodownReturnProduct, setviewGodownReturnProduct] = useState([]);
  const [filteredviewGodownReturnProduct, setFilteredviewGodownReturnProduct] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGodownReturnProductPerPage, setviewGodownReturnProductPerPage] =
    useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchviewGodownReturnProduct();
  }, []);

  const handleFetchviewGodownReturnProduct = async () => {
    try {
      const response: any = await fetchGodownReturnProductApi();
      setviewGodownReturnProduct(response.data);
      setFilteredviewGodownReturnProduct(response.data);
    } catch (error) {
      console.error("Error fetching viewGodownReturnProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownReturnProduct(
      viewGodownReturnProduct.filter(
        (GodownReturnProduct: any) =>
          GodownReturnProduct?.Name?.toLowerCase().includes(
            term.toLowerCase()
          ) || GodownReturnProduct?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewGodownReturnProduct = [
      ...filteredviewGodownReturnProduct,
    ].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownReturnProduct(sortedviewGodownReturnProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownReturnProduct-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownReturnProduct_data.xlsx");
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

  const indexOfLastGodownReturnProduct =
    currentPage * viewGodownReturnProductPerPage;
  const indexOfFirstGodownReturnProduct =
    indexOfLastGodownReturnProduct - viewGodownReturnProductPerPage;
  const currentviewGodownReturnProduct = filteredviewGodownReturnProduct.slice(
    indexOfFirstGodownReturnProduct,
    indexOfLastGodownReturnProduct
  );
  const totalPages = Math.ceil(
    filteredviewGodownReturnProduct.length / viewGodownReturnProductPerPage
  );

  return {
    indexOfLastGodownReturnProduct,
    indexOfFirstGodownReturnProduct,
    viewGodownReturnProduct,
    filteredviewGodownReturnProduct,
    searchTerm,
    currentPage,
    viewGodownReturnProductPerPage,
    sortConfig,
    currentviewGodownReturnProduct,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setviewGodownReturnProductPerPage,
  };
};

export default useGoDownReturnProduct;
