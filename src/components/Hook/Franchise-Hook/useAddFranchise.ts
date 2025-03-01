import { useState } from "react";
import { createFranchiseCreate } from "../../api/Franchise-Api/FranchiseApi";

const zoneArray = [
  {
    label: "WEST-SOUTH",
    id: 1,
  },
  {
    label: "NORTH-EAST",
    id: 9,
  },
];

const stateOptions = [
  { value: "32", label: "Andaman & Nicobar (UT)" },
  { value: "9", label: "Andhra Pradesh" },
  { value: "10", label: "Arunachal Pradesh" },
  { value: "11", label: "Assam" },
  { value: "12", label: "Bihar" },
  { value: "33", label: "Chandigarh (UT)" },
  { value: "13", label: "Chhattisgarh" },
  { value: "34", label: "Dadra & Nagar Haveli and Daman & Diu (UT)" },
  { value: "35", label: "Delhi [National Capital Territory (NCT)]" },
  { value: "14", label: "Goa" },
  { value: "15", label: "Gujarat" },
  { value: "5", label: "Haryana" },
  { value: "4", label: "Himachal Pradesh" },
  { value: "36", label: "Jammu & Kashmir (UT)" },
  { value: "16", label: "Jharkhand" },
  { value: "17", label: "Karnataka" },
  { value: "18", label: "Kerala" },
  { value: "37", label: "Ladakh (UT)" },
  { value: "38", label: "Lakshadweep (UT)" },
  { value: "8", label: "Madhya Pradesh" },
  { value: "1", label: "Maharashtra" },
  { value: "19", label: "Manipur" },
  { value: "20", label: "Meghalaya" },
  { value: "21", label: "Mizoram" },
  { value: "22", label: "Nagaland" },
  { value: "23", label: "Odisha" },
  { value: "3", label: "Panjim" },
  { value: "39", label: "Puducherry (UT)" },
  { value: "24", label: "Punjab" },
  { value: "25", label: "Rajasthan" },
  { value: "26", label: "Sikkim" },
  { value: "27", label: "Tamil Nadu" },
  { value: "29", label: "Telangana" },
  { value: "28", label: "Tripura" },
  { value: "2", label: "Uttar Pradesh" },
  { value: "30", label: "Uttarakhand" },
  { value: "31", label: "West Bengal" },
];

const franchiseOptions = [
  { value: 1, label: "COCO Franchise" },
  { value: 2, label: "FOFO Franchise" },
  { value: 0, label: "Other Franchise" },
];

