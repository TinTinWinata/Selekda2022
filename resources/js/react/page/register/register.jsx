import axios from "axios";
import React, { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Captcha from "../../components/captcha";
import { toastError, toastSuccess } from "../../config/toast";
import { useUserAuth } from "../../hooks/userAuthContext";

export default function Register() {
    const { register } = useUserAuth();
    const navigate = useNavigate();
    const imageUrl = "/assets/register-bg.jpg";

    const emailRef = createRef();
    const usernameRef = createRef();
    const passwordRef = createRef();
    const nameRef = createRef();
    const phoneRef = createRef();
    const dobRef = createRef();

    const [error, setError] = useState();
    const [open, setOpen] = useState(false);
    const [captcha, setCaptcha] = useState();

    function handleCaptcha() {
        axios.get("/api/get-captcha").then((resp) => {
            setCaptcha(resp.data);
            setOpen(true);
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleCaptcha();
    }

    function handleRegister() {
        const user = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            dob: dobRef.current.value,
        };

        register(user).then((resp) => {
            if (resp.status === true) {
                toastSuccess("Succesfully created data!");
                navigate("/login");
            } else {
                if (resp.data) setError(resp.data);
                toastError(resp.data);
            }
        });
    }

    function handleLogin() {
        navigate("/login");
    }

    return (
        <>
            <Captcha
                src={captcha ? captcha.imageUrl : ""}
                open={open}
                setOpen={setOpen}
                id={captcha ? captcha.id : ""}
                callback={handleRegister}
            ></Captcha>

            <div className="min-h-screen flex">
                <div
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    id="register-background"
                    className="hidden lg:block w-4/6 bg-cover"
                ></div>

                <div className="hidden lg:block w-0 border-l border-gray-100"></div>
                <div className="bg-gray-900 w-full lg:w-2/6 flex justify-center items-center text-white">
                    <form onSubmit={handleSubmit} action="flex flex-column">
                        <h1 className="font-bold text-2xl mb-4">
                            Create Your Gaming Account
                        </h1>
                        <p>Email</p>
                        <input
                            ref={emailRef}
                            className="block rounded-lg w-full text-lg px-2 py-0.5 text-black"
                            type="email"
                            name="email"
                            placeholder="tintin@gmail.com"
                        />
                        <p className="mt-3">Username</p>
                        <input
                            ref={usernameRef}
                            className="block rounded-lg w-full text-lg px-2 py-0.5 text-black"
                            type="text"
                            name="username"
                            placeholder="TinTin Winata"
                        />
                        <p className="mt-3">Name</p>
                        <input
                            ref={nameRef}
                            className="block rounded-lg w-full text-lg px-2 py-0.5 text-black"
                            type="text"
                            name="name"
                            placeholder="TinTin Winata"
                        />
                        <p className="mt-3">Password</p>
                        <input
                            ref={passwordRef}
                            className="block rounded-lg w-full text-lg px-2 py-0.5 text-black"
                            type="password"
                            name="password"
                            placeholder="**********"
                        />
                        <p className="mt-3">Phone Number</p>
                        <input
                            ref={phoneRef}
                            className="block rounded-lg w-full text-lg px-2 py-0.5 text-black"
                            type="text"
                            name="phonenumber"
                            placeholder="087878766893"
                        />
                        <p className="mt-3">Date Of Birth</p>
                        <input
                            ref={dobRef}
                            className="block rounded-lg w-full text-lg px-2 py-0.5 text-black"
                            type="date"
                            name="dob"
                            placeholder="Date Of Birth"
                        />
                        <button className="mt-10 bg-red-800 w-full rounded-xl px-3 py-2">
                            Submit
                        </button>
                        <div
                            id="register"
                            className="lg:hidden block mt-5 text-center  text-white"
                        >
                            <p className="font-bold ">
                                Already have account ?{" "}
                            </p>
                            <button
                                className="hover:underline"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div
                    id="register"
                    className="hidden lg:block bg-red-800 rounded px-5 py-2 mt-5 text-center fixed left-0 bottom-10 text-white"
                >
                    <p className="font-bold ">Already have account ? </p>
                    <div
                        className="cursor-pointer pb-1 hover:underline "
                        onClick={handleLogin}
                    >
                        Login
                    </div>
                </div>
            </div>
        </>
    );
}
