import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { Doughnut, Line, Bar, Radar, Scatter, Bubble, Pie, PolarArea } from 'react-chartjs-2';     // react-chartjs
import { Chart, registerables } from 'chart.js'; // chartjs
import ReactEcharts from "echarts-for-react"; //E chart for-react
import * as echarts from 'echarts';
Chart.register(...registerables);

interface spark3 {
    options?: ApexOptions,
    width?: string | number,
    height?: string | number,
    series?: ApexOptions['series'],
    [key: string]: any
    label?: XAxisAnnotations
    endingShape?: string
}

export class OrderAnalytics extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    name: "Online",
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                },
                {
                    name: "Offline",
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                },
                {
                    name: "Marketing",
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
                },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: "bar",
                    height: 350,
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
                colors: ["rgb(21, 58, 84)", "rgb(0, 165, 162)", "rgb(166, 142, 94)"],
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                xaxis: {
                    categories: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
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
                        formatter: function (val) {
                            return "$ " + val + " thousands";
                        },
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>

        );
    }
}

export class Total_Revenue extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    name: "Revenue",
                    data: [55, 52, 55, 52, 55, 55, 58, 58, 53, 55, 54, 55],
                },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 123,
                    type: "area",
                    sparkline: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [1.4],
                    show: true,
                    curve: ["smooth"],
                },
                xaxis: {
                    crosshairs: {
                        show: false,
                    },
                },
                legend: {
                    show: false,
                },
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                markers: {
                    size: 0,
                },
                colors: ["#00a5a2"],
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.4,
                        opacityTo: 0.7,
                        stops: [0, 100],
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={123} />
            </div>

        );
    }
}

export class Ethereum extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    data: [34, 55, 41, 47, 32, 43, 31],
                },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    sparkline: {
                        enabled: true,
                    },
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 3,

                        blur: 3,

                        opacity: 0.3,
                    },
                    type: "line",
                    height: 60,
                    width: 80,
                },
                tooltip: {
                    x: {
                        show: false,
                    },
                    y: {
                        title: {
                            formatter: function (_seriesName) {
                                return "";
                            },
                        },
                    },
                    marker: {
                        show: false,
                    },
                },
                colors: ["#00a5a2"],
                stroke: {
                    width: [1.5],
                    curve: ["smooth"],
                },
                xaxis: {
                    crosshairs: {
                        show: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.9,
                        opacityTo: 0.9,
                        stops: [0, 98],
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={55} width={80} />
            </div>

        );
    }
}

export class Ethereum1 extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    data: [25, 39, 36, 47, 32, 43, 31],
                },
            ],
            options: {
                chart: {
                    sparkline: {
                        enabled: true,
                    },
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 3,
                        blur: 3,
                        opacity: 0.3,
                    },
                    type: "line",
                    height: 60,
                    width: 80,
                },
                tooltip: {
                    x: {
                        show: false,
                    },
                    y: {
                        title: {
                            formatter: function (_seriesName) {
                                return "";
                            },
                        },
                    },
                    marker: {
                        show: false,
                    },
                },
                colors: ["#db555d"],
                stroke: {
                    width: [1.5],
                    curve: ["smooth"],
                },
                xaxis: {
                    crosshairs: {
                        show: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.9,
                        opacityTo: 0.9,
                        stops: [0, 98],
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={55} width={80} />
            </div>

        );
    }
}

export class Donut_update extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [44, 55, 33, 55, 33],
            
            options: {
                labels: ["Accepted", "Rejected", "Dispatched", "Delivered", "Cancelled"],
                chart: {
                    height: 10,
                    type: "donut",
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                show: false,
                            },
                        },
                    },
                ],
                colors: ["#00a5a2c9", "#17b1dfb0", "#f7b725bf", "#44b86cbf", "#be495fbd"],
                legend: {
                    show: true,
                    position: "right"
                },
                stroke: {
                    show: true,
                    width: 0,
                    colors: ["transparent"],
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={135} />
            </div>

        );
    }
}

export class Totla_revenue_widgets extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    name: "Revenue",
                    data: [55, 52, 55, 52, 55, 55, 58, 58, 53, 55, 54, 55],
                },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 123,
                    type: "area",
                    sparkline: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [1.4],
                    show: true,
                    curve: ["smooth"],
                },
                xaxis: {
                    crosshairs: {
                        show: false,
                    },
                },
                legend: {
                    show: false,
                },
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                markers: {
                    size: 0,
                },
                colors: ["#00a5a2"],
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.4,
                        opacityTo: 0.7,
                        stops: [0, 100],
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={123} />
            </div>

        );
    }
}

export class Totla_user_widgets extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    data: [34, 55, 41, 47, 32, 43, 31],
                },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    sparkline: {
                        enabled: true,
                    },
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 3,
                        blur: 3,
                        opacity: 0.3,
                    },
                    type: "line",
                    height: 60,
                    width: 80,
                },
                tooltip: {
                    x: {
                        show: false,
                    },
                    y: {
                        title: {
                            formatter: function (_seriesName) {
                                return "";
                            },
                        },
                    },
                    marker: {
                        show: false,
                    },
                },
                colors: ["#00a5a2"],
                stroke: {
                    width: [1.5],
                    curve: ["smooth"],
                },
                xaxis: {
                    crosshairs: {
                        show: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.9,
                        opacityTo: 0.9,
                        stops: [0, 98],
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={60} width={80} />
            </div>

        );
    }
}

