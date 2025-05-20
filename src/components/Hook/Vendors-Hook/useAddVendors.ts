import { useState } from "react";

interface AddVendorsFormValues {
  totalAmount: number;
  totalPaidAmount: number;
  balanceAmount: number;
  paidAmount: number;
  paymentDate: string;
  paymentType: string;
  email: string;
  mobileNo: string;
  anotherMobileNo: string;
  details: string;
  photo: string;
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  pinCode: string;
  address: string;
  status: string;
}

const useAddVendor = () => {
  const [formValues, setFormValues] = useState<AddVendorsFormValues>({
    totalAmount: 0,
    totalPaidAmount: 0,
    balanceAmount: 0,
    paidAmount: 0,
    paymentDate: "",
    paymentType: "",
    email: "",
    mobileNo: "",
    anotherMobileNo: "",
    details: "",
    photo: "",
    selectedCountry: "",
    selectedState: "",
    selectedCity: "",
    pinCode: "",
    address: "",
    status: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [invoiceNoList, setInvoiceNoList] = useState([]);
  const [countryArray, setcountryArray] = useState([]);

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

  const handelAddAddVendors = async () => {
    const AddVendorsData = {};
    try {
      const response: any = await "";
      if (response.status === 201) {
        setMessage("AddVendors added successfully!");
        setFormValues({
          totalAmount: 0,
          totalPaidAmount: 0,
          balanceAmount: 0,
          paidAmount: 0,
          paymentDate: "",
          paymentType: "",
          email: "",
          mobileNo: "",
          anotherMobileNo: "",
          details: "",
          photo: "",
          selectedCountry: "",
          selectedState: "",
          selectedCity: "",
          pinCode: "",
          address: "",
          status: "",
        });
      }
    } catch (error) {
      console.error("Error adding AddVendors:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddAddVendors();
  };

  return {
    formValues,
    vendorList,
    invoiceNoList,
    handleSubmit,
    handleChange,
    message,
    isLoading,
    setisLoading,
    setVendorList,
    setInvoiceNoList,
    setFormValues,
    countryArray,
  };
};

export default useAddVendor;
