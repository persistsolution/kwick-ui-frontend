import { useState } from "react";
import { createGodownApi } from "../../../api/GoDown-Api/CreateGoDown/CreateGoDownApi";

interface retailerFormValues {
  createGodownAccountName: string;
  retailerAddress: string;
  mobileNo: number;
  anothermobileNo: number;
  emailId: string;
  Photo: string;
  status: number;
  lattitude: string;
  longitude: string;
}

const useCreateGodownAccount = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    createGodownAccountName: "",
    retailerAddress: "",
    mobileNo: 0,
    anothermobileNo: 0,
    emailId: "",
    Photo: "",
    status: 1,
    lattitude: "",
    longitude: "",
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

  const handelAddcreateGodownAccount = async () => {
    const createGodownAccountData = {
      Fname: formValues.createGodownAccountName,
      Address: formValues.retailerAddress,
      Phone: formValues.mobileNo,
      Phone2: formValues.anothermobileNo,
      EmailId: formValues.emailId,
      Photo: formValues.Photo,
      Status: formValues.status,
      Password: "12345",
      Roll: 93,
      CreatedBy: 5,
      ModifiedBy: 5,
      CreatedDate: new Date().toISOString().split("T")[0],
      ModifiedDate: new Date().toISOString().split("T")[0],
    };
    try {
      const response: any = await createGodownApi(createGodownAccountData);
      if (response.status === 201) {
        setMessage("GoDown Account Create successfully!");
        setFormValues({
          createGodownAccountName: "",
          retailerAddress: "",
          mobileNo: 0,
          anothermobileNo: 0,
          emailId: "",
          Photo: "",
          status: 1,
          lattitude: "",
          longitude: "",
        });
      }
    } catch (error) {
      console.error("Error adding createGodownAccount:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddcreateGodownAccount();
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    setisLoading,
    message,
    isLoading,
  };
};

export default useCreateGodownAccount;
