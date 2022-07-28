import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useUserAuth } from "../hooks/userAuthContext";

export default function AddNavbar({ children }) {
    return (
        <>
            <Navbar></Navbar>
            {children}
        </>
    );
}

export function AddFooter({ children }) {
    return (
        <>
            {children}
            <Footer></Footer>
        </>
    );
}
