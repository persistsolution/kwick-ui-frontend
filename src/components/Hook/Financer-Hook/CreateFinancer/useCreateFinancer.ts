import { useState } from "react";
import { createFinancer } from "../../../api/Financer-Api/FinancerAccount/FinancerAccountApi";

interface retailerFormValues {
  FinancerName: string;
  retailerAddress: string;
  mobileNo: number;
  anothermobileNo: number;
  emailId: string;
  Photo: string;
  status: number;
}

const useCreateFinancer = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    FinancerName: "",
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

  const handelAddfinancer = async () => {
    const financerData = {
      Fname: formValues.FinancerName,
      Address: formValues.retailerAddress,
      Phone: formValues.mobileNo,
      Phone2: formValues.anothermobileNo,
      EmailId: formValues.emailId,
      Photo: formValues.Photo,
      Status: formValues.status,
    };
    try {
      const response: any = await createFinancer(financerData);
      if (response.status === 201) {
        setMessage("financer added successfully!");
        setFormValues({
          FinancerName: "",
          retailerAddress: "",
          mobileNo: 0,
          anothermobileNo: 0,
          emailId: "",
          Photo: "",
          status: 0,
        });
      }
    } catch (error) {
      console.error("Error adding financer:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddfinancer();
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

export default useCreateFinancer;
