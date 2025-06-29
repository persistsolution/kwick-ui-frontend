import { useEffect, useState } from "react";
import { fetchPrintSettingApi } from "../../../api/SubFranchise-API/PrintSettingApi/printSettingAPi";

const usePrintSetting = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    mobileNumber: "",
    gstNo: "",
    termsandcondition: "",
    bottomTitle: ""
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    handleSubmitPrintSetting();
  }, [])

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
        photo: url
      }));
    }
  };
  const handelMessage = () => {
    setMessage("")
  }

  const handleSubmitPrintSetting = async () => {
    setMessage(null);
    setIsLoading(true);
    const payload = {
    };
    const frId = localStorage.getItem("frId")
    try {
      const response = await fetchPrintSettingApi(Number(frId), payload);
      const data = response?.data?.data
      if (response.status === 200) {
        // setMessage("Setting Save successfully!");
        setFormData({
          companyName: data?.company_name,
          companyAddress: data?.address,
          mobileNumber: data?.mobile_number,
          gstNo: data?.gst_number,
          termsandcondition: data?.terms_condition,
          bottomTitle: data?.bottom_title
        });
        setIsLoading(false);
      } else {
        // setMessage(
        //   `Error: Failed to add category.`
        // );
      }
    } catch (err: any) {
      console.error("Error during save setting :", err);
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
    handleSubmitPrintSetting,
    handelMessage
  };
};

export default usePrintSetting;
