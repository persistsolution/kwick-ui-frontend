import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";


const useViewVendors = () => {
  const [Vendorss, setVendorss] = useState([]);
  const [filteredVendorss, setFilteredVendorss] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [VendorssPerPage, setVendorssPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchVendorss();
  }, []);

  const handleAddNewVendor = ()=>{
    navigate("/Vendor/AddVendor")
  }

  const handleFetchVendorss = async () => {
    try {
      const response: any = await ""
      const data = response.data ||[]
      setVendorss(data);
      setFilteredVendorss(data);
    } catch (error) {
      console.error("Error fetching Vendors:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredVendorss(
      Vendorss.filter(
        (Vendors: any) =>
          Vendors?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Vendors?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedVendorss = [...filteredVendorss].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredVendorss(sortedVendorss);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Vendors-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Vendors_data.xlsx");
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

  const handleDeleteVendors = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Vendor s?"
      );
      if (!confirmDelete) return;
      const response : any = await ""
      if (response.status === 201) {
        handleFetchVendorss();
      } else {
        console.error("Failed to delete the Vendor s:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Vendors:", error);
      alert("An error occurred while deleting the Vendor s. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/Products/EditVendors/${id}`);
  };

  const indexOfLastVendors = currentPage * VendorssPerPage;
  const indexOfFirstVendors = indexOfLastVendors - VendorssPerPage;
  const currentVendorss = filteredVendorss.slice(
    indexOfFirstVendors,
    indexOfLastVendors
  );
  const totalPages = Math.ceil(filteredVendorss.length / VendorssPerPage);

  return {
    indexOfLastVendors,
    indexOfFirstVendors,
    Vendorss,
    filteredVendorss,
    searchTerm,
    currentPage,
    VendorssPerPage,
    sortConfig,
    currentVendorss,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteVendors,
    handleEdit,
    getVisiblePages,
    setVendorssPerPage,
    handleAddNewVendor
  };
};

export default useViewVendors;
