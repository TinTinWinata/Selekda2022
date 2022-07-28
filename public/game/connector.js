const TOKEN_KEY = "95thy5EJw6Lz6TSDKkkI95thy5EJw6Lz6TSDKkkI";
const USER_KEY = "WpltVOv8JQqqkFa22PBeWpltVOv8JQqqkFa22PBe";

const USER = getUserLocal();

if (!USER) {
    window.location.replace("/login");
}

function getUserLocal() {
    const user = localStorage.getItem(USER_KEY);
    if (!user || user === "undefined") {
        return false;
    }
    return JSON.parse(user);
}
