import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Messagebar from "../components/message/Messagebar";
import Starter from "../components/message/Starter";
import Loader from "../utils/Loader";
import UserInfo from "../components/user/UserInfo";

export default function Dashboard({ modals, handleModal, getUsersFunction }) {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const { isMessageLoading, messages } = useSelector(state => state.message);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <main onClick={() => handleModal("menu", false)} className="w-full h-screen overflow-hidden flex relative">
            {isLoading && <Loader />}
            <Sidebar modals={modals} handleModal={handleModal} getUsersFunction={getUsersFunction} />
            {
                isMessageLoading ?
                    <div className="relative flex-1 z-0"><Loader /></div> :
                    modals.selected ?
                        <Messagebar
                            messages={messages}
                            modals={modals}
                            handleModal={handleModal}
                            getUsersFunction={getUsersFunction}
                        /> :
                        <Starter txt={"Xabar yuborishni boshlash uchun suhbatni tanlang"} />
            }
            <UserInfo modals={modals} handleModal={handleModal} />
        </main>
    )
}