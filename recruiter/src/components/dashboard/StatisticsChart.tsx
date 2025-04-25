import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { SERVICE_URL } from "../../api/config";
import Loader from "../ui/loader/Loader";

export default function StatisticsChart() {
  const [tab, setTab] = useState<"monthly" | "quarterly" | "annually">(
    "monthly"
  );
  const [chartData, setChartData] = useState<any>(null);
  const [hideAnnuallyTab, setHideAnnuallyTab] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      try {
        const response = await fetch(`${SERVICE_URL}/statistics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setChartData(data.metadata);

        if (data.metadata.annually.categories.length <= 1) {
          setHideAnnuallyTab(true);
        }
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      }
    };

    fetchStatistics();
  }, []);

  if (!chartData) {
    return (
      <div className="flex justify-center items-center h-[310px] bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
        <Loader />
      </div>
    );
  }

  const currentData = chartData[tab];

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy" },
    },
    xaxis: {
      type: "category",
      categories: currentData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Insights on jobs and applications over time
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab
            selected={tab}
            setSelected={setTab}
            hideAnnually={hideAnnuallyTab}
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart
            options={options}
            series={currentData.series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
