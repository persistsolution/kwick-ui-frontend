import { useEffect, useState } from "react";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";
import { fetchUnitApi } from "../../../api/Master-Api/Unit-Api/UnitApi";
import { fetchBrandApi } from "../../../api/Selling-Products-Api/Brand-Api/BrandApi";
import { createMakingProductsAPI } from "../../../api/Selling-Products-Api/MakingProducts-Api/MakingProductApi";

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
  brandList: string[];
  unitId: string;
  code: string;
  finalPrice: string;
  selectedRawProduct: string;
  makingQty: string;
  unit: string;
}
type ProductItem = {
  makingProduct: string;
  makingQty: string;
  unit: string;
};
const useAddMakingProductForm = () => {
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
    photo: "",
    getBrandList: [],
    brandId: 0,
    unitList: [],
    brandList: [],
    unitId: "",
    code: "",
    finalPrice: "",
    selectedRawProduct: "",
    makingQty: "",
    unit: "",
  });
  const [rawProductArray, setRawProductArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [makingProductArray, setMakingProductArray] = useState<ProductItem[]>(
    []
  );

  useEffect(() => {
    handelGetCategories();
    handelGetSubCategories();
    fetchUnit();
    handelfetchBrand();
  }, []);

  const handelfetchBrand = async () => {
    try {
      const response: any = await fetchBrandApi();
      const data = response.data || [];

      setFormValues((prevValues) => ({
        ...prevValues,
        getBrandList: data.map((unit: { name: string; id: number }) => ({
          name: unit.name,
          id: unit.id,
        })),
      }));
    } catch (error) {
      console.error("Error fetching Brand:", error);
    }
  };

  const fetchUnit = async () => {
    try {
      const response: any = await fetchUnitApi();
      const data = await response.data || [];
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const files = e.target.files;
      const file = files && files[0] ? files[0] : null;
      setFormValues((prevValues: any) => ({
        ...prevValues,
        [name]: file,
        photo: file,
      }));
    } else {
      const updatedValues: any = {
        ...formValues,
        [name]: value,
      };

      if (name === "discount" && updatedValues.priceWoGst) {
        const discount = parseFloat(value) || 0;
        const originalPrice = parseFloat(formValues.totalPrice) || 0;
        const discountAmt = (originalPrice * discount) / 100;
        const discountedPrice = originalPrice - discountAmt;
        updatedValues.discountAmt = discountAmt.toFixed(2);
        updatedValues.finalPrice = discountedPrice.toFixed(2);
      }
      if (name === "totalPrice" && !updatedValues.discount) {
        updatedValues.finalPrice = parseFloat(value) || 0;
      }
      if (["cgst", "sgst", "igst", "discount", "totalPrice"].includes(name)) {
        const finalPrice =
          parseFloat(updatedValues.finalPrice || formValues.finalPrice) || 0;
        const cgst = parseFloat(updatedValues.cgst || formValues.cgst) || 0;
        const sgst = parseFloat(updatedValues.sgst || formValues.sgst) || 0;
        const igst = parseFloat(updatedValues.igst || formValues.igst) || 0;
        const totalGst = cgst + sgst + igst;
        const priceWoGst = finalPrice / (1 + totalGst / 100);
        const totalGstAmt = (finalPrice * totalGst) / 105;
        updatedValues.totalGst = totalGstAmt.toFixed(2);
        updatedValues.priceWoGst = priceWoGst.toFixed(2);
      }
      setFormValues(updatedValues);
    }
  };

  const handelAddProduct = async () => {
    setLoading(true)
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
      const response: any = await createMakingProductsAPI(productData);
      if (response.status === 200) {
        setFormValues((prevValues) => ({
          ...prevValues,
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
          getcategory: prevValues.getcategory,
          getSubCategory: prevValues.getSubCategory,
          photo: "",
          getBrandList: prevValues.getBrandList,
          brandId: 0,
          unitList: prevValues.unitList,
          unitId: "",
          code: "",
          brandList: prevValues.brandList,
        }));
        setLoading(false)
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false)

    }
  };

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchCategories();
      const data = await response.data || [];
      setFormValues((prevValues) => ({
        ...prevValues,
        getcategory: data.length > 0 && data?.map((category: { Name: string; id: number }) => ({
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
      const data = response.data || [];
      setFormValues((prevValues) => ({
        ...prevValues,
        getSubCategory: data.length > 0 && data?.map(
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

  const handelAddMakingProduct = () => {
    const addmakingProductArray = {
      makingProduct: formValues?.selectedRawProduct,
      makingQty: formValues?.makingQty,
      unit: formValues?.unit,
    };
    setMakingProductArray([...makingProductArray, addmakingProductArray]);
  };

  const handelDeleteMakingProduct = (index: number) => {
    const deletemakingProductArray = makingProductArray?.filter(
      (_, idx) => idx !== index
    );
    setMakingProductArray(deletemakingProductArray);
  };

  return {
    formValues,
    rawProductArray,
    makingProductArray,
    loading,
    handleSubmit,
    handleChange,
    setFormValues,
    handelAddMakingProduct,
    handelDeleteMakingProduct,
  };
};

export default useAddMakingProductForm;
