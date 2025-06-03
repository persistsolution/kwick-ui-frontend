import { useState } from "react";
import { createCategory } from "../../../api/Selling-Products-Api/CategoryApi/categoryApi";

interface useAddCategoryFormProps {
  modalAddCategory: () => void;
  // toggleAddCategory: boolean;
  handelfetchCategories: () => void;
}

const useAddCategoryForm = ({
  modalAddCategory,
  handelfetchCategories,
}: useAddCategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: null as File | null,
    photo: null as File | null,
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
    categoryImage: null as File | null,
    categorySrno: 0,
    categoryName: "",
    preview:""
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (e: any) => {
  //   const { name, value, files } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: files && files.length > 0 ? files[0] : value,
  //   }));
  //   if (files) {
  //     console.log(files , "files")
  //     const url =files[0];
  //     setFormData((prev) => ({
  //       ...prev,
  //       photo: url,
  //     }));
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
        preview : URL.createObjectURL(files[0])
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  
  const handelMessage = () => {
    setMessage("");
  };
console.log(formData , "kk")
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage(null);
  //   setIsLoading(true);
  //   const payload = {
  //     Name: formData.categoryName,
  //     Icon: formData.icon,
  //     Photo: formData.photo, 
  //     Photo2: formData.photo,
  //     Featured: formData.featured,
  //     ProdType: Number(formData.prodtype),
  //     Status: Number(formData.status),
  //     srno: Number(formData.categorySrno),
  //     CreatedDate: formData.createddate,
  //     ModifiedDate: formData.modifieddate,
  //     Roll: Number(formData.roll),
  //     CreatedBy: formData.createdby,
  //     push_flag: formData.push_flag ? 1 : 0,
  //     delete_flag: formData.delete_flag ? 1 : 0,
  //     modified_time: formData.modified_time,
  //     ModifiedBy: formData.modifiedby,
  //   };
  
  //   try {
  //     const response = await createCategory(payload);
  
  //     if (response.status === 200) {
  //       setMessage("Category added successfully!");
  //       handelfetchCategories();
  //       modalAddCategory();
  //       setFormData({
  //         name: "",
  //         icon: null,
  //         photo: "",
  //         photo2: null,
  //         featured: 0,
  //         prodtype: 0,
  //         status: 1,
  //         srno: 1.0,
  //         createddate: new Date().toISOString(),
  //         modifieddate: null,
  //         roll: 1,
  //         createdby: 2091,
  //         modifiedby: 0,
  //         push_flag: false,
  //         delete_flag: false,
  //         modified_time: new Date().toISOString(),
  //         categoryImage: null as File | null,
  //         categorySrno: 0,
  //         categoryName: "",
  //       });
  //     } else {
  //       setMessage(`Error: Failed to add category.`);
  //     }
  //   } catch (err: any) {
  //     console.error("Error during category creation:", err);
  //     setMessage("Network error. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.categoryName);
    formDataToSend.append("Icon", formData.icon as File);
    formDataToSend.append("Photo", formData.categoryImage as File);
    formDataToSend.append("Photo2", formData.photo as File); 
    formDataToSend.append("Featured", String(formData.featured));
    formDataToSend.append("ProdType", String(formData.prodtype));
    formDataToSend.append("Status", String(formData.status));
    formDataToSend.append("srno", String(formData.categorySrno));
    formDataToSend.append("CreatedDate", formData.createddate);
    formDataToSend.append("ModifiedDate", formData.modifieddate || "");
    formDataToSend.append("Roll", String(formData.roll));
    formDataToSend.append("CreatedBy", String(formData.createdby));
    formDataToSend.append("push_flag", formData.push_flag ? "1" : "0");
    formDataToSend.append("delete_flag", formData.delete_flag ? "1" : "0");
    formDataToSend.append("modified_time", formData.modified_time);
    formDataToSend.append("ModifiedBy", String(formData.modifiedby));
  
    try {
      const response = await createCategory(formDataToSend); // Ensure createCategory supports FormData
  
      if (response.status === 200) {
        setMessage("Category added successfully!");
        handelfetchCategories();
        modalAddCategory();
        setFormData({
          name: "",
          icon: null,
          photo: null as File | null,
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
          categoryImage: null,
          categorySrno: 0,
          categoryName: "",
          preview:""
        });
      } else {
        setMessage("Error: Failed to add category.");
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
    handelMessage,
  };
};

export default useAddCategoryForm;
