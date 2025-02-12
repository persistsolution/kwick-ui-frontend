import { FC } from "react";
import ReactApexChart from "react-apexcharts";

interface GraphProps {
  chartOption: any;
  chartSeries: any;
  chartType: "line" | "bar" | "area" | "pie" | "radar" | "scatter";
  chartHeight: number | string;
}

const Graph: FC<GraphProps> = ({
  chartOption,
  chartSeries,
  chartType,
  chartHeight,
}) => {
  return (
    <ReactApexChart
      options={chartOption}
      series={chartSeries}
      type={chartType}
      height={chartHeight}
    />
  );
};

export default Graph;
