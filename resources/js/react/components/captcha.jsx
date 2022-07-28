/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import React from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../config/toast";

export default function Captcha({ open, setOpen, src, id, callback }) {
    function handleCheck(e) {
        e.preventDefault();

        const data = {
            id: id,
            value: e.target.value.value,
        };

        axios.post("/api/validate-captcha", data).then((resp) => {
            if (resp.data) {
                toastSuccess("Success, captcha is valid!");
                callback();
                setOpen(false);
            } else {
                toastError("Wrong captcha!");
                setOpen(false);
            }
        });
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <form
                            onSubmit={handleCheck}
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my- 8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                        >
                            <div>
                                <div className="flex items-center justify-center h-fit w-fit ">
                                    <img src={src} alt="" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="value"
                                            className="py-2 text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="captcha..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
                                    onClick={() => setOpen(false)}
                                >
                                    I'm not a robot
                                </button>
                            </div>
                        </form>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
