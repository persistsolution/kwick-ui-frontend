import { useEffect, useState } from "react";
import {
  addGodownStockApi,
  fetchGodownListApi,
  fetchGodownStockProduct,
  fetchProductDetailsApi,
} from "../../../api/GoDown-Api/GodownStock/GodownStockApi";

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
  unit: string;
  qtyUnit: string;
  addGodownStockArray: {
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

type GodownStockProduct = {
  label: string;
  value: number;
} | null;

type selectGodownProduct = {
  label: string;
  value: number;
} | null;

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
    unit: "",
    qtyUnit: "",
    narration: "",
    goDownlist: [],
    productList: [],
    addGodownStockArray: [],
  });

  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [selectGodown, setselectGodown] = useState<selectGodownProduct>(null);
  const [goDownList, setgoDownList] = useState([]);
  const [goDownProductlist, setgoDownProductlist] = useState([]);
  const [selectGodownStockProduct, setselectGodownStockProduct] =
    useState<GodownStockProduct>(null);

  useEffect(() => {
    fetchGodownList();
    handleFetchGodownPord();
  }, []);

  const handlSelectGodownProductList = async (selectedOption: any) => {
    const response: any = await fetchProductDetailsApi(
      Number(selectedOption.value),
      Number(selectGodown?.value)
    );
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
        goDownlist: prevState.goDownlist,
        productList: prevState.productList,
        addGodownStockArray: prevState.addGodownStockArray,
      }));
    }

    setselectGodownStockProduct((prevValues: any) => ({
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

      if (name === "stockInQty" || name === "productPrice") {
        const stockInQty =
          name === "stockInQty" ? Number(value) : Number(formValues.stockInQty);
        const unitPrice =
          name === "productPrice"
            ? Number(value)
            : Number(formValues.productPrice);

        updatedValues = {
          ...updatedValues,
          totalPrice: stockInQty * unitPrice,
        };
      }

      setFormValues(updatedValues);
    }
  };

  const fetchGodownList = async () => {
    try {
      const response: any = await fetchGodownListApi();
      setgoDownList(response.data);
    } catch (error) {
      console.error("Error fetching viewGodownStock:", error);
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
  const handleFetchGodownPord = async () => {
    try {
      const response: any = await fetchGodownStockProduct();
      setgoDownProductlist(response.data);
    } catch (error) {
      console.error("Error fetching viewGodownStock:", error);
    }
  };

  const handelAddGodownStock = async () => {
    const productdetailsList = formValues.addGodownStockArray.map(
      (item: any) => ({
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
      })
    );
    const addGodownStockData = {
      GodownId: Number(selectGodown?.value),
      StockDate: formatDate(formValues.date),
      Narration: formValues.narration,
      productdetails: productdetailsList,
    };
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
          qtyUnit: "",
          igst: 0,
          totalgst: 0,
          date: "",
          narration: "",
          unit: "",
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
    const selectvalueproductName: any = goDownProductlist.find(
      (data: any) => data.id == selectGodownStockProduct?.value
    );
    setFormValues((prevValues) => ({
      ...prevValues,
      addGodownStockArray: [
        ...prevValues.addGodownStockArray,
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
  const handleRemoveGodownStock = (index: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      addGodownStockArray: prevValues.addGodownStockArray.filter(
        (_, idx) => idx !== index
      ),
    }));
  };

  console.log(formValues.addGodownStockArray, "addGodownStockArray");

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
