import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import Setting from "../Pages/Setting";

const Router =() =>{
    return(
        <BrowserRouter>
            <Routes>
                {/* Auth */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected Route */}
                <Route  element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/setting" element={<Setting />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;