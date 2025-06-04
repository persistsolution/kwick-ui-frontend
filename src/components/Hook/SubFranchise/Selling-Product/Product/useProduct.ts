import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchProductApi } from "../../../../api/SubFranchise-API/Selling-ProductApi/Product/ProductApi";

const useProduct = () => {
  const [Product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductPerPage, setProductPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState("");
  const [toDate , settodate] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchProduct();
  }, []);

  const handleFetchProduct = async () => {
    try {
      const response: any = await fetchProductApi();
      setProduct(response.data);
      setFilteredProduct(response.data);
    } catch (error) {
      console.error("Error fetching Product:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProduct(
      Product.filter(
        (Product: any) =>
          Product?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Product?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedProduct = [...filteredProduct].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProduct(sortedProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Product-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Product_data.xlsx");
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


  const indexOfLastProduct = currentPage * ProductPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage;
  const currentProduct = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProduct.length / ProductPerPage);

  return {
    indexOfLastProduct,
    indexOfFirstProduct,
    Product,
    filteredProduct,
    searchTerm,
    currentPage,
    ProductPerPage,
    sortConfig,
    currentProduct,
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
    setProductPerPage,
  };
};

export default useProduct;
