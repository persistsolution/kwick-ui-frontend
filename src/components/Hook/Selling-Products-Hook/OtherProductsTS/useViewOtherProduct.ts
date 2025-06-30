import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  fetchOtherProductsApi,
  deleteOtherProductsApi,
} from "../../../api/Selling-Products-Api/OtherProduct-Api/OtherProductApi";

interface OtherProduct {
  id: number;
  Name: string;
  [key: string]: any; 
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const useViewOtherProduct = () => {
  const [OtherProductArray, setOtherProductArray] = useState<OtherProduct[]>([]);
  const [filteredOtherProductArray, setFilteredOtherProductArray] = useState<OtherProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [OtherProductPage, setOtherProductPage] = useState<number>(1);
  const [OtherProductPerPage, setOtherProductPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchGetOtherProduct();
  }, []);

  const fetchGetOtherProduct = async () => {
    setLoading(true);
    try {
      const response: any = await fetchOtherProductsApi();
      const data: OtherProduct[] = response?.data?.data || [];
      setOtherProductArray(data);
      setFilteredOtherProductArray(data);
      setLoading(!data.length);
    } catch (error) {
      console.error("Error fetching OtherProduct:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowerTerm = term.toLowerCase();
    setFilteredOtherProductArray(
      OtherProductArray.filter(
        (product) =>
          product?.Name?.toLowerCase().includes(lowerTerm) ||
          product?.id?.toString().includes(lowerTerm)
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProducts = [...filteredOtherProductArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredOtherProductArray(sortedProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setOtherProductPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("OtherProduct-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "OtherProduct_data.xlsx");
  };

  const totalPages = Math.ceil(filteredOtherProductArray.length / OtherProductPerPage);

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(OtherProductPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const handleDeleteOtherProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this OtherProduct?");
      if (!confirmDelete) return;

      const response: any = await deleteOtherProductsApi(id);
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

  const handelEditOtherProduct = (id: number) => {
    navigate(`/SellingProduct/EditOtherProductFrom/${id}`);
  };

  const handelAddOtherProduct = () => {
    navigate(`/SellingProduct/AddOtherProductForm`);
  };

  const indexOfLastOtherProduct = OtherProductPage * OtherProductPerPage;
  const indexOfFirstOtherProduct = indexOfLastOtherProduct - OtherProductPerPage;
  const currentOtherProduct = filteredOtherProductArray.slice(
    indexOfFirstOtherProduct,
    indexOfLastOtherProduct
  );

  return {
    searchTerm,
    currentOtherProduct,
    OtherProductPerPage,
    filteredOtherProductArray,
    indexOfFirstOtherProduct,
    indexOfLastOtherProduct,
    OtherProductPage,
    totalPages,
    loading,
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
