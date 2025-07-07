import { useEffect, useState } from "react";
import { createInvoiceProductStockApi } from "../../../api/GoDown-Api/CreateInvoiceProductStock/CreateInvoiceProductStock";
import { fetchFranchiseApi } from "../../../api/Franchise-Api/FranchiseApi";

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
  franchiseId: number,
  productId: number
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
    franchiseId: 0,
    productId: 0
  });

  const [message, setMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [vendorList, setvendorList] = useState<any[]>([]);
  const [franchiseList, setfranchiseList] = useState<any[]>([]);
  const [productList, setproductList] = useState<any[]>([]);


  useEffect(() => {
    handleFetchFranchises();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e, "e")
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


  const handleSelectChange = (selectedOption: any, fieldName: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedOption?.value || "",
    }));
  };


  console.log(formValues, "formValue")

  const handleFetchFranchises = async () => {
    try {
      const response: any = await fetchFranchiseApi();
      const data = response?.data?.data || []
      setfranchiseList(data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };


  const handelAddcreateGodownAccount = async () => {
    const createGodownAccountData = {};
    try {
      const response: any = await createInvoiceProductStockApi(createGodownAccountData);
      if (response.status === 201) {
        // setMessage("Product Invoice Create successfully!");
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
          franchiseId: 0,
          productId: 0
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
    handleSelectChange,
    message,
    isLoading,
    productList,
    franchiseList,
    vendorList,
  };
};

export default useCreateInvoiceProductStock;
