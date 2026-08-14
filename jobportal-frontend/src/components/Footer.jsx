import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaTwitter
} from "react-icons/fa";

import "./Footer.css";
function Footer() {

    return (

        <footer className="footer-custom mt-5">

            <div className="container">

                <div className="row align-items-center">

                    {/* Logo */}

                    <div className="col-md-4">

                        <h4 className="footer-logo">
                            Job<span>Sphere</span>
                        </h4>

                        <p>
                            Connecting Talent with Opportunity.
                        </p>

                        {/* Social Icons */}

                        <div className="d-flex gap-3 mt-4">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                            >
                                <FaTwitter />
                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="col-md-4">

                        <h6>Quick Links</h6>

                        <Link to="/">Home</Link><br/>

                        <Link to="/jobs">Jobs</Link><br/>

                        <Link to="/login">Candidate</Link><br/>

                        <Link to="/recruiter-login">Recruiter</Link>

                    </div>

                    {/* Contact */}

                    <div className="col-md-4">

                        <h6>Contact</h6>

                        <p>

                            📧 support@jobsphere.com

                            <br/>

                            📞 +91 98765 43210

                        </p>

                    </div>

                </div>

                <hr/>

                <p className="text-center mb-0">

                    © 2026 JobSphere. All Rights Reserved.

                </p>

            </div>

        </footer>

    );

}

export default Footer;