import { useState } from "react";
import { createretailer } from "../../../api/Retailer-Api/RetailerApi";

interface retailerFormValues {
  godown: string;
  retailer: string;
  godownproducts: string;
  availableStock: string;
  qty: number;
  price: number;
  totalprice: number;
  narration: string;
  date: string;
  invoiveNo: number;
  totalamt: number;
  gstAmount: number;
  totalqty: number;
}

const useCreateRetailerAccount = () => {
  const [formValues, setFormValues] = useState<retailerFormValues>({
    godown: "",
    retailer: "",
    godownproducts: "",
    availableStock: "",
    qty: 0,
    price: 0,
    totalprice: 0,
    narration: "",
    date: "",
    invoiveNo: 0,
    totalamt: 0,
    gstAmount: 0,
    totalqty: 0,
  });
  const [addedretailer, setAddedretailer] = useState<
    { customerretailerId: number; makingQty: number }[]
  >([]);
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

  const handelAddretailer = async () => {
    const retailerData = {};
    try {
      const response: any = await createretailer(retailerData);
      if (response.status === 201) {
        setMessage("Retailer account created successfully!");
        setFormValues({
          godown: "",
          retailer: "",
          godownproducts: "",
          availableStock: "",
          qty: 0,
          price: 0,
          totalprice: 0,
          narration: "",
          date: "",
          invoiveNo: 0,
          totalamt: 0,
          gstAmount: 0,
          totalqty: 0,
        });
      }
    } catch (error) {
      console.error("Error adding retailer:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddretailer();
  };

  const handelAddretailerList = () => {
    // if (formValues.customerretailerId && formValues.makingQty) {
    const newretailer: any = {
      godownproducts: formValues.godownproducts,
      qty: formValues.qty,
      availableStock: formValues.availableStock,
      price: formValues.price,
      totalprice: formValues.totalprice,
    };
    setAddedretailer((prev) => [...prev, newretailer]);
    setFormValues((prev) => ({
      ...prev,
      godownproducts: "",
      availableStock: "",
      qty: 0,
      price: 0,
      totalprice: 0,
    }));
    // } else {
    //   alert("Please select a Customer retailer and specify the Making Qty.");
    // }
  };

  const handleDelete = (index: number) => {
    setAddedretailer((prev) => prev.filter((_, idx) => idx !== index));
  };
  const handleChangeretailerList = (
    value: any,
    index: number,
    field: string
  ) => {
    setAddedretailer((prev) =>
      prev.map((retailer, idx) =>
        idx === index ? { ...retailer, [field]: value } : retailer
      )
    );
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    handelAddretailerList,
    addedretailer,
    handleDelete,
    handleChangeretailerList,
    message,
    isLoading,
    setisLoading,
  };
};

export default useCreateRetailerAccount;
