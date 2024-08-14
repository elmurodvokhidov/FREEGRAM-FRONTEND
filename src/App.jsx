import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import service from "./config/service";
import { authSuccess } from "./redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { io } from "socket.io-client";
import { activeSuccess } from "./redux/slice/userSlice";
import { messageSuccess } from "./redux/slice/messageSlice";
import { NotificationToast } from "./utils/NotificationToast";
import { baseURL } from "./config/api";

export default function App() {
  const { auth } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);
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

  useEffect(() => {
    if (auth?._id) {
      const socket = io(baseURL, { query: { authId: auth._id } });

      socket.on("getActiveUsers", (activeUsers) => {
        dispatch(activeSuccess(activeUsers));
      });

      socket.on("getNewMessage", (message) => {
        toast.custom((t) => <NotificationToast t={t} message={message} />);
        if (user && user._id !== message && message.sender && message.sender._id) return;
        dispatch(messageSuccess({ data: message, type: "push" }));
      });

      return () => {
        socket.off("getActiveUsers");
        socket.off("getNewMessage");
        socket.disconnect();
      };
    }
  }, [auth, dispatch]);

  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        // todo: Foydalanuvchi xaqida ma'lumot olish uchun route qo'shiladi...
      // todo: Foydalanuvchi o'zi haqida ma'lumot olish uchun route qo'shiladi...
      </Routes>
    </main>
  )
}