import { useState } from "react";

interface ProductionAccountFormValues {
  ProductionAccountName: string;
  address: string;
  mobileNo: number;
  anothermobileNo: number;
  emailId: string;
  Photo: string;
  status: number;
  name:string;
}

const useAddProductionAccount = () => {
  const [formValues, setFormValues] = useState<ProductionAccountFormValues>({
    ProductionAccountName: "",
    address: "",
    mobileNo: 0,
    anothermobileNo: 0,
    emailId: "",
    Photo: "",
    status: 0,
    name:""
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

  const handelAddProductionAccount = async () => {
    const ProductionAccountData = {
      Fname: formValues.ProductionAccountName,
      Address: formValues.address,
      Phone: formValues.mobileNo,
      Phone2: formValues.anothermobileNo,
      EmailId: formValues.emailId,
      Photo: formValues.Photo,
      Status: formValues.status,
    };
    try {
      const response: any = await ""
      if (response.status === 201) {
        setMessage("ProductionAccount added successfully!");
        setFormValues({
          ProductionAccountName: "",
          address: "",
          mobileNo: 0,
          anothermobileNo: 0,
          emailId: "",
          Photo: "",
          status: 0,
          name:""
        });
      }
    } catch (error) {
      console.error("Error adding ProductionAccount:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddProductionAccount();
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

export default useAddProductionAccount;
