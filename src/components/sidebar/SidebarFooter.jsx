import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { authFailure, authLogout, authStart } from "../../redux/slice/authSlice";
import service from "../../config/service";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/CustomToasts";

export default function SidebarFooter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <footer className="absolute right-2 bottom-4 left-2 flex items-start justify-between px-4 py-3 rounded-xl backdrop-blur-lg shadow-lg select-none">
            <button onClick={handleLogout} className="text-2xl text-text transition-all hover:text-gray-500">
                <CiLogout />
            </button>
            <p className="text-sm text-gray-400">Freegram v1.0.0</p>
        </footer>
    )
}