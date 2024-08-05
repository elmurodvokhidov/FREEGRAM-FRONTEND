import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { authFailure, authLogout, authStart } from "../../redux/slice/authSlice";
import service from "../../config/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SidebarFooter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            dispatch(authStart());
            const { data } = await service.authLogout();
            dispatch(authLogout());
            navigate('/');
            toast.success(data);
        } catch (error) {
            dispatch(authFailure(error?.response?.data));
            toast.error(error?.response?.data?.message || error.message);
        }
    }

    return (
        <footer className="absolute right-2 bottom-4 left-2 flex items-start justify-between p-4 rounded-xl backdrop-blur-lg shadow-smooth">
            <button onClick={handleLogout} className="text-2xl text-gray-500 transition-all hover:text-gray-800"><CiLogout /></button>
            <p className="text-sm text-gray-400">Freegram v1.0.0</p>
        </footer>
    )
}