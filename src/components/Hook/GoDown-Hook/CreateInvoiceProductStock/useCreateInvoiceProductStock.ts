import { useState } from "react";
import { createInvoiceProductStockApi } from "../../../api/GoDown-Api/CreateInvoiceProductStock/CreateInvoiceProductStock";

interface retailerFormValues {
  avaliableStock: number;
  qty: number;
  rate: number;
  totalPrice: number;
  totalQty: number;
  gstAmount: number;
  totalAmount: number;
  requestDate: string;
  updateDate: string;
  narration: string;
  remark: string;
}

const useCreateInvoiceProductStock = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    avaliableStock: 0,
    qty: 0,
    rate: 0,
    totalPrice: 0,
    totalQty: 0,
    gstAmount: 0,
    totalAmount: 0,
    requestDate: "",
    updateDate: "",
    narration: "",
    remark: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [vendorList, setvendorList] = useState([]);
  const [franchiseList, setfranchiseList] = useState([]);
  const [productList, setproductList] = useState([]);

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
    const createGodownAccountData = {};
    try {
      const response: any = await createInvoiceProductStockApi(
        createGodownAccountData
      );
      if (response.status === 201) {
        setMessage("Product Invoice Create successfully!");
        setFormValues({
          avaliableStock: 0,
          qty: 0,
          rate: 0,
          totalPrice: 0,
          totalQty: 0,
          gstAmount: 0,
          totalAmount: 0,
          requestDate: "",
          updateDate: "",
          narration: "",
          remark: "",
        });
      }
    } catch (error) {
      console.error("Error Creating Invoice:", error);
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
    setvendorList,
    setfranchiseList,
    setproductList,
    message,
    isLoading,
    productList,
    franchiseList,
    vendorList,
  };
};

export default useCreateInvoiceProductStock;
