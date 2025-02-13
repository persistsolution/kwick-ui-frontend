import {  useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { deleteProducts, fetchProducts } from "../../../api/Selling-Products-Api/ProductApi/productApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";

const useViewProduct = () => {
  const [ProductArray, setProductArray] = useState([]);
  const [filteredProductArray, setFilteredProductArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productPage, setproductPage] = useState(1);
  const [productPerPage, setproductPerPage] = useState(5);
  const [categoryList , setcategoryList] = useState([]);
  const [subcategoryList , setsubcategoryList] = useState([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetProduct();
    handelGetproduct();
    handelGetSubproduct();
  }, []);

  const fetchGetProduct = async () => {
    try {
      const response:any = await fetchProducts();
      setProductArray(response.data);
      setFilteredProductArray(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductArray(
      ProductArray.filter(
        (product: any) =>
          product?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          product?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

    const handelGetproduct = async () => {
      try {
        const response :any = await fetchCategories()
        const data = await response.data;
        setcategoryList(data);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };
  
    const handelGetSubproduct = async () => {
      try {
        const response :any= await fetchSubCategories()
        const data  =  response.data;
        setsubcategoryList(data);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedproduct = [...filteredProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductArray(sortedproduct);
  };

  const handlePageChange = (pageNumber: number) => {
    setproductPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("product-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "product_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(productPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;
      const response = await deleteProducts(id)
      if (response.status === 200) {
        console.log("Product deleted successfully:", response.data);
        fetchGetProduct();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const handelEditProduct = (id:any) => {
    navigate(`/Products/EditProductFrom/${id}`);
  };

  const handelAddProduct = ()=>{
    navigate(`/Products/AddProductForm`)
  }

  const indexOfLastproduct = productPage * productPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productPerPage;
  const currentproduct = filteredProductArray.slice(
    indexOfFirstproduct,
    indexOfLastproduct
  );
  const totalPages = Math.ceil(filteredProductArray.length / productPerPage);

return{
  searchTerm,
  currentproduct,
  productPerPage,
  filteredProductArray,
  indexOfFirstproduct,
  indexOfLastproduct,
  productPage,
  totalPages,
  categoryList,
  subcategoryList,
  handelEditProduct,
  handleDeleteProduct,
  handlePageChange,
  getVisiblePages,
  exportToExcel,
  handleSort,
  handleSearch,
  setproductPerPage,
  handelAddProduct
}
};

export default useViewProduct;
