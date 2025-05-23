import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  deleteProducts,
  fetchProducts,
} from "../../../api/Selling-Products-Api/ProductApi/productApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";

const useViewOtherProduct = () => {
  const [OtherProductArray, setOtherProductArray] = useState([]);
  const [filteredOtherProductArray, setFilteredOtherProductArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [OtherProductPage, setOtherProductPage] = useState(1);
  const [OtherProductPerPage, setOtherProductPerPage] = useState(5);
  const [categoryList, setcategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetOtherProduct();
    handelGetOtherProduct();
    handelGetSubOtherProduct();
  }, []);

  const fetchGetOtherProduct = async () => {
    try {
      const response: any = await fetchProducts();
      setOtherProductArray(response.data);
      setFilteredOtherProductArray(response.data);
    } catch (error) {
      console.error("Error fetching OtherProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredOtherProductArray(
      OtherProductArray.filter(
        (OtherProduct: any) =>
          OtherProduct?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          OtherProduct?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handelGetOtherProduct = async () => {
    try {
      const response: any = await fetchCategories();
      const data = await response.data;
      setcategoryList(data);
    } catch (error) {
      console.error("Error adding OtherProduct:", error);
    }
  };

  const handelGetSubOtherProduct = async () => {
    try {
      const response: any = await fetchSubCategories();
      const data = response.data;
      setsubcategoryList(data);
    } catch (error) {
      console.error("Error adding OtherProduct:", error);
    }
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedOtherProduct = [...filteredOtherProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredOtherProductArray(sortedOtherProduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setOtherProductPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("OtherProduct-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "OtherProduct_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(OtherProductPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const handleDeleteOtherProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this OtherProduct?"
      );
      if (!confirmDelete) return;
      const response = await deleteProducts(id);
      if (response.status === 200) {
        console.log("OtherProduct deleted successfully:", response.data);
        fetchGetOtherProduct();
      } else {
        console.error("Failed to delete the OtherProduct:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the OtherProduct:", error);
      alert("An error occurred while deleting the OtherProduct. Please try again.");
    }
  };

  const handelEditOtherProduct = (id: any) => {
    navigate(`/SellingOtherProduct/EditOtherProductFrom/${id}`);
  };

  const handelAddOtherProduct = () => {
    navigate(`/SellingOtherProduct/AddOtherProductForm`);
  };

  const indexOfLastOtherProduct = OtherProductPage * OtherProductPerPage;
  const indexOfFirstOtherProduct = indexOfLastOtherProduct - OtherProductPerPage;
  const currentOtherProduct = filteredOtherProductArray.slice(
    indexOfFirstOtherProduct,
    indexOfLastOtherProduct
  );
  const totalPages = Math.ceil(filteredOtherProductArray.length / OtherProductPerPage);

  return {
    searchTerm,
    currentOtherProduct,
    OtherProductPerPage,
    filteredOtherProductArray,
    indexOfFirstOtherProduct,
    indexOfLastOtherProduct,
    OtherProductPage,
    totalPages,
    categoryList,
    subcategoryList,
    handelEditOtherProduct,
    handleDeleteOtherProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setOtherProductPerPage,
    handelAddOtherProduct,
  };
};

export default useViewOtherProduct;
