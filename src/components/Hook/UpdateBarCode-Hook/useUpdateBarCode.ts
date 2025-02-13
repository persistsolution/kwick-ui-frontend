import { useState } from "react";
import { updateBarcodeNoApi } from "../../api/BarCode-APi/barCodeAPi";

const useUpdateBarCode = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [barCode, setBarcode] = useState("");
  const [minQty, setminQty] = useState("");
  const [purchasePrice, setpurchasePrice] = useState("");
  const [productList, setproductList] = useState([]);

  const handelAddretailer = async () => {
    const barcodeData = {};
    try {
      const response: any = await updateBarcodeNoApi(barcodeData);
      if (response.status === 201) {
        setMessage("Barcode  added successfully!");
      }
    } catch (error) {
      console.error("Error adding  Barcode :", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddretailer();
  };

  return {
    handleSubmit,
    setBarcode,
    setminQty,
    setpurchasePrice,
    setproductList,
    setisLoading,
    purchasePrice,
    message,
    minQty,
    isLoading,
    barCode,
    productList,
  };
};

export default useUpdateBarCode;
