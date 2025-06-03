import { useState } from "react";
import { addFrEmployeeCreate } from "../../../../api/SubFranchise-API/EmployeeApi/AddEmployeeApi/AddEmployeeApi";

const useAddFrEmployee = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    permanentAddress: "",
    password: "",
    designation: "",
    dateOfJoining: "",
    perDaySalary: "",
    resign: "",
    resignDate: "",
    resignComment: "",
    mobileNo: "",
    emailId: "",
    address: "",
    bankHolderName: "",
    bankName: "",
    accountNo: "",
    branch: "",
    ifscCode: "",
    upiId: "",
    anotherMobileNo:"",
    Designation:"",
    AdharNo:"",
    dateOfJoning:"",
    details:"",
    status:"",
    BankName:"",
    AccountNo:0,
    Branch:"",
    IFSCCode:"",
    UPIID:"",
    BankAccountStatus:"",
    photo:"",
    roll:63,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const RightAccess = [
    { value: 1, label: "Edit" },
    { value: 2, label: "Delete" },
    { value: 3, label: "Add" },
  ];

  const franchiseOptions = [
    { value: 1, label: "Employee Account" },
    { value: 2, label: "Product Stock Report" },
    { value: 3, label: "Raw Product Stock Report" },
    { value: 4, label: "Category Wise Sell Report" },
    { value: 5, label: "Product Wise Sell Report" },
    { value: 6, label: "Discount Report" },
    { value: 7, label: "Print Setting" },
    { value: 8, label: "Cash Book" },
    { value: 9, label: "Today Orders" },
    { value: 10, label: "Today Pending Orders" },
    { value: 11, label: "All Orders" },
    { value: 12, label: "Today Barcode Order" },
    { value: 13, label: "Today Online Orders" },
    { value: 14, label: "Selling Products" },
    { value: 15, label: "Manage Product Stock" },
    { value: 16, label: "Raw Products" },
    { value: 17, label: "Manage Raw Product Stock" },
    { value: 18, label: "Return MRP Product" },
    { value: 19, label: "Return Raw Product" }
  ];
  

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {


      const Payload = {
        CustomerId: "",
        ColgId: "",
        ShopName: "",
        Fname:  formData.employeeName,
        Mname: "",
        Lname: "",
        Phone: formData.mobileNo,
        Phone2: formData.anotherMobileNo,
        EmailId: formData.emailId,
        Password: formData.password,
        CountryId: 0,
        StateId: 0,
        CityId: 0,
        AreaId: "",
        Address: formData.details,
        Pincode: "",
        Photo: formData.photo,
        Photo2: "",
        Photo3: "",
        GstNo: "",
        PanNo: "",
        Roll: formData.roll,
        Status: formData.status,
        CreatedBy: 0,
        ModifiedBy: 0,
        CreatedDate: new Date(),
        ModifiedDate:new Date(),

        
      };
      
      const response = await addFrEmployeeCreate(Payload);
      if (response.status === 201) {
        setMessage("Employee added successfully!");
        setFormData({
          employeeName: "",
          permanentAddress: "",
          password: "",
          designation: "",
          dateOfJoining: "",
          perDaySalary: "",
          resign: "",
          resignDate: "",
          resignComment: "",
          mobileNo: "",
          emailId: "",
          address: "",
          bankHolderName: "",
          bankName: "",
          accountNo: "",
          branch: "",
          ifscCode: "",
          upiId: "",
          anotherMobileNo:"",
          Designation:"",
          AdharNo:"",
          dateOfJoning:"",
          details:"",
          status:"",
          BankName:"",
          AccountNo:0,
          Branch:"",
          IFSCCode:"",
          UPIID:"",
          BankAccountStatus:"",
          photo:"",
          roll:63

        });
      } else {
        setMessage("Error: Failed to add Employee.");
      }
    } catch (err: any) {
      console.error("Error during Add Employee creation:", err);
      setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    RightAccess,
    franchiseOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useAddFrEmployee;
