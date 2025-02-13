import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchrawallocateProducts } from "../../../api/Raw-Making-Products-Api/RawAllocateProducts/RawAllocateProductsApi";

const useRawAllocatedProducts = () => {
  const [allocateProducts, setallocateProducts] = useState([]);
  const [filteredallocateProducts, setFilteredallocateProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allocateProductsPerPage, setallocateProductsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [modal, setModal] = useState(false);
  const [allocateProductsEditId, setallocateProductsEditId] = useState(0);
  const [franchiseList, setfranchiseList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();

  const toggle = (id: any) => {
    setModal(!modal);
    setallocateProductsEditId(id);
    if (typeof id === "number") {
      localStorage.setItem("AllocateProductsId", id.toString());
    } else {
      localStorage.removeItem("AllocateProductsId");
    }
  };

  useEffect(() => {
    handelfetchallocateProducts();
  }, []);

  const handelfetchallocateProducts = async () => {
    try {
      const response: any = await fetchrawallocateProducts();
      setallocateProducts(response.data);
      setFilteredallocateProducts(response.data);
    } catch (error) {
      console.error("Error fetching allocateProducts:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredallocateProducts(
      allocateProducts.filter(
        (AllocateProducts: any) =>
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
    const sortedallocateProducts = [...filteredallocateProducts].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredallocateProducts(sortedallocateProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AllocateProducts-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AllocateProducts_data.xlsx");
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

  const indexOfLastAllocateProducts = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProducts =
    indexOfLastAllocateProducts - allocateProductsPerPage;
  const currentallocateProducts = filteredallocateProducts.slice(
    indexOfFirstAllocateProducts,
    indexOfLastAllocateProducts
  );
  const totalPages = Math.ceil(
    filteredallocateProducts.length / allocateProductsPerPage
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
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setallocateProductsPerPage,
    toggle,
    modal,
    allocateProductsEditId,
    handelfetchallocateProducts,
    setfromDate,
    settodate,
    setfranchiseList,
  };
};

export default useRawAllocatedProducts;
