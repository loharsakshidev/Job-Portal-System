import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

// User APIs
export const registerUser = (user) => API.post("/users/register", user);

export const loginUser = (user) => API.post("/users/login", user);

// Job APIs
export const getAllJobs = () => API.get("/jobs/all");

export const applyForJob = (application) => API.post("/applications/apply", application);

//export const deleteJob = (id) => API.delete(`/jobs/delete/${id}`);

export const getAppliedJobs = (userId) =>
    API.get(`/applications/user/${userId}`);

export const getAllApplications = () =>
    API.get("/applications/all");

export const updateApplicationStatus = (id, status) =>
    API.put(`/applications/status/${id}?status=${status}`);

export const deleteJob = (id) =>
    API.delete(`/jobs/delete/${id}`);

export const getJobById = (id) =>
    API.get(`/jobs/${id}`);

export const updateJob = (id, job) =>
    API.put(`/jobs/update/${id}`, job);

// Dashboard API
export const getDashboardData = () => API.get("/dashboard");

export const getUserById = (id) =>
    API.get(`/users/${id}`);

export const updateUser = (id, user) =>
    API.put(`/users/update/${id}`, user);

export const forgotPassword = (data) => {

    return API.post(
        "/users/forgot-password",
        data
    );

};

// Upload Profile Picture
export const uploadProfilePicture = (id, formData) =>
    API.post(`/users/upload-profile/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

// Get Profile Picture
export const getProfilePicture = (fileName) =>
    `http://localhost:8080/uploads/profile/${fileName}`;

export const deleteProfilePicture = (id) =>
    API.delete(`/users/profile-picture/${id}`);

export const saveJob = (userId, jobId) =>
    API.post("/saved-jobs/save", {
        userId,
        jobId
    });

    export const getSavedJobs = (userId) =>
    API.get(`/saved-jobs/${userId}`);

export const removeSavedJob = (userId, jobId) =>
    API.delete(`/saved-jobs/${userId}/${jobId}`);

export const uploadResume = (applicationId, formData) =>
    API.post(
        `/applications/upload-resume/${applicationId}`,
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

export const downloadResume = (fileName)=>{

    window.open(

        `http://localhost:8080/api/applications/resume/${fileName}`,

        "_blank"

    );

};

export const reopenJob = (id) =>
    API.put(`/jobs/reopen/${id}`);

export const hasApplied = (userId, jobId) =>
    API.get(`/applications/check/${userId}/${jobId}`);

export const getNotifications = (userId) =>
    API.get(`/notifications/${userId}`);

export const markNotificationRead = (id) =>
    API.put(`/notifications/read/${id}`);

export const closeJob = (id) =>
    API.put(`/jobs/close/${id}`);

export default API;