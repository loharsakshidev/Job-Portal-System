import React from "react";

function ImagePreview({ show, image, onClose }) {

    if (!show) return null;

    return (

        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative"
                }}
            >

                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "-15px",
                        right: "-15px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#fff",
                        fontSize: "22px",
                        cursor: "pointer"
                    }}
                >
                    ×
                </button>

                <img
                    src={image}
                    alt="Profile"
                    style={{
                        width: "350px",
                        height: "350px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "4px solid white"
                    }}
                />

            </div>

        </div>

    );

}

export default ImagePreview;