import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "heroicons-react";
import { toastError } from "../../config/toast";

export default function DisplayLeaderboard() {
    const [page, setPage] = useState(1);
    const [leaderboard, setLeaderboard] = useState([]);
    const [data, setData] = useState();
    const paginate = 8;
    useEffect(() => {
        getData(page);
    }, []);

    function getData(n) {
        axios
            .get(`/api/paginate-leaderboard/${paginate}?page=${n}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data);
                    setLeaderboard(resp.data.data);
                }
            });
    }

    function handleNext() {
        if (page >= data.last_page) {
            toastError("You already reach the last page!");
            return;
        }
        setData();
        getData(page + 1);
        setPage((prev) => prev + 1);
    }

    function handlePrev() {
        if (page <= 1) {
            toastError("This is the first page");
            return;
        }
        setData();
        getData(page - 1);
        setPage((prev) => prev - 1);
    }

    return (
        <>
            <div className="flex justify-center content-center">
                <div className="w-1/2 bg-gray-900 rounded-xl p-6">
                    <div className="flex flex-col w-fit"></div>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-900">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Username
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Score
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Lifetime
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                >
                                    Time
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((e, idx) => (
                                <tr
                                    key={idx}
                                    className={
                                        idx % 2 === 0
                                            ? "bg-gray-900"
                                            : "bg-gray-800"
                                    }
                                >
                                    <td className="px-6 py-4 grayspace-nowrap text-sm font-medium text-gray-200">
                                        {e.user.username}
                                    </td>
                                    <td className="px-6 py-4 grayspace-nowrap text-sm text-gray-200">
                                        {e.score}
                                    </td>
                                    <td className="px-6 py-4 grayspace-nowrap text-sm text-gray-200">
                                        {e.lifetime}
                                    </td>
                                    <td className="px-6 py-4 grayspace-nowrap text-sm text-gray-200">
                                        {e.date}
                                    </td>
                                    <td className="px-6 py-4 grayspace-nowrap text-right text-sm font-medium">
                                        <div className="flex">
                                            <Eye className="cursor-pointer ml-2"></Eye>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div
                        className="mt-5 bg-gray-900
                         px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6"
                        aria-label="Pagination"
                    >
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-200">
                                Showing{" "}
                                <span className="font-medium">
                                    {data ? data.current_page : ""}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium">
                                    {data ? data.per_page : ""}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                    {data ? data.last_page : ""}
                                </span>{" "}
                                results
                            </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                            <button
                                onClick={handlePrev}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-200 bg-gray-900 hover:bg-gray-800"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-200 bg-gray-900 hover:bg-gray-800"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
