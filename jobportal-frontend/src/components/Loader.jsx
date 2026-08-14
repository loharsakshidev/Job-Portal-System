function Loader() {

    return (

        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                minHeight: "80vh"
            }}
        >

            <div
                style={{
                    width: "90px",
                    height: "90px",
                    border: "6px solid rgba(37,99,235,0.15)",
                    borderTop: "6px solid #06B6D4",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 25px rgba(6,182,212,.35)"
                }}
            >

                <span
                    style={{
                        fontSize: "32px"
                    }}
                >
                    💼
                </span>

            </div>

            <h4
                className="mt-4 fw-bold"
                style={{
                    color: "#2563EB"
                }}
            >
                JobSphere
            </h4>

            <p className="text-muted">

                Loading...

            </p>

            <style>

                {`
                    @keyframes spin {

                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }

                    }
                `}

            </style>

        </div>

    );

}

export default Loader;