export class Totla_order_widgets extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    data: [25, 39, 36, 47, 32, 43, 31],
                },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    sparkline: {
                        enabled: true,
                    },
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 3,
                        blur: 3,
                        opacity: 0.3,
                    },
                    type: "line",
                    height: 60,
                    width: 80,
                },
                tooltip: {
                    x: {
                        show: false,
                    },
                    y: {
                        title: {
                            formatter: function (_seriesName) {
                                return "";
                            },
                        },
                    },
                    marker: {
                        show: false,
                    },
                },
                colors: ["#db555d"],
                stroke: {
                    width: [1.5],
                    curve: ["smooth"],
                },
                xaxis: {
                    crosshairs: {
                        show: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.9,
                        opacityTo: 0.9,
                        stops: [0, 98],
                    },
                },
            }

        };
    }

    render() {
        return (
            <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={60} width={80} />
            </div>

        );
    }
}

export class Report_widgets extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    data: [17, 22, 28, 23, 15, 40, 14, 22, 37, 47, 39],
                    name: "Revenue",
                },
            ],
            options: {
                chart: {
                    type: "bar",
                    height: 215,
                    toolbar: {
                        show: false,
                    },
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 6,
                        left: 6,
                        blur: 3,
                        color: "#000",
                        opacity: 0.05,
                    },
                },
                plotOptions: {
                    bar: {
                        columnWidth: "20%",
                        borderRadius: 4,
                        horizontal: false,
                        colors: {
                            ranges: [
                                {
                                    from: 41,
                                    to: Infinity,
                                    color: "#6dd6d4",
                                },
                                {
                                    from: 0,
                                    to: 40,
                                    color: "#6dd6d4",
                                },
                            ],
                        },
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                grid: {
                    show: false,
                    borderColor: "transparent",
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                    yaxis: {
                        lines: {
                            show: false,
                        },
                    },
                },
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apl",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                    ],
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        rotate: -90,
                        style: {
                            fontFamily: "Inter, sans-serif",
                        },
                    },
                },
                yaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                    },
                },
            }

        };
    }

    render() {
        return (
            <div className='flot-background'>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={215} />
            </div>

        );
    }
}

// **************************************************************
// **************************************************************
// **************************************************************

// Chart JS Data

const LineData = {
    type: 'line',
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [0, 10, 5, 2, 20, 30, 45],
            label: 'My First dataset',
            backgroundColor: 'rgb(0, 165, 162)',
            borderColor: 'rgb(0, 165, 162)',
        },
    ],
};

const LineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
        },
    },
    cutout: 90,
};
export function LineChartJS() {
    return <Line width={741} height={300} options={LineOptions} data={LineData} />;
}

// *************************************************************************

const BarData = {
    type: 'line',
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(132, 90, 223, 0.2)',
                'rgba(35, 183, 229, 0.2)',
                'rgba(245, 184, 73, 0.2)',
                'rgba(73, 182, 245, 0.2)',
                'rgba(230, 83, 60, 0.2)',
                'rgba(38, 191, 148, 0.2)',
                'rgba(35, 35, 35, 0.2)'
            ],
            borderColor: [
                'rgb(0, 165, 162)',
                'rgb(35, 183, 229)',
                'rgb(245, 184, 73)',
                'rgb(73, 182, 245)',
                'rgb(230, 83, 60)',
                'rgb(38, 191, 148)',
                'rgb(35, 35, 35)'
            ],
            borderWidth: 1
        },
    ],
};

const BarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: true,
        },
    },
    cutout: 90,
};
export function BarChartJS() {
    return <Bar width={741} height={300} options={BarOptions} data={BarData} />;
}

// *************************************************************************

const PieData = {
    type: 'pie',
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(0, 165, 162)',
            'rgb(35, 183, 229)',
            'rgb(245, 184, 73)'
        ],
        hoverOffset: 4,
        borderColor: 'rgba(142, 156, 173,0.1)'
    }]
};

const PieOptions = {
    responsive: true,
    maintainAspectRatio: false
};
export function ChartPie() {
    return <Pie width={741} height={300} options={PieOptions} data={PieData} />;
}

// *************************************************************************

const DoughnutData = {
    type: 'doughnut',
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(0, 165, 162)',
            'rgb(35, 183, 229)',
            'rgb(245, 184, 73)'
        ],
        hoverOffset: 4,
        borderColor: 'rgba(142, 156, 173,0.1)'
    }]
};

const DoughnutOptions = {
    responsive: true,
    maintainAspectRatio: false
};

export function DoughnutChart() {
    return <Doughnut width={741} height={300} options={DoughnutOptions} data={DoughnutData} />;
}

// *************************************************************************

const MixedChartData: any = {
    type: 'scatter',
    labels: ['January', 'February', 'March', 'April'],
    datasets: [{
        type: 'bar',
        label: 'Bar Dataset',
        data: [10, 20, 30, 40],
        borderColor: 'rgb(0, 165, 162)',
        backgroundColor: 'rgba(132, 90, 223, 0.2)'
    }, {
        type: 'line',
        label: 'Line Dataset',
        data: [50, 50, 50, 50],
        fill: false,
        borderColor: 'rgb(35, 183, 229)'
    }]
};

const MixedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
export function MixedChartJS() {
    return <Scatter width={741} height={300} options={MixedChartOptions} data={MixedChartData} />;
}

// *************************************************************************

export const polardata = {
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
    ],
    datasets: [
        {
            label: '# of Votes',
            data: [18, 15, 9, 6, 19],
            backgroundColor: [
                'rgb(0, 165, 162)',
                'rgb(75, 192, 192)',
                'rgb(245, 184, 73)',
                'rgb(201, 203, 207)',
                'rgb(35, 183, 229)'
            ],
            hoverBackgroundColor: ['#6c5ffc', '#05c3fb', '#09ad95', '#1170e4', '#e82646'],
            borderColor: 'transparent',
            borderWidth: 1,
        },
    ],
};
export function PolarChart() {
    return <PolarArea className='mx-auto' data={polardata} width={100} height='auto' />;
}

