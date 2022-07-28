import React, { createRef } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUserAuth } from "../../hooks/userAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../config/toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function CreateAchievement() {
    const [enabled, setEnabled] = useState(false);
    const { getConf } = useUserAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const name = e.target.name.value;

        const data = new FormData();

        data.append("name", name);
        data.append("squadId", id);

        axios
            .post("/api/achievement", data, getConf())
            .then((resp) => {
                navigate("/squad");
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
                    onSubmit={handleSubmit}
                    className="bg-gray-900 rounded-xl p-12"
                >
                    <Link to="/squad">Back</Link>
                    <h1 className="text-lg font-bold mb-3">
                        Create achievement
                    </h1>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Achievement Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            className="p-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Title..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Create achievement{" "}
                    </button>
                </form>
            </div>
        </>
    );
}
