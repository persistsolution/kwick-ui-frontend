import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchDiscountInvoiceReportApi } from "../../api/SubFranchise-API/Report2025-Api/FrRawInventoryStockReportApi";

const useFrDiscountReport = () => {
    const [FrDiscount, setFrDiscount] = useState([]);
    const [vendorOptions, setvendorOptions] = useState([]);
    const [filteredFrDiscount, setFilteredFrDiscount] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [FrDiscountPerPage, setFrDiscountPerPage] = useState(5);
    const [fromDate, setfromDate] = useState<Date | any>();
    const [toDate, settodate] = useState<Date | any>();
    const [vendorId, setVendorId] = useState(0);
    const [sortConfig, setSortConfig] = useState<{
        key: string | null;
        direction: string;
    }>({ key: null, direction: "asc" });
    const [loading, setLoading] = useState(false);
    const [selectedReport, setSelectReport] = useState("")
    const [selectedPayment, setSelectPayment] = useState("")

    useEffect(() => {
        handleFetchFrDiscount();
    }, []);

    const reportList = [
        { id: "Today", label: "Today" },
        { id: "Yesterday", label: "Yesterday" },
        { id: "Week", label: "This Week" },
        { id: "Month", label: "This Month" },
        { id: "Custom", label: "Custom" },
    ];

    const paymentTypeList = [
        { id: "all", label: "All" },
        { id: "Cash", label: "Cash" },
        { id: "Phone Pay", label: "Phone Pay" },
        { id: "UPI", label: "Google Pay" },
        { id: "Paytm", label: "Paytm" },
        { id: "Other UPI", label: "Other UPI" },
        { id: "Borrowing", label: "Credit / उधार" },
        { id: "Zomato", label: "Zomato" },
    ];


    const handleFetchFrDiscount = async () => {
        const frId = localStorage.getItem("frId")
        setLoading(true)
        try {
            const response: any = await fetchDiscountInvoiceReportApi(Number(frId));
            const data = response?.data?.data || []
            setFrDiscount(data);
            setFilteredFrDiscount(data);
            setLoading(!data)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching FrDiscount:", error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredFrDiscount(
            FrDiscount.filter(
                (FrDiscount: any) =>
                    FrDiscount?.Name?.toLowerCase().includes(term.toLowerCase()) ||
                    FrDiscount?.id?.toString().includes(term.toLowerCase())
            )
        );
    };

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedFrDiscount = [...filteredFrDiscount].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredFrDiscount(sortedFrDiscount);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const table = document.getElementById("FrDiscount-table");
        const workbook = utils.table_to_book(table);
        writeFile(workbook, "FrDiscount_data.xlsx");
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


    const indexOfLastFrDiscount = currentPage * FrDiscountPerPage;
    const indexOfFirstFrDiscount = indexOfLastFrDiscount - FrDiscountPerPage;
    const currentFrDiscount = filteredFrDiscount.slice(
        indexOfFirstFrDiscount,
        indexOfLastFrDiscount
    );
    const totalPages = Math.ceil(filteredFrDiscount.length / FrDiscountPerPage);

    return {
        vendorOptions,
        indexOfLastFrDiscount,
        indexOfFirstFrDiscount,
        FrDiscount,
        filteredFrDiscount,
        searchTerm,
        currentPage,
        FrDiscountPerPage,
        sortConfig,
        currentFrDiscount,
        totalPages,
        fromDate,
        toDate,
        vendorId,
        loading,
        reportList,
        selectedReport,
        paymentTypeList,
        selectedPayment,
        setSelectPayment,
        setSelectReport,
        handleSearch,
        settodate,
        setfromDate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setFrDiscountPerPage,
        setvendorOptions,
        setVendorId
    };
};

export default useFrDiscountReport;
