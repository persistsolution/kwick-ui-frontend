import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { fetchAllocatedProductsApi } from "../../../api/Selling-Products-Api/AllocatedProducts-Api/AllocatedProductsApi";

interface AllocateProduct {
  id: number;
  Name: string;
  [key: string]: any;
}

interface SortConfig {
  key: string | null;
  direction: string;
}

interface FranchiseOption {
  id: number | string;
  label: string;
}

const useAllocateProducts = () => {
  const [allocateProducts, setallocateProducts] = useState<AllocateProduct[]>([]);
  const [filteredallocateProducts, setFilteredallocateProducts] = useState<AllocateProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allocateProductsPerPage, setallocateProductsPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | any>("");
  const [toDate, settodate] = useState<Date | any>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [franchise, selectFranchise] = useState<string>("");

  const navigate = useNavigate();

  const franchiseList: FranchiseOption[] = [
    {
      id: "all",
      label: "All",
    },
    {
      id: 1,
      label: "COCO Franchise",
    },
    {
      id: 2,
      label: "FOFO Franchise",
    },
    {
      id: 0,
      label: "Other Franchise ",
    },
  ];

  useEffect(() => {
    handelfetchallocateProducts();
  }, []);

  const handelfetchallocateProducts = async () => {
    setLoading(true);
    try {
      const response: any = await fetchAllocatedProductsApi();
      const data: AllocateProduct[] = response?.data?.data || [];
      setallocateProducts(data);
      setFilteredallocateProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        (AllocateProducts: AllocateProduct) =>
          AllocateProducts?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          AllocateProducts?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedallocateProducts = [...filteredallocateProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredallocateProducts(sortedallocateProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AllocateProducts-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AllocateProducts_data.xlsx");
  };

  const totalPages = Math.ceil(filteredallocateProducts.length / allocateProductsPerPage);

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

  const indexOfLastAllocateProducts = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProducts = indexOfLastAllocateProducts - allocateProductsPerPage;
  const currentallocateProducts = filteredallocateProducts.slice(
    indexOfFirstAllocateProducts,
    indexOfLastAllocateProducts
  );

  return {
    indexOfLastAllocateProducts,
    indexOfFirstAllocateProducts,
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
    franchise,
    loading,
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
    selectFranchise,

  };
};

export default useAllocateProducts;
