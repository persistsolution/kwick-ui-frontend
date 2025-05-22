import { useState } from "react";

interface useAddDiscountPercentageFormProps {
  modalAddDiscountPercentage: () => void;
  // toggleAddDiscountPercentage: boolean;
  handelfetchDiscount: () => void;
}

const useAddDiscountPercentageForm = ({
  modalAddDiscountPercentage,
  handelfetchDiscount,
}: useAddDiscountPercentageFormProps) => {
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
    DiscountPercentageImage: null as File | null,
    DiscountPercentageSrno: 0,
    DiscountPercentage: "",
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.DiscountPercentage);
    formDataToSend.append("Icon", formData.icon as File);
    formDataToSend.append("Photo", formData.DiscountPercentageImage as File);
    formDataToSend.append("Photo2", formData.photo as File); 
    formDataToSend.append("Featured", String(formData.featured));
    formDataToSend.append("ProdType", String(formData.prodtype));
    formDataToSend.append("Status", String(formData.status));
    formDataToSend.append("srno", String(formData.DiscountPercentageSrno));
    formDataToSend.append("CreatedDate", formData.createddate);
    formDataToSend.append("ModifiedDate", formData.modifieddate || "");
    formDataToSend.append("Roll", String(formData.roll));
    formDataToSend.append("CreatedBy", String(formData.createdby));
    formDataToSend.append("push_flag", formData.push_flag ? "1" : "0");
    formDataToSend.append("delete_flag", formData.delete_flag ? "1" : "0");
    formDataToSend.append("modified_time", formData.modified_time);
    formDataToSend.append("ModifiedBy", String(formData.modifiedby));
  
    try {
      const response : any = await ""
  
      if (response.status === 200) {
        setMessage("DiscountPercentage added successfully!");
        handelfetchDiscount();
        modalAddDiscountPercentage();
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
          DiscountPercentageImage: null,
          DiscountPercentageSrno: 0,
          DiscountPercentage: "",
        });
      } else {
        setMessage("Error: Failed to add DiscountPercentage.");
      }
    } catch (err: any) {
      console.error("Error during DiscountPercentage creation:", err);
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

export default useAddDiscountPercentageForm;
