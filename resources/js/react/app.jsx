import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import MiddlewareRoute from "./config/middleware";
import { UserAuthContextProvider } from "./hooks/userAuthContext";
import Login from "./page/login/login";
import Register from "./page/register/register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./config/style.css";
import LoadingContextProvider, { useLoading } from "./hooks/loadingContext";
import { Loading } from "./components/loading";

export default function App() {
    const { loading } = useLoading();

    return (
        <BrowserRouter>
            <ToastContainer></ToastContainer>

                <UserAuthContextProvider>
                    {loading ? <Loading></Loading> : ""}
                    <Routes>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/*" element={<MiddlewareRoute />}></Route>
                    </Routes>
                </UserAuthContextProvider>

        </BrowserRouter>
    );
}
