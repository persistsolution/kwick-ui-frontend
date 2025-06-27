import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchOtherProductsApi } from "../../api/SubFranchise-API/CustomerProducts2025-Api/CustomerProductsApi";

interface Product {
    id: number;
    Name?: string;
    [key: string]: any;
}

interface PaymentType {
    id: string;
    label: string;
}

const useFrOtherproducts = () => {
    const [FrOtherproducts, setFrOtherproducts] = useState<Product[]>([]);
    const [vendorOptions, setvendorOptions] = useState<any[]>([]);
    const [filteredFrOtherproducts, setFilteredFrOtherproducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [FrOtherproductsPerPage, setFrOtherproductsPerPage] = useState<number>(5);
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
        handleFetchFrOtherproducts();
    }, []);

    const paymentTypeList: PaymentType[] = [
        { id: "1", label: "MRP Product" },
        { id: "2", label: "Making Product" },
    ];

    const handleFetchFrOtherproducts = async () => {
        const frId = localStorage.getItem("frId");
        setLoading(true);
        try {
            const response: any = await fetchOtherProductsApi(Number(frId));
            const data: Product[] = response?.data?.data || [];
            setFrOtherproducts(data);
            setFilteredFrOtherproducts(data);
            setLoading(!data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching FrOtherproducts:", error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredFrOtherproducts(
            FrOtherproducts.filter(
                (FrOtherproducts: Product) =>
                    FrOtherproducts?.Name?.toLowerCase().includes(term.toLowerCase()) ||
                    FrOtherproducts?.id?.toString().includes(term.toLowerCase())
            )
        );
    };

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedFrOtherproducts = [...filteredFrOtherproducts].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredFrOtherproducts(sortedFrOtherproducts);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const table = document.getElementById("FrOtherproducts-table") as HTMLTableElement;
        const workbook = utils.table_to_book(table);
        writeFile(workbook, "FrOtherproducts_data.xlsx");
    };

    const getVisiblePages = (): number[] => {
        const maxVisiblePages = 5;
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
    };

    const indexOfLastFrOtherproducts = currentPage * FrOtherproductsPerPage;
    const indexOfFirstFrOtherproducts = indexOfLastFrOtherproducts - FrOtherproductsPerPage;
    const currentFrOtherproducts = filteredFrOtherproducts.slice(
        indexOfFirstFrOtherproducts,
        indexOfLastFrOtherproducts
    );
    const totalPages = Math.ceil(filteredFrOtherproducts.length / FrOtherproductsPerPage);

    return {
        vendorOptions,
        indexOfLastFrOtherproducts,
        indexOfFirstFrOtherproducts,
        FrOtherproducts,
        filteredFrOtherproducts,
        searchTerm,
        currentPage,
        FrOtherproductsPerPage,
        sortConfig,
        currentFrOtherproducts,
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
        setFrOtherproductsPerPage,
        setvendorOptions,
        setVendorId
    };
};

export default useFrOtherproducts;
