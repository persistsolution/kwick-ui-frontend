import { useEffect, useState } from "react";
import { fetchFranchiseApi } from "../../../api/Franchise-Api/FranchiseApi";
import { utils, writeFile } from "xlsx";


const useFranchiseExpenseVsSaleReport = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    mobileNumber: "",
    gstNo: "",
    termsandcondition: "",
    bottomTitle: "",
    selectedFranchise: null,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [franchiseList, setFranchiseList] = useState<any[]>([]);
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settodate] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  const [filteredFrExVsSaleReort, setFilteredFrExVsSaleReort] = useState([]);
    const [frExVsSaleReort, setFrExVsSaleReort] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [FrExVsSaleReortPerPage, setFrExVsSaleReortPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    getFranchiseList();
    handleSubmitFranchiseExpenseVsSaleReport();
  }, []);

  const DoughnutData = {
  labels: [
    "Total Sale", "Employee Expenses", "Vendor Expenses", "NSO Vendor Expenses",
    "Product Cost (40%)", "Salary", "Rent & Electricity", "Misc Expenses",
    "Investor Share Cost (12%)", "GST (5%)", "HO Cost (5%)", "Balance"
  ],
  datasets: [
    {
      label: "Amount in ₹",
      data: [
        100000000, 5000000, 3000000, 2000000, 45000000, 4000000,
        2500000, 1500000, 12000000, 5000000, 5000000, 2000000
      ],
      backgroundColor: [
        "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60",
        "#1abc9c", "#3498db", "#5dade2", "#5b2c6f", "#8e44ad",
        "#d63384", "#fd7e14"
      ],
      hoverOffset: 4,
      borderColor: "rgba(142, 156, 173, 0.1)"
    }
  ]
};


const DoughnutOptions = {
    responsive: true,
    maintainAspectRatio: false
};


const BarData = {
  labels: [
    "Total Sale", "Employee Expenses", "Vendor Expenses", "NSO Vendor Expenses",
    "Product Cost (40%)", "Salary", "Rent & Electricity", "Misc Expenses",
    "Investor Share Cost (12%)", "GST (5%)", "HO Cost (5%)", "Balance"
  ],
  datasets: [
    {
      label: "Amount in ₹",
      data: [
        100000000, 5000000, 3000000, 2000000, 45000000, 4000000,
        2500000, 1500000, 12000000, 5000000, 5000000, 2000000
      ],
      backgroundColor: [
        "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60",
        "#1abc9c", "#3498db", "#5dade2", "#5b2c6f", "#8e44ad",
        "#d63384", "#fd7e14"
      ],
      borderWidth: 1,
    }
  ],
};

const BarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: true,
        },
    },
    cutout: 90,
};



  const getFranchiseList = async () => {
    try {
      const response: any = await fetchFranchiseApi();
      if (response.status === 200) {
        const formatted = response.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setFranchiseList(formatted);
      }
    } catch (error) {
      console.error("Error fetching franchise list:", error);
    }
  };

    const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedFrExVsSaleReort = [...filteredFrExVsSaleReort].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredFrExVsSaleReort(sortedFrExVsSaleReort);
  }

  const handleFranchiseChange = (option: any) => {
    setFormData((prev) => ({
      ...prev,
      selectedFranchise: option,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

    const exportToExcel = () => {
      const table = document.getElementById("FrExVsSaleReort-table");
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "FrExVsSaleReort_data.xlsx");
    };

  const handleSubmitFranchiseExpenseVsSaleReport = async () => {
    setMessage(null);
    setIsLoading(true);
    try {
      const frId =  localStorage.getItem("frId");
      const response: any = ""
      const data = response?.data?.data ||[];

      if (response.status === 200) {
        setFormData((prev) => ({
          ...prev,
          companyName: data?.company_name || "",
          companyAddress: data?.address || "",
          mobileNumber: data?.mobile_number || "",
          gstNo: data?.gst_number || "",
          termsandcondition: data?.terms_condition || "",
          bottomTitle: data?.bottom_title || "",
        }));
        setMessage("Settings loaded successfully.");
      }
    } catch (err) {
      console.error("Error loading settings:", err);
      setMessage("Failed to load settings.");
    } finally {
      setIsLoading(false);
    }
  };

    const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredFrExVsSaleReort(
      frExVsSaleReort.filter(
        (data: any) =>
          data?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          data?.id?.toString().includes(term.toLowerCase())
      )
    );
  };


    const indexOfLastFrExVsSaleReort = currentPage * FrExVsSaleReortPerPage;
  const indexOfFirstFrExVsSaleReort = indexOfLastFrExVsSaleReort - FrExVsSaleReortPerPage;
  const currentFrExVsSaleReort = filteredFrExVsSaleReort.slice(
    indexOfFirstFrExVsSaleReort,
    indexOfLastFrExVsSaleReort
  );
  const totalPages = Math.ceil(filteredFrExVsSaleReort.length / FrExVsSaleReortPerPage);

  return {
    formData,
    message,
    isLoading,
    franchiseList,
    fromDate,
    toDate,
    BarData,
    DoughnutData,
    DoughnutOptions,
    BarOptions,
    currentFrExVsSaleReort,
    filteredFrExVsSaleReort,
      searchTerm,
        handleSearch,
    setfromDate,
    settodate,
    handleChange,
    handleSort,
    handleFranchiseChange,
    handleSubmitFranchiseExpenseVsSaleReport,
    exportToExcel
  };
};

export default useFranchiseExpenseVsSaleReport;
