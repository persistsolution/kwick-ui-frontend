import { useEffect, useState } from "react";


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
  RawProductionStocklist: any;
  productList: any;
  unit: string;
  qtyUnit: string;
  addAddRawProductionStockArray: {
    id: number;
    availableStock: number;
    stockInQty: number;
    productPrice: number;
    totalPrice: number;
    unit: string;
    cgst: number;
    sgst: number;
    igst: number;
    qtyUnit: string;
    totalgst: number;
  }[];
}

type AddRawProductionStockProduct = {
  label: string;
  value: number;
} | null;

type selectRawProductionStockProduct = {
  label: string;
  value: number;
} | null;

const useAddRawProductionStock = () => {
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
    unit: "",
    qtyUnit: "",
    narration: "",
    RawProductionStocklist: [],
    productList: [],
    addAddRawProductionStockArray: [],
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [selectRawProductionStock, setselectRawProductionStock] = useState<selectRawProductionStockProduct>(null);
  const [RawProductionStockList, setRawProductionStockList] = useState([]);
  const [RawProductionStockProductlist, setRawProductionStockProductlist] = useState([]);
  const [selectAddRawProductionStockProduct, setselectAddRawProductionStockProduct] =
    useState<AddRawProductionStockProduct>(null);

  useEffect(() => {
    fetchRawProductionStockList();
    handleFetchRawProductionStockPord();
  }, []);

  const handlSelectRawProductionStockProductList = async (selectedOption: any) => {
    const response: any = await ""
    const updateResponce = response.data;
    if (response) {
      setFormValues((prevState) => ({
        ...prevState,
        productName: prevState.productName,
        availableStock: updateResponce.balqty,
        stockInQty: prevState.stockInQty,
        productPrice: updateResponce.Price,
        totalPrice: prevState.totalPrice,
        cgst: updateResponce.CgstPer,
        sgst: updateResponce.SgstPer,
        qtyUnit: updateResponce.Unit,
        igst: updateResponce.IgstPer,
        totalgst: prevState.totalgst,
        date: prevState.date,
        narration: prevState.narration,
        unit: updateResponce.Unit,
        RawProductionStocklist: prevState.RawProductionStocklist,
        productList: prevState.productList,
        addAddRawProductionStockArray: prevState.addAddRawProductionStockArray,
      }));
    }

    setselectAddRawProductionStockProduct((prevValues: any) => ({
      ...prevValues,
      value: selectedOption ? selectedOption.value : "",
    }));
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
      let updatedValues = {
        ...formValues,
        [name]: value,
      };
      setFormValues(updatedValues);
    }
  };

  const fetchRawProductionStockList = async () => {
    try {
      const response: any = await ""
      setRawProductionStockList(response.data);
    } catch (error) {
      console.error("Error fetching viewAddRawProductionStock:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const handleFetchRawProductionStockPord = async () => {
    try {
      const response: any = await ""
      setRawProductionStockProductlist(response.data);
    } catch (error) {
      console.error("Error fetching viewAddRawProductionStock:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddRawProductionStock();
  };

  const handelAddRawProductionStock = () => {
    const selectvalueproductName: any = RawProductionStockProductlist.find(
      (data: any) => data.id == selectAddRawProductionStockProduct?.value
    );
    setFormValues((prevValues) => ({
      ...prevValues,
      addAddRawProductionStockArray: [
        ...prevValues.addAddRawProductionStockArray,
        {
          productName: selectvalueproductName?.ProductName,
          productId: selectvalueproductName?.id,
          id: 0,
          availableStock: formValues.availableStock,
          stockInQty: formValues.stockInQty,
          productPrice: formValues.productPrice,
          totalPrice: formValues.totalPrice,
          cgst: formValues.cgst,
          sgst: formValues.sgst,
          unit: formValues.unit,
          igst: formValues.igst,
          totalgst: formValues.totalgst,
          qtyUnit: formValues.qtyUnit,
        },
      ],
    }));
  };

  const handelChangeAddedRawProductionStockPoduct = (e: any, idx: number) => {
    const { name, value } = e.target;
    const updatedAddRawProductionStockArray = [...formValues.addAddRawProductionStockArray];
    const newValue =
      name === "stockInQty" || name === "productPrice" ? Number(value) : value;

    updatedAddRawProductionStockArray[idx] = {
      ...updatedAddRawProductionStockArray[idx],
      [name]: newValue,
    };
    if (name === "stockInQty" || name === "productPrice") {
      const stockInQty =
        Number(updatedAddRawProductionStockArray[idx].stockInQty) || 0;
      const productPrice =
        Number(updatedAddRawProductionStockArray[idx].productPrice) || 0;
      updatedAddRawProductionStockArray[idx].totalPrice = stockInQty * productPrice;
    }

    setFormValues({
      ...formValues,
      addAddRawProductionStockArray: updatedAddRawProductionStockArray,
    });
  };

  // Function to remove a stock entry
  const handleRemoveAddRawProductionStock = (index: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      addAddRawProductionStockArray: prevValues.addAddRawProductionStockArray.filter(
        (_, idx) => idx !== index
      ),
    }));
  };

  console.log(formValues.addAddRawProductionStockArray, "addAddRawProductionStockArray");

  return {
    formValues,
    handleSubmit,
    handleChange,
    message,
    isLoading,
    selectRawProductionStock,
    RawProductionStockList,
    selectAddRawProductionStockProduct,
    setisLoading,
    setselectRawProductionStock,
    setselectAddRawProductionStockProduct,
  };
};

export default useAddRawProductionStock;
