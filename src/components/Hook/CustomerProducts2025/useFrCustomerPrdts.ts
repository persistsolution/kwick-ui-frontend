import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { fetchCustomerProductsApi } from "../../api/SubFranchise-API/CustomerProducts2025-Api/CustomerProductsApi";

interface Product {
    id: number;
    Name?: string;
    [key: string]: any;
}

interface PaymentType {
    id: string;
    label: string;
}

const useFrCustomerproducts = () => {
    const [FrCustomerproducts, setFrCustomerproducts] = useState<Product[]>([]);
    const [vendorOptions, setvendorOptions] = useState<any[]>([]);
    const [filteredFrCustomerproducts, setFilteredFrCustomerproducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [FrCustomerproductsPerPage, setFrCustomerproductsPerPage] = useState<number>(5);
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
        handleFetchFrCustomerproducts();
    }, []);

    const paymentTypeList: PaymentType[] = [
        { id: "1", label: "MRP Product" },
        { id: "2", label: "Making Product" },
    ];

    const handleFetchFrCustomerproducts = async () => {
        const frId = localStorage.getItem("frId");
        setLoading(true);
        try {
            const response: any = await fetchCustomerProductsApi(Number(frId));
            const data: Product[] = response?.data?.data || [];
            setFrCustomerproducts(data);
            setFilteredFrCustomerproducts(data);
            setLoading(!data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching FrCustomerproducts:", error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredFrCustomerproducts(
            FrCustomerproducts.filter(
                (FrCustomerproducts: Product) =>
                    FrCustomerproducts?.Name?.toLowerCase().includes(term.toLowerCase()) ||
                    FrCustomerproducts?.id?.toString().includes(term.toLowerCase())
            )
        );
    };

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedFrCustomerproducts = [...filteredFrCustomerproducts].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredFrCustomerproducts(sortedFrCustomerproducts);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const table = document.getElementById("FrCustomerproducts-table") as HTMLTableElement;
        const workbook = utils.table_to_book(table);
        writeFile(workbook, "FrCustomerproducts_data.xlsx");
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

    const indexOfLastFrCustomerproducts = currentPage * FrCustomerproductsPerPage;
    const indexOfFirstFrCustomerproducts = indexOfLastFrCustomerproducts - FrCustomerproductsPerPage;
    const currentFrCustomerproducts = filteredFrCustomerproducts.slice(
        indexOfFirstFrCustomerproducts,
        indexOfLastFrCustomerproducts
    );
    const totalPages = Math.ceil(filteredFrCustomerproducts.length / FrCustomerproductsPerPage);

    return {
        vendorOptions,
        indexOfLastFrCustomerproducts,
        indexOfFirstFrCustomerproducts,
        FrCustomerproducts,
        filteredFrCustomerproducts,
        searchTerm,
        currentPage,
        FrCustomerproductsPerPage,
        sortConfig,
        currentFrCustomerproducts,
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
        setFrCustomerproductsPerPage,
        setvendorOptions,
        setVendorId
    };
};

export default useFrCustomerproducts;
