import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "../../redux/slice/authSlice";
import service from "../../config/service";
import toast from "react-hot-toast";
import { useState } from "react";

export default function UpdateProfile({ modals, handleModal, newAuth, setNewAuth }) {
    const { auth, isError } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const getAuthCred = (e) => {
        setNewAuth({ ...newAuth, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await service.updateAuth(newAuth._id, newAuth);
            dispatch(authSuccess(data));
            setNewAuth(data);
            toast.success(
                "Muvaffaqiyatli saqlandi.",
                {
                    icon: "✔",
                    style: {
                        background: "var(--primary)",
                        color: "var(--text)"
                    },
                    duration: 3000,
                }
            );
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`${modals.update ? "right-0" : "-right-full"} absolute top-0 z-30 size-full bg-primary transition-all duration-300`}>
            <header className="w-full absolute top-0 flex items-center justify-between mt-4 pb-4 pl-4 bg-primary select-none">
                <div className="flex items-center gap-8">
                    <button onClick={() => handleModal("update", false)} className="text-2xl text-text transition-all hover:text-gray-500">
                        <HiOutlineArrowLeft />
                    </button>
                    <h1 className="text-xl text-text">Profilni tahrirlash</h1>
                </div>
            </header>

            <main className="flex flex-col items-center gap-4 py-6 mt-16">
                <figure className="size-28 overflow-hidden rounded-full mb-6 select-none bg-sender">
                    <img className="size-full object-cover" src={auth?.avatar} alt={auth?.fullname} />
                </figure>

                <form className="w-full" onSubmit={handleUpdate}>
                    <div className="relative mb-6 mx-4">
                        <label
                            htmlFor="fullname"
                            className="absolute text-sm bg-primary text-text -top-2.5 left-3 select-none">
                            <span>Ism (F.I.)</span>
                            <span className="text-sm text-red-500 ml-1">*</span>
                        </label>
                        <input
                            disabled={isLoading}
                            onChange={getAuthCred}
                            value={newAuth.fullname}
                            type="text"
                            name="fullname"
                            id="fullname"
                            className={`${isError?.type === "fullname" ? 'border-red-500' : ''} w-full p-2 rounded-lg border-2 bg-primary text-text outline-blue-700 disabled:bg-secondary`} />
                    </div>

                    <div className="relative mb-6 mx-4">
                        <label
                            htmlFor="bio"
                            className="absolute text-sm bg-primary text-text -top-2.5 left-3 select-none">
                            <span>Tarjimayi hol</span>
                        </label>
                        <textarea
                            name="bio"
                            id="bio"
                            rows="4"
                            value={newAuth.bio}
                            disabled={isLoading}
                            onChange={getAuthCred}
                            maxLength={80}
                            className="w-full resize-none p-2 rounded-lg border-2 bg-primary text-text outline-blue-700 disabled:bg-secondary"
                        ></textarea>
                    </div>

                    <div className="flex flex-col text-text bg-secondary p-4 mb-6 text-[13px] select-none">
                        <p>Har qanday tafsilotlar, masalan, yosh, ish joyi yoki shahar.</p>
                        <p>Namuna: 23 yosh. Dizayner. Jizzaxdan.</p>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-[92%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 py-2.5 mb-1 disabled:bg-blue-800 select-none"
                    >
                        {isLoading ? "Yuklanmoqda..." : "Saqlash"}
                    </button>
                </form>
            </main>
        </div>
    )
}