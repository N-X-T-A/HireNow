const {
  Application,
  Job,
  UserProfile,
  Company,
  Conversation,
  Message,
} = require("../models/");
const { formatLocations } = require("../utils/format");

class ApplicationService {
  async applyForJob(userId, jobId, resume, coverLetter) {
    const existingApplication = await Application.findOne({
      user_id: userId,
      job_id: jobId,
    });

    if (existingApplication) {
      throw new Error("You have already applied for this job.");
    }

    const application = new Application({
      user_id: userId,
      job_id: jobId,
      resume,
      cover_letter: coverLetter,
      applied_date: Date.now(),
    });
    return await application.save();
  }

  async cancelJobApplication(userId, jobId) {
    const application = await Application.findOne({
      user_id: userId,
      job_id: jobId,
    });

    if (!application) {
      throw new Error("Application not found.");
    }

    await Application.deleteOne({ user_id: userId, job_id: jobId });
    return { message: "Application canceled successfully." };
  }

  async getAppliedJobs(userId) {
    const applications = await Application.find({ user_id: userId })
      .populate(
        "job_id",
        "title company_id location salary_range short_description"
      )
      .lean();

    const validApplications = applications.filter((app) => app.job_id);
    const companyIds = validApplications
      .map((app) => app.job_id.company_id)
      .filter(Boolean);

    const companies = await Company.find({ _id: { $in: companyIds } })
      .select("name logo locations")
      .lean();

    const companyMap = companies.reduce((acc, company) => {
      acc[company._id.toString()] = company;
      return acc;
    }, {});

    return validApplications.map(
      ({ _id, job_id, status, applied_date, __v }) => {
        const company = companyMap[job_id.company_id?.toString()] || {};

        return {
          _id,
          job_id: job_id._id,
          title: job_id.title,
          salary_range: job_id.salary_range,
          short_description: job_id.short_description,
          status,
          applied_date,
          __v,
          company: {
            _id: company._id || null,
            name: company.name || "Unknown",
            logo: company.logo || "",
            locations: formatLocations(company.locations),
          },
        };
      }
    );
  }

  async getApplicants(recruiterId) {
    try {
      const jobs = await Job.find({ company_id: recruiterId }).select("_id");
      if (!jobs.length) {
        return [];
      }

      const jobIds = jobs.map((job) => job._id);

      const applications = await Application.find({ job_id: { $in: jobIds } })
        .populate("user_id", "email")
        .populate("job_id", "title")
        .select("cover_letter resume applied_date status user_id job_id")
        .lean();

      return Promise.all(
        applications.map(async (app) => {
          const user = app.user_id;
          const job = app.job_id;

          const userProfile = await UserProfile.findOne({ userId: user._id })
            .select("username photoURL")
            .lean();

          return {
            _id: app._id,
            user: {
              _id: user._id,
              email: user.email,
              photo_url: userProfile?.photoURL,
              username: userProfile?.username,
            },
            job: {
              _id: job._id,
              title: job.title,
            },
            cover_letter: app.cover_letter,
            resume: app.resume,
            status: app.status,
            applied_date: app.applied_date,
          };
        })
      );
    } catch (error) {
      console.error("Error in getApplicants:", error);
      throw new Error("Failed to fetch applicants. Please try again later.");
    }
  }

  async updateApplicationStatus(applicationId, status, recruiterId) {
    const validStatuses = ["Pending", "Interview", "Rejected", "Accepted"];
    if (!validStatuses.includes(status)) {
      throw { statusCode: 400, message: "Invalid status value provided." };
    }

    const messageContent = {
      Interview:
        "You have been selected for an interview. Please check your email for details.",
      Accepted: "Congratulations! You have been accepted. Welcome aboard.",
      Rejected:
        "Unfortunately, you were not selected. We wish you the best in your future endeavors.",
    };

    const application = await Application.findById(applicationId).populate(
      "user_id"
    );
    if (!application) {
      throw { statusCode: 404, message: "Application not found" };
    }

    application.status = status;
    await application.save();

    const candidateId = application.user_id._id;

    let conversation = await Conversation.findOne({
      applicant_id: candidateId,
      recruiter_id: recruiterId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        applicant_id: candidateId,
        recruiter_id: recruiterId,
        last_message: "",
      });
    }

    if (status !== "Pending") {
      const newMessage = await Message.create({
        conversation_id: conversation._id,
        sender_id: recruiterId,
        content: messageContent[status],
      });

      conversation.last_message = messageContent[status];
      conversation.last_message_time = newMessage.createdAt;
      await conversation.save();
    }

    return application;
  }
}

module.exports = new ApplicationService();
