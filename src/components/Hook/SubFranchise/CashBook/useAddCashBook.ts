import {   useState } from "react";
import { createretailer } from "../../../api/Retailer-Api/RetailerApi";

interface retailerFormValues {
    totalcashAmount:number,
    transferAmount:number,
    balanceAmount:number,
    date:null,
    bankName: string[]; 
    accountNo:number,
    uploadReceipt:string,
    narration:string
}

const useAddCashBook = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    totalcashAmount:0,
    transferAmount:0,
    balanceAmount:0,
    date:null,
    bankName:[],
    accountNo:0,
    uploadReceipt:"",
    narration:""
  });

const [message , setMessage] = useState('')
const [isLoading , setisLoading]= useState(false)

  const handleChange = (
    e: any
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files :any= target.files;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files && files[0] ? files[0] : null,
      }));
      const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo:url
      }));   
    } 
    else {
      const updatedValues = {
        ...formValues,
        [name]: value,
      };

      setFormValues(updatedValues);
    }
  };

  const handelAddretailer = async () => {
    const retailerData = {
     
    };
    try {
      const response :any = await createretailer(retailerData)
      if (response.status === 201) {
        setMessage("CashBook added successfully!");
        setFormValues({
            totalcashAmount:0,
            transferAmount:0,
            balanceAmount:0,
            date:null,
            bankName:[],
            accountNo:0,
            uploadReceipt:"",
            narration:""
        });
      }
    } catch (error) {
      console.error("Error adding  cashbook:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddretailer();
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    message,
    isLoading,  
  };
};

export default useAddCashBook
