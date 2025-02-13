import { useState, useEffect } from "react";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";
import {
  fetchSubCategoryById,
  updateSubCategory,
} from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";

interface useEditSubCategoryFormProps {
  handelfetchSubCategories: () => void;
}

const useEditSubCategoryForm = ({
  handelfetchSubCategories,
}: useEditSubCategoryFormProps) => {
  const [formData, setFormData] = useState({
    catid: 0,
    subCatname: "",
    photo: null,
    status: 1,
    createdby: 1,
    createddate: new Date().toISOString(),
    modifiedby: 1,
    modifieddate: new Date().toISOString(),
    productType: 0,
    frId: 0,
    category: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = localStorage.getItem("subCategoryId");

  useEffect(() => {
    handelGetCategories();
  }, []);

  useEffect(() => {
    handelGetSubCategories();
  }, [id]);

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchCategories();
      const data = await response.data;
      setCategoryOptions(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // setMessage("Failed to fetch categories. Please try again later.");
    }
  };

  const handelGetSubCategories = async () => {
    if (!id) return;
    try {
      const response: any = await fetchSubCategoryById(Number(id));
      // const updateresponse = response?.data?.data;
      const updateresponse = response?.data;
      // if (response.status === 200) {
      setFormData({
        catid: Number(updateresponse?.CatId),
        subCatname: updateresponse?.Name,
        photo: null,
        status: Number(updateresponse?.Status),
        createdby: 1,
        createddate: new Date().toISOString(),
        modifiedby: 1,
        modifieddate: new Date().toISOString(),
        productType: 0,
        frId: 0,
        category: "",
      });
      console.log(
        Number(updateresponse?.Status),
        "Number(updateresponse?.Status)"
      );
      // }
    } catch (error) {
      console.error("Error fetching sub categories:", error);
      // setMessage("Failed to fetch sub categories. Please try again later.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (selectedOption: any) => {
    const { value } = selectedOption.target;
    const findvalue: any = categoryOptions.find(
      (item: any) => Number(item?.id) === Number(value)
    );
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        catid: findvalue?.id,
        productType: findvalue?.ProdType,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const raw = {
      CatId: formData.catid,
      Name: formData.subCatname,
      Photo: formData.photo,
      Status: formData.status,
      FrId: formData.frId,
      ProdType: formData.productType,
      CreatedBy: formData.createdby,
      CreatedDate: formData.createddate,
      ModifiedBy: formData.modifiedby,
      ModifiedDate: formData.modifieddate,
    };
    try {
      const response: any = await updateSubCategory(Number(id), Object(raw));
      if (response.status === 200) {
        // setMessage("Sub Category Edit successfully!");
        localStorage.removeItem("subCategoryId");
        handelfetchSubCategories();
        setFormData({
          catid: 0,
          subCatname: "",
          photo: null,
          status: 1,
          createdby: 1,
          createddate: new Date().toISOString(),
          modifiedby: 1,
          modifieddate: new Date().toISOString(),
          productType: 0,
          frId: 0,
          category: "",
        });
      } else {
        // setMessage(
        //   `Error: ${response.data?.message || "Failed to edit category."}`
        // );
      }
    } catch (err) {
      console.error("Network error:", err);
      // setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    categoryOptions,
    message,
    isLoading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  };
};

export default useEditSubCategoryForm;
