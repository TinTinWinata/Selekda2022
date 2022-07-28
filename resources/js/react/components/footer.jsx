import React from "react";

export default function Footer() {
    return (
        <>
            <div className="footer raleway">
                <div className="footer-container">
                    <div className="footer-logo">
                        <div className="white-line"></div>
                        <img src="../assets/logo.png" alt="" />
                        <div className="white-line"></div>
                    </div>
                    <div className="footer-content">
                        <div className="center-footer">
                            <div className="logo flex">
                                <img src="../assets/discord.png" alt="" />
                                <img src="../assets/instagram.png" alt="" />
                                <img src="../assets/twitter.png" alt="" />
                                <img src="../assets/youtube.png" alt="" />
                            </div>
                        </div>
                        <p className="copyright">
                            Copyright© 2022 Selekda Esport Games. Selekdash.
                            Designed by TinTin
                        </p>
                        <div className="center-footer">
                            <div className="footer-extras flex">
                                <p>Privacy Notice</p>
                                <p>Term of Service</p>
                                <p>Privacy Cookie Preference</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