// *************************************************************************

const RadarData = {
    type: 'radar',
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(132, 90, 223, 0.2)',
            borderColor: 'rgb(0, 165, 162)',
            pointBackgroundColor: 'rgb(0, 165, 162)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(0, 165, 162)'
        }, {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: 'rgba(35, 183, 229, 0.2)',
            borderColor: 'rgb(35, 183, 229)',
            pointBackgroundColor: 'rgb(35, 183, 229)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(35, 183, 229)'
        }]
};

const RadarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        line: {
            borderWidth: 3
        }
    }
};

export function RadarChartJS() {
    return <Radar width={741} height={300} options={RadarOptions} data={RadarData} />;
}

// *************************************************************************

const ScatterData = {
    type: 'scatter',
    datasets: [{
        label: 'Scatter Dataset',
        data: [{
            x: -10,
            y: 0
        }, {
            x: 0,
            y: 10
        }, {
            x: 10,
            y: 5
        }, {
            x: 0.5,
            y: 5.5
        }],
        backgroundColor: 'rgb(0, 165, 162)'
    }],
};

const ScatterOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            type: 'linear',
            position: 'bottom'
        }
    }
};

export function ScatterChartJS() {
    return <Scatter width={741} height={300} options={ScatterOptions} data={ScatterData} />;
}

// *************************************************************************

const BubbleData = {
    type: 'bubble',
    datasets: [{
        label: 'First Dataset',
        data: [{
            x: 20,
            y: 30,
            r: 15
        }, {
            x: 40,
            y: 10,
            r: 10
        }],
        backgroundColor: 'rgb(0, 165, 162)'
    }]
};

const BubbleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

export function BubbleChart() {
    return <Bubble width={741} height={300} options={BubbleOptions} data={BubbleData} />;
}

// **************************************************************
// **************************************************************
// **************************************************************

// ApexChart JS Data

export class LineChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 320,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                colors: ["#00a5a2"],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    width: 3,
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            },

        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="line" />
            </div>
        )
    }
};

// *************************************************************************

let AreaPrices = [8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9340.85]

let AreaDate = ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017", "29 Nov 2017", "30 Nov 2017", "01 Dec 2017", "04 Dec 2017", "05 Dec 2017", "06 Dec 2017", "07 Dec 2017", "08 Dec 2017",]

export class AreaChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [{
                name: "STOCK ABC",
                data: AreaPrices
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'area',
                    height: 320,
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                subtitle: {
                    text: 'Price Movements',
                    align: 'left',
                    style: {
                        fontSize: '11px',
                        fontWeight: 'normal',
                        color: '#8c9097'
                    },
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                labels: AreaDate,
                title: {
                    text: 'Fundamental Analysis of Stocks',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
                colors: ["#00a5a2"],
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    opposite: true,
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                legend: {
                    horizontalAlign: 'left'
                }
            },

        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="area" />
            </div>
        )
    }
};

// *************************************************************************

export class ColumnChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'bar',
                    height: 320
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                    },
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#00a5a2", "#0dc9c5", "#f43f63"],
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                legend: {
                    show: true,
                    labels: {
                        colors: '#74767c',
                    },
                },
                xaxis: {
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    title: {
                        style: {
                            color: "#8c9097",
                        }
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
            },

        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="bar" />
            </div>
        )
    }
};

// *************************************************************************

export class BarChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [{
                data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'bar',
                    height: 320
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                colors: ["#00a5a2"],
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                        'United States', 'China', 'Germany'
                    ],
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            },

        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="bar" />
            </div>
        )
    }
};

// *************************************************************************

export class LineAndColumnChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [{
                name: 'Website Blog',
                type: 'column',
                data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
            }, {
                name: 'Social Media',
                type: 'line',
                data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 320,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                title: {
                    text: 'Traffic Sources',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: "#8c9097",
                    },
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                legend: {
                    show: true,
                    labels: {
                        colors: '#74767c',
                    },
                },
                colors: ["#00a5a2", "#0dc9c5"],
                labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: [{
                    title: {
                        style: {
                            color: "#8c9097",
                        }
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }, {
                    opposite: true,
                    title: {
                        style: {
                            color: "#8c9097",
                        }
                    }
                }]
            }
        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="bar" />
            </div>
        )
    }
};

// *************************************************************************

export class TimelineBasic extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [
                {
                    data: [
                        {
                            x: 'Code',
                            y: [
                                new Date('2019-03-02').getTime(),
                                new Date('2019-03-04').getTime()
                            ]
                        },
                        {
                            x: 'Test',
                            y: [
                                new Date('2019-03-04').getTime(),
                                new Date('2019-03-08').getTime()
                            ]
                        },
                        {
                            x: 'Validation',
                            y: [
                                new Date('2019-03-08').getTime(),
                                new Date('2019-03-12').getTime()
                            ]
                        },
                        {
                            x: 'Deployment',
                            y: [
                                new Date('2019-03-12').getTime(),
                                new Date('2019-03-18').getTime()
                            ]
                        }
                    ]
                }
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 320,
                    type: 'rangeBar'
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                colors: ["#00a5a2"],
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            }
        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="rangeBar" />
            </div>
        )
    }
};

// *************************************************************************

export class CandleStick extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {

