import { useEffect, useState } from "react";
import {
  addGodownStockToCOCOFrApi,
  fetchGodownStockProduct,
} from "../../../../api/GoDown-Api/GodownStock/GodownStockApi";
import { fetchFranchiseApi } from "../../../../api/Franchise-Api/FranchiseApi";
import { fetchGodownApi } from "../../../../api/GoDown-Api/CreateGoDown/CreateGoDownApi";
import { fetchOtherProductsApi } from "../../../../api/Selling-Products-Api/OtherProduct-Api/OtherProductApi";
import { useNavigate } from "react-router-dom";

interface AddGodownStockItem {
  GoDownId?: number;
  productId?: number;
  id: number;
  productName?: string;
  availableStock: number;
  stockInQty: number;
  productPrice: number;
  totalPrice: number;
  unit: string;
  qtyUnit: string;
  cgst: number;
  sgst: number;
  igst: number;
  totalgst: number;
  GstAmount: number
  GstAmt: number
}

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
  goDownlist: any[];
  productList: any[];
  unit: string;
  qtyUnit: string;
  selectFranchise: number;
  invoiveNo: number;
  GstAmt: number,
  addGodownStockArray: AddGodownStockItem[];
}

type OptionType = {
  label: string;
  value: number;
} | null;

const useTransferStockGodownToOtherFr = () => {
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
    unit: "",
    qtyUnit: "",
    goDownlist: [],
    productList: [],
    addGodownStockArray: [],
    selectFranchise: 0,
    invoiveNo: 0,
    GstAmt: 0
  });

  const [message, setMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [selectGodown, setselectGodown] = useState<OptionType>(null);
  const [selectFranchise, setselectFranchise] = useState<OptionType>(null);
  const [selectGodownStockProduct, setselectGodownStockProduct] = useState<OptionType>(null);
  const [goDownList, setgoDownList] = useState<any[]>([]);
  const [goDownProductlist, setgoDownProductlist] = useState<any[]>([]);
  const [franchisesList, setFranchisesList] = useState<any[]>([]);
  const [otherProductList, setOtherProductList] = useState<any[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    handleFetchGodownList();
    handleFetchGodownPord();
    fetchFranchiseList();
    fetchOtherProducts();
  }, []);

  const fetchOtherProducts = async () => {
    try {
      const response: any = await fetchOtherProductsApi();
      const data = response?.data?.data || []
      setOtherProductList(data);
    } catch (error) {
      console.error("Error fetching other products:", error);
    }
  };

  const fetchFranchiseList = async () => {
    try {
      const response: any = await fetchFranchiseApi();
      const data = response?.data?.data || []
      setFranchisesList(data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  const handleFetchGodownList = async () => {
    try {
      const response: any = await fetchGodownApi();
      const data = response?.data?.data || []
      setgoDownList(data);
    } catch (error) {
      console.error("Error fetching godown list:", error);
    }
  };

  const handleFetchGodownPord = async () => {
    try {
      const response: any = await fetchGodownStockProduct();
      const data = response?.data?.data || []
      setgoDownProductlist(data);
    } catch (error) {
      console.error("Error fetching godown stock products:", error);
    }
  };

  const handlSelectGodownProductList = (selectedProduct: any) => {
    setFormValues((prev) => ({
      ...prev,
      productName: selectedProduct.ProductName,
      availableStock: Number(selectedProduct.Qty) || 0,
      productPrice: parseFloat(selectedProduct.ProdPrice) || 0,
      cgst: parseFloat(selectedProduct.CgstAmt) || 0,
      sgst: parseFloat(selectedProduct.SgstAmt) || 0,
      igst: parseFloat(selectedProduct.IgstAmt) || 0,
      qtyUnit: selectedProduct.Unit || "",
      unit: selectedProduct.Unit || "",
      invoiveNo: selectedProduct.id,
      GstAmount: selectedProduct.GstAmt
    }));
    setselectGodownStockProduct(selectedProduct.id)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValues: any = {
      ...formValues,
      [name]: value,
    };
    if (name === "stockInQty" || name === "productPrice") {
      const stockInQty = name === "stockInQty" ? Number(value) : Number(formValues.stockInQty);
      const productPrice = name === "productPrice" ? Number(value) : Number(formValues.productPrice);
      updatedValues.totalPrice = stockInQty * productPrice;
    }
    setFormValues(updatedValues);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handelAddGodown = () => {
    const selectedProduct = otherProductList.find(
      (product) => product.id === selectGodownStockProduct
    );
    if (!selectedProduct) return;
    const newItem: any = {
      GoDownId: selectGodown?.value || 0,
      productId: selectedProduct.id,
      id: 0,
      productName: selectedProduct.ProductName,
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
      GstAmount: selectedProduct.GstAmt
    };

    setFormValues((prev) => ({
      ...prev,
      addGodownStockArray: [...prev.addGodownStockArray, newItem],
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
      unit: "",
      qtyUnit: "",
      selectFranchise: 0,
      invoiveNo: 0,
      GstAmt: 0
    }));
  };

  const handleRemoveGodownStock = (index: number) => {
    setFormValues((prev) => ({
      ...prev,
      addGodownStockArray: prev.addGodownStockArray.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true)
    const totalQty = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.stockInQty), 0);
    const totalGstAmt = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.totalgst), 0);
    const totalAmt = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.totalPrice), 0);
    const GstAmount = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.GstAmount), 0);

    const payload = {
      GodownId: Number(selectGodown?.value),
      FranchiseId: Number(selectFranchise?.value),
      StockDate: formatDate(formValues.date),
      TotQty: totalQty,
      GstAmount: GstAmount,
      TotalAmount: totalAmt,
      InvoiceNo: 123,
      OwnShop: 0,
      Narration: formValues.narration,
      CreatedBy: 10,
      items: formValues.addGodownStockArray.map((item) => ({
        GodownProdId: item.GoDownId,
        ProdId: item.productId,
        AvailStock: item.availableStock,
        AvailStockUnit: item.unit,
        Qty: item.stockInQty,
        QtyUnit: item.qtyUnit,
        Price: item.productPrice,
        TotalPrice: item.totalPrice,
        CgstAmt: item.cgst,
        SgstAmt: item.sgst,
        IgstAmt: item.igst,
        GstAmt: item.totalgst,
        Unit: item.qtyUnit,

      })),
    };

    try {
      const response = await addGodownStockToCOCOFrApi(payload);
      if (response.status === 200) {
        // setMessage("GoDown Stock Added successfully!");
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
          selectFranchise: 0,
          invoiveNo: 0,
          GstAmt: 0
        });
        setisLoading(false)
        navigate("/GoDown/ViewTransferStockToOtherFr")
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setisLoading(false)
    }
  };

  const totalQty = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.stockInQty), 0);
  const totalGstAmt = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.totalgst), 0);
  const totalAmt = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.totalPrice), 0);
  const GstAmount = formValues.addGodownStockArray.reduce((acc, item) => acc + Number(item.GstAmount), 0);

  return {
    formValues,
    message,
    isLoading,
    selectGodown,
    selectFranchise,
    totalQty,
    totalGstAmt,
    totalAmt,
    goDownList,
    goDownProductlist,
    franchisesList,
    otherProductList,
    GstAmount,
    handleChange,
    handleSubmit,
    handelAddGodown,
    handleRemoveGodownStock,
    setisLoading,
    setselectGodown,
    setselectFranchise,
    setFormValues,
    handlSelectGodownProductList,
  };
};

export default useTransferStockGodownToOtherFr;
