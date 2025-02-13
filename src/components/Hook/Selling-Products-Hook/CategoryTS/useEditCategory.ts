import React, { useEffect, useState } from "react";
import { updateCategory, fetchByIdCategory } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";


interface UseEditCategoryProps {
  toggleEdit: () => void;
  handelfetchCategories: () => void;
}

const useEditCategory = ({ toggleEdit, handelfetchCategories }: UseEditCategoryProps) => {

  const [formData, setFormData] = useState({
    name: "",
    icon: null,
    photo: "",
    photo2: null,
    featured: 0,
    prodtype: 0,
    status: 1,
    srno: 1.0,
    createddate: new Date().toISOString(),
    modifieddate: null,
    roll: 1,
    createdby: 2091,
    modifiedby: 0,
    push_flag: false,
    delete_flag: false,
    modified_time: new Date().toISOString(),
    categoryImage: "",
    categorySrno: 0,
    categoryName: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const id = localStorage.getItem("categoryId")

  useEffect(() => {
      handelFetchEditCategory();
  }, [id]);

  const handelFetchEditCategory = async () => {
    if (!id) return;
    try {
      const response: any = await fetchByIdCategory(Number(id)); 
      const responceData = response.data;
      if (response.status === 200) {
        setFormData((prev) => ({
          ...prev,
          categoryName: responceData?.Name,
          categorySrno: responceData?.srno,
          status: responceData?.Status,
          photo:responceData?.Photo
        }));
      } else {
        // setMessage(`Error: ${response.data?.message || "Failed to Fetch Edit Category."}`);
      }
    } catch (error) {
      console.log(error);
      // setMessage("Error fetching category details.");
    }
  };
  
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        photo:url
      }));   
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    const raw = {
      Name: formData.categoryName,
      Icon: formData.icon,
      Photo: formData.photo,
      Photo2: formData.photo2,
      Featured: formData.featured,
      ProdType: Number(formData.prodtype),
      Status: Number(formData.status),
      srno: Number(formData.categorySrno),
      CreatedDate: formData.createddate,
      ModifiedDate: formData.modifieddate,
      Roll: Number(formData.roll),
      CreatedBy: formData.createdby,
      push_flag: formData.push_flag ? 1 : 0,
      delete_flag: formData.delete_flag ? 1 : 0,
      modified_time: formData.modified_time,
    };

    try {
      const response: any = await updateCategory(Number(id),Object(raw)); 
      if (response.status === 200) {
        // setMessage("Category Edit successfully!");
        localStorage.removeItem("categoryId")
        handelfetchCategories()
        toggleEdit()
        setFormData({
          name: "",
          icon: null,
          photo: "",
          photo2: null,
          featured: 0,
          prodtype: 0,
          status: 1,
          srno: 1.0,
          createddate: new Date().toISOString(),
          modifieddate: null,
          roll: 1,
          createdby: 2091,
          modifiedby: 0,
          push_flag: false,
          delete_flag: false,
          modified_time: new Date().toISOString(),
          categoryImage: "",
          categorySrno: 0,
          categoryName: "",
        });
      } else {
        // setMessage(`Error: ${response.data?.message || "Failed To Edit Category."}`);
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
    message,    
    isLoading,
    handleChange,
    handleSubmit,
    
  };
};

export default useEditCategory;
