import { useState } from "react";

interface ProductionProductFormValues {
  ProductionProductName: string;
  address: string;
  mobileNo: number;
  anothermobileNo: number;
  emailId: string;
  Photo: string;
  status: number;
  name:string;
  productName:string;
  unit:string,
  productPrice:string;
  cgst:number;
  sgst:number;
  totalgst:string;
  igst:string,
  pricewogst:string;
  productType:string;
}

const useAddProductionProduct = () => {
  const [formValues, setFormValues] = useState<ProductionProductFormValues>({
    ProductionProductName: "",
    address: "",
    mobileNo: 0,
    anothermobileNo: 0,
    emailId: "",
    Photo: "",
    status: 0,
    name:"",
    productName:"",
    unit:"",
    productPrice:"",
    cgst:2.5,
    sgst:2.5,
    igst:"",
    totalgst:"",
    pricewogst:"",
    productType:""
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

  const handelAddProductionProduct = async () => {
    const ProductionProductData = {
      Fname: formValues.ProductionProductName,
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
        setMessage("ProductionProduct added successfully!");
        setFormValues({
          ProductionProductName: "",
          address: "",
          mobileNo: 0,
          anothermobileNo: 0,
          emailId: "",
          Photo: "",
          status: 0,
          name:"",
          productName:"",
          unit:"",
          productPrice:"",
          cgst:2.5,
          sgst:2.5,
          igst:"",
          totalgst:"",
          pricewogst:"",
          productType:""
        });
      }
    } catch (error) {
      console.error("Error adding ProductionProduct:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddProductionProduct();
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

export default useAddProductionProduct;
