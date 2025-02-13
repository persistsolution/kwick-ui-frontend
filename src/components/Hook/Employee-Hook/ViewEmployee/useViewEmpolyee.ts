import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import { deleteEmploye , fetchEmploye } from "../../../api/Employe-Api/EmployeApi";

const useViewEmployee = () => {
  const [Employee, setEmployee] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [EmployeePerPage, setEmployeePerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchEmployee();
  }, []);

  const handleFetchEmployee = async () => {
    try {
      const response: any = await fetchEmploye();
      setEmployee(response.data);
      setFilteredEmployee(response.data);
    } catch (error) {
      console.error("Error fetching Employee:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredEmployee(
      Employee.filter(
        (Employee: any) =>
          Employee?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Employee?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedEmployee = [...filteredEmployee].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredEmployee(sortedEmployee);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("Employee-table");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Employee_data.xlsx");
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

  const handleDeleteEmployee = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Employee?"
      );
      if (!confirmDelete) return;
      const response = await deleteEmploye(id);
      if (response.status === 201) {
        handleFetchEmployee();
      } else {
        console.error("Failed to delete the Employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting the Employee:", error);
      alert("An error occurred while deleting the Employee. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/Employee/EditRawEmployeeFrom/${id}`);
  };

  const indexOfLastEmployee = currentPage * EmployeePerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - EmployeePerPage;
  const currentEmployee = filteredEmployee.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployee.length / EmployeePerPage);

  return {
    indexOfLastEmployee,
    indexOfFirstEmployee,
    Employee,
    filteredEmployee,
    searchTerm,
    currentPage,
    EmployeePerPage,
    sortConfig,
    currentEmployee,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteEmployee,
    handleEdit,
    getVisiblePages,
    setEmployeePerPage,
  };
};

export default useViewEmployee;
