import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { useParams } from "react-router-dom";
import {
  fetchAllocatedProductsApi,
  updateAllocatedProductsApi,
} from "../../../api/Selling-Products-Api/AllocatedProducts-Api/AllocatedProductsApi";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";

const useAllocatedProducts = () => {
  const [allocateProducts, setallocateProducts] = useState([]);
  const [filteredallocateProducts, setFilteredallocateProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allocateProductsPerPage, setallocateProductsPerPage] = useState(5);
  // const [franchiseList , setfranchiseList]= useState([])
  // const [franchiseList] = useState([]);
  const [fromDate, setfromDate] = useState<Date | any>();
  const [toDate, settodate] = useState<Date | any>();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });
  // const [modal, setModal] = useState(false);
  // const [allocateProductsEditId, setallocateProductsEditId] = useState(0);
  const [selectAllocatedProduct, setSelectAllocatedProduct] = useState<
    object[]
  >([]);
  const [categories, setCategories] = useState<{ id: number; Name: string }[]>(
    []
  );
  const [subCategory, setSubCategory] = useState<
    { id: number; Name: string }[]
  >([]);
  const { id } = useParams();

  const franchiseList = [
    {
      id: "all",
      label: "All",
    },
    {
      id: 1,
      label: "COCO Franchise",
    },

    {
      id: 2,
      label: "FOFO Franchise",
    },
    {
      id: 0,
      label: "Other Franchise ",
    },
  ];

  useEffect(() => {
    handelfetchallocateProducts();
    handelGetCategories();
    handelGetSubCategories();
  }, []);

  const handelAllocatedAllProduct = (e: any) => {
    const { checked } = e.target;
    const updatefilteredallocateProducts: any = filteredallocateProducts.map(
      (item: any) => ({
        ...item,
        checkstatus: checked,
      })
    );
    setFilteredallocateProducts(updatefilteredallocateProducts);
    if (checked) {
      setSelectAllocatedProduct(updatefilteredallocateProducts);
    } else {
      setSelectAllocatedProduct([]);
    }
  };

  const updateAllocatedProducts = async (data: object) => {
    try {
      const response: any = await updateAllocatedProductsApi(data);
      console.log(response, "response");
    } catch (error) {
      console.error("Error fetching allocateProducts:", error);
    }
  };

  const handelAllocatedProduct = (
    e: any,
    productId: number,
    products: { id: number; [key: string]: any }
  ) => {
    const { checked } = e.target;
    const updatedFilteredProducts: any = filteredallocateProducts.map(
      (item: any) =>
        item.id === productId ? { ...item, checkstatus: checked } : item
    );
    setFilteredallocateProducts(updatedFilteredProducts);
    if (checked) {
      setSelectAllocatedProduct([...selectAllocatedProduct, products]);
      const data = {
        id: products.id,
        checkstatus: checked ? 1 : 0,
      };
      updateAllocatedProducts(data);
    } else {
      const data = {
        id: products.id,
        checkstatus: checked ? 1 : 0,
      };
      updateAllocatedProducts(data);
      setSelectAllocatedProduct(
        selectAllocatedProduct.filter((item: any) => item.id !== productId)
      );
    }
  };

  const handelfetchallocateProducts = async () => {
    try {
      const response: any = await fetchAllocatedProductsApi(Number(id));
      setallocateProducts(response.data);
      setFilteredallocateProducts(response.data);
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
        (AllocateProducts: any) =>
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
    const sortedallocateProducts = [...filteredallocateProducts].sort(
      (a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    );

    setSortConfig({ key, direction });
    setFilteredallocateProducts(sortedallocateProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const table = document.getElementById("AllocateProducts-table");
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

    return [...Array(endPage - startPage + 1)].map(
      (_, index) => startPage + index
    );
  };

  const indexOfLastAllocateProducts = currentPage * allocateProductsPerPage;
  const indexOfFirstAllocateProducts =
    indexOfLastAllocateProducts - allocateProductsPerPage;
  const currentallocateProducts = filteredallocateProducts.slice(
    indexOfFirstAllocateProducts,
    indexOfLastAllocateProducts
  );
  const totalPages = Math.ceil(
    filteredallocateProducts.length / allocateProductsPerPage
  );

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
    // modal,
    // allocateProductsEditId,
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
