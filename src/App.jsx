import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import service from "./config/service";
import { authSuccess } from "./redux/slice/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      async function getCurrentAuthFunction() {
        try {
          const { data } = await service.getCurrentAuth();
          dispatch(authSuccess(data));
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      };
      getCurrentAuthFunction();
    };
  }, []);

  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  )
}