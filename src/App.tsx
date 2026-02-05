import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Users from "./pages/Users/Users.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<PublicOnlyRoute/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>

                <Route element={<ProtectedRoute/>}>
                    <Route path="/users" element={<Users/>}/>
                </Route>

                <Route path="*" element={<NotFound/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App

const ProtectedRoute = () => {
    const token = localStorage.getItem("accessToken");
    return token ? <Outlet/> : <Navigate to="/" replace/>;
};

const PublicOnlyRoute = () => {
    const token = localStorage.getItem("accessToken");
    return token ? <Navigate to="/users" replace/> : <Outlet/>;
}