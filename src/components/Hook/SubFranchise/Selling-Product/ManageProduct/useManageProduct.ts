import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchManageProducttApi } from "../../../../api/SubFranchise-API/Selling-ProductApi/Manage-ProdutApi/ManageProductApi";

const useManageProduct = () => {
  const [ManageProduct, setManageProduct] = useState([]);
  const [filteredManageProduct, setFilteredManageProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ManageProductPerPage, setManageProductPerPage] = useState(5);
  const [fromDate, setfromDate] =  useState("");
  const [toDate , settodate] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    handleFetchManageProduct();
  }, []);

  const handleFetchManageProduct = async () => {
    try {
      const response: any = await fetchManageProducttApi();
      setManageProduct(response.data);
      setFilteredManageProduct(response.data);
    } catch (error) {
      console.error("Error fetching ManageProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredManageProduct(
      ManageProduct.filter(
        (ManageProduct: any) =>
          ManageProduct?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          ManageProduct?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedManageProduct = [...filteredManageProduct].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredManageProduct(sortedManageProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ManageProduct-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ManageProduct_data.xlsx");
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


  const indexOfLastManageProduct = currentPage * ManageProductPerPage;
  const indexOfFirstManageProduct = indexOfLastManageProduct - ManageProductPerPage;
  const currentManageProduct = filteredManageProduct.slice(
    indexOfFirstManageProduct,
    indexOfLastManageProduct
  );
  const totalPages = Math.ceil(filteredManageProduct.length / ManageProductPerPage);

  return {
    indexOfLastManageProduct,
    indexOfFirstManageProduct,
    ManageProduct,
    filteredManageProduct,
    searchTerm,
    currentPage,
    ManageProductPerPage,
    sortConfig,
    currentManageProduct,
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
    setManageProductPerPage,
  };
};

export default useManageProduct;
