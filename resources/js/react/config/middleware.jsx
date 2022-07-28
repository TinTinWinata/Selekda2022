import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useUserAuth } from "../hooks/userAuthContext";
import CreateAchievement from "../page/achievement/create";
import Detail from "../page/detail/squadDetail";
import TopSquadDetail from "../page/detail/topSquadDetail";
import Home from "../page/home/home";
import Login from "../page/login/login";
import Play from "../page/play/play";
import LookProfile from "../page/profile/lookProfile";
import Profile from "../page/profile/profile";
import SquadUserView from "../page/squad/user";
import AdminRoute from "./admin";
import AddNavbar from "./navbarfooter";

export default function MiddlewareRoute() {
    const { getUser } = useUserAuth();

    const user = getUser();

    if (!user) {
        return <Login></Login>;
    }

    return (
        <AddNavbar>
            <Routes>
                <Route path="/play" element={<Play />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/all-squad/:id" element={<Detail />}></Route>
                <Route path="/detail" element={<TopSquadDetail />}></Route>
                <Route path="/top-squad" element={<TopSquadDetail />}></Route>
                <Route path="/user/:id" element={<LookProfile />}></Route>

                <Route
                    path="/create-achievement/:id"
                    element={<CreateAchievement />}
                ></Route>
                <Route path="/all-squad" element={<SquadUserView />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/*" element={<AdminRoute></AdminRoute>}></Route>
            </Routes>
            <Footer></Footer>
        </AddNavbar>
    );
}
