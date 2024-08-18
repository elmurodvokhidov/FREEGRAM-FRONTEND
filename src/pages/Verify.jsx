import { useEffect, useState } from "react";
import { ImTelegram } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authFailure, authStart, authSuccess } from "../redux/slice/authSlice";
import service from "../config/service";
import { GoPencil } from "react-icons/go";
import { showErrorToast } from "../utils/CustomToasts";

export default function Verify({ setVerifyModal, newAuth }) {
    const { isLoading, isLoggedIn, isError } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        if (code === "") {
            dispatch(authFailure({ type: "otp" }));
            showErrorToast("Iltimos kod kiriting");

        }
        else {
            try {
                dispatch(authStart());
                const { data } = await service.verifyAuth(code, newAuth.phoneNumber);
                dispatch(authSuccess(data));
                navigate('/dashboard');
            } catch (error) {
                dispatch(authFailure(error?.response?.data));
                showErrorToast(error?.response?.data?.message || error.message);
            }
        }
    };

    const resetRegistrationFunction = async () => {
        try {
            await service.resetRegistration(newAuth.phoneNumber);
            setVerifyModal(false);
        } catch (error) {
            console.log("Error occurred while resetting registration: ", error);
        }
    }

    useEffect(() => {
        if (isLoggedIn) navigate('/dashboard');
    }, [isLoggedIn, navigate]);

    return (
        <main className="h-screen w-full absolute z-10">
            <div className="w-full flex flex-col items-center my-8">
                <ImTelegram className="text-center text-blue-700 text-9xl mb-4" />
                <div className="flex items-center text-2xl gap-1 mb-1">
                    <h1 className="text-center text-3xl">+998{newAuth.phoneNumber}</h1>
                    <button><GoPencil onClick={resetRegistrationFunction} /></button>
                </div>
                <p>Sizga SMS orqali xabar yubordik</p>
            </div>

            <form className="max-w-sm mx-auto" onSubmit={handleVerify}>
                <div className="relative mb-6">
                    <label
                        htmlFor="code"
                        className="absolute text-sm bg-white -top-2.5 left-3">
                        <span>Code</span>
                        <span className="text-sm text-red-500 ml-1">*</span>
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={(e) => setCode(e.target.value)}
                        type="number"
                        name="code"
                        id="code"
                        className={`${isError?.type === "otp" ? 'border-red-500' : ''} w-full p-2 rounded-lg border-2 outline-blue-700 disabled:bg-gray-100`} />
                </div>

                <button
                    disabled={isLoading}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 text-center disabled:bg-blue-800"
                >
                    {isLoading ? "Yuklanmoqda..." : "Tasdiqlash"}
                </button>
            </form>
        </main>
    )
}