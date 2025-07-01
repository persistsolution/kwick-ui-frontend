import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  deleteEmploye,
  fetchEmployeApi,
} from "../../../api/Employe-Api/EmployeApi";

type EmployeeType = {
  id: number;
  Name: string;
  [key: string]: any;
};

type SortConfig = {
  key: string | null;
  direction: "asc" | "desc";
};

const useViewEmployee = () => {
  const [Employee, setEmployee] = useState<EmployeeType[]>([]);
  const [filteredEmployee, setFilteredEmployee] = useState<EmployeeType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [EmployeePerPage, setEmployeePerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchEmployee();
  }, []);

  const handleFetchEmployee = async () => {
    setisLoading(true);
    try {
      const response: any = await fetchEmployeApi();
      const data: EmployeeType[] = response?.data?.data || [];
      setEmployee(data);
      setFilteredEmployee(data);
      setisLoading(!data);
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching Employee:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredEmployee(
      Employee.filter(
        (Employee) =>
          Employee?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          Employee?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
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
    if (table) {
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "Employee_data.xlsx");
    }
  };

  const handleAddEmployee = () => {
    navigate("/Employee/AddEmployee");
  };

  const totalPages = Math.ceil(filteredEmployee.length / EmployeePerPage);

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(
      currentPage - Math.floor(maxVisiblePages / 2),
      1
    );
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
      if (response.status === 200) {
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
    navigate(`/Employee/EditEmployee/${id}`);
  };

  const indexOfLastEmployee = currentPage * EmployeePerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - EmployeePerPage;
  const currentEmployee = filteredEmployee.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

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
    isLoading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteEmployee,
    handleEdit,
    getVisiblePages,
    setEmployeePerPage,
    handleAddEmployee,
  };
};

export default useViewEmployee;