            series: [{
                data: [{
                    x: new Date(1538778600000),
                    y: [6629.81, 6650.5, 6623.04, 6633.33]
                },
                {
                    x: new Date(1538780400000),
                    y: [6632.01, 6643.59, 6620, 6630.11]
                },
                {
                    x: new Date(1538782200000),
                    y: [6630.71, 6648.95, 6623.34, 6635.65]
                },
                {
                    x: new Date(1538784000000),
                    y: [6635.65, 6651, 6629.67, 6638.24]
                },
                {
                    x: new Date(1538785800000),
                    y: [6638.24, 6640, 6620, 6624.47]
                },
                {
                    x: new Date(1538787600000),
                    y: [6624.53, 6636.03, 6621.68, 6624.31]
                },
                {
                    x: new Date(1538789400000),
                    y: [6624.61, 6632.2, 6617, 6626.02]
                },
                {
                    x: new Date(1538791200000),
                    y: [6627, 6627.62, 6584.22, 6603.02]
                },
                {
                    x: new Date(1538793000000),
                    y: [6605, 6608.03, 6598.95, 6604.01]
                },
                {
                    x: new Date(1538794800000),
                    y: [6604.5, 6614.4, 6602.26, 6608.02]
                },
                {
                    x: new Date(1538796600000),
                    y: [6608.02, 6610.68, 6601.99, 6608.91]
                },
                {
                    x: new Date(1538798400000),
                    y: [6608.91, 6618.99, 6608.01, 6612]
                },
                {
                    x: new Date(1538800200000),
                    y: [6612, 6615.13, 6605.09, 6612]
                },
                {
                    x: new Date(1538802000000),
                    y: [6612, 6624.12, 6608.43, 6622.95]
                },
                {
                    x: new Date(1538803800000),
                    y: [6623.91, 6623.91, 6615, 6615.67]
                },
                {
                    x: new Date(1538805600000),
                    y: [6618.69, 6618.74, 6610, 6610.4]
                },
                {
                    x: new Date(1538807400000),
                    y: [6611, 6622.78, 6610.4, 6614.9]
                },
                {
                    x: new Date(1538809200000),
                    y: [6614.9, 6626.2, 6613.33, 6623.45]
                },
                {
                    x: new Date(1538811000000),
                    y: [6623.48, 6627, 6618.38, 6620.35]
                },
                {
                    x: new Date(1538812800000),
                    y: [6619.43, 6620.35, 6610.05, 6615.53]
                },
                {
                    x: new Date(1538814600000),
                    y: [6615.53, 6617.93, 6610, 6615.19]
                },
                {
                    x: new Date(1538816400000),
                    y: [6615.19, 6621.6, 6608.2, 6620]
                },
                {
                    x: new Date(1538818200000),
                    y: [6619.54, 6625.17, 6614.15, 6620]
                },
                {
                    x: new Date(1538820000000),
                    y: [6620.33, 6634.15, 6617.24, 6624.61]
                },
                {
                    x: new Date(1538821800000),
                    y: [6625.95, 6626, 6611.66, 6617.58]
                },
                {
                    x: new Date(1538823600000),
                    y: [6619, 6625.97, 6595.27, 6598.86]
                },
                {
                    x: new Date(1538825400000),
                    y: [6598.86, 6598.88, 6570, 6587.16]
                },
                {
                    x: new Date(1538827200000),
                    y: [6588.86, 6600, 6580, 6593.4]
                },
                {
                    x: new Date(1538829000000),
                    y: [6593.99, 6598.89, 6585, 6587.81]
                },
                {
                    x: new Date(1538830800000),
                    y: [6587.81, 6592.73, 6567.14, 6578]
                },
                {
                    x: new Date(1538832600000),
                    y: [6578.35, 6581.72, 6567.39, 6579]
                },
                {
                    x: new Date(1538834400000),
                    y: [6579.38, 6580.92, 6566.77, 6575.96]
                },
                {
                    x: new Date(1538836200000),
                    y: [6575.96, 6589, 6571.77, 6588.92]
                },
                {
                    x: new Date(1538838000000),
                    y: [6588.92, 6594, 6577.55, 6589.22]
                },
                {
                    x: new Date(1538839800000),
                    y: [6589.3, 6598.89, 6589.1, 6596.08]
                },
                {
                    x: new Date(1538841600000),
                    y: [6597.5, 6600, 6588.39, 6596.25]
                },
                {
                    x: new Date(1538843400000),
                    y: [6598.03, 6600, 6588.73, 6595.97]
                },
                {
                    x: new Date(1538845200000),
                    y: [6595.97, 6602.01, 6588.17, 6602]
                },
                {
                    x: new Date(1538847000000),
                    y: [6602, 6607, 6596.51, 6599.95]
                },
                {
                    x: new Date(1538848800000),
                    y: [6600.63, 6601.21, 6590.39, 6591.02]
                },
                {
                    x: new Date(1538850600000),
                    y: [6591.02, 6603.08, 6591, 6591]
                },
                {
                    x: new Date(1538852400000),
                    y: [6591, 6601.32, 6585, 6592]
                },
                {
                    x: new Date(1538854200000),
                    y: [6593.13, 6596.01, 6590, 6593.34]
                },
                {
                    x: new Date(1538856000000),
                    y: [6593.34, 6604.76, 6582.63, 6593.86]
                },
                {
                    x: new Date(1538857800000),
                    y: [6593.86, 6604.28, 6586.57, 6600.01]
                },
                {
                    x: new Date(1538859600000),
                    y: [6601.81, 6603.21, 6592.78, 6596.25]
                },
                {
                    x: new Date(1538861400000),
                    y: [6596.25, 6604.2, 6590, 6602.99]
                },
                {
                    x: new Date(1538863200000),
                    y: [6602.99, 6606, 6584.99, 6587.81]
                },
                {
                    x: new Date(1538865000000),
                    y: [6587.81, 6595, 6583.27, 6591.96]
                },
                {
                    x: new Date(1538866800000),
                    y: [6591.97, 6596.07, 6585, 6588.39]
                },
                {
                    x: new Date(1538868600000),
                    y: [6587.6, 6598.21, 6587.6, 6594.27]
                },
                {
                    x: new Date(1538870400000),
                    y: [6596.44, 6601, 6590, 6596.55]
                },
                {
                    x: new Date(1538872200000),
                    y: [6598.91, 6605, 6596.61, 6600.02]
                },
                {
                    x: new Date(1538874000000),
                    y: [6600.55, 6605, 6589.14, 6593.01]
                },
                {
                    x: new Date(1538875800000),
                    y: [6593.15, 6605, 6592, 6603.06]
                },
                {
                    x: new Date(1538877600000),
                    y: [6603.07, 6604.5, 6599.09, 6603.89]
                },
                {
                    x: new Date(1538879400000),
                    y: [6604.44, 6604.44, 6600, 6603.5]
                },
                {
                    x: new Date(1538881200000),
                    y: [6603.5, 6603.99, 6597.5, 6603.86]
                },
                {
                    x: new Date(1538883000000),
                    y: [6603.85, 6605, 6600, 6604.07]
                },
                {
                    x: new Date(1538884800000),
                    y: [6604.98, 6606, 6604.07, 6606]
                },
                ]
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left',
                    style: {
                        color: "#8c9097",
                        fontSize: '13px',
                        fontWeight: 'bold',
                    }
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: '#00a5a2',
                            downward: '#0dc9c5'
                        }
                    }
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            }
        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="candlestick" />
            </div>
        )
    }
};

