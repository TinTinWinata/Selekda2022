import React, { createRef } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../config/toast";
import { Link, useParams } from "react-router-dom";

export default function EditSquadMember() {
    const { getConf } = useUserAuth();
    const { id } = useParams();

    function handleSubmit(e) {
        e.preventDefault();

        const name = e.target.name.value;
        const role = e.target.role.value;
        const email = e.target.email.value;
        const dob = e.target.dob.value;
        const phone = e.target.phone.value;
        const image = e.target.image.files[0];

        const data = new FormData();

        data.append("name", name);
        data.append("squadId", id);
        data.append("email", email);
        data.append("role", role);
        data.append("phone", phone);
        data.append("image", image);
        data.append("dob", dob);
        data.append("id", id);

        axios
            .post("/api/update-squad-member", data, getConf())
            .then((resp) => {
                toastSuccess(resp.data);
            })
            .catch((err) => {
                console.log(err.response.data);
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
                    <Link to={"/squad-member/" + id}>Back</Link>
                    <h1 className="text-lg font-bold mb-3">
                        Create Squad Member
                    </h1>
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
                            Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            className="w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Role..."
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
                    <button
                        type="submit"
                        className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Create Squad Member{" "}
                    </button>
                </form>
            </div>
        </>
    );
}
