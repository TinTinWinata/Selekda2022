import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useUserAuth } from "../../hooks/userAuthContext";

import "./profile.css";

export default function Profile() {
    const { user, updateUser, changePassword, getConf, getUser, logout } =
        useUserAuth();

    const userLocal = getUser();
    console.log(userLocal);

    function handleChangePassword(e) {
        e.preventDefault();

        const newPassword = e.target.new.value;
        const confirmPassword = e.target.confirm.value;
        const old = e.target.old.value;

        if (newPassword !== confirmPassword) {
            toastError("Password not match!");
            return;
        }

        changePassword(newPassword, old);
    }

    function handleUpdateUser(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const username = e.target.username.value;
        const phone = e.target.phone.value;
        const dob = e.target.dob.value;

        const data = new URLSearchParams();
        data.append("name", name);
        data.append("username", username);
        data.append("phone", phone);
        data.append("dob", dob);
        updateUser(data);
    }

    const navigate = useNavigate();
    function handleLogout() {
        logout()
            .then((resp) => {
                console.log(resp);
                if (resp.status) {
                    navigate("/login");
                } else {
                    toastError(resp.data);
                }
            })
            .catch((resp) => {
                console.log(resp);
                toastError(resp.data);
            });
    }

    return (
        <>
            <div className="content smooch"></div>
            <div className="square-image"></div>
            <div className="line"></div>
            <div className="title">
                <img src="../assets/profile/example_2.jpg" alt="" />
                <div className="flex title-flex">
                    <div></div>
                    <h1 className="barlow">
                        {user ? user.name : userLocal.name}
                    </h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="center-footer">
                <form
                    onSubmit={handleChangePassword}
                    className="change-password"
                >
                    <h1 className="text-2xl font-bold change-password-title">
                        Change Password
                    </h1>
                    <div className="change-password-content">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Old Password</td>
                                    <td>
                                        <input name="old" type="password" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>New Password</td>
                                    <td>
                                        <input name="new" type="password" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Confirm Password</td>
                                    <td>
                                        <input name="confirm" type="password" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="center-footer">
                            <button>I Aggreed, to change my password</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="center-footer">
                <div className="change-password">
                    <h1 className="text-2xl font-bold change-password-title">
                        My Profile
                    </h1>
                    <form
                        onSubmit={handleUpdateUser}
                        className="change-password-content"
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>
                                        <input name="username" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <input name="name" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <input name="phone" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of Birthday</td>
                                    <td>
                                        <input name="dob" type="date" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex flex-end">
                            <button>Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