// *************************************************************************

export class Boxplot extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    type: 'boxPlot',
                    data: [
                        {
                            x: "Jan 2015",
                            y: [54, 66, 69, 75, 88],
                        },
                        {
                            x: "Jan 2016",
                            y: [43, 65, 69, 76, 81],
                        },
                        {
                            x: "Jan 2017",
                            y: [31, 39, 45, 51, 59],
                        },
                        {
                            x: "Jan 2018",
                            y: [39, 46, 55, 65, 71],
                        },
                        {
                            x: "Jan 2019",
                            y: [29, 31, 35, 39, 44],
                        },
                        {
                            x: "Jan 2020",
                            y: [41, 49, 58, 61, 67],
                        },
                        {
                            x: "Jan 2021",
                            y: [54, 59, 66, 71, 88],
                        },
                    ]
                }
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'boxPlot',
                    height: 350
                },
                title: {
                    text: 'Basic BoxPlot Chart',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                plotOptions: {
                    boxPlot: {
                        colors: {
                            upper: '#00a5a2',
                            lower: '#0dc9c5'
                        }
                    }
                },
                xaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            }
        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="boxPlot" />
            </div>
        )
    }
};

// *************************************************************************

function generateData(baseval: any, count: any, yrange: any) {
    let i = 0;
    let series = [];
    while (i < count) {
        const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}

export class Bubble3D extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [{
                name: 'Product1',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product2',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product3',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product4',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 320,
                    type: 'bubble',
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                },
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                colors: ["#00a5a2", "#0dc9c5", "#f43f63"],
                title: {
                    text: '3D Bubble Chart',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
                legend: {
                    show: true,
                    position: 'top',
                    labels: {
                        colors: '#74767c',
                    },
                },
                xaxis: {
                    tickAmount: 12,
                    type: 'datetime',
                    labels: {
                        rotate: 0,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    max: 70,
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                },
                theme: {
                    palette: 'palette2'
                }
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="bubble" />
            </div>
        )
    }
};
// *************************************************************************

function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
    let i = 0;
    let series = [];
    while (i < count) {
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([baseval, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

export class ScatterChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [{
                name: 'TEAM 1',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'TEAM 2',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'TEAM 3',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'TEAM 4',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'TEAM 5',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
                    min: 10,
                    max: 60
                })
            },
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 320,
                    type: 'scatter',
                    zoom: {
                        type: 'xy'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#00a5a2", "#0dc9c5", "#f43f63", "#b95d4b", "#5e9aa6"],
                grid: {
                    borderColor: 'rgba(119, 119, 142, 0.05)',
                },
                legend: {
                    show: true,
                    position: 'top',
                    labels: {
                        colors: '#8c9097',
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    max: 70,
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="scatter" />
            </div>
        )
    }
};

// *************************************************************************

function generateData1(count: any, yrange: any) {
    let i = 0;
    let series = [];
    while (i < count) {
        const x = 'w' + (i + 1).toString();
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}

export class BasicHeatMap extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [{
                name: 'Metric1',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric2',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric3',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric4',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric5',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric6',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric7',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric8',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'Metric9',
                data: generateData1(18, {
                    min: 0,
                    max: 90
                })
            }
            ],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 350,
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#00a5a2"],
                grid: {
                    borderColor: "rgba(119, 119, 142, 0.05)",
                },
                title: {
                    text: 'HeatMap Chart (Single color)',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
                xaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    }
                }
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="heatmap" />
            </div>
        )
    }
};

// *************************************************************************

