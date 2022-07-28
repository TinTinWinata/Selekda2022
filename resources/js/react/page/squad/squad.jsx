import { AcademicCapIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Eye } from "heroicons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useUserAuth } from "../../hooks/userAuthContext";

export default function TeamSquad() {
    const { getConf } = useUserAuth();
    const [squad, setSquad] = useState([]);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        axios
            .get("/api/squad", getConf())
            .then((resp) => {
                if (resp.status === 200) {
                    console.log(resp.data);
                    setSquad(resp.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    function handleCreate() {
        navigate("/create-squad");
    }

    function handleDelete(id) {
        axios
            .delete(`/api/squad/${id}`, getConf())
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
                        <Link to="/data">back</Link>
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
                                    Squad Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Squad Description
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Member
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {squad.map((e, idx) => (
                                <tr
                                    key={idx}
                                    className={
                                        idx % 2 === 0
                                            ? "bg-gray-900"
                                            : "bg-gray-800"
                                    }
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                                        {e.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {e.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {e.squad_members.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex">
                                            <Link
                                                to={"/edit-squad/" + e.id}
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
                                            <Link
                                                to={"/edit-squad/" + e.id}
                                                className="text-gray-200 hover:text-gray-100"
                                            ></Link>
                                            <Eye
                                                onClick={() => {
                                                    navigate(
                                                        "/squad-member/" + e.id
                                                    );
                                                }}
                                                className="cursor-pointer ml-2"
                                            ></Eye>
                                            <AcademicCapIcon
                                                className="w-6 h-6 cursor-pointer ml-2"
                                                onClick={() => {
                                                    navigate(
                                                        "/create-achievement/" +
                                                            e.id
                                                    );
                                                }}
                                            ></AcademicCapIcon>
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
