import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRawCategories } from "../../../api/Raw-Making-Products-Api/RawCategoryApi/RawCategortApi";
import { fetchRawSubCategories } from "../../../api/Raw-Making-Products-Api/RawSubCategoryApi/RawSubCategoryApi";
import {
  fetchRawProductsByIdApi,
  updateRawProductsApi,
} from "../../../api/Raw-Making-Products-Api/RawProductsApi/RawProductsApi";
import { fetchUnitApi } from "../../../api/Master-Api/Unit-Api/UnitApi";

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
}

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
  productType: string;
  transferProduct: string;
  qrDisplay: string;
  srNo: string;
  productImage: File | null;
  getcategory: Category[];
  getSubCategory: SubCategory[];
  photo: string;
  Qty: number;
  unit: string;
  customerProductId: number;
  makingQty: number;
  unitList: Unit[];
  productList: string[];
}

interface AddedProduct {
  customerProductId: number;
  makingQty: number;
}

const useEditRawProductForm = () => {
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
    productType: "",
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
  });

  const [addedProducts, setAddedProducts] = useState<AddedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    handelGetCategories();
    handelGetSubCategories();
    fetchUnit();
  }, []);

  useEffect(() => {
    fetchRawproductData();
  }, [id]);

  const fetchRawproductData = async () => {
    const response :any = await fetchRawProductsByIdApi(Number(id));
    const data = response?.data?.data || {};
    setFormValues((prev) => ({
      ...prev,
      productName: data.ProductName,
      categoryId: data.CatId,
      subCategoryId: data.SubCatId,
      unit: data.Unit,
    }));
  };

  const fetchUnit = async () => {
    try {
      const response = await fetchUnitApi();
      const data = response?.data || [];
      setFormValues((prev) => ({
        ...prev,
        unitList: data.map((unit: any) => ({
          name: unit.Name,
          id: unit.id,
        })),
      }));
    } catch (error) {
      console.error("Error fetching unit list:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files && files[0]) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        setFormValues((prev) => ({
          ...prev,
          [name]: file,
          photo: url,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handelAddProduct = async () => {
    setLoading(true);
    const productData : object= {
      ProductName: formValues.productName,
      CatId: formValues.categoryId,
      SubCatId: formValues.subCategoryId,
      Unit: formValues.unit,
      productdetails: addedProducts.map((item) => ({
        id: item.customerProductId,
        Qty: item.makingQty,
        Unit: formValues.unit,
      })),
    };

    try {
      const response = await updateRawProductsApi(Number(id), productData);
      if (response.status === 200) {
        alert("Product updated successfully!");
        setFormValues((prevValues) => ({
          ...prevValues,
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
          productType: "",
          transferProduct: "",
          qrDisplay: "",
          srNo: "",
          productImage: null,
          photo: "",
          Qty: 0,
          customerProductId: 0,
          makingQty: 0,
        }));
        setAddedProducts([]);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelGetCategories = async () => {
    try {
      const response :any = await fetchRawCategories();
      const data = response?.data?.data || [];
      setFormValues((prev) => ({
        ...prev,
        getcategory: data.map((cat: any) => ({
          id: cat.id,
          name: cat.Name,
        })),
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handelGetSubCategories = async () => {
    try {
      const response :any = await fetchRawSubCategories();
      const data = response?.data?.data || [];
      setFormValues((prev) => ({
        ...prev,
        getSubCategory: data.map((sub: any) => ({
          id: sub.id,
          name: sub.Name,
        })),
      }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddProduct();
  };

  const handelAddProductList = () => {
    setAddedProducts((prev) => [
      ...prev,
      {
        customerProductId: formValues.customerProductId,
        makingQty: formValues.makingQty,
      },
    ]);
    setFormValues((prev) => ({
      ...prev,
      customerProductId: 0,
      makingQty: 0,
    }));
  };

  const handleDelete = (index: number) => {
    setAddedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeProductList = (value: number, index: number) => {
    setAddedProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, makingQty: value } : item))
    );
  };

  return {
    formValues,
    loading,
    addedProducts,
    handleSubmit,
    handleChange,
    handelAddProductList,
    handleDelete,
    handleChangeProductList,
    setFormValues,
    setAddedProducts,
  };
};

export default useEditRawProductForm;