import { useState, useEffect } from "react";
import { createSubCategory } from "../../../api/Selling-Products-Api/SubCategory/subCategoryApi";
import { fetchCategories } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";

interface useEffectAddSubCategoryFormProps {
  // toggleAddSubCategory: boolean;
  modalAddSubCategory: () => void;
  handelfetchSubCategories: () => void;
}

const useAddSubCategoryForm = ({
  // toggleAddSubCategory,
  modalAddSubCategory,
  handelfetchSubCategories,
}: useEffectAddSubCategoryFormProps) => {
  const [formData, setFormData] = useState({
    catid: 0,
    subCatname: "",
    photo: null,
    status: "",
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

  useEffect(() => {
    handelGetCategories();
  }, []);

  const handelGetCategories = async () => {
    try {
      const response: any = await fetchCategories();
      const data = response.data;
      setCategoryOptions(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // setMessage("Failed to fetch categories. Please try again later.");
    }
  };

  const handelMessage = () => {
    setMessage("");
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
    // setMessage(null);
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
      const response: any = await createSubCategory(Object(raw));

      if (response.status === 200) {
        // setMessage("Category Added successfully!");
        modalAddSubCategory();
        handelfetchSubCategories();
        setFormData({
          catid: 0,
          subCatname: "",
          photo: null,
          status: "",
          createdby: 1,
          createddate: new Date().toISOString(),
          modifiedby: 1,
          modifieddate: new Date().toISOString(),
          productType: 0,
          frId: 0,
          category: "",
        });
      } else {
        console.log(
          `Error: ${response.data?.message || "Failed to add category."}`
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      // setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categoryOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handelMessage,
  };
};

export default useAddSubCategoryForm;
