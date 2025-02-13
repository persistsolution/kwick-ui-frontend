import { useEffect, useState } from "react";
import { fetchProducts } from "../../../api/Selling-Products-Api/ProductApi/productApi";
import { ApexOptions } from "apexcharts";

const useIndexPage = () => {
  // const [totalEmployees, setTotalEmployees] = useState<any>(0);
  // const [totalFranchises, setTotalFranchises] = useState<any>(0);
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
  return {
    totalEmployees,
    totalFranchises,
    totalProducts,
    chartState,
  };
};

export default useIndexPage;
