import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchRequestSellingProduct } from "../../api/RequestSellingProduct-Api/RequestSellingProductApi";

const useRequestSellingProduct = () => {
  const [RequestSellingProduct, setRequestSellingProduct] = useState<any[]>([]);
  const [filteredRequestSellingProduct, setFilteredRequestSellingProduct] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RequestSellingProductPerPage, setRequestSellingProductPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchRequestSellingProduct();
  }, []);

  const handleFetchRequestSellingProduct = async () => {
    setLoading(true)
    try {
      const response: any = await fetchRequestSellingProduct();
      const data = response?.data?.data || []
      setRequestSellingProduct(data);
      setFilteredRequestSellingProduct(data);
      setLoading(!data)
    } catch (error) {
      console.error("Error fetching Commision Note:", error);
      setLoading(false)
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRequestSellingProduct(
      RequestSellingProduct.filter(
        (note: any) =>
          note?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          note?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedNotes = [...filteredRequestSellingProduct].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRequestSellingProduct(sortedNotes);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RequestSellingProduct-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "RequestSellingProduct_data.xlsx");
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

    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  const indexOfLastRequestSellingProduct = currentPage * RequestSellingProductPerPage;
  const indexOfFirstRequestSellingProduct = indexOfLastRequestSellingProduct - RequestSellingProductPerPage;
  const currentRequestSellingProduct = filteredRequestSellingProduct.slice(
    indexOfFirstRequestSellingProduct,
    indexOfLastRequestSellingProduct
  );
  const totalPages = Math.ceil(filteredRequestSellingProduct.length / RequestSellingProductPerPage);

  return {
    indexOfLastRequestSellingProduct,
    indexOfFirstRequestSellingProduct,
    RequestSellingProduct,
    filteredRequestSellingProduct,
    searchTerm,
    currentPage,
    RequestSellingProductPerPage,
    sortConfig,
    currentRequestSellingProduct,
    totalPages,
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setRequestSellingProductPerPage,
  };
};

export default useRequestSellingProduct;
