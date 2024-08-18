import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Messagebar from "../components/message/Messagebar";
import Starter from "../components/message/Starter";
import Loader from "../utils/Loader";
import UserInfo from "../components/sidebar/UserInfo";

export default function Dashboard({ theme, setTheme }) {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const { isMessageLoading, messages } = useSelector(state => state.message);
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(null);
    const [userModal, setUserModal] = useState(false);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <main onClick={() => setIsModal(false)} className="w-full h-screen overflow-hidden flex relative dark:bg-gray-800">
            {isLoading && <Loader />}
            <Sidebar
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                isModal={isModal}
                setIsModal={setIsModal}
                theme={theme}
                setTheme={setTheme}
            />
            {
                isMessageLoading ?
                    <div className="relative flex-1 z-0"><Loader /></div> :
                    isSelected ?
                        <Messagebar
                            messages={messages}
                            userModal={userModal}
                            setUserModal={setUserModal}
                            theme={theme}
                        /> :
                        <Starter txt={"Xabar yuborishni boshlash uchun suhbatni tanlang"} />
            }
            {userModal && <UserInfo userModal={userModal} setUserModal={setUserModal} />}
        </main>
    )
}