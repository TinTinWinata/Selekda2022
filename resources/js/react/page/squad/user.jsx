import axios from "axios";
import { Eye } from "heroicons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userAuthContext";

export default function SquadUserView() {
    const { getConf } = useUserAuth();
    const [squad, setSquad] = useState([]);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/all-squad", getConf())
            .then((resp) => {
                setLoading(false);
                if (resp.status === 200) {
                    setSquad(resp.data);
                }
            })
            .catch((err) => {});
    }, [refresh]);

    return (
        <>
            <div className="w-full h-44"></div>
            <div className="flex justify-center content-center">
                <div className="w-1/2 bg-gray-900 rounded-xl p-6">
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
                                    <span className="sr-only">See</span>
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
                                            <Eye
                                                onClick={() => {
                                                    navigate(
                                                        "/all-squad/" + e.id
                                                    );
                                                }}
                                                className="cursor-pointer ml-2"
                                            ></Eye>
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
