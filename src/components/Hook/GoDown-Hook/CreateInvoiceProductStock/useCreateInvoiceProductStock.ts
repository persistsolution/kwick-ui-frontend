import { useState } from "react";
import { createInvoiceProductStockApi } from "../../../api/GoDown-Api/CreateInvoiceProductStock/CreateInvoiceProductStock";

interface RetailerFormValues {
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
  [key: string]: any; 
}

const useCreateInvoiceProductStock = () => {
  const [formValues, setFormValues] = useState<RetailerFormValues>({
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

  const [message, setMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [vendorList, setvendorList] = useState<any[]>([]);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [productList, setproductList] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files && files[0]) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: files[0],
          photo: URL.createObjectURL(files[0]),
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handelAddcreateGodownAccount = async () => {
    const createGodownAccountData = {}; 

    try {
      const response: any = await createInvoiceProductStockApi(createGodownAccountData);
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
