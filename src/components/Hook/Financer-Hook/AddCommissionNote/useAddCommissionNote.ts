import { useEffect, useState } from "react";
import {
  createFinancer,
  fetchFinancer,
} from "../../../api/Financer-Api/FinancerAccount/FinancerAccountApi";

interface retailerFormValues {
  description: string;
  saleAmt: number;
  nonGstAmt: number;
  commission: number;
  amount: number;
  tds: number;
  totalAmount: number;
  noteNo: number;
  noteDate: string;
  paymentDate: string;
  bankReferanceNo: number;
  narration: string;
  FinancerName: string;
}

const useAddCommissionNote = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    description: "",
    saleAmt: 0,
    nonGstAmt: 0,
    commission: 0,
    amount: 0,
    tds: 0,
    totalAmount: 0,
    noteNo: 0,
    noteDate: "",
    paymentDate: "",
    bankReferanceNo: 0,
    narration: "",
    FinancerName: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [FinancerList, setFinancerList] = useState([]);

  useEffect(() => {
    getFinancerList();
  }, []);

  const getFinancerList = async () => {
    try {
      const response: any = await fetchFinancer();
      if (response.status === 201) {
        setFinancerList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      Details: formValues.description,
      SellAmt: formValues.saleAmt,
      BillAmount: formValues.totalAmount,
    };
    try {
      const response: any = await createFinancer(financerData);
      if (response.status === 201) {
        setMessage("financer added successfully!");
        setFormValues({
          description: "",
          saleAmt: 0,
          nonGstAmt: 0,
          commission: 0,
          amount: 0,
          tds: 0,
          totalAmount: 0,
          noteNo: 0,
          noteDate: "",
          paymentDate: "",
          bankReferanceNo: 0,
          narration: "",
          FinancerName: "",
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
    setisLoading,
    message,
    isLoading,
    FinancerList,
  };
};

export default useAddCommissionNote;
