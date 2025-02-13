import { useState } from "react";
import { createSetTarget } from "../../api/SetTarget-Api/SetTargetApi";

interface SetTargetFormValues {
  month: string;
  year: string;
  setTargetAmount: number;
}

const useSetTarget = () => {
  const [formValues, setFormValues] = useState<SetTargetFormValues>({
    month: "",
    year: "",
    setTargetAmount: 0,
  });
  const [franchise, setFranchise] = useState([]);
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

  const handelAddSetTarget = async () => {
    const SetTargetData = {};
    try {
      const response: any = await createSetTarget(SetTargetData);
      if (response.status === 201) {
        setMessage("SetTarget added successfully!");
        setFormValues({
          month: "",
          year: "",
          setTargetAmount: 0,
        });
      }
    } catch (error) {
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
    setFranchise,
    setisLoading,
  };
};

export default useSetTarget;
