import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { fetchVendorPaymentsApi , deleteVendorPaymentsApi} from './../../api/VendorPayment-Api/VendorPaymentApi';


const useViewVendorPayments = () => {
  const [VendorPaymentss, setVendorPaymentss] = useState([]);
  const [filteredVendorPaymentss, setFilteredVendorPaymentss] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [VendorPaymentssPerPage, setVendorPaymentssPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchVendorPaymentss();
  }, []);

  const handleFetchVendorPaymentss = async () => {
    try {
      const response: any = await fetchVendorPaymentsApi();
      setVendorPaymentss(response.data);
      setFilteredVendorPaymentss(response.data);
    } catch (error) {
      console.error("Error fetching VendorPaymentss:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredVendorPaymentss(
      VendorPaymentss.filter(
        (VendorPayments: any) =>
          VendorPayments?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          VendorPayments?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedVendorPaymentss = [...filteredVendorPaymentss].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredVendorPaymentss(sortedVendorPaymentss);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("VendorPayments-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "VendorPayments_data.xlsx");
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

  const handleDeleteVendorPayments = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Vendor Payments?"
      );
      if (!confirmDelete) return;
      const response = await deleteVendorPaymentsApi(id);
      if (response.status === 201) {
        handleFetchVendorPaymentss();
      } else {
        console.error("Failed to delete the Vendor Payments:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the VendorPayments:", error);
      alert("An error occurred while deleting the Vendor Payments. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/Products/EditVendorPayments/${id}`);
  };

  const indexOfLastVendorPayments = currentPage * VendorPaymentssPerPage;
  const indexOfFirstVendorPayments = indexOfLastVendorPayments - VendorPaymentssPerPage;
  const currentVendorPaymentss = filteredVendorPaymentss.slice(
    indexOfFirstVendorPayments,
    indexOfLastVendorPayments
  );
  const totalPages = Math.ceil(filteredVendorPaymentss.length / VendorPaymentssPerPage);

  return {
    indexOfLastVendorPayments,
    indexOfFirstVendorPayments,
    VendorPaymentss,
    filteredVendorPaymentss,
    searchTerm,
    currentPage,
    VendorPaymentssPerPage,
    sortConfig,
    currentVendorPaymentss,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteVendorPayments,
    handleEdit,
    getVisiblePages,
    setVendorPaymentssPerPage,
  };
};

export default useViewVendorPayments;
