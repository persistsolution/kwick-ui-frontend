import { useState } from "react";
import { headerPrintSettingApi , footerPrintSettingApi } from "../../../api/SubFranchise-API/PrintSettingApi/printSettingAPi";

const usePrintSetting = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress:"",
    mobileNumber:0,
    gstNo:0,
    termsandcondition:"",
    bottomTitle:""
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
        photo:url
      }));   
     }
  };
  const handelMessage = ()=>{
    setMessage("")
  }

  const handleSubmitHeaderSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const payload = {

    };

    try {
      const response = await headerPrintSettingApi(payload);
      if (response.status === 200) {
        setMessage("Setting Save successfully!");
        setFormData({
            companyName: "",
            companyAddress:"",
            mobileNumber:0,
            gstNo:0,
            termsandcondition:"",
            bottomTitle:""
        });
      } else {
        setMessage(
          `Error: Failed to add category.`
        );
      }
    } catch (err: any) {
      console.error("Error during save setting :", err);
      setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFooterSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const payload = {

    };

    try {
      const response = await headerPrintSettingApi(payload);
      if (response.status === 200) {
        setMessage("Setting Save successfully!");
        setFormData({
            companyName: "",
            companyAddress:"",
            mobileNumber:0,
            gstNo:0,
            termsandcondition:"",
            bottomTitle:""
        });
      } else {
        setMessage(
          `Error: Failed to add category.`
        );
      }
    } catch (err: any) {
      console.error("Error during save setting :", err);
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
    handleSubmitHeaderSetting,
    handleSubmitFooterSetting,
    handelMessage
  };
};

export default usePrintSetting;
