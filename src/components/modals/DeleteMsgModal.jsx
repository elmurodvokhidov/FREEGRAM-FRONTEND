export default function DeleteMsgModal({
    modals,
    handleModal,
    submitFunction,
    foundUser,
}) {
    return (
        <div onClick={() => handleModal("deletedmsg", null)} className={`${modals.deletedmsg ? "flex" : "hidden"} fixed top-0 left-0 z-50 size-full items-center justify-center backdrop-blur-[1px] select-none`}>
            <div onClick={(e) => e.stopPropagation()} className="md:max-w-sm max-w-[330px] flex flex-col gap-4 text-text bg-primary rounded-lg p-5 shadow-md">
                <div className="flex items-center gap-4">
                    <img className="size-10 bg-sender rounded-full" src={foundUser?.avatar} alt={foundUser?.fullname} />
                    <h1 className="text-xl">Xabarni o'chirish</h1>
                </div>
                <p>Haqiqatan <span>{foundUser?.fullname}</span> bilan xabar o'chirib tashlansinmi?</p>
                <div className="w-full flex items-center justify-between mt-4">
                    <button onClick={() => handleModal("deletedmsg", null)} className="uppercase px-3 py-1 rounded-lg text-blue-500 transition-colors duration-300 hover:bg-sender">
                        Bekor qilish
                    </button>
                    <button onClick={submitFunction} className="uppercase px-3 py-1 rounded-lg text-red-500 transition-colors duration-300 hover:bg-red-100">
                        O'chirish
                    </button>
                </div>
            </div>
        </div>
    )
}