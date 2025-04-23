import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { DownloadIcon, FilterList } from "../../../icons";
import Alert from "../../ui/alert/Alert";
import {
  fetchApplicants,
  updateApplicantStatus,
  Applicant,
} from "../../../api/applicantApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../../form/Select";

type SortOrder = "asc" | "desc";
type StatusFilter = "All" | "Pending" | "Accepted" | "Interview" | "Rejected";

export default function ApplicantsTable() {
  const [tableData, setTableData] = useState<Applicant[]>([]);
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("All");

  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicants = await fetchApplicants();
        setTableData(applicants);
        setFilteredData(applicants);

        const uniqueTitles = Array.from(
          new Set(applicants.map((a) => a.job.title))
        );
        setJobTitles(uniqueTitles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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

      setTableData(previousTableData);
    }
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const applyFilter = () => {
    const newFilteredData = tableData.filter((applicant) => {
      const isStatusMatch =
        statusFilter === "All" || applicant.status === statusFilter;

      const isJobMatch =
        selectedJobTitle === "All" || applicant.job.title === selectedJobTitle;

      const appliedDate = new Date(applicant.applied_date);
      const isDateMatch =
        (!startDateFilter && !endDateFilter) ||
        (startDateFilter &&
          !endDateFilter &&
          appliedDate.toDateString() === startDateFilter.toDateString()) ||
        (!startDateFilter &&
          endDateFilter &&
          appliedDate.toDateString() === endDateFilter.toDateString()) ||
        (startDateFilter &&
          endDateFilter &&
          appliedDate >= startDateFilter &&
          appliedDate <= endDateFilter);

      return isStatusMatch && isJobMatch && isDateMatch;
    });

    setFilteredData(newFilteredData);
    setFilterVisible(false);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.applied_date).getTime();
    const dateB = new Date(b.applied_date).getTime();

    if (dateA < dateB) return sortOrder === "asc" ? -1 : 1;
    if (dateA > dateB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

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

      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setFilterVisible(!filterVisible)}
        >
          <FilterList />
        </Button>
      </div>

      {filterVisible && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700">Job</label>
            <Select
              options={[
                { value: "All", label: "All" },
                ...jobTitles.map((title) => ({ value: title, label: title })),
              ]}
              value={selectedJobTitle}
              onChange={(value) => setSelectedJobTitle(value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <Select
              options={[
                { value: "All", label: "All" },
                { value: "Pending", label: "Pending" },
                { value: "Accepted", label: "Accepted" },
                { value: "Interview", label: "Interview" },
                { value: "Rejected", label: "Rejected" },
              ]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as StatusFilter)}
            />
          </div>

          <div className="flex">
            <div className="mr-[20px]">
              <label className="block text-gray-700">From Date</label>
              <DatePicker
                selected={startDateFilter}
                onChange={(date: Date | null) => setStartDateFilter(date)}
                dateFormat="yyyy-MM-dd"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholderText="Select a date"
              />
            </div>
            <div>
              <label className="block text-gray-700">To Date</label>
              <DatePicker
                selected={endDateFilter}
                onChange={(date: Date | null) => setEndDateFilter(date)}
                dateFormat="yyyy-MM-dd"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholderText="Select a date"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="primary" onClick={applyFilter}>
              Apply Filter
            </Button>
            <Button variant="secondary" onClick={() => setFilterVisible(false)}>
              Cancel
            </Button>
          </div>
        </div>
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
                ) : sortedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-gray-500"
                    >
                      No applicants found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedData.map((applicant) => (
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
                        {editingStatus === applicant._id ? (
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
                            onBlur={() => setEditingStatus(null)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Interview">Interview</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        ) : (
                          <span
                            onClick={() => setEditingStatus(applicant._id)}
                            className={`inline-block px-2 py-1 rounded-md text-center text-sm font-medium ${
                              statusColors[applicant.status]
                            }`}
                          >
                            {applicant.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Button variant="outline" size="sm">
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
