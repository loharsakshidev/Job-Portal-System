import { useEffect, useState } from "react";
import { getUserById, updateUser, uploadProfilePicture, getProfilePicture, deleteProfilePicture } from "../services/ApiService";
import { toast } from "react-toastify";

function RecruiterProfile() {
  const loggedRecruiter = JSON.parse(localStorage.getItem("recruiter"));

  const [recruiter, setRecruiter] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profilePicture: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getUserById(loggedRecruiter.id);

      setRecruiter({
        ...response.data,
        password: "",
      });
    } catch (error) {
      console.log(error);

      toast.error("Unable to load profile");
    }
  };

  const handleChange = (e) => {
    setRecruiter({
      ...recruiter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(loggedRecruiter.id, recruiter);

      let profilePicture = recruiter.profilePicture;

      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);

        const uploadResponse = await uploadProfilePicture(
          loggedRecruiter.id,
          formData,
        );

        profilePicture = uploadResponse.data;
      }

      const updatedRecruiter = {
        ...loggedRecruiter,
        name: recruiter.name,
        profilePicture: profilePicture,
      };

      localStorage.setItem("recruiter", JSON.stringify(updatedRecruiter));

      setRecruiter({
        ...recruiter,
        profilePicture: profilePicture,
        password: "",
      });

      toast.success("Profile Updated Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Unable to update profile");
    }
  };

  const handleDeletePicture = async () => {
    try {
      await deleteProfilePicture(loggedRecruiter.id);

      const updatedRecruiter = {
        ...loggedRecruiter,
        profilePicture: "",
      };

      localStorage.setItem("recruiter", JSON.stringify(updatedRecruiter));

      setRecruiter({
        ...recruiter,
        profilePicture: "",
      });

      toast.success("Profile Picture Removed");
    } catch (error) {
      console.log(error);

      toast.error("Unable to remove profile picture");
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div
                className="card-header text-center text-white py-4"
                style={{
                  background: "linear-gradient(90deg,#198754,#20c997)",
                }}
              >
                <div className="mb-3">
                  {recruiter.profilePicture ? (
                    <img
                      src={getProfilePicture(recruiter.profilePicture)}
                      alt="Recruiter"
                      className="rounded-circle border border-3 border-white"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowImage(true)}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-white text-success d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "120px",
                        height: "120px",
                        fontSize: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      {recruiter.name
                        ? recruiter.name.charAt(0).toUpperCase()
                        : "R"}
                    </div>
                  )}
                </div>

                <h3>{recruiter.name}</h3>

                <p className="mb-0">{recruiter.role}</p>
              </div>

              <div className="card-body p-5">
                <div className="mb-4">
                  <label className="form-label fw-bold">Recruiter Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={recruiter.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Email Address</label>

                  <input
                    className="form-control"
                    value={recruiter.email}
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Role</label>

                  <input
                    className="form-control"
                    value={recruiter.role}
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Change Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={recruiter.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Upload Profile Picture
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                {recruiter.profilePicture && (
                  <button
                    className="btn btn-outline-danger w-100 "
                    onClick={handleDeletePicture}
                  >
                    Remove Profile Picture
                  </button>
                )}

                <button
                  className="btn btn-success w-100 py-2 mt-3"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.85)",
            zIndex: "9999",
          }}
          onClick={() => setShowImage(false)}
        >
          <div className="position-relative">
            <button
              className="btn btn-light position-absolute"
              style={{
                top: "-45px",
                right: "-10px",
                fontWeight: "bold",
              }}
              onClick={() => setShowImage(false)}
            >
              ✕
            </button>

            <img
              src={getProfilePicture(recruiter.profilePicture)}
              alt="Recruiter"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                objectFit: "contain",
                boxShadow: "0 0 30px rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default RecruiterProfile;
