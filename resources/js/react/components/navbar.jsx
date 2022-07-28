import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../hooks/userAuthContext";
import { toastError } from "../config/toast";

export default function Navbar() {
    const hamburgerMenu = $("#hamburger-menu");

    function toggleHamburgerMenu() {
        hamburgerMenu.slideDown(500);
    }

    function removeHamburgerMenu() {
        hamburgerMenu.slideUp(500);
    }

    const { getUser, logout } = useUserAuth();

    const user = getUser();
    const navigate = useNavigate();

    function handleLogout() {
        logout()
            .then((resp) => {
                if (resp.status) {
                    navigate("/login");
                } else {
                    toastError(resp.data);
                }
            })
            .catch((resp) => {
                toastError(resp.data);
            });
    }

    function handleHome() {
        navigate("/home");
    }

    function handleDetail() {
        navigate("/detail");
    }

    function handleProfile() {
        navigate("/profile");
    }

    return (
        <>
            <div id="hamburger-menu" className="hamburger-menu smooch">
                <svg
                    className="cursor-pointer"
                    onClick={removeHamburgerMenu}
                    xmlns="http://www.w3.org/2000/svg"
                    id="hamburger-x"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <img src="logo.png" alt="" />
                <div onClick={handleHome} className="card cursor-pointer">
                    Selekda Esport Indonesia
                </div>
                <div onClick={handleDetail} className="card cursor-pointer">
                    Detail
                </div>
                <div onClick={handleProfile} className="card cursor-pointer">
                    Profile
                </div>
            </div>
            <div className="navbar raleway">
                <div className="flex justify-around mt-3 container-navbar">
                    <img
                        className="cursor-pointer"
                        onClick={handleHome}
                        src="/logo.png"
                        alt=""
                    />
                    <div
                        onClick={toggleHamburgerMenu}
                        id="hamburger"
                        className="hamburger"
                    >
                        <svg
                            className="hamburger-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>
                    <div className="right-navbar">
                        {user.role === "admin" ? (
                            <div className="navbar-text">
                                <Link to="/data">Data</Link>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="navbar-text">
                            <Link to="/all-squad">Squad</Link>
                        </div>

                        <div className="navbar-text">
                            <Link to="/home">Home</Link>
                        </div>
                        <div className="navbar-text">
                            <Link to="/play">Play</Link>
                        </div>
                        <div className="navbar-text">
                            <img
                                id="imgPhoto"
                                onClick={handleProfile}
                                className="w-2 h-2 photo-profile cursor-pointer rounded-full"
                                src={
                                    user.photoProfileUrl
                                        ? user.photoProfileUrl
                                        : "https://picsum.photos/300/300"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
