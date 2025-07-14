import { Navigate } from "react-router-dom";

function ProtRoute({children}){
    let loggedIn = localStorage.getItem("isAdmin") == "true";
   return loggedIn ? children : <Navigate to="/" replace />;
}

export default ProtRoute;