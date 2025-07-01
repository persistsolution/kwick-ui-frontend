import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

interface AllocateProduct {
  id: number;
  Name: string;
  [key: string]: any; 
}

interface SortConfig {
  key: keyof AllocateProduct | null;
  direction: "asc" | "desc";
}

interface FranchiseOption {
  id: string | number;
  label: string;
}

const useRawAllocateProductsToVendor = () => {
  const [allocateProducts, setAllocateProducts] = useState<AllocateProduct[]>([]);
  const [filteredAllocateProducts, setFilteredAllocateProducts] = useState<AllocateProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allocateProductsPerPage, setAllocateProductsPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [modal, setModal] = useState<boolean>(false);
  const [allocateProductsEditId, setAllocateProductsEditId] = useState<number>(0);
  const [fromDate, setFromDate] = useState<Date | any>(null);
  const [toDate, setToDate] = useState<Date | any>(null);
  const navigate = useNavigate();

  const franchiseList: FranchiseOption[] = [
    { id: "all", label: "All" },
    { id: 1, label: "COCO Franchise" },
    { id: 2, label: "FOFO Franchise" },
    { id: 0, label: "Other Franchise" },
  ];

  const toggle = (id: number | null) => {
    setModal(!modal);
    if (typeof id === "number") {
      setAllocateProductsEditId(id);
      localStorage.setItem("AllocateProductsId", id.toString());
    } else {
      setAllocateProductsEditId(0);
      localStorage.removeItem("AllocateProductsId");
    }
  };

  useEffect(() => {
    handleFetchAllocateProducts();
  }, []);

  const handleFetchAllocateProducts = async () => {
    try {
      const response: any = await ""; // Replace with actual API call
      const data: AllocateProduct[] = response?.data || [];
      setAllocateProducts(data);
      setFilteredAllocateProducts(data);
    } catch (error) {
      console.error("Error fetching allocate products:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowerTerm = term.toLowerCase();
    setFilteredAllocateProducts(
      allocateProducts.filter(
        (product) =>
          product?.Name?.toLowerCase().includes(lowerTerm) ||
          product?.id?.toString().includes(lowerTerm)
      )
    );
  };

  const handleSort = (key: keyof AllocateProduct) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredAllocateProducts].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredAllocateProducts(sorted);
  };

  const handleNavigateAllocatedProduct = (id: number) => {
    navigate(`/RawProducts/ViewRawAllocatedProducts/${id}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AllocateProducts-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "AllocateProducts_data.xlsx");
    }
  };

  const totalPages = Math.ceil(filteredAllocateProducts.length / allocateProductsPerPage);

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

  const indexOfLastAllocateProducts = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProducts = indexOfLastAllocateProducts - allocateProductsPerPage;
  const currentAllocateProducts = filteredAllocateProducts.slice(
    indexOfFirstAllocateProducts,
    indexOfLastAllocateProducts
  );

  return {
    indexOfLastAllocateProducts,
    indexOfFirstAllocateProducts,
    allocateProducts,
    filteredAllocateProducts,
    searchTerm,
    currentPage,
    allocateProductsPerPage,
    sortConfig,
    currentAllocateProducts,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAllocateProductsPerPage,
    toggle,
    modal,
    allocateProductsEditId,
    handleFetchAllocateProducts,
    setFromDate,
    setToDate,
    handleNavigateAllocatedProduct,
  };
};

export default useRawAllocateProductsToVendor;
