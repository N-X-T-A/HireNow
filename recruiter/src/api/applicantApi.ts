import { SERVICE_URL } from "./config";

const TOKEN = localStorage.getItem("accessToken");

export interface User {
  _id: string;
  email: string;
  photo_url: string | null;
  username: string;
}

export interface Job {
  _id: string;
  title: string;
}

export interface Applicant {
  _id: string;
  user: User;
  job: Job;
  cover_letter: string;
  resume: string;
  status: "Accepted" | "Pending" | "Rejected" | "Interview";
  applied_date: string;
}

export async function fetchApplicants(): Promise<Applicant[]> {
  const response = await fetch(`${SERVICE_URL}/application/applicants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch applicants");
  }

  const data = await response.json();
  return data.metadata || [];
}

export async function updateApplicantStatus(
  applicantId: string,
  newStatus: Applicant["status"]
): Promise<void> {
  const response = await fetch(`${SERVICE_URL}/update-status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicationId: applicantId,
      status: newStatus,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update applicant status");
  }
}
