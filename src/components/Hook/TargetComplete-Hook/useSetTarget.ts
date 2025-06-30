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
  crossSalesQty: string
}

const useSetTarget = () => {
  const [formValues, setFormValues] = useState<SetTargetFormValues>({
    month: "",
    year: "",
    setTargetAmount: 0,
    qsrKitcSales: "",
    packFoodSales: "",
    crossSalesQty: ""
  });
  const [franchise, setFranchise] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [franchisesList, setFranchisesList] = useState<any[]>([]);
  const [selectedFranchise, setSelectFranchise] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    handleFetchFranchises();
  }, [])

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


  const handleFetchFranchises = async () => {
    try {
      const response: any = await fetchFranchiseApi();
      const data = response?.data?.data || []
      setFranchisesList(data);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };


  const handelSetTarget = () => {
  }

  const handelAddSetTarget = async () => {
    setisLoading(true)
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
      if (response.status === 201) {
        // setMessage("SetTarget added successfully!");
        setFormValues({
          month: "",
          year: "",
          setTargetAmount: 0,
          qsrKitcSales: "",
          packFoodSales: "",
          crossSalesQty: ""
        });
        setisLoading(false)
      }
    } catch (error) {
      setisLoading(false)
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
    handelSetTarget
  };
};

export default useSetTarget;
