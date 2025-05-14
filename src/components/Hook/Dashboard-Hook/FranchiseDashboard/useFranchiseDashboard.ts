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


    const progressData = [
    {
      value: 40,
      raised: '$3200',
      goal: '$7700',
      color: 'info',
      days:40,
      City:"Mumbai"
    },
    {
      value: 60,
      raised: '$4300',
      goal: '$6400',
      color: 'warning',
      days:60,
      City:"Nagpur"

    },
    {
      value: 20,
      raised: '$2340',
      goal: '$5678',
      color: 'success',
      days:20,
      City:"Pune"


    },
  ];
const productSalesData = [
  {
    id: 1,
    product: "Ice Cream",
    totalSell: 27,
    purchaseAmount: "₹0.00",
    sellAmount: "₹405.00",
    profitAmount: "₹405.00",
  },
  {
    id: 2,
    product: "Monaco",
    totalSell: 13,
    purchaseAmount: "₹260.00",
    sellAmount: "₹130.00",
    profitAmount: "₹-130.00",
  },
  {
    id: 3,
    product: "Khatta Mitha",
    totalSell: 7,
    purchaseAmount: "₹70.00",
    sellAmount: "₹70.00",
    profitAmount: "₹0.00",
  },
  {
    id: 4,
    product: "Mini Bhakarwadi",
    totalSell: 6,
    purchaseAmount: "₹120.00",
    sellAmount: "₹60.00",
    profitAmount: "₹-60.00",
  },
  {
    id: 5,
    product: "Masala Tea (Medium )",
    totalSell: 6,
    purchaseAmount: "₹0.00",
    sellAmount: "₹120.00",
    profitAmount: "₹120.00",
  },
  {
    id: 6,
    product: "Coth Classic Cold Coffee 250Ml",
    totalSell: 4,
    purchaseAmount: "₹304.00",
    sellAmount: "₹304.00",
    profitAmount: "₹0.00",
  },
];


  return {
    totalEmployees,
    totalFranchises,
    totalProducts,
    dashboardHeadersData,
    progressData,
    productSalesData
  };
};

export default useFranchiseDashboard;
