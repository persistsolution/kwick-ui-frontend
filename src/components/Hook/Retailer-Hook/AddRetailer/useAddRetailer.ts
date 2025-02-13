import { useState } from "react";
import { createretailer } from "../../../api/Retailer-Api/RetailerApi";

interface retailerFormValues {
  retailerName: string;
  retailerAddress: string;
  mobileNo: number;
  anothermobileNo: number;
  emailId: string;
  Photo: string;
  status: number;
}

const useAddRetailer = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    retailerName: "",
    retailerAddress: "",
    mobileNo: 0,
    anothermobileNo: 0,
    emailId: "",
    Photo: "",
    status: 0,
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files: any = target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo: url,
      }));
    } else {
      const updatedValues = {
        ...formValues,
        [name]: value,
      };

      setFormValues(updatedValues);
    }
  };

  const handelAddretailer = async () => {
    const retailerData = {
      Fname: formValues.retailerName,
      Address: formValues.retailerAddress,
      Phone: formValues.mobileNo,
      Phone2: formValues.anothermobileNo,
      EmailId: formValues.emailId,
      Photo: formValues.Photo,
      Status: formValues.status,
    };
    try {
      const response: any = await createretailer(retailerData);
      if (response.status === 201) {
        setMessage("Retailer added successfully!");
        setFormValues({
          retailerName: "",
          retailerAddress: "",
          mobileNo: 0,
          anothermobileNo: 0,
          emailId: "",
          Photo: "",
          status: 0,
        });
      }
    } catch (error) {
      console.error("Error adding retailer:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddretailer();
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    message,
    isLoading,
    setisLoading,
  };
};

export default useAddRetailer;
