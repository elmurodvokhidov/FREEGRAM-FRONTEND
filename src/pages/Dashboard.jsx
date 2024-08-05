import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Messagebar from "../components/message/Messagebar";
import Starter from "../components/message/Starter";
import HalfRingLoader from "../utils/HalfRingLoader";

export default function Dashboard() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isStarter = true;

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <main className="w-full h-screen overflow-hidden flex">
            {isLoading && <HalfRingLoader />}
            <Sidebar />
            {isStarter ? <Starter /> : <Messagebar />}
        </main>
    )
}