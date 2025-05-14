import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

const useViewProductionProducts = () => {
  const [ProductionProductsArray, setProductionProductsArray] = useState([]);
  const [filteredProductionProductsArray, setFilteredProductionProductsArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ProductionProductsPage, setProductionProductsPage] = useState(1);
  const [ProductionProductsPerPage, setProductionProductsPerPage] = useState(5);
  const [categoryList, setcategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetProductionProducts();
    handelGetProductionProducts();
    handelGetSubProductionProducts();
  }, []);

  const fetchGetProductionProducts = async () => {
    try {
      const response: any = await "";
      setProductionProductsArray(response.data);
      setFilteredProductionProductsArray(response.data);
    } catch (error) {
      console.error("Error fetching ProductionProducts:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductionProductsArray(
      ProductionProductsArray.filter(
        (ProductionProducts: any) =>
          ProductionProducts?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          ProductionProducts?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handelGetProductionProducts = async () => {
    try {
      const response: any = await "";
      const data = await response.data;
      setcategoryList(data);
    } catch (error) {
      console.error("Error adding ProductionProducts:", error);
    }
  };

  const handelGetSubProductionProducts = async () => {
    try {
      const response: any = await "";
      const data = response.data;
      setsubcategoryList(data);
    } catch (error) {
      console.error("Error adding ProductionProducts:", error);
    }
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProductionProducts = [...filteredProductionProductsArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductionProductsArray(sortedProductionProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setProductionProductsPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductionProducts-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductionProducts_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(ProductionProductsPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const handleDeleteProductionProducts = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this ProductionProducts?"
      );
      if (!confirmDelete) return;
      const response: any = await "";
      if (response.status === 200) {
        console.log("ProductionProducts deleted successfully:", response.data);
        fetchGetProductionProducts();
      } else {
        console.error("Failed to delete the ProductionProducts:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the ProductionProducts:", error);
      alert("An error occurred while deleting the ProductionProducts. Please try again.");
    }
  };

  const handelEditProductionProducts = (id: any) => {
    navigate(`/Production/AddProductionProduct${id}`);
  };

  const handelAddProductionProducts = () => {
    navigate(`/Production/AddProductionProduct`);
  };

  const indexOfLastProductionProducts = ProductionProductsPage * ProductionProductsPerPage;
  const indexOfFirstProductionProducts = indexOfLastProductionProducts - ProductionProductsPerPage;
  const currentProductionProducts = filteredProductionProductsArray?.slice(
    indexOfFirstProductionProducts,
    indexOfLastProductionProducts
  );
  const totalPages = Math.ceil(filteredProductionProductsArray?.length / ProductionProductsPerPage);

  return {
    searchTerm,
    currentProductionProducts,
    ProductionProductsPerPage,
    filteredProductionProductsArray,
    indexOfFirstProductionProducts,
    indexOfLastProductionProducts,
    ProductionProductsPage,
    totalPages,
    categoryList,
    subcategoryList,
    handelEditProductionProducts,
    handleDeleteProductionProducts,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductionProductsPerPage,
    handelAddProductionProducts,
  };
};

export default useViewProductionProducts;
