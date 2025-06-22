import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  deleteGodownStock,
  fetchGodownStockApi,
  fetchGodownStockProduct,
  fetchGodownListApi,
} from "../../../api/GoDown-Api/GodownStock/GodownStockApi";
import { useNavigate } from "react-router-dom";
import { fetchGodownApi } from "../../../api/GoDown-Api/CreateGoDown/CreateGoDownApi";

const useViewGodownStock = () => {
  const [viewGodownStock, setviewGodownStock] = useState([]);
  const [filteredviewGodownStock, setFilteredviewGodownStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGodownStockPerPage, setviewGodownStockPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [goDownList, setgoDownList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [categoryList, setcategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);
  const [goDownProductlist, setgoDownProductlist] = useState([]);
  const [selectGodownStockProduct, setselectGodownStockProduct] = useState(0);
  const [selectGodown, setselectGodown] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    handleFetchviewGodownStock();
    handleFetchGodownPord();
    fetchGodownList();
  }, []);

  const fetchGodownList = async () => {
    try {
      const response: any = await fetchGodownApi();
      const data = response?.data?.data || []
      setgoDownList(data);
    } catch (error) {
      console.error("Error fetching viewGodownStock:", error);
    }
  };

  const handleAddNewStock = () => {
    navigate("/GoDown/AddGodownStock")
  }

  const handleFetchGodownPord = async () => {
    try {
      const response: any = await fetchGodownStockProduct();
      const data = response?.data || []
      setgoDownProductlist(data);
    } catch (error) {
      console.error("Error fetching viewGodownStock:", error);
    }
  };

  const handleFetchviewGodownStock = async () => {
    setLoading(true)
    try {
      const response: any = await fetchGodownStockApi();
      const data = response?.data?.data || []
      setviewGodownStock(data);
      setFilteredviewGodownStock(data);
      setLoading(!data)
    } catch (error) {
      console.error("Error fetching viewGodownStock:", error);
      setLoading(false)

    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredviewGodownStock(
      viewGodownStock.filter(
        (GodownStock: any) =>
          GodownStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          GodownStock?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedviewGodownStock = [...filteredviewGodownStock].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredviewGodownStock(sortedviewGodownStock);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("GodownStock-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "GodownStock_data.xlsx");
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

  const handleDeleteGodownStock = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Godown Stock?"
      );
      if (!confirmDelete) return;
      const response = await deleteGodownStock(id);
      if (response.status === 201) {
        handleFetchviewGodownStock();
      } else {
        console.error(
          "Failed to delete the Godown Stock:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting the Godown Stock:", error);
      alert(
        "An error occurred while deleting the Godown Stock. Please try again."
      );
    }
  };

  const handleEdit = () => { };

  const indexOfLastGodownStock = currentPage * viewGodownStockPerPage;
  const indexOfFirstGodownStock =
    indexOfLastGodownStock - viewGodownStockPerPage;
  const currentviewGodownStock = filteredviewGodownStock.slice(
    indexOfFirstGodownStock,
    indexOfLastGodownStock
  );
  const totalPages = Math.ceil(
    filteredviewGodownStock.length / viewGodownStockPerPage
  );

  return {
    indexOfLastGodownStock,
    indexOfFirstGodownStock,
    viewGodownStock,
    filteredviewGodownStock,
    searchTerm,
    currentPage,
    viewGodownStockPerPage,
    sortConfig,
    currentviewGodownStock,
    totalPages,
    goDownList,
    fromDate,
    toDate,
    categoryList,
    subcategoryList,
    goDownProductlist,
    selectGodownStockProduct,
    selectGodown,
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteGodownStock,
    handleEdit,
    getVisiblePages,
    setviewGodownStockPerPage,
    setfromDate,
    settodate,
    setgoDownList,
    setcategoryList,
    setsubcategoryList,
    setgoDownProductlist,
    setselectGodownStockProduct,
    setselectGodown,
    handleAddNewStock
  };
};

export default useViewGodownStock;
