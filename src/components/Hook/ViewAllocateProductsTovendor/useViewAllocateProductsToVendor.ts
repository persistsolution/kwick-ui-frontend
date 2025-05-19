import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

const useAllocateProductsVendor = () => {
  const [allocateProducts, setallocateProducts] = useState([]);
  const [filteredallocateProducts, setFilteredallocateProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allocateProductsPerPage, setallocateProductsPerPage] = useState(5);
  // const [franchiseList , setfranchiseList]= useState([])
  // const [franchiseList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  // const [modal, setModal] = useState(false);
  // const [allocateProductsEditId, setallocateProductsEditId] = useState(0);
  const navigate = useNavigate();

  const franchiseList = [
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

  // const toggle = (id: any) => {
  //   setModal(!modal);
  //   setallocateProductsEditId(id);
  //   if (typeof id === "number") {
  //     localStorage.setItem("AllocateProductsVendorId", id.toString());
  //   } else {
  //     localStorage.removeItem("AllocateProductsVendorId");
  //   }
  // };

  useEffect(() => {
    handelfetchallocateProducts();
  }, []);

  const handelfetchallocateProducts = async () => {
    try {
      const response: any = await ""
      const data = response.data || []
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
        (AllocateProductsVendor: any) =>
          AllocateProductsVendor?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          AllocateProductsVendor?.id?.toString().includes(term.toLowerCase())
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
    const table = document.getElementById("AllocateProductsVendor-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AllocateProductsVendor_data.xlsx");
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

  const indexOfLastAllocateProductsVendor = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProductsVendor =
    indexOfLastAllocateProductsVendor - allocateProductsPerPage;
  const currentallocateProducts = filteredallocateProducts.slice(
    indexOfFirstAllocateProductsVendor,
    indexOfLastAllocateProductsVendor
  );
  const totalPages = Math.ceil(
    filteredallocateProducts.length / allocateProductsPerPage
  );

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
    // toggle,
    // modal,
    // allocateProductsEditId,
    handelfetchallocateProducts,
    setfromDate,
    settodate,
  };
};

export default useAllocateProductsVendor;
