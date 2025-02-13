import { useState } from "react";
import { createVendorPaymentsApi } from "../../api/VendorPayment-Api/VendorPaymentApi";

interface AddVendorPaymentsFormValues {
  totalAmount: number;
  totalPaidAmount: number;
  balanceAmount: number;
  paidAmount: number;
  paymentDate: string;
  paymentType: string;
  narration: string;
}

const useAddVendorPayment = () => {
  const [formValues, setFormValues] = useState<AddVendorPaymentsFormValues>({
    totalAmount: 0,
    totalPaidAmount: 0,
    balanceAmount: 0,
    paidAmount: 0,
    paymentDate: "",
    paymentType: "",
    narration: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [invoiceNoList, setInvoiceNoList] = useState([]);

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

  const handelAddAddVendorPayments = async () => {
    const AddVendorPaymentsData = {};
    try {
      const response: any = await createVendorPaymentsApi(
        AddVendorPaymentsData
      );
      if (response.status === 201) {
        setMessage("AddVendorPayments added successfully!");
        setFormValues({
          totalAmount: 0,
          totalPaidAmount: 0,
          balanceAmount: 0,
          paidAmount: 0,
          paymentDate: "",
          paymentType: "",
          narration: "",
        });
      }
    } catch (error) {
      console.error("Error adding AddVendorPayments:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddAddVendorPayments();
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
  };
};

export default useAddVendorPayment;
