import { CiLight, CiLogout, CiSettings } from "react-icons/ci";
import { PiArchive, PiMoonStarsLight } from "react-icons/pi";
import service from "../../config/service";
import { authFailure, authLogout, authStart } from "../../redux/slice/authSlice";
import { showErrorToast } from "../../utils/CustomToasts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Menu({ modals, handleModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleToggleTheme = () => {
        if (modals.theme === "dark") {
            localStorage.setItem("theme", "light");
            handleModal("theme", "light");
        }
        else if (modals.theme === "light") {
            localStorage.setItem("theme", "dark");
            handleModal("theme", "dark");
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(authStart());
            const { data } = await service.authLogout();
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            dispatch(authFailure(error?.response?.data));
            showErrorToast(error?.response?.data?.message || error.message);
        }
    }


    return (
        <div className="flex flex-col absolute left-4 top-16 p-2 shadow-lg rounded-lg backdrop-blur-3xl select-none">
            <button onClick={() => handleModal("archive", true)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><PiArchive className="text-xl" /></span>
                <span className="text-base">Arxiv chatlar</span>
            </button>
            <button onClick={() => handleModal("settings", true)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><CiSettings className="text-xl" /></span>
                <span className="text-base">Sozlamalar</span>
            </button>
            <button onClick={handleToggleTheme} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span className="text-xl -rotate-90">
                    {modals.theme === "dark" ? <CiLight /> : modals.theme === "light" ? <PiMoonStarsLight /> : null}
                </span>
                <span className="text-base">
                    {modals.theme === "dark" ? "Kunduzgi rejim" : modals.theme === "light" ? "Tungi rejim" : null}
                </span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><CiLogout className="text-xl" /></span>
                <span className="text-base">Chiqish</span>
            </button>
            <p className="text-sm mx-auto py-1 cursor-pointer text-gray-400">Freegram v1.0.0</p>
        </div>
    )
}