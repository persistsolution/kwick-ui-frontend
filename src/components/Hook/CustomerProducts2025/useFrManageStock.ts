import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchManageStockListApi } from "../../api/SubFranchise-API/CustomerProducts2025-Api/CustomerProductsApi";

interface Product {
    id: number;
    Name?: string;
    [key: string]: any;
}

interface PaymentType {
    id: string;
    label: string;
}

const useFrManageStock = () => {
    const [FrManageStock, setFrManageStock] = useState<Product[]>([]);
    const [vendorOptions, setvendorOptions] = useState<any[]>([]);
    const [filteredFrManageStock, setFilteredFrManageStock] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [FrManageStockPerPage, setFrManageStockPerPage] = useState<number>(5);
    const [fromDate, setfromDate] = useState<Date | null>(null);
    const [toDate, settodate] = useState<Date | null>(null);
    const [vendorId, setVendorId] = useState<number>(0);
    const [sortConfig, setSortConfig] = useState<{
        key: string | null;
        direction: string;
    }>({ key: null, direction: "asc" });
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPayment, setSelectPayment] = useState<string>("");
    const [ProductsList, setProductsList] = useState<any[]>([]);
    const [selectedProducts, setSelectProducts] = useState<string>("");

    useEffect(() => {
        handleFetchFrManageStock();
    }, []);

    const paymentTypeList: PaymentType[] = [
        { id: "1", label: "MRP Product" },
        { id: "2", label: "Making Product" },
    ];


    const formatDateToYMD = (date: Date | null): string => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    const handleFetchFrManageStock = async () => {
        const frId = localStorage.getItem("frId");
        setLoading(true);
        try {
            const response: any = await fetchManageStockListApi(Number(frId), formatDateToYMD(fromDate), formatDateToYMD(toDate));
            const data: Product[] = response?.data?.data || [];
            setFrManageStock(data);
            setFilteredFrManageStock(data);
            setLoading(!data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching FrManageStock:", error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredFrManageStock(
            FrManageStock.filter(
                (FrManageStock: Product) =>
                    FrManageStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
                    FrManageStock?.id?.toString().includes(term.toLowerCase())
            )
        );
    };

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedFrManageStock = [...filteredFrManageStock].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredFrManageStock(sortedFrManageStock);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };




    const exportToExcel = () => {
        const table = document.getElementById("FrManageStock-table") as HTMLTableElement;
        const workbook = utils.table_to_book(table);
        writeFile(workbook, "FrManageStock_data.xlsx");
    };

    const getVisiblePages = (): number[] => {
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

    const indexOfLastFrManageStock = currentPage * FrManageStockPerPage;
    const indexOfFirstFrManageStock = indexOfLastFrManageStock - FrManageStockPerPage;
    const currentFrManageStock = filteredFrManageStock.slice(
        indexOfFirstFrManageStock,
        indexOfLastFrManageStock
    );
    const totalPages = Math.ceil(filteredFrManageStock.length / FrManageStockPerPage);

    return {
        vendorOptions,
        indexOfLastFrManageStock,
        indexOfFirstFrManageStock,
        FrManageStock,
        filteredFrManageStock,
        searchTerm,
        currentPage,
        FrManageStockPerPage,
        sortConfig,
        currentFrManageStock,
        totalPages,
        fromDate,
        toDate,
        vendorId,
        loading,
        paymentTypeList,
        selectedPayment,
        ProductsList,
        setSelectProducts,
        selectedProducts,
        setSelectPayment,
        handleSearch,
        settodate,
        setfromDate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setFrManageStockPerPage,
        setvendorOptions,
        setVendorId,
        handleFetchFrManageStock
    };
};

export default useFrManageStock;
