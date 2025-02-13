import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchRawEditProducts , updateRawProducts } from "../../../api/Raw-Making-Products-Api/RawProductsApi/RawProductsApi";
import { fetchRawCategories } from "../../../api/Raw-Making-Products-Api/RawCategoryApi/RawCategortApi";
import { fetchRawSubCategories } from './../../../api/Raw-Making-Products-Api/RawSubCategoryApi/RawSubCategoryApi';


const useEditRawProductForm = () => {
  const [formValues, setFormValues] = useState({
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
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handelGetCategories();
    handelGetSubCategories();
    handleFetchEditProductData();
  }, []);

  const handleFetchEditProductData = async () => {
    try {
      const response :any = await fetchRawEditProducts(Number(id))
      if (response.status === 200 && response.data?.data) {
        const responseData = response.data.data;
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

  const handleChange = (
    e: any
  ) => {
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
        const cgst = parseFloat(updatedValues.cgst) || 0;
        const sgst = parseFloat(updatedValues.sgst) || 0;
        const igst = parseFloat(updatedValues.igst) || 0;
        const totalGst = cgst + sgst + igst;
        const priceWoGst = totalPrice / (1 + totalGst / 100);
        updatedValues.totalGst = totalGst.toFixed(2);
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
      var cgstAmount :any = formValues.totalGst / 3;
      var sgstAmount :any= formValues.totalGst / 3;
      var igstAmount :any= formValues.totalGst / 3;
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
      ProdPrice: formValues.purchasePrice,
      Status: formValues.status,
      SrNo: formValues.srNo,
      Photo: formValues.productImage ? formValues.productImage : null,
      BarcodeNo: formValues.barcodeNo,
      ProdType: formValues.productType,
      Transfer: formValues.transferProduct,
      QrDisplay: formValues.qrDisplay,
      MinQty: formValues.minStockQty,
      PurchasePrice: formValues.purchasePrice,
      checkstatus: formValues.status,
      ProdType2: false,
      ProdId: 0,
      MinPrice: 10,
      CreatedBy: 0,
      ModifiedBy: 0,
      StockQty: 0,
      TempPrdId: 0,
      Display: formValues.qrDisplay,
      push_flag: 0,
      delete_flag: 0,
      Qty: 0,
      Unit: null,
      Assets: 0,
      tempstatus: formValues.status,
    };

    try {
      const response :any = await updateRawProducts(Number(id), Object(productData))
      if (response.status === 200) {
        alert("Product Edit successfully!");
        navigate("/Products/ViewRawProducts");
        setFormValues({
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
        });
        setMessage(`Error: ${"Product Edit Successfully!."}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage(`Error: ${"Product Edit Failed!."}`);
    }
  };

  const handelGetCategories = async () => {
    try {
      const response :any = await fetchRawCategories()
      const data = response.data
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
      const response :any = await fetchRawSubCategories();
      const data = response.data
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
    message,
     formValues
  };
};

export default useEditRawProductForm;
