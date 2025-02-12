import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchEditProducts,
  updateProducts,
} from "../../../api/Selling-Products-Api/ProductApi/productApi";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";
import { fetchUnitApi } from "../../../api/Master-Api/Unit-Api/UnitApi";

interface ProductFormValues {
  productName: string;
  categoryId: number;
  subCategoryId: number;
  purchasePrice: number;
  totalPrice: string;
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: string;
  priceWoGst: string;
  barcodeNo: string;
  minStockQty: string;
  status: string;
  productType: number;
  transferProduct: number;
  qrDisplay: string;
  srNo: number;
  productImage: File | null;
  getcategory: string[];
  getSubCategory: string[];
  photo: string;
  getBrandList: string[];
  brandId: number;
  unitList: string[];
  unitId: string;
  code: string;
}

const useEditProductForm = () => {
  const [formValues, setFormValues] = useState<ProductFormValues>({
    productName: "",
    categoryId: 0,
    subCategoryId: 0,
    purchasePrice: 0,
    totalPrice: "",
    cgst: 2.5,
    sgst: 2.5,
    igst: 0,
    totalGst: "",
    priceWoGst: "",
    barcodeNo: "",
    minStockQty: "",
    status: "",
    productType: 0,
    transferProduct: 1,
    qrDisplay: "",
    srNo: 1,
    productImage: null,
    getcategory: [],
    getSubCategory: [],
    photo: null,
    getBrandList: [],
    brandId: 0,
    unitList: [],
    unitId: "",
    code: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handelGetCategories();
    handelGetSubCategories();
    handleFetchEditProductData();
    fetchUnit();
  }, []);

  const fetchUnit = async () => {
    try {
      const response: any = await fetchUnitApi();
      const data = await response.data;
      setFormValues((prevValues) => ({
        ...prevValues,
        unitList: data.map((unit: { Name: string; id: number }) => ({
          name: unit.Name,
          id: unit.id,
        })),
      }));
    } catch (error) {
      console.error("Error fetching unit list:", error);
    }
  };

  const handleFetchEditProductData = async () => {
    try {
      const response: any = await fetchEditProducts(Number(id));
      if (response.status === 200 && response.data) {
        const responseData = response.data;
        // Calculate WithoutGstAmount
        const totalGstPercent =
          Number(responseData.CgstPer || 0) +
          Number(responseData.SgstPer || 0) +
          Number(responseData.IgstPer || 0);
        const withoutGstAmount = totalGstPercent
          ? responseData.ProdPrice -
            (responseData.ProdPrice * totalGstPercent) / 100
          : responseData.ProdPrice;

        setFormValues((prev) => ({
          ...prev,
          productName: responseData?.ProductName,
          categoryId: responseData?.CatId,
          subCategoryId: responseData?.SubCatId,
          purchasePrice: responseData?.PurchasePrice,
          totalPrice: responseData?.ProdPrice,
          cgst: responseData?.CgstPer,
          sgst: responseData?.SgstPer,
          igst: responseData?.IgstPer,
          totalGst: responseData?.GstAmt,
          priceWoGst: withoutGstAmount,
          barcodeNo: responseData?.BarcodeNo,
          minStockQty: responseData?.MinQty,
          status: responseData?.Status,
          productType: responseData?.ProdType,
          transferProduct: responseData?.Transfer,
          qrDisplay: responseData?.QrDisplay,
          srNo: responseData?.SrNo,
          productImage: responseData?.Photo,
        }));
      } else {
        setMessage(
          `Error: ${
            response.data?.message || "Failed to Fetch Edit Product Data."
          }`
        );
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setMessage(
        "An error occurred while fetching product data. Please try again later."
      );
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
    } else {
      const updatedValues = {
        ...formValues,
        [name]: value,
      };

      if (["cgst", "sgst", "igst", "totalPrice"].includes(name)) {
        const totalPrice = parseFloat(updatedValues.totalPrice) || 0;
        const cgst = Number(updatedValues.cgst) || 0;
        const sgst = Number(updatedValues.sgst) || 0;
        const igst = Number(updatedValues.igst) || 0;
        const totalGst = cgst + sgst + igst;
        const priceWoGst = totalPrice / (1 + totalGst / 100);
        const totalGstAmt = (totalPrice * totalGst) / 105;
        updatedValues.totalGst = totalGstAmt.toFixed(2);
        updatedValues.priceWoGst = priceWoGst.toFixed(2);
      }
      setFormValues(updatedValues);
    }
  };

  const handelAddProduct = async () => {
    if (
      typeof formValues.totalGst === "number" &&
      !isNaN(formValues.totalGst)
    ) {
      var cgstAmount: any = formValues.totalGst / 3;
      var sgstAmount: any = formValues.totalGst / 3;
      var igstAmount: any = formValues.totalGst / 3;
    }

    const productData = {
      ProductName: formValues.productName,
      CatId: formValues.categoryId,
      SubCatId: formValues.subCategoryId,
      CgstPer: formValues.cgst,
      SgstPer: formValues.sgst,
      IgstPer: formValues.igst,
      CgstAmt: cgstAmount,
      SgstAmt: sgstAmount,
      IgstAmt: igstAmount,
      GstAmt: formValues.totalGst,
      ProdPrice: formValues.totalPrice,
      Status: formValues.status,
      SrNo: formValues.srNo,
      Photo: formValues.photo,
      BarcodeNo: formValues.barcodeNo,
      ProdType: formValues.productType,
      Transfer: formValues.transferProduct,
      QrDisplay: formValues.qrDisplay,
      MinQty: formValues.minStockQty,
      PurchasePrice: formValues.purchasePrice,
      checkstatus: formValues.status,
      code: formValues.code,
      ProdType2: 1,
      ProdId: 0,
      MinPrice: 10,
      CreatedBy: 2091,
      ModifiedBy: 2091,
      StockQty: 0,
      TempPrdId: 67913,
      Display: formValues.qrDisplay,
      push_flag: 0,
      delete_flag: 0,
      Qty: null,
      Unit: formValues.unitId,
      Assets: 0,
      tempstatus: formValues.status,
      BrandId: formValues.brandId,
      CreatedDate: new Date().toISOString(),
      ModifiedDate: new Date().toISOString(),
      modified_time: null,
    };

    try {
      const response: any = await updateProducts(
        Number(id),
        Object(productData)
      );
      if (response.status === 200) {
        // alert("Product Edit successfully!");
        navigate("/Products/ViewProducts");
        setFormValues({
          productName: "",
          categoryId: 0,
          subCategoryId: 0,
          purchasePrice: 0,
          totalPrice: "",
          cgst: 2.5,
          sgst: 2.5,
          igst: 0,
          totalGst: "",
          priceWoGst: "",
          barcodeNo: "",
          minStockQty: "",
          status: "",
          productType: 0,
          transferProduct: 1,
          qrDisplay: "",
          srNo: 1,
          productImage: null,
          getcategory: [],
          getSubCategory: [],
          photo: null,
          getBrandList: [],
          brandId: 0,
          unitList: [],
          unitId: "",
          code: "",
        });
        setMessage(`"Product Edit Successfully!.`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage(`Error: ${"Product Edit Failed!."}`);
    }
  };

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchCategories();
      const data = response.data;
      setFormValues((prevValues) => ({
        ...prevValues,
        getcategory: data?.map((category: { Name: string; id: number }) => ({
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
      const response: any = await fetchSubCategories();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddProduct();
  };

  return {
    handleSubmit,
    handleChange,
    setFormValues,
    message,
    formValues,
  };
};

export default useEditProductForm;
