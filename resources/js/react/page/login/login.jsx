import axios from "axios";
import { LockClosed } from "heroicons-react";
import React, { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Captcha from "../../components/captcha";
import { toastError, toastSuccess } from "../../config/toast";
import { useUserAuth } from "../../hooks/userAuthContext";
import Alert from "./alert";
import "./login.css";

export default function Login() {
    const { login } = useUserAuth();
    const [error, setError] = useState();
    const [captcha, setCaptcha] = useState();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    function handleCaptcha() {
        axios.get("/api/get-captcha").then((resp) => {
            setCaptcha(resp.data);
            setOpen(true);
        });
    }

    const emailRef = createRef();
    const passwordRef = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        handleCaptcha();
    }

    function handleLogin() {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const request = { email: email, password: password };

        login(request).then((resp) => {
            if (resp.status) {
                navigate("/home");
            } else {
                toastError(resp.data);
            }
        });
    }

    function handleRegister() {
        navigate("/register");
    }

    return (
        <>
            <Captcha
                src={captcha ? captcha.imageUrl : ""}
                open={open}
                setOpen={setOpen}
                id={captcha ? captcha.id : ""}
                callback={handleLogin}
            ></Captcha>
            <div
                id="background"
                className="break-words min-h-screen flex flex-col items-center justify-center bg-black"
            >
                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl border-2 border-gray-200 rounded-3xl p-8  text-white text-xl"
                >
                    <h1 className="text-3xl font-bold mb-5">Sign In</h1>
                    <p>Email</p>
                    <input
                        ref={emailRef}
                        className="block rounded-xl text-lg px-2 py-0.5 text-black"
                        type="email"
                        name="email"
                        placeholder="Email..."
                    />
                    <p className="mt-2">Password</p>
                    <input
                        ref={passwordRef}
                        className="block rounded-xl text-lg px-2 py-0.5 text-black"
                        type="password"
                        name="password"
                        placeholder="Password..."
                    />
                    <p className="text-red-500"></p>
                    <button className="bg-red-800 w-full mt-3 rounded-xl px-3 py-2">
                        Submit
                    </button>
                </form>
                <div
                    id="register"
                    className="lg:bg-red-800 rounded lg:px-5 py-2 mt-5 text-center lg:fixed lg:right-0 lg:bottom-10 text-white"
                >
                    <p className="font-bold">Doesn't have any account yet ? </p>
                    <div
                        className="cursor-pointer pb-1 hover:underline"
                        onClick={handleRegister}
                    >
                        Register
                    </div>
                </div>
            </div>
        </>
    );
}
