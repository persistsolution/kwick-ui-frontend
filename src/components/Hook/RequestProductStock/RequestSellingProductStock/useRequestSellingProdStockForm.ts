import {useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const useRequestSellingProdStockForm = () => {
  const [RequestSellingProdStockForm, setRequestSellingProdStockForm] = useState([]);
  const [filteredRequestSellingProdStockForm, setFilteredRequestSellingProdStockForm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [RequestSellingProdStockFormPerPage, setRequestSellingProdStockFormPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [modalEdit, setModalEdit] = useState(false);
  const [RequestSellingProdStockFormEditId ,setRequestSellingProdStockFormEditId]= useState(0)
  const[toggleAddRequestSellingProdStockForm , settoggleAddRequestSellingProdStockForm] = useState(false)


  const toggleEdit = (id: number) => {
    setModalEdit(!modalEdit);
    setRequestSellingProdStockFormEditId(id)
    if (typeof id === "number") {
      localStorage.setItem("RequestSellingProdStockFormId", id.toString());
    } else{
      localStorage.removeItem("RequestSellingProdStockFormId");
    }
  };

  const modalAddRequestSellingProdStockForm = ()=>{
    settoggleAddRequestSellingProdStockForm(!toggleAddRequestSellingProdStockForm)
  }  

  useEffect(() => {
    handelfetchRequestSellingProdStockForm();
  }, []);

  const handelfetchRequestSellingProdStockForm = async () => {
    try {
      const response :any = await ""
      setRequestSellingProdStockForm(response.data);
      setFilteredRequestSellingProdStockForm(response.data);
    } catch (error) {
      console.error("Error fetching RequestSellingProdStockForm:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredRequestSellingProdStockForm(
      RequestSellingProdStockForm.filter(
        (RequestSellingProdStockForm: any) =>
          RequestSellingProdStockForm?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          RequestSellingProdStockForm?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedRequestSellingProdStockForm = [...filteredRequestSellingProdStockForm].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredRequestSellingProdStockForm(sortedRequestSellingProdStockForm);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("RequestSellingProdStockForm-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "RequestSellingProdStockForm_data.xlsx");
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

  const handleDeleteProduct = async (id: number) => {
    console.log(id)
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;
      const response : any = await ""
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

  const indexOfLastRequestSellingProdStockForm = currentPage * RequestSellingProdStockFormPerPage;
  const indexOfFirstRequestSellingProdStockForm = indexOfLastRequestSellingProdStockForm - RequestSellingProdStockFormPerPage;
  const currentRequestSellingProdStockForm = filteredRequestSellingProdStockForm?.slice(
    indexOfFirstRequestSellingProdStockForm,
    indexOfLastRequestSellingProdStockForm
  );
  const totalPages = Math.ceil(Number(filteredRequestSellingProdStockForm?.length || 0)  / RequestSellingProdStockFormPerPage);

  return {
    indexOfLastRequestSellingProdStockForm,
    indexOfFirstRequestSellingProdStockForm,
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
    modalAddRequestSellingProdStockForm
  };
};

export default useRequestSellingProdStockForm;
