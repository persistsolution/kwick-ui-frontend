import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../../../api/Selling-Products-Api/ProductApi/productApi";
import { ApexOptions } from "apexcharts";

const useSubZoneExpenseVSSale = () => {
  // const [totalEmployees, setTotalEmployees] = useState<any>(0);
  const [selectReport, setSelectReport] = useState<string>("");
  const [totalEmployees] = useState<any>(0);
  const [totalFranchises] = useState<any>(0);
  const [totalProducts, setTotalProducts] = useState<any>(0);
  // const [chartState, setChartState] = useState({
  const [chartState] = useState({
    series: [
      {
        name: "Online",
        data: [44, 55],
      },
    ],
    options: {
      chart: {
        events: {
          mounted: (chart: any) => {
            chart.windowResizeHandler();
          },
        },
        type: "bar",
        height: 350,
        background: "#ffffff",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      grid: {
        show: true,
        borderColor: "rgba(119, 119, 142, 0.1)",
      },
      dataLabels: {
        enabled: false,
      },
      //   colors: ["rgb(21, 58, 84)", "rgb(0, 165, 162)", "rgb(166, 142, 94)"],
      colors: ["rgb(0, 165, 162)"],

      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Today Sell", "Total Sell"],
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: "11px",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        axisBorder: {
          show: true,
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        title: {
          text: "",
          style: {
            color: "#8c9097",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: "11px",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val + " thousands";
          },
        },
      },
    } as ApexOptions,
  });

const zoneData = [
  {
    zone: "WEST-SOUTH",
    franchises: 73,
    employees: 208,
    salary: 2537125.0,
    qsrSales: 0,
    packFoodSales: 0,
    crossSales: 0,
    cash: 0,
    upi: 0,
  },
  {
    zone: "NORTH-EAST",
    franchises: 56,
    employees: 127,
    salary: 1195600.0,
    qsrSales: 0,
    packFoodSales: 0,
    crossSales: 0,
    cash: 0,
    upi: 0,
  },
  {
    zone: "EXPRESSWAY",
    franchises: 18,
    employees: 269,
    salary: 4165142.0,
    qsrSales: 0,
    packFoodSales: 0,
    crossSales: 0,
    cash: 0,
    upi: 0,
  },
  {
    zone: "MAHABAZAR",
    franchises: 17,
    employees: 36,
    salary: 317000.0,
    qsrSales: 0,
    packFoodSales: 0,
    crossSales: 0,
    cash: 0,
    upi: 0,
  },
];

const optionsDonutJS = useMemo(() => {
  const chartData = zoneData.map((zone) => ({
    value: zone.cash + zone.upi,
    name: zone.zone,
  }));

  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center',
      textStyle: {
        color: 'rgb(119, 119, 142)'
      }
    },
    series: [
      {
        name: 'Zone Income',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '17',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: chartData
      }
    ],
    color: ["#23b7e5", "#00a5a2", "#a26cf1", "#f5b849"]
  };
}, [zoneData]);



  useEffect(() => {
    fetchGetProduct();
  }, []);

  const fetchGetProduct = async () => {
    try {
      const response: any = await fetchProducts();
      setTotalProducts(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = () => {

  }

  const totalCash = zoneData.reduce((sum, z) => sum + z.cash, 0);
  const totalUPI = zoneData.reduce((sum, z) => sum + z.upi, 0);
  const totalIncome = totalCash + totalUPI;
  const totalAvg = zoneData.length > 0 ? totalIncome / zoneData.length : 0;


  return {
    totalEmployees,
    totalFranchises,
    totalProducts,
    chartState,
    selectReport,
    zoneData,
    totalCash,
    totalUPI,
    totalIncome,
    totalAvg,
    optionsDonutJS,
    setSelectReport,
    handleSearch
  };
};

export default useSubZoneExpenseVSSale;
