import { useEffect, useState } from "react";
import {
    getNotifications,
    markNotificationRead
} from "../services/ApiService";

import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Notifications() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

    try {

        setLoading(true);

        const response = await getNotifications(user.id);

        setNotifications(response.data);

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to load notifications");

    }

    finally {

        setLoading(false);

    }

};
    const handleRead = async (id) => {

        try {

            await markNotificationRead(id);

            loadNotifications();

        }

        catch (error) {

            console.log(error);

        }

    };

    if (loading) {

    return <Loader />;

}

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold text-warning">

                    Notifications

                </h1>

                <p className="text-muted fs-5">

                    Stay updated with the latest activity on your job applications.

                </p>

            </div>

            {

                notifications.length === 0 ?

                    <div className="text-center py-5">

                        <div
                            className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                            style={{
                                width: "130px",
                                height: "130px",
                                borderRadius: "50%",
                                background: "#FFF8E8",
                                fontSize: "60px"
                            }}
                        >

                            🔔

                        </div>

                        <h2 className="fw-bold text-warning">

                            You're All Caught Up!

                        </h2>

                        <p
                            className="text-muted fs-5"
                            style={{
                                maxWidth: "520px",
                                margin: "0 auto"
                            }}
                        >

                            You don't have any notifications at the moment.
                            We'll notify you whenever there is an update on
                            your job applications.

                        </p>

                    </div>

                    :

                    notifications.map((notification) => (

                        <div

                            key={notification.id}

                            className={`card shadow-sm mb-3 border-0 ${
                                notification.read
                                    ? "bg-light"
                                    : "border-start border-5 border-primary"
                            }`}

                        >

                            <div className="card-body">

                                <p className="mb-2 fw-semibold">

                                    {notification.message}

                                </p>

                                <small className="text-muted">

                                    {notification.createdAt.replace("T", " ")}

                                </small>

                                {

                                    !notification.read &&

                                    <div className="mt-3">

                                        <button

                                            className="btn btn-primary btn-sm rounded-pill px-4"

                                            onClick={() =>
                                                handleRead(notification.id)
                                            }

                                        >

                                            Mark as Read

                                        </button>

                                    </div>

                                }

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default Notifications;