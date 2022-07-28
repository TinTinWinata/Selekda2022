/* This example requires Tailwind CSS v2.0+ */
import { XCircleOutline } from "heroicons-react";
import React from "react";

export default function Alert({ error }) {
    if (!error) return;

    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleOutline
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5"></div>
                </div>
            </div>
        </div>
    );
}
