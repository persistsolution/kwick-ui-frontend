import { useEffect, useState } from "react";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";
import { createProducts } from "../../../api/Selling-Products-Api/ProductApi/productApi";
import { fetchSubCategories } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";
import { fetchUnitApi } from "../../../api/Master-Api/Unit-Api/UnitApi";
import { fetchBrandApi } from "../../../api/Selling-Products-Api/Brand-Api/BrandApi";

interface OtherProductFormValues {
  OtherProductName: string;
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
  OtherProductType: number;
  transferOtherProduct: number;
  qrDisplay: string;
  srNo: number;
  OtherProductImage: File | null;
  getcategory: string[];
  getSubCategory: string[];
  photo: string;
  getBrandList: string[];
  brandId: number;
  unitList: string[];
  brandList: string[];
  unitId: string;
  code: string;
}

const useAddOtherProductForm = () => {
  const [formValues, setFormValues] = useState<OtherProductFormValues>({
    OtherProductName: "",
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
    OtherProductType: 0,
    transferOtherProduct: 1,
    qrDisplay: "",
    srNo: 1,
    OtherProductImage: null,
    getcategory: [],
    getSubCategory: [],
    photo: "",
    getBrandList: [],
    brandId: 0,
    unitList: [],
    brandList: [],
    unitId: "",
    code: "",
  });
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    handelGetCategories();
    handelGetSubCategories();
    fetchUnit();
    handelfetchBrand();
  }, []);

  const handelfetchBrand = async () => {
    try {
      const response: any = await fetchBrandApi();
      const data = response.data;

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

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files: any = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      // const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo: files[0],
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
        updatedValues.totalGst = Number(totalGstAmt).toFixed(2);
        updatedValues.priceWoGst = Number(priceWoGst).toFixed(2);
      }
      setFormValues(updatedValues);
    }
  };

  const handelAddOtherProduct = async () => {
    setLoading(true)
    if (
      typeof formValues.totalGst === "number" &&
      !isNaN(formValues.totalGst)
    ) {
      var cgstAmount: any = formValues.totalGst / 3;
      var sgstAmount: any = formValues.totalGst / 3;
      var igstAmount: any = formValues.totalGst / 3;
    }

    const OtherProductData = {
      OtherProductName: formValues.OtherProductName,
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
      ProdType: formValues.OtherProductType,
      Transfer: formValues.transferOtherProduct,
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
      const response: any = await createProducts(OtherProductData);

      if (response.status === 200) {
        // alert("OtherProduct added successfully!");
        setFormValues((prevValues) => ({
          ...prevValues,
          OtherProductName: "",
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
          OtherProductType: 0,
          transferOtherProduct: 1,
          qrDisplay: "",
          srNo: 1,
          OtherProductImage: null,
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
      console.error("Error adding OtherProduct:", error);
      setLoading(false)
    }
  };

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchCategories();
      const data = await response?.data?.data || [];
      setFormValues((prevValues) => ({
        ...prevValues,
        getcategory: data.map((category: { Name: string; id: number }) => ({
          name: category.Name,
          id: category.id,
        })),
      }));
    } catch (error) {
      console.error("Error adding OtherProduct:", error);
    }
  };

  const handelGetSubCategories = async () => {
    try {
      const response: any = await fetchSubCategories();
      const data = response?.data?.data || [];
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
      console.error("Error adding OtherProduct:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddOtherProduct();
  };

  return {
    loading,
    formValues,
    handleSubmit,
    handleChange,
    setFormValues,
  };
};

export default useAddOtherProductForm;
