import { useEffect, useState } from "react";
import { ImTelegram } from "react-icons/im";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Verify() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        navigate('/dashboard');
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
                <div className="flex items-center text-2xl gap-1 mb-1">
                    <h1 className="text-center text-3xl">+998330040804</h1>
                    <button><RiPencilLine onClick={() => navigate('/register')} /></button>
                </div>
                <p>We have sent you a message via SMS with the code</p>
            </div>

            <form className="max-w-sm mx-auto">
                <div className="relative mb-6">
                    <label
                        htmlFor="code"
                        className="absolute text-sm bg-white -top-1.5 left-3">
                        <span>Code</span>
                        <span className="text-sm text-red-500 ml-1">*</span>
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={(e) => setCode(e.target.value)}
                        type="number"
                        name="code"
                        id="code"
                        className="w-full p-2 rounded-lg border-2 outline-blue-700" />
                </div>

                <button
                    onClick={handleLogin}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 text-center"
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </main>
    )
}