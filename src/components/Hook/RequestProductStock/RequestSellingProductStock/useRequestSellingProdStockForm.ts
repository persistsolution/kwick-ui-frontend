import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchRequestProductStockApi } from "../../../api/Request-product-stock-Api/RequestProductStockApi";

interface RequestSellingProdStockFormType {
  id: number;
  Name: string;
  [key: string]: any; 
}

const useRequestSellingProdStockForm = () => {
  const [RequestSellingProdStockForm, setRequestSellingProdStockForm] = useState<RequestSellingProdStockFormType[]>([]);
  const [filteredRequestSellingProdStockForm, setFilteredRequestSellingProdStockForm] = useState<RequestSellingProdStockFormType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [RequestSellingProdStockFormPerPage, setRequestSellingProdStockFormPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [RequestSellingProdStockFormEditId, setRequestSellingProdStockFormEditId] = useState<number>(0);
  const [toggleAddRequestSellingProdStockForm, setToggleAddRequestSellingProdStockForm] = useState<boolean>(false);

  const toggleEdit = (id: number) => {
    setModalEdit(!modalEdit);
    setRequestSellingProdStockFormEditId(id);
    if (typeof id === "number") {
      localStorage.setItem("RequestSellingProdStockFormId", id.toString());
    } else {
      localStorage.removeItem("RequestSellingProdStockFormId");
    }
  };

  const modalAddRequestSellingProdStockForm = () => {
    setToggleAddRequestSellingProdStockForm(!toggleAddRequestSellingProdStockForm);
  };

  useEffect(() => {
    handelfetchRequestSellingProdStockForm();
  }, []);

  const handelfetchRequestSellingProdStockForm = async () => {
    try {
      const response: any= await fetchRequestProductStockApi(); 
      const data = response?.data?.data || []
      setRequestSellingProdStockForm(data);
      setFilteredRequestSellingProdStockForm(data);
    } catch (error) {
      console.error("Error fetching RequestSellingProdStockForm:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRequestSellingProdStockForm(
      RequestSellingProdStockForm.filter(
        (item) =>
          item?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          item?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredRequestSellingProdStockForm].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRequestSellingProdStockForm(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RequestSellingProdStockForm-table");
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "RequestSellingProdStockForm_data.xlsx");
    }
  };

  const totalPages = Math.ceil(filteredRequestSellingProdStockForm.length / RequestSellingProdStockFormPerPage);

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const response: any = await "";
      if (response.status === 200) {
        handelfetchRequestSellingProdStockForm();
      } else {
        console.error("Failed to delete the product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  const indexOfLast = currentPage * RequestSellingProdStockFormPerPage;
  const indexOfFirst = indexOfLast - RequestSellingProdStockFormPerPage;
  const currentRequestSellingProdStockForm = filteredRequestSellingProdStockForm.slice(indexOfFirst, indexOfLast);

  return {
    indexOfLastRequestSellingProdStockForm: indexOfLast,
    indexOfFirstRequestSellingProdStockForm: indexOfFirst,
    RequestSellingProdStockForm,
    filteredRequestSellingProdStockForm,
    searchTerm,
    currentPage,
    RequestSellingProdStockFormPerPage,
    sortConfig,
    currentRequestSellingProdStockForm,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteProduct,
    getVisiblePages,
    setRequestSellingProdStockFormPerPage,
    toggleEdit,
    modalEdit,
    RequestSellingProdStockFormEditId,
    handelfetchRequestSellingProdStockForm,
    toggleAddRequestSellingProdStockForm,
    modalAddRequestSellingProdStockForm,
  };
};

export default useRequestSellingProdStockForm;
