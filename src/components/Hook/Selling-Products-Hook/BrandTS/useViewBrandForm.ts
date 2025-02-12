import {useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchBrandApi, deleteBrandApi } from "../../../api/Selling-Products-Api/Brand-Api/BrandApi";

const useViewBrandForm = () => {
  const [Brand, setBrand] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [BrandPerPage, setBrandPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [modalEdit, setModalEdit] = useState(false);
  const [BrandEditId ,setBrandEditId]= useState(0)
  const [ AddBrandModal , setAddBrandModal] = useState(false)


  const toggleEdit = (id: any) => {
    setModalEdit(!modalEdit);
    setBrandEditId(id)
    if (typeof id === "number") {
      localStorage.setItem("BrandId", id.toString());
    } else{
      localStorage.removeItem("BrandId");
    }
  };

  console.log(BrandEditId)
  
  const AddBrandtoggle = () =>{
    setAddBrandModal(!AddBrandModal)
  }

  useEffect(() => {
    handelfetchBrand();
  }, []);


  const handelfetchBrand = async () => {
    try {
      const response :any = await fetchBrandApi();
      setBrand(response.data);
      setFilteredBrand(response.data);
    } catch (error) {
      console.error("Error fetching Brand:", error);
    }
  };


  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredBrand(
      Brand.filter(
        (Brand: any) =>
          Brand?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Brand?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedBrand = [...filteredBrand].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredBrand(sortedBrand);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Brand-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Brand_data.xlsx");
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

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;
      const response = await deleteBrandApi(id);
      if (response.status === 200) {
        handelfetchBrand();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const indexOfLastBrand = currentPage * BrandPerPage;
  const indexOfFirstBrand = indexOfLastBrand - BrandPerPage;
  const currentBrand = filteredBrand.slice(
    indexOfFirstBrand,
    indexOfLastBrand
  );
  const totalPages = Math.ceil(filteredBrand.length / BrandPerPage);
  
  return {
    indexOfLastBrand,
    indexOfFirstBrand,
    Brand,
    filteredBrand,
    searchTerm,
    currentPage,
    BrandPerPage,
    sortConfig,
    currentBrand,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteProduct,
    getVisiblePages,
    setBrandPerPage,
    toggleEdit,
    modalEdit,
    BrandEditId,
    handelfetchBrand,
    setBrand,
    setFilteredBrand,
    AddBrandtoggle,
    AddBrandModal,
  };
};

export default useViewBrandForm;
