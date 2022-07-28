import axios from "axios";
import React, { useEffect } from "react";

import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toastError, toastSuccess } from "../config/toast";

const context = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState();
    const [session, setSession] = useState();
    const TOKEN_KEY = "95thy5EJw6Lz6TSDKkkI95thy5EJw6Lz6TSDKkkI";
    const USER_KEY = "WpltVOv8JQqqkFa22PBeWpltVOv8JQqqkFa22PBe";

    useEffect(() => {
        const user = getUserLocal();
        if (user) {
            setUser(user);
        }
    }, []);

    function updateUser(data) {
        axios
            .put("/api/update-user/" + user.id, data, getConf())
            .then((resp) => {
                const tempUser = user;
                tempUser.username = data.username;
                tempUser.name = data.name;
                tempUser.phone = data.phone;
                tempUser.dob = data.dob;

                setUser(tempUser);
                setUserLocal(tempUser);

                toastSuccess(resp.data);
            })
            .catch((err) => {
                toastError(err.response.data.message);
            });
    }

    function getUserLocal() {
        const user = localStorage.getItem(USER_KEY);
        if (!user || user === "undefined") {
            return false;
        }
        return JSON.parse(user);
    }

    function changePassword(newPassword, old) {
        const data = new URLSearchParams();
        data.append("password", newPassword);
        data.append("old", old);
        data.append("id", user.id);

        axios
            .put("/api/change-password/" + user.id, data, getConf())
            .then((resp) => {
                if (resp.status === 200) {
                    toastSuccess(resp.data);
                } else {
                    toastError(resp.data);
                }
            })
            .catch((err) => {
                toastError(err.response.data);
            });
    }

    function getTokenLocal() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function setTokenLocal(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    function setUserLocal(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    function getConf() {
        const config = {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        };
        return config;
    }

    function getUser() {
        if (!user) {
            const userLocal = getUserLocal();
            if (!userLocal) {
                return false;
            } else {
                return userLocal;
            }
        } else {
            return user;
        }
    }

    function getToken() {
        if (user === "undefined") {
            return user.token;
        } else {
            return getTokenLocal();
        }
    }

    function logout() {
        return axios
            .get("/api/logout", getConf())
            .then((resp) => {
                if (resp.status == 200) {
                    setUserLocal(null);
                    setTokenLocal(null);
                    setUser(null);
                    const respBack = {
                        status: true,
                        data: "Succesfully logout!",
                    };
                    return respBack;
                }
            })
            .catch((err) => {
                const respBack = {
                    status: false,
                    data: err.response.data.message,
                };
                return respBack;
            });
    }

    function register(user) {
        return axios
            .post("/api/register", user)
            .then((resp) => {
                if (resp.status === 200) {
                    const respBack = {
                        status: true,
                        data: "Succesfully register!",
                    };
                    return respBack;
                }
            })
            .catch((err) => {
                const respBack = {
                    status: false,
                    data: err.response.data.message,
                };
                return respBack;
            });
    }

    function login(user) {
        return axios
            .post("api/login", {
                email: user.email,
                password: user.password,
            })
            .then((resp) => {
                if (resp.status == 200) {
                    setUser(resp.data);
                    setUserLocal(resp.data);
                    localStorage.setItem(TOKEN_KEY, resp.data.token);
                    const respBack = {
                        status: true,
                        data: "Succesfully login!",
                    };
                    return respBack;
                } else {
                    const respBack = { status: true, data: "Login not found" };
                    return respBack;
                }
            })
            .catch((err) => {
                const resp = { status: false, data: err.response.data };
                return resp;
            });
    }

    return (
        <context.Provider
            value={{
                updateUser,
                changePassword,
                getConf,
                user,
                getUser,
                login,
                logout,
                register,
            }}
        >
            {children}
        </context.Provider>
    );
}

export function useUserAuth() {
    return useContext(context);
}
