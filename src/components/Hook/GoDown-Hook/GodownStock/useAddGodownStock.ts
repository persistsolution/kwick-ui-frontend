import { useState } from "react";
import { addGodownStockApi } from "../../../api/GoDown-Api/GodownStock/GodownStockApi";

interface retailerFormValues {
  productName: string;
  availableStock: number;
  stockInQty: number;
  productPrice: number;
  totalPrice: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalgst: number;
  date: string;
  narration: string;
  goDownlist: any;
  productList: any;
  addGodownStockArray: {
    id: number;
    availableStock: number;
    stockInQty: number;
    productPrice: number;
    totalPrice: number;
    cgst: number;
    sgst: number;
    igst: number;
    totalgst: number;
  }[];
}

const useAddGodownStock = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    availableStock: 0,
    productName: "",
    stockInQty: 0,
    productPrice: 0,
    totalPrice: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalgst: 0,
    date: "",
    narration: "",
    goDownlist: [],
    productList: [],
    addGodownStockArray: [],
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

  const handelAddGodownStock = async () => {
    const addGodownStockData = {};
    try {
      const response: any = await addGodownStockApi(addGodownStockData);
      if (response.status === 201) {
        setMessage("GoDown Stock Add successfully!");
        setFormValues({
          productName: "",
          availableStock: 0,
          stockInQty: 0,
          productPrice: 0,
          totalPrice: 0,
          cgst: 0,
          sgst: 0,
          igst: 0,
          totalgst: 0,
          date: "",
          narration: "",
          goDownlist: [],
          productList: [],
          addGodownStockArray: [],
        });
      }
    } catch (error) {
      console.error("Error adding addGodownStock:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddGodownStock();
  };

  const handelAddGodown = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      addGodownStockArray: [
        ...prevValues.addGodownStockArray,
        {
          productName: formValues.productName,
          id: 0,
          availableStock: formValues.availableStock,
          stockInQty: formValues.stockInQty,
          productPrice: formValues.productPrice,
          totalPrice: formValues.totalPrice,
          cgst: formValues.cgst,
          sgst: formValues.sgst,
          igst: formValues.igst,
          totalgst: formValues.totalgst,
        },
      ],
    }));
  };

  const handelChangeAddedGodownPoduct = (e: any, idx: number) => {
    const { name, value } = e.target;
    const updatedAddGodownStockArray = [...formValues.addGodownStockArray];
    updatedAddGodownStockArray[idx] = {
      ...updatedAddGodownStockArray[idx],
      [name]: value,
    };
    setFormValues({
      ...formValues,
      addGodownStockArray: updatedAddGodownStockArray,
    });
  };

  // Function to remove a stock entry
  const handleRemoveGodownStock = (id: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      addGodownStockArray: prevValues.addGodownStockArray.filter(
        (item) => item.id !== id
      ),
    }));
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    message,
    isLoading,
    handelAddGodown,
    handleRemoveGodownStock,
    handelChangeAddedGodownPoduct,
    setisLoading,
  };
};

export default useAddGodownStock;
