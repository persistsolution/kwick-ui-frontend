import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useParams } from "react-router-dom";
import {
  fetchAllocatedProductsFrApi,
  updateAllocatedProductsApi,
} from "../../../api/Selling-Products-Api/AllocatedProducts-Api/AllocatedProductsApi";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";

interface Product {
  id: number;
  Name?: string;
  [key: string]: any;
}

interface Category {
  id: number;
  Name: string;
}

interface SortConfig {
  key: string | null;
  direction: string;
}

const useAllocatedProducts = () => {
  const [allocateProducts, setallocateProducts] = useState<Product[]>([]);
  const [filteredallocateProducts, setFilteredallocateProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allocateProductsPerPage, setallocateProductsPerPage] = useState<number>(5);
  const [fromDate, setfromDate] = useState<Date | string | undefined>();
  const [toDate, settodate] = useState<Date | string | undefined>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [selectAllocatedProduct, setSelectAllocatedProduct] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState<Category[]>([]);
  const { id } = useParams<{ id: string }>();

  const franchiseList = [
    { id: "all", label: "All" },
    { id: 1, label: "COCO Franchise" },
    { id: 2, label: "FOFO Franchise" },
    { id: 0, label: "Other Franchise " },
  ];

  useEffect(() => {
    handelfetchallocateProducts();
    handelGetCategories();
    handelGetSubCategories();
  }, []);

  const handelAllocatedAllProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatefilteredallocateProducts = filteredallocateProducts.map((item) => ({
      ...item,
      checkstatus: checked,
    }));
    setFilteredallocateProducts(updatefilteredallocateProducts);
    if (checked) {
      setSelectAllocatedProduct(updatefilteredallocateProducts);
    } else {
      setSelectAllocatedProduct([]);
    }
  };

  const updateAllocatedProducts = async (data: object) => {
    try {
      const response: any = await updateAllocatedProductsApi(Number(id), data);
      console.log(response, "response");
    } catch (error) {
      console.error("Error fetching allocateProducts:", error);
    }
  };

  const handelAllocatedProduct = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number,
    products: Product
  ) => {
    const { checked } = e.target;
    const updatedFilteredProducts = filteredallocateProducts.map((item) =>
      item.id === productId ? { ...item, checkstatus: checked } : item
    );
    setFilteredallocateProducts(updatedFilteredProducts);

    const data = {
      id: products.id,
      frid: id,
      status: checked ? 1 : 0,
    };

    if (checked) {
      setSelectAllocatedProduct([...selectAllocatedProduct, products]);
    } else {
      setSelectAllocatedProduct(
        selectAllocatedProduct.filter((item) => item.id !== productId)
      );
    }

    updateAllocatedProducts(data);
  };

  const handelfetchallocateProducts = async () => {
    try {
      const response: any = await fetchAllocatedProductsFrApi(Number(id));
      const data = response?.data?.data || [];
      const updateAllocatedProducts = data?.map((data: any) => ({
        ...data,
        checkstatus: data?.checkstatus == 0 ? false : true
      }))
      setallocateProducts(updateAllocatedProducts);
      setFilteredallocateProducts(updateAllocatedProducts);
    } catch (error) {
      console.error("Error fetching allocateProducts:", error);
    }
  };

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchCategories();
      const data = await response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handelGetSubCategories = async () => {
    try {
      const response: any = await fetchSubCategories();
      const data = await response.data;
      setSubCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredallocateProducts(
      allocateProducts.filter(
        (AllocateProducts) =>
          AllocateProducts?.Name?.toLowerCase().includes(term.toLowerCase()) ||
          AllocateProducts?.id?.toString().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedallocateProducts = [...filteredallocateProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredallocateProducts(sortedallocateProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AllocateProducts-table");
    if (!table) return;
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "AllocateProducts_data.xlsx");
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
  };

  const indexOfLastAllocateProducts = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProducts = indexOfLastAllocateProducts - allocateProductsPerPage;
  const currentallocateProducts = filteredallocateProducts.slice(
    indexOfFirstAllocateProducts,
    indexOfLastAllocateProducts
  );
  const totalPages = Math.ceil(filteredallocateProducts.length / allocateProductsPerPage);

  return {
    indexOfLastAllocateProducts,
    indexOfFirstAllocateProducts,
    allocateProducts,
    filteredallocateProducts,
    searchTerm,
    currentPage,
    allocateProductsPerPage,
    sortConfig,
    currentallocateProducts,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setallocateProductsPerPage,
    categories,
    subCategory,
    handelfetchallocateProducts,
    setfromDate,
    settodate,
    handelAllocatedProduct,
    handelAllocatedAllProduct,
  };
};

export default useAllocatedProducts;
