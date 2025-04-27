import { Plan } from "#model/plan.js";
import { Payment } from "#model/payment.js";

export const PlanResource = {
  resource: Plan,
  options: {
    listProperties: ["name", "price", "isPopular"],
    showProperties: ["name", "price", "features", "isPopular"],
    editProperties: ["name", "price", "features"], // isPopular không chỉnh sửa
    properties: {
      isPopular: {
        isDisabled: true, // Không cho chỉnh sửa
      },
    },
    actions: {
      list: {
        after: async (response) => {
          const plans = response.records;

          // Bước 1: Đếm số lượt thanh toán thành công theo plan name
          const payments = await Payment.aggregate([
            { $match: { paymentStatus: "completed" } },
            {
              $group: {
                _id: "$servicePackage",
                total: { $sum: 1 },
              },
            },
          ]);

          const countMap = new Map(payments.map((p) => [p._id, p.total]));

          // Bước 2: Tìm plan có lượt cao nhất
          let maxPlanName = null;
          let maxCount = 0;
          for (const [planName, count] of countMap.entries()) {
            if (count > maxCount) {
              maxCount = count;
              maxPlanName = planName;
            }
          }

          // Bước 3: Cập nhật isPopular cho toàn bộ plans
          await Promise.all(
            plans.map(async (record) => {
              const isPopular = record.params.name === maxPlanName;
              record.params.isPopular = isPopular;

              // Nếu khác với db hiện tại thì cập nhật db
              await Plan.updateOne(
                { _id: record.params._id },
                { $set: { isPopular } }
              );
            })
          );

          return response;
        },
      },
    },
  },
};
