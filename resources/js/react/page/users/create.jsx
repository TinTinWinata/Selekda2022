import React, { createRef } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../config/toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateUser() {
    const { getConf } = useUserAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const dob = e.target.dob.value;
        const role = e.target.role.value;
        const phone = e.target.phone.value;
        const image = e.target.image.files[0];

        const data = new FormData();

        data.append("name", name);
        data.append("username", username);
        data.append("password", password);
        data.append("email", email);
        data.append("role", role);
        data.append("phone", phone);
        data.append("image", image);
        data.append("dob", dob);

        axios
            .post("/api/user", data, getConf())
            .then((resp) => {
                navigate("/user");
                toastSuccess(resp.data);
            })
            .catch((err) => {
                toastError(err.response.data.message);
            });
    }

    return (
        <>
            <div className="w-full h-44"></div>
            <div className="flex justify-center content-center">
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    className="bg-gray-900 rounded-xl p-10"
                >
                    <Link to={"/user"}>Back</Link>
                    <h1 className="text-lg font-bold mb-3">Create User</h1>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            className="p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Name..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Username..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="lg:w-80 w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Email..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="lg:w-80 w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Pasword..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            className="lg:w-80 w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Phone Number..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            className=" w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Date of Birth..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Profile Pitcure
                        </label>
                        <input
                            type="file"
                            name="image"
                            className=" w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Image..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Role
                        </label>
                        <select
                            name="role"
                            className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                            defaultValue="Unactive"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Create User{" "}
                    </button>
                </form>
            </div>
        </>
    );
}
