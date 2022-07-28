import axios from "axios";
import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar";
import DisplayLeaderboard from "./displayLeaderboard";

export default function Play() {
    function handlePlay() {
        window.location.replace("/game/index.html");
    }

    return (
        <>
            <Topbar></Topbar>

            <div className="flex justify-center mb-10 mt-10">
                <button
                    onClick={handlePlay}
                    className="rounded px-5 py-2 min-w-[150px]"
                >
                    Play
                </button>
            </div>

            <DisplayLeaderboard></DisplayLeaderboard>
        </>
    );
}
