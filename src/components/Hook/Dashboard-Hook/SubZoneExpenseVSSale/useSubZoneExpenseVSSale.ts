import { useEffect, useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { fetchDashboardDataApi } from "../../../api/Dashboard-Api/DashboardAPi";

interface DashboardDataType {
  ZoneId: string;
  ZoneName: string;
  Address: string | null;
  TotalFranchise: number;
  TotalEmployee: number;
  MonthlySalary: number;
  TotalInvoice: number;
  NetAmount: number;
  Cash: number;
  UPI: number;
}



const useSubZoneExpenseVSSale = () => {
  // const [totalEmployees, setTotalEmployees] = useState<any>(0);
  const [selectReport, setSelectReport] = useState<string>("today");
  const [totalEmployees] = useState<any>(0);
  const [totalFranchises] = useState<any>(0);
  const [totalProducts, setTotalProducts] = useState<any>(0);
  const [fromDate, setFromDate] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<DashboardDataType[]>([]);
  const [toDate, setToDate] = useState<string>("");
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

  const fetchDashboardData = async()=>{
  try {
      const response: any = await fetchDashboardDataApi(fromDate , toDate ,selectReport );
      const data = response?.data?.data?.zones || [];
      setDashboardData(data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    let from = "";
    let to = dayjs().format("YYYY-MM-DD");

    switch (selectReport) {
      case "yesterday":
        from = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        to = from;
        break;
      case "week":
        from = dayjs().startOf("week").format("YYYY-MM-DD");
        break;
      case "month":
        from = dayjs().startOf("month").format("YYYY-MM-DD");
        break;
      case "custom":
        // keep current fromDate and toDate
        return;
      default: // today
        from = dayjs().format("YYYY-MM-DD");
        break;
    }

    setFromDate(from);
    setToDate(to);
    fetchDashboardData();
  }, [selectReport]);

const filteredZones = dashboardData.filter((zone) => zone.Cash + zone.UPI > 0);
const optionsDonutJS = {
  labels: filteredZones.map((zone) => zone.ZoneName),
  datasets: [
    {
      label: "Zone Income",
      data: filteredZones.map((zone) => zone.Cash + zone.UPI),
      backgroundColor: [
        "rgb(255, 99, 132)",   // pink
        "rgb(54, 162, 235)",   // blue
        "rgb(255, 205, 86)",   // yellow
        "rgb(75, 192, 192)",   // cyan
        "rgb(153, 102, 255)",  // purple
        "rgb(255, 159, 64)",   // orange
      ],
      hoverOffset: 4,
    },
  ],
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Zone-wise Income Distribution",
      },
    },
  };


  const handleSearch = () => {

  }

  const totalCash = dashboardData.reduce((sum, z) => sum + z.Cash, 0);
  const totalUPI = dashboardData.reduce((sum, z) => sum + z.UPI, 0);
  const totalIncome = totalCash + totalUPI;
  const totalAvg = dashboardData.length > 0 ? totalIncome / dashboardData.length : 0;


  return {
    totalEmployees,
    totalFranchises,
    totalProducts,
    chartState,
    selectReport,
    totalCash,
    totalUPI,
    totalIncome,
    totalAvg,
    optionsDonutJS,
    options,
    fromDate,
    toDate,
    dashboardData,
    fetchDashboardData,
    setFromDate,
    setToDate,
    setSelectReport,
    handleSearch
  };
};

export default useSubZoneExpenseVSSale;
