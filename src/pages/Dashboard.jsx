import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Messagebar from "../components/message/Messagebar";
import Starter from "../components/message/Starter";
import HalfRingLoader from "../utils/HalfRingLoader";

export default function Dashboard() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const { isMessageLoading, messages } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <main className="w-full h-screen overflow-hidden flex relative">
            {isLoading && <HalfRingLoader />}
            <Sidebar isSelected={isSelected} setIsSelected={setIsSelected} />
            {
                isMessageLoading ?
                    <div className="relative flex-1 z-0">
                        <HalfRingLoader />
                    </div>
                    : isSelected ? <Messagebar messages={messages} /> : <Starter txt={"Xabar yuborishni boshlash uchun suhbatni tanlang"} />
            }
        </main>
    )
}