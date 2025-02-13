import { useState } from "react";

const useFranchiseDashboard = () => {
  const [totalEmployees] = useState<any>(0);
  const [totalFranchises] = useState<any>(0);
  const [totalProducts] = useState<any>(0);

  const dashboardHeadersData = [
    {
      name: "Total Order",
      amount: 100,
    },
    {
      name: "Today Order",
      amount: 100,
    },
    {
      name: "Today Cash",
      amount: 100,
    },
    {
      name: "Phone Pay",
      amount: 100,
    },
    {
      name: "Google Pay",
      amount: 100,
    },
    {
      name: "Paytm",
      amount: 100,
    },
    {
      name: "Other UPI",
      amount: 100,
    },
    {
      name: "Employee",
      amount: 100,
    },
  ];

  return {
    totalEmployees,
    totalFranchises,
    totalProducts,
    dashboardHeadersData,
  };
};

export default useFranchiseDashboard;
