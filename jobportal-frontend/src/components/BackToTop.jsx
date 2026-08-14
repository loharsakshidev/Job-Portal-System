import { useEffect, useState } from "react";

function BackToTop() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const toggleVisible = () => {

            if (window.scrollY > 300) {

                setVisible(true);

            }

            else {

                setVisible(false);

            }

        };

        window.addEventListener("scroll", toggleVisible);

        return () =>
            window.removeEventListener("scroll", toggleVisible);

    }, []);

    const scrollTop = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    return (

        visible && (

            <button

                onClick={scrollTop}

                className="btn btn-primary rounded-circle shadow"

                style={{

                    position: "fixed",

                    bottom: "25px",

                    right: "25px",

                    width: "55px",

                    height: "55px",

                    zIndex: 999,

                    fontSize: "22px"

                }}

            >

                ↑

            </button>

        )

    );

}

export default BackToTop;