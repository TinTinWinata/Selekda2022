import React, { createRef } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../config/toast";
import { Link, useParams } from "react-router-dom";

export default function EditSquad() {
    const { id } = useParams();
    const [enabled, setEnabled] = useState(false);
    const { getConf } = useUserAuth();

    function handleSubmit(e) {
        e.preventDefault();

        const name = e.target.name.value;
        const description = e.target.description.value;

        const data = new URLSearchParams();

        data.append("name", name);
        data.append("description", description);
        data.append("id", id);

        axios
            .put(`/api/squad/${id}`, data, getConf())
            .then((resp) => {
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
                    <Link to="/squad">Back</Link>
                    <h1 className="text-lg font-bold mb-3">Edit squad</h1>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Squad Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            className="p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Title..."
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                        >
                            Squad Description
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            className="h-40 lg:w-80 w-full  p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Description..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Edit Squad{" "}
                    </button>
                </form>
            </div>
        </>
    );
}
