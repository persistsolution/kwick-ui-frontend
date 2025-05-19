import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

const useViewProductionRawProduct = () => {
  const [ProductionRawProductArray, setProductionRawProductArray] = useState([]);
  const [filteredProductionRawProductArray, setFilteredProductionRawProductArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ProductionRawProductPage, setProductionRawProductPage] = useState(1);
  const [ProductionRawProductPerPage, setProductionRawProductPerPage] = useState(5);
  const [categoryList, setcategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetProductionRawProduct();
    handelGetProductionRawProduct();
    handelGetSubProductionRawProduct();
  }, []);

  const fetchGetProductionRawProduct = async () => {
    try {
      const response: any = await "";
      setProductionRawProductArray(response.data);
      setFilteredProductionRawProductArray(response.data);
    } catch (error) {
      console.error("Error fetching ProductionRawProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductionRawProductArray(
      ProductionRawProductArray.filter(
        (ProductionRawProduct: any) =>
          ProductionRawProduct?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          ProductionRawProduct?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handelGetProductionRawProduct = async () => {
    try {
      const response: any = await "";
      const data = await response.data;
      setcategoryList(data);
    } catch (error) {
      console.error("Error adding ProductionRawProduct:", error);
    }
  };

  const handelGetSubProductionRawProduct = async () => {
    try {
      const response: any = await "";
      const data = response.data;
      setsubcategoryList(data);
    } catch (error) {
      console.error("Error adding ProductionRawProduct:", error);
    }
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProductionRawProduct = [...filteredProductionRawProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductionRawProductArray(sortedProductionRawProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setProductionRawProductPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductionRawProduct-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductionRawProduct_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(ProductionRawProductPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const handleDeleteProductionRawProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this ProductionRawProduct?"
      );
      if (!confirmDelete) return;
      const response: any = await "";
      if (response.status === 200) {
        console.log("ProductionRawProduct deleted successfully:", response.data);
        fetchGetProductionRawProduct();
      } else {
        console.error("Failed to delete the ProductionRawProduct:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the ProductionRawProduct:", error);
      alert("An error occurred while deleting the ProductionRawProduct. Please try again.");
    }
  };

  const handelEditProductionRawProduct = (id: any) => {
    navigate(`/Production/AddRawProductionProducts${id}`);
  };

  const handelAddProductionRawProduct = () => {
    navigate(`/Production/AddRawProductionProducts`);
  };

  const indexOfLastProductionRawProduct = ProductionRawProductPage * ProductionRawProductPerPage;
  const indexOfFirstProductionRawProduct = indexOfLastProductionRawProduct - ProductionRawProductPerPage;
  const currentProductionRawProduct = filteredProductionRawProductArray?.slice(
    indexOfFirstProductionRawProduct,
    indexOfLastProductionRawProduct
  );
  const totalPages = Math.ceil(filteredProductionRawProductArray?.length / ProductionRawProductPerPage);

  return {
    searchTerm,
    currentProductionRawProduct,
    ProductionRawProductPerPage,
    filteredProductionRawProductArray,
    indexOfFirstProductionRawProduct,
    indexOfLastProductionRawProduct,
    ProductionRawProductPage,
    totalPages,
    categoryList,
    subcategoryList,
    handelEditProductionRawProduct,
    handleDeleteProductionRawProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductionRawProductPerPage,
    handelAddProductionRawProduct,
  };
};

export default useViewProductionRawProduct;