export class TreeMap extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [
                {
                    data: [
                        {
                            x: 'New Delhi',
                            y: 218
                        },
                        {
                            x: 'Kolkata',
                            y: 149
                        },
                        {
                            x: 'Mumbai',
                            y: 184
                        },
                        {
                            x: 'Ahmedabad',
                            y: 55
                        },
                        {
                            x: 'Bangaluru',
                            y: 84
                        },
                        {
                            x: 'Pune',
                            y: 31
                        },
                        {
                            x: 'Chennai',
                            y: 70
                        },
                        {
                            x: 'Jaipur',
                            y: 30
                        },
                        {
                            x: 'Surat',
                            y: 44
                        },
                        {
                            x: 'Hyderabad',
                            y: 68
                        },
                        {
                            x: 'Lucknow',
                            y: 28
                        },
                        {
                            x: 'Indore',
                            y: 19
                        },
                        {
                            x: 'Kanpur',
                            y: 29
                        }
                    ]
                }
            ],
            options: {
                legend: {
                    show: false
                },
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 350,
                    type: 'treemap'
                },
                colors: ["#00a5a2"],
                title: {
                    text: 'Basic Treemap',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="treemap" />
            </div>
        )
    }
};

// *************************************************************************

export class PieChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [44, 55, 13, 43, 22],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    width: 350,
                    type: 'pie',
                },
                colors: ["#00a5a2", "#0dc9c5", "#f43f63", "#5e9aa6", "#b95d4b"],
                labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
                legend: {
                    position: "bottom",
                    labels: {
                        colors: '#74767c',
                    },
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                    }
                }],
                dataLabels: {
                    dropShadow: {
                        enabled: false
                    }
                },
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="pie" />
            </div>
        )
    }
};

// *************************************************************************

export class DonutChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [44, 55, 41, 17, 15],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'donut',
                    height: 290
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: '#74767c',
                    },
                },
                colors: ["#00a5a2", "#0dc9c5", "#f43f63", "#5e9aa6", "#b95d4b"],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 250
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                dataLabels: {
                    dropShadow: {
                        enabled: false
                    }
                },
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="donut" />
            </div>
        )
    }
};

// *************************************************************************

export class RadialChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [70],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 350,
                    type: 'radialBar',
                },
                colors: ["#00a5a2"],
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                        }
                    },
                },
                labels: ['Cricket'],
                responsive: [{
                    breakpoint: 350,
                    options: {
                        chart: {
                            height: 300,
                        },
                    }
                }],
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="radialBar" />
            </div>
        )
    }
};

// *************************************************************************

export class StrokedCircularGauge extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [67],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                },
                colors: ["#00a5a2"],
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: '16px',
                                color: undefined,
                                offsetY: 120
                            },
                            value: {
                                offsetY: 76,
                                fontSize: '22px',
                                color: undefined,
                                formatter: function (val) {
                                    return val + "%";
                                }
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                    },
                },
                stroke: {
                    dashArray: 4
                },
                labels: ['Median Ratio'],
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="radialBar" />
            </div>
        )
    }
};

// *************************************************************************

export class RaderChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [{
                name: 'Series 1',
                data: [80, 50, 30, 40, 100, 20],
            }, {
                name: 'Series 2',
                data: [20, 30, 40, 80, 20, 80],
            }, {
                name: 'Series 3',
                data: [44, 76, 78, 13, 43, 10],
            }],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    height: 350,
                    type: 'radar',
                    dropShadow: {
                        enabled: true,
                        blur: 1,
                        left: 1,
                        top: 1
                    }
                },
                title: {
                    text: 'Radar Chart - Multi Series',
                    align: 'left',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#8c9097'
                    },
                },
                legend: {
                    labels: {
                        colors: '#74767c',
                    },
                },
                colors: ["#00a5a2", "#0dc9c5", "#f43f63"],
                stroke: {
                    width: 2
                },
                fill: {
                    opacity: 0.1
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    categories: ['2011', '2012', '2013', '2014', '2015', '2016']
                }
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart height={320} options={this.state.options} series={this.state.series} type="radar" />
            </div>
        )
    }
};

// *************************************************************************

export class PolarAreaChart extends Component<{}, spark3> {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
            options: {
                chart: {
                    events: {
                        mounted: (chart: any) => {
                            chart.windowResizeHandler();
                        }
                    },
                    type: 'polarArea',
                    width: 400
                },
                stroke: {
                    colors: ['#fff']
                },
                fill: {
                    opacity: 0.8
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: '#74767c',
                    },
                },
                colors: ["#00a5a2",
                    "#0dc9c5",
                    "#f43f63",
                    "#5e9aa6",
                    "#b95d4b",
                    "#76a65e",
                    "#a65e76",
                    "#5e9aa6",
                    "#5b67c7"],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        };
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart className="flex justify-center" height={370} options={this.state.options} series={this.state.series} type="polarArea" />
            </div>
        )
    }
};

// **************************************************************
// **************************************************************
// **************************************************************

// E-chart Data

export function LineEChart() {
    const options = {
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "10%",
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          color: "#00a5a2"
        }
      ],
      
  
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };


