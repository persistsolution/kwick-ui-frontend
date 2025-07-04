import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

// Define type for Allocate Product (update as per actual API shape)
interface AllocateProduct {
  id: number;
  Name: string;
  [key: string]: any;
}

interface FranchiseOption {
  id: number | string;
  label: string;
}

const useAllocateProductsVendor = () => {
  const [allocateProducts, setallocateProducts] = useState<AllocateProduct[]>([]);
  const [filteredallocateProducts, setFilteredallocateProducts] = useState<AllocateProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allocateProductsPerPage, setallocateProductsPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | any>(null);
  const [toDate, settodate] = useState<Date | any>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const navigate = useNavigate();

  const franchiseList: FranchiseOption[] = [
    { id: "all", label: "All" },
    { id: 1, label: "COCO Franchise" },
    { id: 2, label: "FOFO Franchise" },
    { id: 0, label: "Other Franchise" },
  ];

  useEffect(() => {
    handelfetchallocateProducts();
  }, []);

  const handelfetchallocateProducts = async () => {
    try {
      const response: any = await ""; // Replace with actual API call
      const data: AllocateProduct[] = response?.data || [];
      setallocateProducts(data);
      setFilteredallocateProducts(data);
    } catch (error) {
      console.error("Error fetching allocateProducts:", error);
    }
  };

  const handelNavigateAllocatedProduct = (id: number) => {
    navigate(`/SellingProduct/AllocatedProducts/${id}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredallocateProducts(
      allocateProducts.filter(
        (item) =>
          item?.Fname?.toLowerCase().includes(term.toLowerCase()) ||
          item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...filteredallocateProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredallocateProducts(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AllocateProductsVendor-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "AllocateProductsVendor_data.xlsx");
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

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const indexOfLastAllocateProductsVendor = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProductsVendor = indexOfLastAllocateProductsVendor - allocateProductsPerPage;
  const currentallocateProducts = filteredallocateProducts.slice(
    indexOfFirstAllocateProductsVendor,
    indexOfLastAllocateProductsVendor
  );
  const totalPages = Math.ceil(filteredallocateProducts.length / allocateProductsPerPage);

  return {
    indexOfLastAllocateProductsVendor,
    indexOfFirstAllocateProductsVendor,
    allocateProducts,
    filteredallocateProducts,
    searchTerm,
    currentPage,
    allocateProductsPerPage,
    sortConfig,
    currentallocateProducts,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setallocateProductsPerPage,
    handelNavigateAllocatedProduct,
    handelfetchallocateProducts,
    setfromDate,
    settodate,
  };
};

export default useAllocateProductsVendor;
