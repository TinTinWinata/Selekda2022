import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userAuthContext";

export default function Banner() {
    const { getConf } = useUserAuth();
    const [banner, setBanner] = useState([]);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/banner", getConf())
            .then((resp) => {
                setLoading(false);
                if (resp.status === 200) {
                    setBanner(resp.data);
                }
            })
            .catch((err) => {
            });
    }, [refresh]);

    function handleCreate() {
        navigate("/create-banner");
    }

    function handleDelete(id) {
        axios
            .delete(`/api/banner/${id}`, getConf())
            .then((resp) => {
                setRefresh(!refresh);
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
                <div className="w-1/2 bg-gray-900 rounded-xl p-6">
                    <div className="flex flex-col w-fit">
                        <Link to="/data">Back</Link>
                        <button
                            onClick={handleCreate}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Create Button
                        </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-900">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Banner Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Banner Image
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {banner.map((e, idx) => (
                                <tr
                                    key={idx}
                                    className={
                                        idx % 2 === 0
                                            ? "bg-gray-900"
                                            : "bg-gray-800"
                                    }
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                                        {e.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        <img
                                            className="w-8 h-8"
                                            src={e.imageUrl}
                                            alt=""
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {e.status}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex">
                                            <Link
                                                to={"/edit-banner/" + e.id}
                                                className="text-gray-200 hover:text-gray-100"
                                            >
                                                Edit
                                            </Link>
                                            <p
                                                onClick={() => {
                                                    handleDelete(e.id);
                                                }}
                                                className="cursor-pointer ml-2 text-gray-200 hover:text-gray-100"
                                            >
                                                Delete
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
