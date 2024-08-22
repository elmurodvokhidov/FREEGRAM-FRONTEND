import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Messagebar from "../components/message/Messagebar";
import Starter from "../components/message/Starter";
import Loader from "../utils/Loader";
import UserInfo from "../components/sidebar/UserInfo";

export default function Dashboard({ modals, handleModal }) {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const { isMessageLoading, messages } = useSelector(state => state.message);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <main onClick={() => handleModal("menu", false)} className="w-full h-screen overflow-hidden flex relative dark:bg-gray-800">
            {isLoading && <Loader />}
            <Sidebar modals={modals} handleModal={handleModal} />
            {
                isMessageLoading ?
                    <div className="relative flex-1 z-0"><Loader /></div> :
                    modals.isSelected ?
                        <Messagebar
                            messages={messages}
                            modals={modals}
                            handleModal={handleModal}
                        /> :
                        <Starter txt={"Xabar yuborishni boshlash uchun suhbatni tanlang"} />
            }
            {modals.userModal && <UserInfo modals={modals} handleModal={handleModal} />}
        </main>
    )
}