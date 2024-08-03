import { useEffect, useState } from "react";
import { ImTelegram } from "react-icons/im";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [auth, setAuth] = useState({
        fullname: "",
        phoneNumber: "",
        password: "",
    });

    const getAuthCred = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        navigate('/verify');
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    return (
        <main className="h-screen w-full absolute z-10">
            <div className="w-full flex flex-col items-center my-8">
                <ImTelegram className="text-center text-blue-700 text-9xl mb-4" />
                <h1 className="text-center text-3xl">Sign up to Freegram</h1>
            </div>

            <form className="max-w-sm mx-auto">
                <div className="relative mb-6">
                    <label
                        htmlFor="fullname"
                        className="absolute text-sm bg-white -top-1.5 left-3">
                        <span>Fullname</span>
                        <span className="text-sm text-red-500 ml-1">*</span>
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={getAuthCred}
                        type="text"
                        name="fullname"
                        id="fullname"
                        className="w-full p-2 rounded-lg border-2 outline-blue-700" />
                </div>

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
                            className="w-20 text-base border-2 border-r-0 rounded-l-lg px-4 py-2">
                            +998
                        </label>
                        <input
                            disabled={isLoading}
                            onChange={getAuthCred}
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="w-full border-2 rounded-lg rounded-l-none p-2 outline-blue-700"
                        />
                    </div>
                </div>

                <div className="relative mb-8">
                    <label
                        htmlFor="password"
                        className="absolute text-sm bg-white -top-1.5 left-3">
                        <span>Parol</span>
                        <span className="text-sm text-red-500 ml-1">*</span>
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={getAuthCred}
                        type={showPass ? "text" : "password"}
                        name="password"
                        id="password"
                        className="w-full p-2 rounded-lg border-2 outline-blue-700" />
                    <button
                        type='button'
                        onClick={() => setShowPass(!showPass)}
                        className='absolute top-2.5 right-2.5 text-xl text-gray-500'
                    >
                        {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                </div>

                <button
                    onClick={handleRegister}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 text-center"
                >
                    {isLoading ? "Loading..." : "Ro'yhatdan o'tish"}
                </button>

                <div className="flex justify-end">
                    <Link to={"/"} className="text-blue-500 hover:underline">
                        Hisobga kirish
                    </Link>
                </div>
            </form>
        </main>
    )
}