// *************************************************************************

  export function SmoothLineEChart() {
    const options = {
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "10%",
        containLabel: true
      },
      splitLine: {
        lineStyle: {
            color: "rgba(119, 119, 142, 0.5)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function AreaEChart() {
    const options = {
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "10%",
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function StackedLineEChart() {
  const options = {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "10%",
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      textStyle: {
        color: 'rgb(119, 119, 142)'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    splitLine: {
      lineStyle: {
        color: "rgba(142, 156, 173,0.1)"
      }
    },
    axisLine: {
      lineStyle: {
        color: "#8c9097"
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
    color: ["#00a5a2", "#23b7e5", "#f5b849", "#49b6f5", "#e6533c"]
  };

  return (<ReactEcharts className="chartsh" option={options} />);
};

// *************************************************************************

export function StackedAreaEChart() {
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
      ],
      yAxis: [
        {
          type: 'value',
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ],
      color: ["#00a5a2", "#23b7e5", "#f5b849", "#49b6f5", "#e6533c"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function StepLineEChart() {
    const options = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Step Start', 'Step Middle', 'Step End'],
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Step Start',
          type: 'line',
          step: 'start',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Step Middle',
          type: 'line',
          step: 'middle',
          data: [220, 282, 201, 234, 290, 430, 410]
        },
        {
          name: 'Step End',
          type: 'line',
          step: 'end',
          data: [450, 432, 401, 454, 590, 530, 510]
        }
      ],
      color: ["#00a5a2", "#23b7e5", "#f5b849", "#49b6f5", "#e6533c"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function BarEChart() {
    const options = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
  
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function BarWithBackgroundEChart() {
    const options = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function StyleForASingleBarEChart() {
    const options = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            120,
            {
              value: 200,
              itemStyle: {
                color: '#23b7e5'
              }
            },
            150,
            80,
            70,
            110,
            130
          ],
          type: 'bar'
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function WaterFallEChart() {
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params: any[]) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'category',
        data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
          name: 'Life Cost',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'inside'
          },
          data: [2900, 1200, 300, 200, 900, 300]
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function BarWithNegativeValuesEChart() {
    const labelRight = {
      position: 'right'
    };
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8c9097"
        }
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        axisLabel: { show: false },
        axisTick: { show: false },
        data: [
          'ten',
          'nine',
          'eight',
          'seven',
          'six',
          'five',
          'four',
          'three',
          'two',
          'one'
        ],
      },
      series: [
        {
          name: 'Cost',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            formatter: '{b}'
          },
          data: [
            { value: -0.07, label: labelRight },
            { value: -0.09, label: labelRight },
            0.2,
            0.44,
            { value: -0.23, label: labelRight },
            0.08,
            { value: -0.17, label: labelRight },
            0.47,
            { value: -0.36, label: labelRight },
            0.18
          ]
        }
      ],
      color: "#00a5a2"
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function HorizontalBarEChart() {

    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
        axisLine: {
          lineStyle: {
            color: "#8c9097"
          }
        }
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
      ],
      color: ["#00a5a2", "#23b7e5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function HorizontalStackedBarEChart() {

    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      splitLine: {
        lineStyle: {
          color: "rgba(142, 156, 173,0.1)"
        }
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          lineStyle: {
            color: "#8c9097"
          }
        }
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ],
      color: ["#00a5a2", "#23b7e5", "#f5b849", "#e6533c", "#49b6f5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function PieEChart() {

    const options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      color: ["#00a5a2", "#23b7e5", "#f5b849", "#e6533c", "#49b6f5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function DoughnutEChart() {

    const options = {
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
          name: 'Access From',
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
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ],
      color: ["#00a5a2", "#23b7e5", "#f5b849", "#e6533c", "#49b6f5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function RadarEChart() {
    const options = {
      legend: {
        data: ['Allocated Budget', 'Actual Spending'],
        left: '0%',
        top: '0%',
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      radar: {
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ],
      color: ["#00a5a2", "#23b7e5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function HeatmapEChart() {

    const options = {
      title: {
        top: 30,
        left: 'center',
        text: 'Daily Step Count',
        textStyle: {
            color: 'rgba(119, 119, 142, 0.5)' // Title text color
        }
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
        inRange: {
            color: ['#00a5a2', '#23b7e5'] // Specify your desired color range
        }
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2016',
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      },
      itemStyle: {
        borderWidth: 0.5
    },
    yearLabel: { show: false },
    dayLabel: {
        color: 'rgba(119, 119, 142, 0.5)' // Change day label color
    },
    monthLabel: {
        color: 'rgba(119, 119, 142, 0.5)' // Change month label color
    },
    splitLine: {
        lineStyle: {
            color: 'rgba(119, 119, 142, 0.1)' // Change grid line color
        }
    },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: ('2016'),
        itemStyle: {
            color: 'rgba(119, 119, 142, 0.5)' // Heatmap item color
        }
      }
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function TreemapEChart() {

    const options = {
      series: [
        {
          type: 'treemap',
          data: [
            {
              name: 'nodeA',
              value: 10,
              children: [
                {
                  name: 'nodeAa',
                  value: 4
                },
                {
                  name: 'nodeAb',
                  value: 6
                }
              ]
            },
            {
              name: 'nodeB',
              value: 20,
              children: [
                {
                  name: 'nodeBa',
                  value: 20,
                  children: [
                    {
                      name: 'nodeBa1',
                      value: 20
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      color: ["#00a5a2", "#23b7e5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function FunnelEChart() {

    const options = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'],
        textStyle: {
          color: 'rgb(119, 119, 142)'
        }
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' }
          ]
        }
      ],
      color: ["#00a5a2", "#23b7e5", "#f5b849", "#e6533c", "#49b6f5"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function BasicGaugeEChart() {

    const options = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ],
      color: ["#00a5a2"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function SimpleGraphEChart() {

    const options = {
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 50,
          roam: true,
          label: {
            show: true
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20
          },
          data: [
            {
              name: 'Node 1',
              x: 300,
              y: 300
            },
            {
              name: 'Node 2',
              x: 800,
              y: 300
            },
            {
              name: 'Node 3',
              x: 550,
              y: 100
            },
            {
              name: 'Node 4',
              x: 550,
              y: 500
            }
          ],
          links: [
            {
              source: 0,
              target: 1,
              symbolSize: [5, 20],
              label: {
                show: true
              },
              lineStyle: {
                width: 5,
                curveness: 0.2
              }
            },
            {
              source: 'Node 2',
              target: 'Node 1',
              label: {
                show: true
              },
              lineStyle: {
                curveness: 0.2
              }
            },
            {
              source: 'Node 1',
              target: 'Node 3'
            },
            {
              source: 'Node 2',
              target: 'Node 3'
            },
            {
              source: 'Node 2',
              target: 'Node 4'
            },
            {
              source: 'Node 1',
              target: 'Node 4'
            }
          ],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      ],
      color:["#00a5a2"]
    };
  
    return (<ReactEcharts className="chartsh" option={options} />);
  };

// *************************************************************************

  export function Candlestickechart() {
    const option = {
        grid: {
            left: '5%',
            right: '0%',
            bottom: '10%',
            top: '10%'
        },
        xAxis: {
            data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: "rgba(142, 156, 173,0.1)"
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: "#8c9097"
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(142, 156, 173,0.1)"
                }
            },
        },
        series: [
            {
                type: 'candlestick',
                data: [
                    [20, 34, 10, 38],
                    [40, 35, 30, 50],
                    [31, 38, 33, 44],
                    [38, 15, 5, 42]
                ],
                itemStyle: {
                    normal: {
                        color: "#00a5a2",
                        color0: "#23b7e5",
                        borderColor: "#00a5a2",
                        borderColor0: "#23b7e5",
                    }
                }
            }
        ]
    };

    return (<ReactEcharts option={option} />);
}

// *************************************************************************

const data = [
    [
        [28604, 77, 17096869, 'Australia', 1990],
        [31163, 77.4, 27662440, 'Canada', 1990],
        [1516, 68, 1154605773, 'China', 1990],
        [13670, 74.7, 10582082, 'Cuba', 1990],
        [28599, 75, 4986705, 'Finland', 1990],
        [29476, 77.1, 56943299, 'France', 1990],
        [31476, 75.4, 78958237, 'Germany', 1990],
        [28666, 78.1, 254830, 'Iceland', 1990],
        [1777, 57.7, 870601776, 'India', 1990],
        [29550, 79.1, 122249285, 'Japan', 1990],
        [2076, 67.9, 20194354, 'North Korea', 1990],
        [12087, 72, 42972254, 'South Korea', 1990],
        [24021, 75.4, 3397534, 'New Zealand', 1990],
        [43296, 76.8, 4240375, 'Norway', 1990],
        [10088, 70.8, 38195258, 'Poland', 1990],
        [19349, 69.6, 147568552, 'Russia', 1990],
        [10670, 67.3, 53994605, 'Turkey', 1990],
        [26424, 75.7, 57110117, 'United Kingdom', 1990],
        [37062, 75.4, 252847810, 'United States', 1990]
    ],
    [
        [44056, 81.8, 23968973, 'Australia', 2015],
        [43294, 81.7, 35939927, 'Canada', 2015],
        [13334, 76.9, 1376048943, 'China', 2015],
        [21291, 78.5, 11389562, 'Cuba', 2015],
        [38923, 80.8, 5503457, 'Finland', 2015],
        [37599, 81.9, 64395345, 'France', 2015],
        [44053, 81.1, 80688545, 'Germany', 2015],
        [42182, 82.8, 329425, 'Iceland', 2015],
        [5903, 66.8, 1311050527, 'India', 2015],
        [36162, 83.5, 126573481, 'Japan', 2015],
        [1390, 71.4, 25155317, 'North Korea', 2015],
        [34644, 80.7, 50293439, 'South Korea', 2015],
        [34186, 80.6, 4528526, 'New Zealand', 2015],
        [64304, 81.6, 5210967, 'Norway', 2015],
        [24787, 77.3, 38611794, 'Poland', 2015],
        [23038, 73.13, 143456918, 'Russia', 2015],
        [19360, 76.5, 78665830, 'Turkey', 2015],
        [38225, 81.4, 64715810, 'United Kingdom', 2015],
        [53354, 79.1, 321773631, 'United States', 2015]
    ]
];

export function Bubblechart() {
    const option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
            {
                offset: 0,
                color: 'transparent'
            },
            {
                offset: 1,
                color: 'transparent'
            }
        ]),
        legend: {
            right: '10%',
            top: '3%',
            data: ['1990', '2015'],
            textStyle: {
                color: '#777'
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '10%'
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: "rgba(142, 156, 173,0.1)"
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: "#8c9097"
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(142, 156, 173,0.1)"
                }
            },
            scale: true
        },
        series: [
            {
                name: '1990',
                data: data[0],
                type: 'scatter',
                symbolSize: function (data: any) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param: any) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(94, 154, 166)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(94, 154, 166)'
                        }
                    ])
                }
            },
            {
                name: '2015',
                data: data[1],
                type: 'scatter',
                symbolSize: function (data: any) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param: any) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(185, 93, 75)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(185, 93, 75)'
                        }
                    ])
                }
            }
        ],
        color: ["#49b6f5", "#e6533c"]
    };

    return (<ReactEcharts option={option} />);
}

// *************************************************************************

export function Basicscatter() {
    const option = {
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: "rgba(142, 156, 173,0.1)"
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: "#8c9097"
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(142, 156, 173,0.1)"
                }
            }
        },
        series: [
            {
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [13.0, 7.58],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [14.0, 7.66],
                    [13.4, 6.81],
                    [10.0, 6.33],
                    [14.0, 8.96],
                    [12.5, 6.82],
                    [9.15, 7.2],
                    [11.5, 7.2],
                    [3.03, 4.23],
                    [12.2, 7.83],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68]
                ],
                type: 'scatter'
            }
        ],
        color: ["#845adf"]
    };

    return (<ReactEcharts option={option} />);
}