import React, { useState } from "react";
import { createBrandApi } from "../../../api/Selling-Products-Api/Brand-Api/BrandApi";

const useAddBrand = (toggle: () => void, handelfetchBrand: () => void) => {
  const [formData, setFormData] = useState({
    status: "",
    BrandName: "",
    createdby: 2091,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const raw = {
      // id: 0,
      name: formData.BrandName,
      srno: 0,
      status: formData.status ? true : false,
      createdby: formData.createdby,
      // createddate: Date | null,
      modifiedby: 0,
      // modifieddate: Date | null,
    };

    try {
      const response: any = await createBrandApi(Object(raw));
      if (response.status === 200) {
        // setMessage("Brand Add successfully!");
        toggle();
        handelfetchBrand();
        setFormData({
          status: "",
          BrandName: "",
          createdby: 2091,
        });
      } else {
        // setMessage(`Error: Failed To Add Brand.`);
      }
    } catch (err) {
      console.error("Network error:", err);
      // setMessage(`Error: Failed To Add Brand.`);
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

export default useAddBrand;
