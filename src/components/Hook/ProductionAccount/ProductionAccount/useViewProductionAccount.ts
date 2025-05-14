import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

const useViewProductionAccount = () => {
  const [ProductionAccountArray, setProductionAccountArray] = useState([]);
  const [filteredProductionAccountArray, setFilteredProductionAccountArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ProductionAccountPage, setProductionAccountPage] = useState(1);
  const [ProductionAccountPerPage, setProductionAccountPerPage] = useState(5);
  const [categoryList, setcategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetProductionAccount();
    handelGetProductionAccount();
    handelGetSubProductionAccount();
  }, []);

  const fetchGetProductionAccount = async () => {
    try {
      const response: any = await "";
      setProductionAccountArray(response.data);
      setFilteredProductionAccountArray(response.data);
    } catch (error) {
      console.error("Error fetching ProductionAccount:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredProductionAccountArray(
      ProductionAccountArray.filter(
        (ProductionAccount: any) =>
          ProductionAccount?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          ProductionAccount?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handelGetProductionAccount = async () => {
    try {
      const response: any = await "";
      const data = await response.data;
      setcategoryList(data);
    } catch (error) {
      console.error("Error adding ProductionAccount:", error);
    }
  };

  const handelGetSubProductionAccount = async () => {
    try {
      const response: any = await "";
      const data = response.data;
      setsubcategoryList(data);
    } catch (error) {
      console.error("Error adding ProductionAccount:", error);
    }
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProductionAccount = [...filteredProductionAccountArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredProductionAccountArray(sortedProductionAccount);
  };

  const handlePageChange = (pageNumber: number) => {
    setProductionAccountPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("ProductionAccount-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "ProductionAccount_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(ProductionAccountPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const handleDeleteProductionAccount = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this ProductionAccount?"
      );
      if (!confirmDelete) return;
      const response: any = await "";
      if (response.status === 200) {
        console.log("ProductionAccount deleted successfully:", response.data);
        fetchGetProductionAccount();
      } else {
        console.error("Failed to delete the ProductionAccount:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the ProductionAccount:", error);
      alert("An error occurred while deleting the ProductionAccount. Please try again.");
    }
  };

  const handelEditProductionAccount = (id: any) => {
    navigate(`/Production/AddProductionAccount/${id}`);
  };

  const handelAddProductionAccount = () => {
    navigate(`/Production/AddProductionAccount`);
  };

  const indexOfLastProductionAccount = ProductionAccountPage * ProductionAccountPerPage;
  const indexOfFirstProductionAccount = indexOfLastProductionAccount - ProductionAccountPerPage;
  const currentProductionAccount = filteredProductionAccountArray?.slice(
    indexOfFirstProductionAccount,
    indexOfLastProductionAccount
  );
  const totalPages = Math.ceil(filteredProductionAccountArray?.length / ProductionAccountPerPage);

  return {
    searchTerm,
    currentProductionAccount,
    ProductionAccountPerPage,
    filteredProductionAccountArray,
    indexOfFirstProductionAccount,
    indexOfLastProductionAccount,
    ProductionAccountPage,
    totalPages,
    categoryList,
    subcategoryList,
    handelEditProductionAccount,
    handleDeleteProductionAccount,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductionAccountPerPage,
    handelAddProductionAccount,
  };
};

export default useViewProductionAccount;
