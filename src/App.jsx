import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import service from "./config/service";
import { authSuccess } from "./redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { io } from "socket.io-client";
import { activeSuccess, userEnd, userStart, userSuccess } from "./redux/slice/userSlice";
import { messageSuccess } from "./redux/slice/messageSlice";
import { NotificationToast } from "./utils/NotificationToast";
import { baseURL } from "./config/api";

export default function App() {
  const { auth } = useSelector(state => state.auth);
  const { user, users } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    selected: null,
    user: false,
    menu: false,
    searchbar: false,
    theme: "",
    archive: false,
    settings: false,
    update: false,
    privacy: false,
    sidebar: false,
    deleteduser: null,
    deletedmsg: null,
  });

  const handleModal = (modalName, value) => {
    setModals(prevState => ({ ...prevState, [modalName]: value }));
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      async function getCurrentAuthFunction() {
        try {
          const { data } = await service.getCurrentAuth();
          dispatch(authSuccess(data));
        } catch (error) {
          throw new Error(error);
          navigate('/');
        }
      };
      getCurrentAuthFunction();
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      handleModal("theme", localStorage.getItem("theme"));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      handleModal("theme", "dark");
    } else {
      handleModal("theme", "light");
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      toast.success(
        "Siz yana onlaynsiz!",
        {
          icon: "😊",
          style: {
            background: "var(--primary)",
            color: "var(--text)"
          },
          duration: 7000,
        }
      );
    };

    const handleOffline = () => {
      toast.error(
        "Siz oflaynsiz. Internet aloqangizni tekshiring.",
        {
          icon: "⚠",
          style: {
            background: "var(--primary)",
            color: "var(--text)"
          },
          duration: 7000,
        }
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getUsersFunction = async (delayedValue = "") => {
    try {
      dispatch(userStart());
      const { data } = await service.getUsers(delayedValue);
      dispatch(userSuccess({ data, type: "all" }));
    } catch (error) {
      dispatch(userEnd());
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (auth?._id) {
      const socket = io(baseURL, { query: { authId: auth?._id } });
      const currentSelectedUser = user && user._id;

      socket.on("getActiveUsers", (activeUsers) => {
        dispatch(activeSuccess(activeUsers));
      });

      socket.on("getNewMessage", (data) => {
        if (currentSelectedUser === data.sender) {
          dispatch(messageSuccess({ data: data.newMessage, type: "push" }));
        } else {
          toast.custom((t) => <NotificationToast t={t} message={data.newMessage} handleModal={handleModal} />);
        }
        if (!users.find(user => user._id === data.sender)) {
          getUsersFunction();
        }
      });

      socket.on("messageDeleted", (data) => {
        if (currentSelectedUser === data.sender || currentSelectedUser === data.receiver) {
          dispatch(messageSuccess({ data: data.messageId, type: "pull" }));
        }
      });

      socket.on("conversationDeleted", (deletedUser) => {
        dispatch(userSuccess({ data: deletedUser, type: "pull" }));
        if (currentSelectedUser === deletedUser) {
          handleModal("selected", null);
        }
      });

      return () => {
        socket.off("getActiveUsers");
        socket.off("getNewMessage");
        socket.off("messageDeleted");
        socket.off("conversationDeleted");
        socket.disconnect();
      };
    }
  }, [auth, user, dispatch]);

  return (
    <main className={modals.theme}>
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard modals={modals} handleModal={handleModal} getUsersFunction={getUsersFunction} />} />
      </Routes>
    </main>
  )
}