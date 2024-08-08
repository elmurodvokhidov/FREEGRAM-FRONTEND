import { useEffect, useState } from "react";
import { ImTelegram } from "react-icons/im";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authFailure, authStart, authSuccess } from "../redux/slice/authSlice";
import service from "../config/service";
import toast from "react-hot-toast";

export default function Login() {
    const { isLoading, isLoggedIn, isError } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [newAuth, setNewAuth] = useState({
        phoneNumber: "",
        password: "",
    });

    const getAuthCred = (e) => {
        setNewAuth({ ...newAuth, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (newAuth.phoneNumber === "") {
            dispatch(authFailure({ type: "phone" }));
            toast.error("Iltimos telefon raqam kiriting");
        }
        else if (newAuth.password === "") {
            dispatch(authFailure({ type: "password" }));
            toast.error("Iltimos parol kiriting");
        }
        else {
            try {
                dispatch(authStart());
                const { data } = await service.authLogin({ ...newAuth, phoneNumber: `998${newAuth.phoneNumber}` });
                dispatch(authSuccess(data));
                navigate('/dashboard');
            } catch (error) {
                dispatch(authFailure(error?.response?.data));
                toast.error(error?.response?.data?.message || error.message);
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) navigate('/dashboard');
    }, [isLoggedIn, navigate]);

    return (
        <main onClick={() => dispatch(authFailure())} className="h-screen w-full absolute z-10">
            <div className="w-full flex flex-col items-center my-8">
                <ImTelegram className="text-center text-blue-700 text-9xl mb-4" />
                <h1 className="text-center text-3xl">Freegram hisobingizga kiring</h1>
            </div>

            <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
                <div className="flex flex-col relative mb-6">
                    <label
                        htmlFor="phoneNumber"
                        className="absolute text-sm bg-white -top-3 left-3">
                        <span>Telefon</span>
                        <span className="text-base text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex">
                        <label
                            htmlFor="phoneNumber"
                            className="w-20 text-base border-2 border-r-0 rounded-l px-4 py-2">
                            +998
                        </label>
                        <input
                            disabled={isLoading}
                            onChange={getAuthCred}
                            value={newAuth.phoneNumber}
                            type="text"
                            maxLength="9"
                            name="phoneNumber"
                            id="phoneNumber"
                            className={`${isError?.type === "phone" ? 'border-red-500' : ''} w-full border-2 rounded-lg rounded-l-none px-2 py-2 outline-blue-700 disabled:bg-gray-100`}
                        />
                    </div>
                </div>

                <div className="relative mb-8">
                    <label
                        htmlFor="password"
                        className="absolute text-sm bg-white -top-2.5 left-3">
                        <span>Parol</span>
                        <span className="text-sm text-red-500 ml-1">*</span>
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={getAuthCred}
                        type={showPass ? "text" : "password"}
                        name="password"
                        id="password"
                        className={`${isError?.type === "password" ? 'border-red-500' : ''} w-full p-2 rounded-lg border-2 outline-blue-700 disabled:bg-gray-100`} />
                    <button
                        type='button'
                        onClick={() => setShowPass(!showPass)}
                        className='absolute top-2.5 right-2.5 text-xl text-gray-500'
                    >
                        {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                </div>

                <button
                    disabled={isLoading}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 text-center disabled:bg-blue-800"
                >
                    {isLoading ? "Yuklanmoqda..." : "Hisobga kirish"}
                </button>

                <div className="flex justify-end">
                    <Link to={"/register"} className="text-blue-500 hover:underline">
                        Ro'yhatdan o'tish
                    </Link>
                </div>
            </form>
        </main>
    )
}