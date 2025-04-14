import { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Alert from "../../ui/alert/Alert";

import Button from "../../ui/button/Button";
import { PencilIcon, TrashBinIcon } from "../../../icons";
import { Modal } from "../../ui/modal";
import { useModal } from "../../../hooks/useModal";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import apiFetch from "../../../utils/api";
import BulletListInput from "../../form/input/BulletListInput";
import { SERVICE_URL } from "../../../api/config";

const API_URL = `${SERVICE_URL}/job`;

interface Job {
  _id: string;
  title: string;
  skills: string[];
  salary_range: string;
  reasons_to_join: string;
  required_experience: string;
  responsibility: string;
  description: string;
  posted_date: string;
}

export default function JobListingTable() {
  const [tableData, setTableData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch(`${API_URL}/posted`);
        setTableData(response.jobs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    openModal();
  };

  const handleSave = async () => {
    if (!selectedJob) return;

    try {
      await apiFetch(`${API_URL}/${selectedJob._id}`, {
        method: "PUT",
        body: JSON.stringify(selectedJob),
      });

      const response = await apiFetch(`${API_URL}/posted`);
      setTableData(response.jobs || []);

      setAlert({ variant: "success", message: "Job updated successfully!" });
      closeModal();
    } catch (error) {
      console.error("Error updating job:", error);
      setAlert({ variant: "error", message: "Failed to update job!" });
    }
  };

  const confirmDelete = (job: Job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      await apiFetch(`${API_URL}/${jobToDelete._id}`, {
        method: "DELETE",
      });

      setTableData((prevData) =>
        prevData.filter((job) => job._id !== jobToDelete._id)
      );

      setAlert({ variant: "success", message: "Job deleted successfully!" });
    } catch (error) {
      console.error("Error deleting job:", error);
      setAlert({ variant: "error", message: "Failed to delete job!" });
    }

    setIsDeleteModalOpen(false);
    setJobToDelete(null);
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  // Extract <li> elements from the HTML string
  const parseReasons = (reasonsHtml: string) => {
    const matches = reasonsHtml.match(/<li>(.*?)<\/li>/g) || [];
    return matches.map((item) => item.replace(/<\/?li>/g, ""));
  };

  // Convert the updated list back to HTML string with <ul> and <li> tags
  const convertToHtml = (reasonsArray: string[]) => {
    return `<ul>${reasonsArray
      .map((reason) => `<li>${reason}</li>`)
      .join("")}</ul>`;
  };
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
                  <TableCell className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Title
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Salary
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Posted Date
                  </TableCell>
                  <TableCell className="px-8 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {loading ? (
                  <></>
                ) : (
                  tableData.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {job.title}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {job.salary_range}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {new Date(job.posted_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Button
                          size="sm"
                          variant="none"
                          className="text-[20px] text-[#465fff]"
                          onClick={() => handleEdit(job)}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          size="sm"
                          variant="none"
                          className="text-[20px] text-red-500"
                          onClick={() => confirmDelete(job)}
                        >
                          <TrashBinIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[1280px] m-4"
        >
          {selectedJob && (
            <div className="relative w-full max-w-[1280px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Edit Job Information
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                  Update job details to keep listings up-to-date.
                </p>
              </div>
              <form
                className="flex flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(selectedJob);
                }}
              >
                <div className="h-[450px] overflow-y-auto px-2 pb-3">
                  <div className="mb-2.5">
                    <Label>Title</Label>
                    <Input
                      type="text"
                      value={selectedJob.title}
                      onChange={(e) =>
                        setSelectedJob({
                          ...selectedJob,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2.5">
                    <Label>Salary Range</Label>
                    <Input
                      type="text"
                      value={selectedJob.salary_range}
                      onChange={(e) =>
                        setSelectedJob({
                          ...selectedJob,
                          salary_range: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-2.5">
                    <Label>Reasons to Join</Label>
                    <BulletListInput
                      value={parseReasons(selectedJob.reasons_to_join || "")}
                      onChange={(updatedList: string[]) =>
                        setSelectedJob({
                          ...selectedJob,
                          reasons_to_join: convertToHtml(updatedList),
                        })
                      }
                    />
                  </div>
                  <div className="mb-2.5">
                    <Label>Required Experience</Label>
                    <TextArea
                      value={selectedJob.required_experience}
                      onChange={(
                        content: string | ChangeEvent<HTMLTextAreaElement>
                      ) =>
                        setSelectedJob({
                          ...selectedJob,
                          required_experience:
                            typeof content === "string"
                              ? content
                              : content.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2.5">
                    <Label>Responsibility</Label>
                    <TextArea
                      value={selectedJob.responsibility}
                      onChange={(
                        content: string | ChangeEvent<HTMLTextAreaElement>
                      ) =>
                        setSelectedJob({
                          ...selectedJob,
                          responsibility:
                            typeof content === "string"
                              ? content
                              : content.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2.5">
                    <Label>Description</Label>
                    <TextArea
                      value={selectedJob.description}
                      onChange={(
                        content: string | ChangeEvent<HTMLTextAreaElement>
                      ) =>
                        setSelectedJob({
                          ...selectedJob,
                          description:
                            typeof content === "string"
                              ? content
                              : content.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="none" onClick={closeModal}>
                    Close
                  </Button>
                  <Button size="sm" onClick={() => handleSave()}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Modal>
        <Modal
          className="max-w-[700px] m-4"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="text-gray-600">
              Are you sure you want to delete this job:{" "}
              <strong>{jobToDelete?.title}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
