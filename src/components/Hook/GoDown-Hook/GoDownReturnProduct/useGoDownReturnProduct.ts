import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchGodownReturnProductApi } from "../../../api/GoDown-Api/GodownRetunProductApi/GodownRetunProductApi";
import { useNavigate } from "react-router-dom";

interface GodownReturnProduct {
  id: number;
  invoice_no?: string;
  [key: string]: any;
}

const useGoDownReturnProduct = () => {
  const [viewGodownReturnProduct, setviewGodownReturnProduct] = useState<GodownReturnProduct[]>([]);
  const [filteredviewGodownReturnProduct, setFilteredviewGodownReturnProduct] = useState<GodownReturnProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewGodownReturnProductPerPage, setviewGodownReturnProductPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [loading, setloading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchviewGodownReturnProduct();
  }, []);

  const handleAddReturnProduct = () => {
    navigate("/GoDown/GodownReturnProduct");
  };

  const handleFetchviewGodownReturnProduct = async () => {
    setloading(true);
    try {
      const response: any = await fetchGodownReturnProductApi();
      const data: GodownReturnProduct[] = response?.data?.data || [];
      setviewGodownReturnProduct(data);
      setFilteredviewGodownReturnProduct(data);
      setloading(false); // Fixed logic: always set explicitly
    } catch (error) {
      setloading(false);
      console.error("Error fetching viewGodownReturnProduct:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownReturnProduct(
      viewGodownReturnProduct.filter((item: GodownReturnProduct) =>
        item?.vendor_name?.toLowerCase().includes(term.toLowerCase()) ||
        item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredviewGodownReturnProduct].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownReturnProduct(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownReturnProduct-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "GodownReturnProduct_data.xlsx");
    }
  };

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  const indexOfLastGodownReturnProduct = currentPage * viewGodownReturnProductPerPage;
  const indexOfFirstGodownReturnProduct = indexOfLastGodownReturnProduct - viewGodownReturnProductPerPage;

  const currentviewGodownReturnProduct = filteredviewGodownReturnProduct.slice(
    indexOfFirstGodownReturnProduct,
    indexOfLastGodownReturnProduct
  );

  const totalPages = Math.ceil(filteredviewGodownReturnProduct.length / viewGodownReturnProductPerPage);

  return {
    indexOfLastGodownReturnProduct,
    indexOfFirstGodownReturnProduct,
    viewGodownReturnProduct,
    filteredviewGodownReturnProduct,
    searchTerm,
    currentPage,
    viewGodownReturnProductPerPage,
    sortConfig,
    currentviewGodownReturnProduct,
    totalPages,
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setviewGodownReturnProductPerPage,
    handleAddReturnProduct,
  };
};

export default useGoDownReturnProduct;
