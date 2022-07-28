import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userAuthContext";

import "./profile.css";

export default function LookProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const { id } = useParams();

    const { getConf } = useUserAuth();
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/user/" + id, getConf())
            .then((resp) => {
                setLoading(false);
                setUser(resp.data);
            })
            .catch((err) => {
                toastError(err.response.data);
            });
    }, []);

    return (
        <>
            <div className="content smooch"></div>
            <div className="square-image"></div>
            <div className="line"></div>
            <div className="title">
                <label htmlFor="file-input">
                    {user ? (
                        <img
                            className="cursor-pointer"
                            src={
                                user.photoProfileUrl ? user.photoProfileUrl : ""
                            }
                            alt=""
                        />
                    ) : (
                        ""
                    )}
                </label>
                <div className="flex title-flex">
                    <div></div>
                    <h1 className="barlow">
                        {user ? user.name : ""}
                    </h1>
                </div>
            </div>
            <div className="center-footer">
                <div className="change-password">
                    <h1 className="text-2xl font-bold change-password-title">
                        My Profile
                    </h1>
                    <form className="change-password-content">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>
                                        <input
                                            value={user ? user.username : ""}
                                            disabled
                                            name="username"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <input
                                            value={user ? user.name : ""}
                                            disabled
                                            name="name"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <input
                                            value={user ? user.phone : ""}
                                            disabled
                                            name="phone"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of Birthday</td>
                                    <td>
                                        <input
                                            value={user ? user.dob : ""}
                                            disabled
                                            name="dob"
                                            type="date"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    );
}
