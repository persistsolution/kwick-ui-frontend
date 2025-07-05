import { useEffect, useState } from "react";
import {
  addGodownStockApi,
  fetchGodownListApi,
  fetchGodownStockProduct,
  fetchProductDetailsApi,
} from "../../../api/GoDown-Api/GodownStock/GodownStockApi";
import { fetchGodownApi } from "../../../api/GoDown-Api/CreateGoDown/CreateGoDownApi";
import { fetchOtherProductsApi } from "../../../api/Selling-Products-Api/OtherProduct-Api/OtherProductApi";

interface AddGodownStockItem {
  id: number;
  productId?: number;
  productName?: string;
  availableStock: number;
  stockInQty: number;
  productPrice: number;
  totalPrice: number;
  unit: string;
  cgst: number;
  sgst: number;
  igst: number;
  totalgst: number;
  qtyUnit: string;
}

interface RetailerFormValues {
  id:number,
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
  goDownlist: any[];
  productList: any[];
  unit: string;
  qtyUnit: string;
  addGodownStockArray: AddGodownStockItem[];
}

interface SelectOption {
  label: string;
  value: number;
}

const useAddGodownStock = () => {
  const [formValues, setFormValues] = useState<RetailerFormValues>({
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
    goDownlist: [],
    productList: [],
    addGodownStockArray: [],
    id:0
  });

  const [message, setMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [selectGodown, setselectGodown] = useState<SelectOption | null>(null);
  const [goDownList, setgoDownList] = useState<any[]>([]);
  const [goDownProductlist, setgoDownProductlist] = useState<any[]>([]);
  const [selectGodownStockProduct, setselectGodownStockProduct] = useState<SelectOption | null>(null);
  const [otherProductList , setOtherProductList]= useState<any[]>([]);

  useEffect(() => {
    fetchGodownList();
    handleFetchGodownPord();
    handleFetchviewGodownAccount();
    fetchOtherProducts();
  }, []);


  const fetchOtherProducts =async  ()=>{
  try {
      const response : any= await fetchOtherProductsApi();
      const data = response?.data?.data || [];
      setOtherProductList(data);
    } catch (error) {
      console.error("Error fetching viewGodownAccount:", error);
    }
  }

  const handleFetchviewGodownAccount = async () => {
    try {
      const response : any= await fetchGodownApi();
      const data = response?.data?.data || [];
      setgoDownList(data);
    } catch (error) {
      console.error("Error fetching viewGodownAccount:", error);
    }
  };

  const handlSelectGodownProductList = async (selectedOption: any) => {
    console.log(selectedOption, "selectedOption")
      setFormValues((prevState) => ({
        ...prevState,
        availableStock: selectedOption.balqty,
        productPrice: selectedOption.Price,
        cgst: selectedOption.CgstPer,
        sgst: selectedOption.SgstPer,
        igst: selectedOption.IgstPer,
        unit: selectedOption.Unit,
        qtyUnit: selectedOption.Unit,
        productName:selectedOption.ProductName,
        id:selectedOption.id
      }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let updatedValues = {
      ...formValues,
      [name]: type === "number" ? Number(value) : value,
    };

    if (name === "stockInQty" || name === "productPrice") {
      const stockInQty = name === "stockInQty" ? Number(value) : formValues.stockInQty;
      const productPrice = name === "productPrice" ? Number(value) : formValues.productPrice;

      updatedValues = {
        ...updatedValues,
        totalPrice: stockInQty * productPrice,
      };
    }

    setFormValues(updatedValues);
  };

  const fetchGodownList = async () => {
    try {
      const response = await fetchGodownListApi();
      setgoDownList(response.data);
    } catch (error) {
      console.error("Error fetching godown list:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleFetchGodownPord = async () => {
    try {
      const response = await fetchGodownStockProduct();
      setgoDownProductlist(response.data);
    } catch (error) {
      console.error("Error fetching godown stock products:", error);
    }
  };

  const handelAddGodownStock = async () => {
    const productdetailsList = formValues.addGodownStockArray.map((item) => ({
      ProdId: Number(item.productId),
      AvailStock: Number(item.availableStock),
      AvailStockUnit: item.unit,
      Qty: Number(item.stockInQty),
      QtyUnit: item.qtyUnit,
      Price: Number(item.productPrice),
      TotalPrice: Number(item.totalPrice),
      CgstPer: Number(item.cgst),
      SgstPer: Number(item.sgst),
      IgstPer: Number(item.igst),
      GstAmt: Number(item.totalgst),
    }));

    const payload = {
      GodownId: Number(selectGodown?.value),
      StockDate: formatDate(formValues.date),
      Narration: formValues.narration,
      items: productdetailsList,
    };

    try {
      const response = await addGodownStockApi(payload);
      if (response.status === 201) {
        setMessage("GoDown Stock added successfully!");
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
          unit: "",
          qtyUnit: "",
          goDownlist: [],
          productList: [],
          addGodownStockArray: [],
          id:0,
        });
      }
    } catch (error) {
      console.error("Error adding GoDown stock:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddGodownStock();
  };

  const handelAddGodown = () => {
    const data = {
          productName: formValues.productName,
          productId: formValues.id,
          id: 0,
          availableStock: formValues.availableStock,
          stockInQty: formValues.stockInQty,
          productPrice: formValues.productPrice,
          totalPrice: formValues.totalPrice,
          cgst: formValues.cgst,
          sgst: formValues.sgst,
          igst: formValues.igst,
          totalgst: formValues.totalgst,
          unit: formValues.unit,
          qtyUnit: formValues.qtyUnit,
        }
    setFormValues((prevValues) => ({
      ...prevValues,
      addGodownStockArray: [
        ...prevValues.addGodownStockArray,data
       
      ],
    }));
  };


  const handelChangeAddedGodownPoduct = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const updatedArray = [...formValues.addGodownStockArray];
    const newValue = name === "stockInQty" || name === "productPrice" ? Number(value) : value;

    updatedArray[idx] = {
      ...updatedArray[idx],
      [name]: newValue,
    };

    if (name === "stockInQty" || name === "productPrice") {
      const stockInQty = Number(updatedArray[idx].stockInQty) || 0;
      const productPrice = Number(updatedArray[idx].productPrice) || 0;
      updatedArray[idx].totalPrice = stockInQty * productPrice;
    }

    setFormValues({
      ...formValues,
      addGodownStockArray: updatedArray,
    });
  };

  const handleRemoveGodownStock = (index: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      addGodownStockArray: prevValues.addGodownStockArray.filter((_, idx) => idx !== index),
    }));
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    message,
    isLoading,
    selectGodown,
    goDownList,
    goDownProductlist,
    selectGodownStockProduct,
    otherProductList,
    handelAddGodown,
    handleRemoveGodownStock,
    handelChangeAddedGodownPoduct,
    setisLoading,
    setselectGodown,
    setselectGodownStockProduct,
    setFormValues,
    handlSelectGodownProductList,
  };
};

export default useAddGodownStock;
