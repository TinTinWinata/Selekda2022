import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import LoadingContextProvider from "./hooks/loadingContext";

if (document.getElementById("root")) {
    ReactDOM.render(
        <>
            <LoadingContextProvider>
                <App />
            </LoadingContextProvider>
        </>,

        document.getElementById("root")
    );
}
