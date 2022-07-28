import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useUserAuth } from "../../hooks/userAuthContext";

export default function SquadMember() {
    const { id } = useParams();
    const { getConf } = useUserAuth();
    const [squad, setSquad] = useState({ squad_members: [] });
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/squad/${id}`, getConf())
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
        navigate("/create-squad-member/" + squad.id);
    }

    function handleDelete(id) {
        axios
            .delete(`/api/squadMember/${id}`, getConf())
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
                <div className="w-fit bg-gray-900 rounded-xl p-6">
                    <div className="flex flex-col w-fit">
                        <Link className="" to="/squad">
                            Back
                        </Link>
                        <button
                            onClick={handleCreate}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Create Member
                        </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-900">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Role
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Date Of Birth
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Phone Number
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Profile Pitcure
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {squad.squad_members.map((e, idx) => (
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
                                        {e.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {e.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {e.dob}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        {e.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                        <img
                                            className="w-6 h-6 rounded-full"
                                            src={e.photoProfileUrl}
                                            alt=""
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex">
                                            <Link
                                                to={
                                                    "/edit-squad-member/" + e.id
                                                }
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
