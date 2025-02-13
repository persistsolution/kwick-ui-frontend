import React, { useEffect, useState } from "react";
import { updateBrandApi  , fetchByIdBrandApi} from "../../../api/Selling-Products-Api/Brand-Api/BrandApi";


interface useEditBrandProps {
  BrandEditId: number;
  handelfetchBrand: () => void;
  toggleEdit: () => void;
}
const useEditBrand = ({ BrandEditId, handelfetchBrand , toggleEdit}: useEditBrandProps) => {
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
    BrandImage: "",
    BrandSrno: 0,
    BrandName: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const id = BrandEditId || localStorage.getItem("BrandId") 

  useEffect(() => {
      handelFetchEditBrand();
  }, [id]);

  const handelFetchEditBrand = async () => {
    if (!id) return;
    try {
      const response: any = await fetchByIdBrandApi(Number(id)); 
      const responceData = response.data;
      if (response.status === 200) {
        setFormData((prev) => ({
          ...prev,
          BrandName: responceData?.name,
          BrandSrno: responceData?.srno || 0,
          status: responceData?.status ? 1 : 0 || 1,
          photo:responceData?.Photo || ""
        }));
      } else {
        // setMessage(`Error: ${response.data?.message || "Failed to Fetch Edit Brand."}`);
      }
    } catch (error) {
      console.log(error);
      // setMessage("Error fetching Brand details.");
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
    // setMessage(null);
    setIsLoading(true);

    const raw = {
      name: formData.BrandName,
      Icon: formData.icon,
      Photo: formData.photo,
      Photo2: formData.photo2,
      Featured: formData.featured,
      ProdType: Number(formData.prodtype),
      status: Number(formData.status) ? true : false,
      srno: Number(formData.BrandSrno),
      CreatedDate: formData.createddate,
      ModifiedDate: formData.modifieddate,
      Roll: Number(formData.roll),
      createdby: formData.createdby,
      push_flag: formData.push_flag ? 1 : 0,
      delete_flag: formData.delete_flag ? 1 : 0,
      modified_time: formData.modified_time,
    };

    try {
      const response: any = await updateBrandApi(Number(id),Object(raw)); 
      if (response.status === 200) {
        // setMessage("Brand Edit successfully!");
        localStorage.removeItem("BrandId")
        toggleEdit()
        handelfetchBrand()
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
          BrandImage: "",
          BrandSrno: 0,
          BrandName: "",
        });
      } else {
        // setMessage(`Error: ${response.data?.message || "Failed To Edit Brand."}`);
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
    setMessage,
  };
};

export default useEditBrand;
