import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCustomerDownloadExProductsApi } from "../../api/SubFranchise-API/CustomerProducts2025-Api/CustomerProductsApi";

interface Product {
    id: number;
    Name?: string;
    [key: string]: any;
}

interface PaymentType {
    id: string;
    label: string;
}

const useFrDownloadCustomerPrdts = () => {
    const [FrDownloadCustomerPrdts, setFrDownloadCustomerPrdts] = useState<Product[]>([]);
    const [vendorOptions, setvendorOptions] = useState<any[]>([]);
    const [filteredFrDownloadCustomerPrdts, setFilteredFrDownloadCustomerPrdts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [FrDownloadCustomerPrdtsPerPage, setFrDownloadCustomerPrdtsPerPage] = useState<number>(5);
    const [fromDate, setfromDate] = useState<Date | null>(null);
    const [toDate, settodate] = useState<Date | null>(null);
    const [vendorId, setVendorId] = useState<number>(0);
    const [sortConfig, setSortConfig] = useState<{
        key: string | null;
        direction: string;
    }>({ key: null, direction: "asc" });
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPayment, setSelectPayment] = useState<string>("");
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [selectedCategory, setSelectCategory] = useState<string>("");
    const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
    const [selectedSubCategory, setSelectSubCategory] = useState<string>("");

    useEffect(() => {
        handleFetchFrDownloadCustomerPrdts();
    }, []);

    const paymentTypeList: PaymentType[] = [
        { id: "1", label: "MRP Product" },
        { id: "2", label: "Making Product" },
    ];

    const handleFetchFrDownloadCustomerPrdts = async () => {
        const frId = localStorage.getItem("frId");
        setLoading(true);
        try {
            const response: any = await fetchCustomerDownloadExProductsApi(Number(frId));
            const data: Product[] = response?.data?.data || [];
            setFrDownloadCustomerPrdts(data);
            setFilteredFrDownloadCustomerPrdts(data);
            setLoading(!data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching FrDownloadCustomerPrdts:", error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredFrDownloadCustomerPrdts(
            FrDownloadCustomerPrdts.filter(
                (FrDownloadCustomerPrdts: Product) =>
                    FrDownloadCustomerPrdts?.Name?.toLowerCase().includes(term.toLowerCase()) ||
                    FrDownloadCustomerPrdts?.id?.toString().includes(term.toLowerCase())
            )
        );
    };

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedFrDownloadCustomerPrdts = [...filteredFrDownloadCustomerPrdts].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredFrDownloadCustomerPrdts(sortedFrDownloadCustomerPrdts);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const table = document.getElementById("FrDownloadCustomerPrdts-table") as HTMLTableElement;
        const workbook = utils.table_to_book(table);
        writeFile(workbook, "FrDownloadCustomerPrdts_data.xlsx");
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

    const indexOfLastFrDownloadCustomerPrdts = currentPage * FrDownloadCustomerPrdtsPerPage;
    const indexOfFirstFrDownloadCustomerPrdts = indexOfLastFrDownloadCustomerPrdts - FrDownloadCustomerPrdtsPerPage;
    const currentFrDownloadCustomerPrdts = filteredFrDownloadCustomerPrdts.slice(
        indexOfFirstFrDownloadCustomerPrdts,
        indexOfLastFrDownloadCustomerPrdts
    );
    const totalPages = Math.ceil(filteredFrDownloadCustomerPrdts.length / FrDownloadCustomerPrdtsPerPage);

    return {
        vendorOptions,
        indexOfLastFrDownloadCustomerPrdts,
        indexOfFirstFrDownloadCustomerPrdts,
        FrDownloadCustomerPrdts,
        filteredFrDownloadCustomerPrdts,
        searchTerm,
        currentPage,
        FrDownloadCustomerPrdtsPerPage,
        sortConfig,
        currentFrDownloadCustomerPrdts,
        totalPages,
        fromDate,
        toDate,
        vendorId,
        loading,
        paymentTypeList,
        selectedPayment,
        categoryList,
        setSelectCategory,
        selectedCategory,
        setSelectPayment,
        subCategoryList,
        setSelectSubCategory,
        selectedSubCategory,
        handleSearch,
        settodate,
        setfromDate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setFrDownloadCustomerPrdtsPerPage,
        setvendorOptions,
        setVendorId
    };
};

export default useFrDownloadCustomerPrdts;