const useAddFranchise = () => {
  const [formData, setFormData] = useState({
    name: "",
    icon: null as File | null,
    photo: "" as string | null,
    photo2: null as File | null,
    featured: 0,
    prodtype: 0,
    status: 1,
    srno: 1.0,
    createddate: new Date().toISOString(),
    modifieddate: null as string | null,
    roll: 5,
    createdby: 2091,
    modifiedby: 0,
    push_flag: 0,
    delete_flag: 0,
    modified_time: new Date().toISOString(),
    franchiseName: "",
    shopName: "",
    emailId: "",
    mobileNo: "",
    anotherMobileNo: "",
    shopLocation: "",
    details: "",
    address: "",
    sellBy: "",
    sellAmount: 0 as number,
    sellDate: "",
    franchiseType: 0 as number,
    latitude: "",
    longitude: "",
    FrontAdharcardPhoto: "" as string | null,
    BackAdharcardPhoto: "" as string | null,
    AdharNo: "" as string | number,
    PanNo: "" as string,
    FrontPanPhoto: "" as string | null,
    BackPanPhoto: "" as string | null,
    GSTINNo: "" as string,
    gstCretificate: "" as string | null,
    GumastaNo: "" as string,
    GumastaCretificate: "" as string | null,
    MSMENo: "" as string,
    MSMECertificate: "" as string | null,
    UploadFoodLicense: "" as string | null,
    UploadFoodLicenseReceipt: "" as string | null,
    UploadAgreementCopy: "" as string | null,
    BankHolderName: "",
    BankName: "",
    AccountNo: "" as string,
    Branch: "",
    IFSCCode: "",
    UPIID: "",
    BankAccountStatus: "",
    selectedZone: "" as String,
    StateId: 1 as number,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        photo: url,
      }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    const payload = {
      BeneficiaryId: "",
      Taluka: "",
      Village: "",
      District: "",
      PumpCapacity: "",
      RooftopPlantCapacity: "",
      OffOnGrid: "",
      SanctionLoad: "",
      LoadExtension: "",
      WaterSource: "",
      SummerDepth: "",
      WinterDepth: "",
      PumpHead: "",
      BgNumber: "",
      BgValidity: "",
      BgClaimPeriod: "",
      InsuranceNumber: "",
      InsuranceAgency: "",
      InsuranceValidity: "",
      InstallationVendor: "",
      PumpHeadSelect: 0,
      AcDc: "",
      Surface: "",
      RefPhone: null,
      RefPhone2: null,
      RefEmailId: null,
      ShopName: formData.shopName,
      Fname: formData.franchiseName,
      Lattitude: formData.latitude,
      Longitude: formData.longitude,
      Details: formData.details || null,
      Location: formData.shopLocation,
      Phone: formData.mobileNo,
      Phone2: formData.anotherMobileNo,
      EmailId: formData.emailId,
      SellAmt: formData.sellAmount,
      SellDate: formatDate(formData.sellDate),
      TypeOfVendor: formData.franchiseType,
      AadharNo: formData.AdharNo,
      AadharCard: formData.FrontAdharcardPhoto,
      AadharCard2: formData.BackAdharcardPhoto,
      Address: formData.address,
      PanNo: formData.PanNo,
      PanCard: formData.FrontPanPhoto,
      PanCard2: formData.BackPanPhoto,
      GstNo: formData.GSTINNo,
      GstCertificate: formData.gstCretificate,
      GumastaNo: formData.GumastaNo,
      Gumasta: formData.GumastaCretificate,
      MsmeNo: formData.MSMENo,
      Msme: formData.MSMECertificate,
      FoodLicence: formData.UploadFoodLicense,
      FoodLicenceReceipt: formData.UploadFoodLicenseReceipt,
      AgreementCopy: formData.UploadAgreementCopy,
      BankName: formData.BankName,
      AccountName: formData.BankHolderName,
      AccountNo: formData.AccountNo,
      Branch: formData.Branch,
      IfscCode: formData.IFSCCode,
      UpiNo: formData.UPIID,
      Status: formData.status,
      CustomerId: "F96673253",
      ColgId: 0,
      Mname: "",
      Lname: "",
      Password: "",
      CountryId: 0,
      StateId: formData.StateId,
      CityId: 0,
      AreaId: null,
      Pincode: "",
      Photo: null,
      Photo2: null,
      Photo3: null,
      Roll: formData.roll,
      CreatedBy: 5,
      ModifiedBy: 5,
      CreatedDate: formatDate(new Date().toISOString()),
      ModifiedDate: formatDate(new Date().toISOString()),
      Options:
        "10,11,14,48,49,50,56,57,59,60,69,71,73,74,77,78,79,80,81,82,84,85,86,92,93,94,96,97,98,99",
      BranchId: "",
      Dob: null,
      Area: "",
      UserType: 0,
      PayMode: null,
      UnderUser: 0,
      ProjectType: "",
      InspectionDate: null,
      CommissioningDate: null,
      CustType: 0,
      CatId: "0",
      CompName: "",
      CompAddress: "",
      CompPhone: "",
      AuthorName: "",
      Tokens: localStorage.getItem("authToken"),
      AuthToken: null,
      CompId: 0,
      FatherPhone: null,
      Designation: null,
      BloodGroup: null,
      JoinDate: null,
      EmailId2: null,
      PerDaySalary: null,
      Barcode: "",
      KycStatus: 0,
      KycDate: null,
      Profession: null,
      FsiicNo: null,
      ShopActNo: null,
      AnniversaryDate: null,
      ExeId: 0,
      UnderFr: 0,
      ReportingMgr: 0,
      ResignStatus: 0,
      ResignDate: null,
      ResignComment: null,
      BillSoftFrId: 0,
      PkgId: 0,
      PkgAmt: 1.0,
      PkgDiscount: formatDate(new Date().toISOString()),
      PkgDate: formatDate(new Date().toISOString()),
      PkgValidity: 0,
      Prime: 0,
      terms_condition: "Thank you for your business!",
      bottom_title: "Powered by MAHACHAI PRIVATE LIMITED",
      ReferCode: null,
      OwnFranchise: 1,
      PrintCompName: "MAHACHAI PRIVATE LIMITED",
      PrintMobNo: "",
      TableQrCode: null,
      SalaryType: 0,
      CreditSalaryStatus: 0,
      IdStatus: 0,
      selectedZone: "",
      CocoFranchiseAccess: null,
      CinNo: null,
      push_flag: 0,
      delete_flag: 0,
      modified_time: formatDate(new Date().toISOString()),
      UnderFrId: 0,
      ShowFrStatus: 1,
      ReferalNo1: null,
      ReferalNo2: null,
      NomineePartnerName: null,
      NomineePartnerRelation: null,
      NomineePartnerPhone: null,
      BillAmount: 0,
      ExpCatId: 0,
      MainBrEmp: 0,
      ExpApproval: 0,
      UnderByUser: 0,
      DeliveryPerson: 0,
      ChequeBook: null,
      TradeName: null,
      AllocateProd: 1,
      AllocateRawProd:
        "1328,1327,1326,1325,1324,1323,1322,1321,1320,1319,1318,1317,1193,1192,1127,730,711,710,709,708,707,706,705,704,598,597,596,595,594,593,592,591,590,589,588,587,586,585,584,583,582,581,580,579,578,577,576,575,574,573,572,571,570,569,568,567,566,565,564,563,562,561,560,559,558,557,556,555,554,553,552,551,550,549,548,547,545,544,543,542,541,540,539,538,537,536,535,534,533,532,531,530,529,528,527,526,525,524,523,522,521,520,519,518,517,516,515,514,513,512,511,510,509,508,507,506,505,504,503,502,501,500,499,498,497,496,495,494,493,492,491,490,489,488,487,486,485,484,483,482,481,480,479,478,477,476,475,474,473,472,471,470,469,468,467,466,465,464,463,462,461,460,459,458,457,456,455,454,453,452,451,450,449,448,446,445,444,443,442,441,440,439,438,437,436,435,434,433,432,431,430,429,427,426,425,424,423,422,421,420,419,417,416,415,414,413,412,411,410,408",
      ZoneId: 1,
      BoreDia: "",
      zone: null,
      SchemeId: 0,
      SurveyDetails: 0,
      Percentage: null,
      DeclarationPdf: null,
      NomineeName: null,
      NomineeRelation: null,
      NomineePhone: null,
      NomineeAadharNo: null,
      MonthlySalary: null,
      DeclarationPhoto: null,
      MgrCheckpoint: 0,
      OtherEmp: 0,
    };

    try {
      const response = await createFranchiseCreate(payload);
      if (response.status === 201) {
        setMessage("Franchise added successfully!");
        setFormData({
          name: "",
          icon: null,
          photo: "",
          photo2: null,
          featured: 0,
          prodtype: 0,
          status: 1,
          srno: 1.0,
          createddate: new Date().toISOString(),
          modifieddate: null,
          roll: 5,
          createdby: 2091,
          modifiedby: 0,
          push_flag: 0,
          delete_flag: 0,
          modified_time: new Date().toISOString(),
          franchiseName: "",
          shopName: "",
          emailId: "",
          mobileNo: "",
          anotherMobileNo: "",
          shopLocation: "",
          details: "",
          address: "",
          sellBy: "",
          sellAmount: 0,
          sellDate: "",
          franchiseType: 0,
          latitude: "",
          longitude: "",
          FrontAdharcardPhoto: "",
          BackAdharcardPhoto: "",
          AdharNo: 0,
          PanNo: "",
          FrontPanPhoto: "",
          BackPanPhoto: "",
          GSTINNo: "",
          gstCretificate: "",
          GumastaNo: "",
          GumastaCretificate: "",
          MSMENo: "",
          MSMECertificate: "",
          UploadFoodLicense: "",
          UploadFoodLicenseReceipt: "",
          UploadAgreementCopy: "",
          BankHolderName: "",
          BankName: "",
          AccountNo: "",
          Branch: "",
          IFSCCode: "",
          UPIID: "",
          BankAccountStatus: "",
          selectedZone: "",
          StateId: 1,
        });
      } else {
        setMessage(`Error: Failed to add Franchise.`);
      }
    } catch (err: any) {
      console.error("Error during Add Franchise creation:", err);
      setMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    message,
    isLoading,
    zoneArray,
    stateOptions,
    franchiseOptions,
    handleChange,
    handleSubmit,
    setFormData,
  };
};

export default useAddFranchise;
