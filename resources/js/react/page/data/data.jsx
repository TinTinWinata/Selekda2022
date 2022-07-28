import React from "react";
import { Link } from "react-router-dom";

export default function Data() {
    return (
        <>
            <div className="w-full h-44"></div>
            <div className="flex justify-center content-center flex-wrap">
                <Link
                    to="/banner"
                    className="ml-20 mt-10 w-[400px] min-h-[300px] bg-gray-900 rounded-xl p-8 hover:p-12 cursor-pointer transition-all"
                >
                    <h1 className="text-2xl font-bold">Banner Management</h1>
                    <p className="text-xl">
                        Managing bord data, Editing banners for better lookings!
                    </p>
                </Link>
                <Link
                    to="/user"
                    className="ml-20 mt-10 w-[400px] min-h-[300px] bg-gray-900 rounded-xl p-8 hover:p-12 cursor-pointer transition-all"
                >
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-xl">
                        Managing user data, creating User beyond the web!
                    </p>
                </Link>
                <Link
                    to="/squad"
                    className="ml-20 mt-10 w-[400px] min-h-[300px] bg-gray-900 rounded-xl p-8 hover:p-12 cursor-pointer transition-all"
                >
                    <h1 className="text-2xl font-bold">Squad Managemenet</h1>
                    <p className="text-xl">
                        Managing squad data, creating squad data for better
                        knowledge!
                    </p>
                </Link>
            </div>
        </>
    );
}
