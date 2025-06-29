import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchWastageStockApi } from "../../api/SubFranchise-API/CustomerProducts2025-Api/CustomerProductsApi";

interface Product {
    id: number;
    Name?: string;
    [key: string]: any;
}

interface PaymentType {
    id: string;
    label: string;
}

const useFrWastageStock = () => {
    const [FrWastageStock, setFrWastageStock] = useState<Product[]>([]);
    const [vendorOptions, setvendorOptions] = useState<any[]>([]);
    const [filteredFrWastageStock, setFilteredFrWastageStock] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [FrWastageStockPerPage, setFrWastageStockPerPage] = useState<number>(5);
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
        handleFetchFrWastageStock();
    }, []);

    const paymentTypeList: PaymentType[] = [
        { id: "1", label: "MRP Product" },
        { id: "2", label: "Making Product" },
    ];


    
    const formatDateToYMD = (date: Date | null): string => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    const handleFetchFrWastageStock = async () => {
        const frId = localStorage.getItem("frId");
        setLoading(true);
        try {
            const response: any = await fetchWastageStockApi(Number(frId), formatDateToYMD(fromDate), formatDateToYMD(toDate));
            const data: Product[] = response?.data?.data || [];
            setFrWastageStock(data);
            setFilteredFrWastageStock(data);
            setLoading(!data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching FrWastageStock:", error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredFrWastageStock(
            FrWastageStock.filter(
                (FrWastageStock: Product) =>
                    FrWastageStock?.Name?.toLowerCase().includes(term.toLowerCase()) ||
                    FrWastageStock?.id?.toString().includes(term.toLowerCase())
            )
        );
    };

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedFrWastageStock = [...filteredFrWastageStock].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredFrWastageStock(sortedFrWastageStock);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const table = document.getElementById("FrWastageStock-table") as HTMLTableElement;
        const workbook = utils.table_to_book(table);
        writeFile(workbook, "FrWastageStock_data.xlsx");
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

    const indexOfLastFrWastageStock = currentPage * FrWastageStockPerPage;
    const indexOfFirstFrWastageStock = indexOfLastFrWastageStock - FrWastageStockPerPage;
    const currentFrWastageStock = filteredFrWastageStock.slice(
        indexOfFirstFrWastageStock,
        indexOfLastFrWastageStock
    );
    const totalPages = Math.ceil(filteredFrWastageStock.length / FrWastageStockPerPage);

    return {
        vendorOptions,
        indexOfLastFrWastageStock,
        indexOfFirstFrWastageStock,
        FrWastageStock,
        filteredFrWastageStock,
        searchTerm,
        currentPage,
        FrWastageStockPerPage,
        sortConfig,
        currentFrWastageStock,
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
        setFrWastageStockPerPage,
        setvendorOptions,
        setVendorId,
        handleFetchFrWastageStock
    };
};

export default useFrWastageStock;
