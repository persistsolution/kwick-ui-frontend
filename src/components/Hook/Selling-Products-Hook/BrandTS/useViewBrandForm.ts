import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchBrandApi, deleteBrandApi } from "../../../api/Selling-Products-Api/Brand-Api/BrandApi";

interface BrandType {
  id: number;
  Name: string;
  [key: string]: any;
}

interface SortConfig {
  key: keyof BrandType | null;
  direction: "asc" | "desc";
}

const useViewBrandForm = () => {
  const [Brand, setBrand] = useState<BrandType[]>([]);
  const [filteredBrand, setFilteredBrand] = useState<BrandType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [BrandPerPage, setBrandPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [BrandEditId, setBrandEditId] = useState<number>(0);
  const [AddBrandModal, setAddBrandModal] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const toggleEdit = (id: number | null) => {
    setModalEdit(!modalEdit);
    if (typeof id === "number") {
      setBrandEditId(id);
      localStorage.setItem("BrandId", id.toString());
    } else {
      setBrandEditId(0);
      localStorage.removeItem("BrandId");
    }
  };

  const AddBrandtoggle = () => {
    setAddBrandModal(!AddBrandModal);
  };

  useEffect(() => {
    handelfetchBrand();
  }, []);

  const handelfetchBrand = async () => {
    setloading(true)
    try {
      const response: any = await fetchBrandApi();
      const data = response?.data?.brands || []
      setBrand(data);
      setFilteredBrand(data);
      setloading(!data)
    } catch (error) {
      setloading(false)
      console.error("Error fetching Brand:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowerTerm = term.toLowerCase();
    setFilteredBrand(
      Brand.filter(
        (b) =>
          b?.Name?.toLowerCase().includes(lowerTerm) ||
          b?.id?.toString().includes(lowerTerm)
      )
    );
  };

  const handleSort = (key: keyof BrandType) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredBrand].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredBrand(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Brand-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "Brand_data.xlsx");
    }
  };

  const totalPages = Math.ceil(filteredBrand.length / BrandPerPage);

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
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
  const currentBrand = filteredBrand.slice(indexOfFirstBrand, indexOfLastBrand);

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
    loading,
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
