import { useState } from "react";
import { createEmployeCreate } from "../../../api/Employe-Api/EmployeApi";

const useAddEmployee = () => {
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
    photo2: "",
    photo3: "",
    CustomerId: "",
    ColgId: "",
    pincode: "",
    areaId: "",
    shopName: "",
    lastName: "",
    middleName: ""
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const AdminAccess = [
    { value: 48, label: "Selling Product Category" },
    { value: 49, label: "Selling Product Sub Category" },
    { value: 50, label: "Selling Products" },
    { value: 51, label: "Allocate Products" },
    { value: 52, label: "Raw Product Category" },
    { value: 53, label: "Raw Product Sub Category" },
    { value: 54, label: "Raw Products" },
    { value: 55, label: "Allocate Raw Products" },
    { value: 56, label: "Franchise Account" },
    { value: 57, label: "Employee Account" },
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

  const RightAccess = [
    { value: 1, label: "Edit" },
    { value: 2, label: "Delete" },
    { value: 3, label: "Add" },
  ];

  const franchiseOptions = [
    { value: 56, label: "Franchise Account" },
    { value: 57, label: "Employee Account" },
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
        Fname: formData.employeeName,
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
        Details: formData.details,
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
        FatherPhone: "",
        Designation: "",
        Dob: "",
        AadharNo: "",
        BloodGroup: "",
        JoinDate: "",
        EmailId2: "",
        PerDaySalary: "",
        CompId: "",
        BranchId: "",
        AccountName: "",
        BankName: "",
        AccountNo: "",
        IfscCode: "",
        Branch: "",
        UpiNo: "",
        UnderUser: "",
        ReportingMgr: "",
        ResignStatus: "",
        ResignDate: "",
        ResignComment: "",
        CatId: 4,
        Options: [],
        zone: [],
        CocoFranchiseAccess: [],
      };

      const response = await createEmployeCreate(Payload);
      if (response.status === 201) {
        // setMessage("Employee added successfully!");
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
          photo2: "",
          photo3: "",
          CustomerId: "",
          ColgId: "",
          pincode: "",
          areaId: "",
          shopName: "",
          lastName: "",
          middleName: ""
        });
      } else {
        // setMessage("Error: Failed to add Employee.");
      }
    } catch (err: any) {
      console.error("Error during Add Employee creation:", err);
      // setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage(null);
  //   setIsLoading(true);
  //   try {
  //     const formDataObj = new FormData();
  //       const safeAppend = (key: string, value: any) => {
  //       if (value !== undefined && value !== null && value !== "") {
  //         formDataObj.append(key, value);
  //       }
  //     };
  //       safeAppend("CustomerId", formData.CustomerId || "0");
  //     safeAppend("ColgId", formData.ColgId || "0");
  //     safeAppend("ShopName", formData.shopName);
  //     safeAppend("Fname", formData.employeeName);
  //     safeAppend("Mname", formData.middleName);
  //     safeAppend("Lname", formData.lastName);
  //     safeAppend("Phone", formData.mobileNo);
  //     safeAppend("Phone2", formData.anotherMobileNo);
  //     safeAppend("EmailId", formData.emailId);
  //     safeAppend("Password", formData.password);
  //     safeAppend("perDaySalary", formData.perDaySalary);
  //     safeAppend("CountryId", "0");
  //     safeAppend("StateId", "0");
  //     safeAppend("CityId", "0");
  //     safeAppend("AreaId", formData.areaId || "0");
  //     safeAppend("Address", formData.details);
  //     safeAppend("Pincode", formData.pincode || "0");
  //     safeAppend("Roll", formData.roll?.toString() || "0");
  //     safeAppend("Status", formData.status || "0");
  //     safeAppend("CreatedBy", "0");
  //     safeAppend("ModifiedBy", "0");
  //     safeAppend("CreatedDate", new Date().toISOString());
  //     safeAppend("ModifiedDate", new Date().toISOString());

  //     // File uploads (only if files are selected)
  //     if (formData.photo) formDataObj.append("Photo", formData.photo);
  //     if (formData.photo2) formDataObj.append("Photo2", formData.photo2);
  //     if (formData.photo3) formDataObj.append("Photo3", formData.photo3);

  //     const response = await createEmployeCreate(formDataObj);

  //     if (response.status === 200) {
  //       setMessage("Employee added successfully!");

  //       // Reset form data
  //       setFormData({
  //         employeeName: "",
  //         permanentAddress: "",
  //         password: "",
  //         designation: "",
  //         dateOfJoining: "",
  //         perDaySalary: "",
  //         resign: "",
  //         resignDate: "",
  //         resignComment: "",
  //         mobileNo: "",
  //         emailId: "",
  //         address: "",
  //         bankHolderName: "",
  //         bankName: "",
  //         accountNo: "",
  //         branch: "",
  //         ifscCode: "",
  //         upiId: "",
  //         anotherMobileNo: "",
  //         Designation: "",
  //         AdharNo: "",
  //         dateOfJoning: "",
  //         details: "",
  //         status: "",
  //         BankName: "",
  //         AccountNo: 0,
  //         Branch: "",
  //         IFSCCode: "",
  //         UPIID: "",
  //         BankAccountStatus: "",
  //         photo: "",
  //         roll: 63,
  //         photo2: "",
  //         photo3: "",
  //         CustomerId:"",
  //         ColgId:"",
  //         pincode:"",
  //         areaId:"",
  //         shopName:"",
  //         lastName:"",
  //         middleName:""
  //       });
  //     } else {
  //       setMessage("Error: Failed to add Employee.");
  //     }
  //   } catch (err) {
  //     console.error("Error during Add Employee creation:", err);
  //     setMessage("Network error. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };




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

export default useAddEmployee;
