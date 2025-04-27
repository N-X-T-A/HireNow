import { Payment } from "#model/payment.js";
import dayjs from "dayjs";

export const getDashboardData = async (request) => {
  const { period = "month" } = request?.query || {};
  const now = dayjs();

  let startDate;
  let displayLabels = [];
  let groupBy;
  let labelIds = [];

  if (period === "year") {
    startDate = now.startOf("year").subtract(1, "year");
    const yearsDifference = now.year() - startDate.year() + 1;
    labelIds = Array.from(
      { length: yearsDifference },
      (_, i) => startDate.year() + i
    );
    displayLabels = labelIds.map(String);
    groupBy = { $year: "$createdAt" };
  } else {
    startDate = now.startOf("year");
    const monthNames = [
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
    ];
    const monthCount = now.month() + 1;
    labelIds = Array.from({ length: monthCount }, (_, i) => i + 1); // 1-based month
    displayLabels = labelIds.map((i) => monthNames[i - 1]);
    groupBy = { $month: "$createdAt" };
  }

  const payments = await Payment.aggregate([
    {
      $match: {
        paymentStatus: "completed",
        createdAt: { $gte: startDate.toDate() },
      },
    },
    {
      $group: {
        _id: groupBy,
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const chartData = labelIds.map((id, index) => {
    const found = payments.find((p) => p._id === id);
    return {
      label: displayLabels[index],
      revenue: found ? parseFloat(found.total.toFixed(2)) : 0,
    };
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.total, 0);

  return {
    chartData,
    totalRevenue: `${totalRevenue.toFixed(2)}`,
    period,
  };
};
