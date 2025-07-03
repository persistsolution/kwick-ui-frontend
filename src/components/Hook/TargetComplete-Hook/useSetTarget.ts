import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSetTargetAPi } from "../../api/SetTarget-Api/SetTargetApi";
import { fetchFranchiseApi } from "../../api/Franchise-Api/FranchiseApi";

interface SetTargetFormValues {
  month: string;
  year: string;
  setTargetAmount: number;
  qsrKitcSales: string;
  packFoodSales: string;
  crossSalesQty: string;
}

interface FranchiseType {
  id: string;
  name: string;
  [key: string]: any; 
}

const useSetTarget = () => {
  const [formValues, setFormValues] = useState<SetTargetFormValues>({
    month: "",
    year: "",
    setTargetAmount: 0,
    qsrKitcSales: "",
    packFoodSales: "",
    crossSalesQty: "",
  });

  const [franchise, setFranchise] = useState<FranchiseType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [franchisesList, setFranchisesList] = useState<FranchiseType[]>([]);
  const [selectedFranchise, setSelectFranchise] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchFranchises();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0] || null,
      }));

      const url = URL.createObjectURL(files[0]);
      setFormValues((prev) => ({
        ...prev,
        photo: url,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleFetchFranchises = async () => {
    try {
      const response: any = await fetchFranchiseApi();
      const data: FranchiseType[] = response?.data?.data || [];
      setFranchisesList(data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  const handelSetTarget = () => {
    // Placeholder for future logic
  };

  const handelAddSetTarget = async () => {
    setisLoading(true);
    const SetTargetData = {
      frid: selectedFranchise,
      month: formValues.month,
      year: formValues.year,
      target: formValues.setTargetAmount,
      qsrkitchen_target: formValues.qsrKitcSales,
      packfood_target: formValues.packFoodSales,
      cross_sale_target: formValues.crossSalesQty,
    };

    try {
      const response: any = await createSetTargetAPi(SetTargetData);
      if (response.status === 200) {
        setFormValues({
          month: "",
          year: "",
          setTargetAmount: 0,
          qsrKitcSales: "",
          packFoodSales: "",
          crossSalesQty: "",
        });
        setisLoading(false);
        navigate("/Target/ViewSetTarget");
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error adding SetTarget:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handelAddSetTarget();
  };

  return {
    formValues,
    handleSubmit,
    handleChange,
    message,
    isLoading,
    franchise,
    franchisesList,
    selectedFranchise,
    setSelectFranchise,
    setFranchise,
    setisLoading,
    handelSetTarget,
  };
};

export default useSetTarget;
