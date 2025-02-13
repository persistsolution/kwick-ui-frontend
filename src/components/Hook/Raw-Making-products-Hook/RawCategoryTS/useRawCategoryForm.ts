import { useState } from "react";
import { createRawCategory } from "../../../api/Raw-Making-Products-Api/RawCategoryApi/RawCategortApi";

const useRawCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    icon: null as File | null,
    photo: "",
    photo2: null as File | null,
    featured: 0,
    prodtype: 0,
    status: 1,
    srno: 1.0,
    createddate: new Date().toISOString(),
    modifieddate: null as string | null,
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

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        photo: url,
      }));
    }
  };

  const handleMessage = () => {
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    const payload = {
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
      const response = await createRawCategory(payload);

      if (response.status === 200) {
        setMessage("Category added successfully!");
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
        setMessage(`Error: Failed to add category.`);
      }
    } catch (err: any) {
      console.error("Error during category creation:", err);
      setMessage("Network error. Please try again later.");
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
    handleMessage,
  };
};

export default useRawCategoryForm;
