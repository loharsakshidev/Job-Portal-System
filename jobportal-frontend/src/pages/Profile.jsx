import { useEffect, useState } from "react";
import { getUserById, updateUser, uploadProfilePicture, getProfilePicture, deleteProfilePicture } from "../services/ApiService";
import { toast } from "react-toastify";

function Profile() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
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
      const response = await getUserById(loggedUser.id);

      setUser({
        ...response.data,
        password: "",
      });
    } catch (error) {
      console.log(error);

      toast.error("Unable to load profile");
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const response = await updateUser(loggedUser.id, user);

      let profilePicture = user.profilePicture;

      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);

        const uploadResponse = await uploadProfilePicture(
          loggedUser.id,
          formData,
        );

        profilePicture = uploadResponse.data;
      }

      const updatedUser = {
        ...loggedUser,
        name: user.name,
        profilePicture: profilePicture,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser({
        ...user,
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
      await deleteProfilePicture(loggedUser.id);

      setUser({
        ...user,
        profilePicture: "",
      });

      localStorage.setItem(
        "user",

        JSON.stringify({
          ...loggedUser,
          profilePicture: "",
        }),
      );

      toast.success("Profile Picture Removed");
    } catch (error) {
      toast.error("Unable to remove picture");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div
              className="card-header text-center text-white py-4"
              style={{
                background: "linear-gradient(90deg,#2563EB,#4F46E5)",
              }}
            >
              <div className="mb-3">
                {user.profilePicture ? (
                  <img
                    src={getProfilePicture(user.profilePicture)}
                    alt="Profile"
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
                    className="rounded-circle bg-white text-primary d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>

              <h3 className="fw-bold">{user.name}</h3>

              <p className="mb-0">{user.role}</p>
            </div>

            <div className="card-body p-5">
              <div className="mb-4">
                <label className="form-label fw-bold">Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Email Address</label>

                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Account Type</label>

                <input
                  type="text"
                  className="form-control"
                  value={user.role}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Change Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter new password (optional)"
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

              {user.profilePicture && (
                  <button
                    className="btn btn-outline-danger w-100 mt-2"
                    onClick={handleDeletePicture}
                  >
                    Remove Profile Picture
                  </button>
                )}

              <button
                className="btn btn-primary w-100 py-2 mt-3"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          style={{
            position: "fixed",

            top: 0,

            left: 0,

            width: "100%",

            height: "100%",

            backgroundColor: "rgba(0,0,0,0.9)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            zIndex: 9999,
          }}
        >
          <img
            src={getProfilePicture(user.profilePicture)}
            alt="Profile"
            style={{
              maxWidth: "90%",

              maxHeight: "90%",

              borderRadius: "10px",

              boxShadow: "0 0 20px white",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
