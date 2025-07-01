import { useState } from "react";
import { createFinancerPatnerApi } from "../../../api/FinancerPatner-Api/FinancerPatnerApi";

type AccessOption = {
  value: number;
  label: string;
};

type FinancerFormData = {
  FinancerPatnerAccountName: string;
  permanentAddress: string;
  password: string;
  designation: string;
  dateOfJoining: string;
  perDaySalary: string;
  resign: string;
  resignDate: string;
  resignComment: string;
  mobileNo: string;
  emailId: string;
  address: string;
  bankHolderName: string;
  bankName: string;
  accountNo: string;
  branch: string;
  ifscCode: string;
  upiId: string;
  anotherMobileNo: string;
  Designation: string;
  AdharNo: string;
  dateOfJoning: string;
  details: string;
  status: string;
  BankName: string;
  AccountNo: number;
  Branch: string;
  IFSCCode: string;
  UPIID: string;
  BankAccountStatus: string;
  photo: File | string;
  roll: number;
  commisionPercentage: string
};

const useAddFinancerPatner = () => {
  const [formData, setFormData] = useState<FinancerFormData>({
    FinancerPatnerAccountName: "",
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
    anotherMobileNo: "",
    Designation: "",
    AdharNo: "",
    dateOfJoning: "",
    details: "",
    status: "",
    BankName: "",
    AccountNo: 0,
    Branch: "",
    IFSCCode: "",
    UPIID: "",
    BankAccountStatus: "",
    photo: "",
    roll: 63,
    commisionPercentage: ""
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AdminAccess: AccessOption[] = [
    { value: 48, label: "Selling Product Category" },
    { value: 49, label: "Selling Product Sub Category" },
    { value: 50, label: "Selling Products" },
    { value: 51, label: "Allocate Products" },
    { value: 52, label: "Raw Product Category" },
    { value: 53, label: "Raw Product Sub Category" },
    { value: 54, label: "Raw Products" },
    { value: 55, label: "Allocate Raw Products" },
    { value: 56, label: "Franchise Account" },
    { value: 57, label: "FinancerPatnerAccount Account" },
    { value: 58, label: "Godown Account" },
    { value: 59, label: "Godown Product" },
    { value: 60, label: "Godown Stock" },
    { value: 61, label: "Godown Transfer Stock" },
    { value: 62, label: "Pending Request For Product Stocks" },
    { value: 63, label: "Approve Request For Product Stocks" },
    { value: 64, label: "Create Invoice For Product Stocks" },
    { value: 65, label: "Return Godown Product" },
    { value: 66, label: "Product Stock Report" },
    { value: 67, label: "Raw Product Stock Report" },
    { value: 68, label: "Category Wise Sell Report" },
    { value: 69, label: "Product Wise Sell Report" },
    { value: 70, label: "Discount Report" },
    { value: 71, label: "Customer Sell Report" },
    { value: 72, label: "Daily Sale Report" },
    { value: 73, label: "Weekly Sale Report" },
    { value: 74, label: "Godown Stock Report" },
    { value: 75, label: "Godown Product Stock Report" },
    { value: 76, label: "Transfer Stock Godown To Franchise Report" },
  ];

  const RightAccess: AccessOption[] = [
    { value: 1, label: "Edit" },
    { value: 2, label: "Delete" },
    { value: 3, label: "Add" },
  ];

  const franchiseOptions: AccessOption[] = [
    { value: 56, label: "Franchise Account" },
    { value: 57, label: "FinancerPatnerAccount Account" },
    { value: 66, label: "Product Stock Report" },
    { value: 67, label: "Raw Product Stock Report" },
    { value: 68, label: "Category Wise Sell Report" },
    { value: 69, label: "Product Wise Sell Report" },
    { value: 70, label: "Discount Report" },
    { value: 75, label: "Print Setting" },
    { value: 76, label: "Cash Book" },
    { value: 77, label: "Today Orders" },
    { value: 78, label: "Today Pending Orders" },
    { value: 79, label: "All Orders" },
    { value: 80, label: "Today Barcode Order" },
    { value: 81, label: "Today Online Orders" },
  ];

  const handleChange = (e: any) => {
    const { name, value, files } = e.target as HTMLInputElement;
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
      const payload = {
        CustomerId: "",
        ColgId: "",
        ShopName: "",
        Fname: formData.FinancerPatnerAccountName,
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
        ModifiedDate: new Date(),
      };

      const response = await createFinancerPatnerApi(payload);
      if (response.status === 201) {
        setMessage("FinancerPatnerAccount added successfully!");
        setFormData({
          FinancerPatnerAccountName: "",
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
          anotherMobileNo: "",
          Designation: "",
          AdharNo: "",
          dateOfJoning: "",
          details: "",
          status: "",
          BankName: "",
          AccountNo: 0,
          Branch: "",
          IFSCCode: "",
          UPIID: "",
          BankAccountStatus: "",
          photo: "",
          roll: 63,
          commisionPercentage:""
        });
      } else {
        setMessage("Error: Failed to add Financer Patner Account.");
      }
    } catch (err) {
      console.error("Error during Add Financer Patner Account creation:", err);
      setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    AdminAccess,
    RightAccess,
    franchiseOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useAddFinancerPatner;
