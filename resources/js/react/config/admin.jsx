import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUserAuth } from "../hooks/userAuthContext";
import Banner from "../page/banner/banner";
import CreateBanner from "../page/banner/create";
import EditBanner from "../page/banner/edit";
import Data from "../page/data/data";
import Login from "../page/login/login";
import CreateSquad from "../page/squad/create";
import CreateSquadMember from "../page/squad/create-member";
import EditSquad from "../page/squad/edit";
import EditSquadMember from "../page/squad/edit-member";
import SquadMember from "../page/squad/member";
import TeamSquad from "../page/squad/squad";
import CreateUser from "../page/users/create";
import EditUser from "../page/users/edit";
import ManageUser from "../page/users/user";
import Play from "../page/play/play";

export default function AdminRoute() {
    const { getUser } = useUserAuth();

    const user = getUser();

    if (user.role === "member") {
        return <Login></Login>;
    }

    return (
        <Routes>
            <Route path="/data" element={<Data />}></Route>
            <Route path="/banner" element={<Banner />}></Route>
            <Route path="/create-banner" element={<CreateBanner />}></Route>
            <Route path="/edit-banner/:id" element={<EditBanner />}></Route>
            <Route path="/squad" element={<TeamSquad />}></Route>
            <Route path="/user" element={<ManageUser />}></Route>
            <Route path="/create-squad" element={<CreateSquad />}></Route>
            <Route path="/edit-squad/:id" element={<EditSquad />}></Route>
            <Route path="/squad-member/:id" element={<SquadMember />}></Route>
            <Route path="/create-user" element={<CreateUser />}></Route>


            <Route path="/edit-user/:id" element={<EditUser />}></Route>
            <Route
                path="/create-squad-member/:id"
                element={<CreateSquadMember />}
            ></Route>
            <Route
                path="/edit-squad-member/:id"
                element={<EditSquadMember />}
            ></Route>
        </Routes>
    );
}
