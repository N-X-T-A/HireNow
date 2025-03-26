import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { DownloadIcon } from "../../../icons";
import Alert from "../../ui/alert/Alert";
import {
  fetchApplicants,
  updateApplicantStatus,
  Applicant,
} from "../../../api/applicantApi";

export default function ApplicantsTable() {
  const [tableData, setTableData] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicants = await fetchApplicants();
        setTableData(applicants);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusColors = {
    Pending: "bg-gray-300 text-gray-800",
    Accepted: "bg-green-300 text-green-800",
    Rejected: "bg-red-300 text-red-800",
    Interview: "bg-purple-300 text-purple-800",
  };

  const handleStatusChange = async (
    applicantId: string,
    newStatus: Applicant["status"]
  ) => {
    const previousTableData = [...tableData];

    // Cập nhật trạng thái tạm thời trên giao diện
    setTableData((prevData) =>
      prevData.map((applicant) =>
        applicant._id === applicantId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );

    try {
      await updateApplicantStatus(applicantId, newStatus);
      setAlert({
        variant: "success",
        message: "Status updated successfully!",
      });
    } catch (error) {
      setAlert({
        variant: "error",
        message: "Error updating status",
      });

      // Khôi phục trạng thái cũ nếu có lỗi
      setTableData(previousTableData);
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <>
      {alert && (
        <Alert
          className="fixed top-[153px] right-[25px] w-[500px]"
          variant={alert.variant}
          title={alert.variant === "success" ? "Success" : "Error"}
          message={alert.message}
        />
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Applied Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Apply Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    CV
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {loading ? (
                  <></>
                ) : (
                  tableData.map((applicant) => (
                    <TableRow key={applicant._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                            {applicant.user.photo_url ? (
                              <img
                                className="w-4/5"
                                width={40}
                                height={40}
                                src={applicant.user.photo_url}
                                alt={applicant.user.email}
                              />
                            ) : (
                              <span className="text-gray-500">N/A</span>
                            )}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {applicant.user.username}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {applicant.user.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {applicant.job.title}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {new Date(applicant.applied_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {applicant.status === "Accepted" ||
                        applicant.status === "Rejected" ? (
                          <span
                            className={`inline-block px-2 py-1 rounded-md text-center text-sm font-medium ${
                              statusColors[applicant.status]
                            }`}
                          >
                            {applicant.status}
                          </span>
                        ) : (
                          <select
                            value={applicant.status}
                            onChange={(e) =>
                              handleStatusChange(
                                applicant._id,
                                e.target.value as Applicant["status"]
                              )
                            }
                            className={`p-1 border border-gray-300 rounded-md ${
                              statusColors[applicant.status]
                            }`}
                          >
                            {applicant.status === "Pending" && (
                              <>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                              </>
                            )}

                            {applicant.status === "Interview" && (
                              <>
                                <option value="Interview">Interview</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </>
                            )}
                          </select>
                        )}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() =>
                            window.open(applicant.resume, "_blank")
                          }
                        >
                          <DownloadIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
