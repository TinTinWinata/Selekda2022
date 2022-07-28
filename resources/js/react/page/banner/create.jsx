import React, { createRef } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../config/toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function CreateBanner() {
    const [enabled, setEnabled] = useState(false);
    const { getConf } = useUserAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const title = e.target.title.value;
        const status = e.target.status.value;
        const image = e.target.image.files[0];

        if (!title || !status || !image) return;

        const data = new FormData();

        data.append("image", image);
        data.append("title", title);
        data.append("status", status);

        axios
            .post("/api/banner", data, getConf())
            .then((resp) => {
                navigate("/banner");
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
                    className="bg-gray-900 rounded-xl p-20"
                >
                    <Link to="/banner">Back</Link>
                    <h1 className="text-lg font-bold mb-3">Create Banner</h1>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Banner Title
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="title"
                            className="p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Title..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Image URL
                        </label>
                        <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            name="image"
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            htmlFor="status"
                            className="mt-3  block text-sm font-medium text-gray-100"
                        >
                            Status
                        </label>
                        <select
                            name="status"
                            className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                            defaultValue="Unactive"
                        >
                            <option value="active">Active</option>
                            <option value="unactive">Unactive</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Create Banner{" "}
                    </button>
                </form>
            </div>
        </>
    );
}
