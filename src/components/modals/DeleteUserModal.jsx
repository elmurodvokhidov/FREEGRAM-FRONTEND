import { useSelector } from "react-redux";

export default function DeleteUserModal({
    modals,
    handleModal,
    submitFunction,
}) {
    const { users } = useSelector(state => state.user);
    const foundUser = users.find(user => user._id === modals.deleteduser);

    return (
        <div onClick={() => handleModal("deleteduser", null)} className={`${modals.deleteduser ? "flex" : "hidden"} fixed top-0 left-0 z-50 size-full items-center justify-center backdrop-blur-[2px] select-none`}>
            <div onClick={(e) => e.stopPropagation()} className="md:max-w-sm max-w-[330px] flex flex-col gap-4 text-text bg-primary rounded-lg p-5 shadow-lg">
                <div className="flex items-center gap-4">
                    <img className="size-10 bg-sender rounded-full" src={foundUser?.avatar} alt={foundUser?.fullname} />
                    <h1 className="text-xl">Chatni o'chirish</h1>
                </div>
                <p>Haqiqatan <span>{foundUser?.fullname}</span> bilan chat o'chirib tashlansinmi?</p>
                <div className="w-full flex items-center justify-between mt-2">
                    <button onClick={() => handleModal("deleteduser", null)} className="uppercase px-3 py-1 rounded-lg text-blue-500 transition-colors duration-300 hover:bg-sender">
                        Bekor qilish
                    </button>
                    <button onClick={submitFunction} className="uppercase px-3 py-1 rounded-lg text-red-500 transition-colors duration-300 hover:bg-[#ef444444]">
                        Chatni O'chirish
                    </button>
                </div>
            </div>
        </div>
    )
}