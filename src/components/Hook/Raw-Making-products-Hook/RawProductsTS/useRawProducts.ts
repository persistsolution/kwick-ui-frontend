import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchRawCategories } from "../../../api/Raw-Making-Products-Api/RawCategoryApi/RawCategortApi";
import {
  createRawProducts,
  fetchRawCustomerProductListApi,
} from "../../../api/Raw-Making-Products-Api/RawProductsApi/RawProductsApi";
import { fetchRawSubCategories } from "../../../api/Raw-Making-Products-Api/RawSubCategoryApi/RawSubCategoryApi";
import { fetchUnitApi } from "../../../api/Master-Api/Unit-Api/UnitApi";

interface ProductFormValues {
  productName: string;
  categoryId: number;
  subCategoryId: number;
  purchasePrice: string;
  totalPrice: string;
  cgst: string;
  sgst: string;
  igst: string;
  totalGst: string;
  priceWoGst: string;
  barcodeNo: string;
  minStockQty: string;
  status: string;
  productType: number;
  transferProduct: string;
  qrDisplay: string;
  srNo: string;
  productImage: File | null;
  getcategory: string[];
  getSubCategory: string[];
  photo: string;
  Qty: number;
  unit: string;
  customerProductId: number;
  makingQty: number;
  unitList: string[];
  productList: string[];
  productType2: number;
}

const useRawProducts = () => {
  const [formValues, setFormValues] = useState<ProductFormValues>({
    productName: "",
    categoryId: 0,
    subCategoryId: 0,
    purchasePrice: "",
    totalPrice: "",
    cgst: "",
    sgst: "",
    igst: "",
    totalGst: "",
    priceWoGst: "",
    barcodeNo: "",
    minStockQty: "",
    status: "",
    productType: 1,
    transferProduct: "",
    qrDisplay: "",
    srNo: "",
    productImage: null,
    getcategory: [],
    getSubCategory: [],
    photo: "",
    Qty: 0,
    unit: "",
    customerProductId: 0,
    makingQty: 0,
    unitList: [],
    productList: [],
    productType2: 2,
  });
  const [addedProducts, setAddedProducts] = useState<
    { customerProductId: number; makingQty: number }[]
  >([]);

  // const navigate = useNavigate();

  useEffect(() => {
    handelGetCategories();
    handelGetSubCategories();
    fetchUnit();
    fetchRawCustomerProductList();
  }, []);

  const fetchRawCustomerProductList = async () => {
    const response: any = await fetchRawCustomerProductListApi();
    const data = await response.data;
    setFormValues((prevValues) => ({
      ...prevValues,
      productList: data.map((prolist: { ProductName: string; id: number }) => ({
        name: prolist.ProductName,
        id: prolist.id,
      })),
    }));
  };

  const fetchUnit = async () => {
    try {
      const response: any = await fetchUnitApi();
      const data = await response.data;
      setFormValues((prevValues) => ({
        ...prevValues,
        unitList: data.map((unit: { Name: string; id: number }) => ({
          name: unit.Name,
          id: unit.Name,
        })),
      }));
    } catch (error) {
      console.error("Error fetching unit list:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files: any = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo: url,
      }));
    } else {
      const updatedValues = {
        ...formValues,
        [name]: value,
      };
      setFormValues(updatedValues);
    }
  };

  const handelAddProduct = async () => {
    const productData = {
      ProductName: formValues.productName,
      CatId: formValues.categoryId,
      SubCatId: formValues.subCategoryId,
      Unit: formValues.unit,
      Status: formValues.status,
      ProdType: formValues.productType,
      prodType2: formValues.productType2,
      productdetails: addedProducts.map((item) => ({
        id: item.customerProductId,
        Qty: item.makingQty,
        Unit: formValues.unit,
      })),
    };

    try {
      const response: any = await createRawProducts(productData);
      if (response.status === 200) {
        alert("Product added successfully!");
        setFormValues((prevValues) => ({
          productName: "",
          categoryId: 0,
          subCategoryId: 0,
          unit: "",
          purchasePrice: "",
          totalPrice: "",
          cgst: "",
          sgst: "",
          igst: "",
          totalGst: "",
          priceWoGst: "",
          barcodeNo: "",
          minStockQty: "",
          status: "",
          productType: 1,
          transferProduct: "",
          qrDisplay: "",
          srNo: "",
          productImage: null,
          getcategory: prevValues.getcategory,
          getSubCategory: prevValues.getSubCategory,
          photo: "",
          Qty: 0,
          customerProductId: 0,
          makingQty: 0,
          unitList: prevValues.unitList,
          productList: prevValues.productList,
          productType2: 2,
        }));
        setAddedProducts([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchRawCategories();
      const data = await response.data;
      setFormValues((prevValues) => ({
        ...prevValues,
        getcategory: data.map((category: { Name: string; id: number }) => ({
          name: category.Name,
          id: category.id,
        })),
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handelGetSubCategories = async () => {
    try {
      const response: any = await fetchRawSubCategories();
      const data = response.data;
      setFormValues((prevValues) => ({
        ...prevValues,
        getSubCategory: data.map(
          (subcategory: { Name: string; id: number }) => ({
            name: subcategory.Name,
            id: subcategory.id,
          })
        ),
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmit = () => {
    handelAddProduct();
  };

  const handelAddProductList = (e: React.FormEvent<HTMLFormElement>) => {
    // if (formValues.customerProductId && formValues.makingQty) {
    e.preventDefault();
    const newProduct = {
      customerProductId: formValues.customerProductId,
      makingQty: formValues.makingQty,
    };
    setAddedProducts((prev) => [...prev, newProduct]);
    setFormValues((prevValues) => ({
      ...prevValues,
      // productName: "",
      // categoryId: 0,
      // subCategoryId: 0,
      // unit: "",
      purchasePrice: "",
      totalPrice: "",
      cgst: "",
      sgst: "",
      igst: "",
      totalGst: "",
      priceWoGst: "",
      barcodeNo: "",
      minStockQty: "",
      // status: "",
      productType: 1,
      transferProduct: "",
      qrDisplay: "",
      srNo: "",
      productImage: null,
      getcategory: prevValues.getcategory,
      getSubCategory: prevValues.getSubCategory,
      photo: "",
      Qty: 0,
      customerProductId: 0,
      makingQty: 0,
      unitList: prevValues.unitList,
      productList: prevValues.productList,
    }));
    // } else {
    //   alert("Please select a Customer Product and specify the Making Qty.");
    // }
  };

  const handleDelete = (index: number) => {
    setAddedProducts((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleChangeProductList = (value: any, index: number) => {
    setAddedProducts((prev) =>
      prev.map((product, idx) =>
        idx === index ? { ...product, makingQty: value } : product
      )
    );
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    handelAddProductList,
    addedProducts,
    handleDelete,
    handleChangeProductList,
    setFormValues,
    setAddedProducts,
  };
};

export default useRawProducts;
