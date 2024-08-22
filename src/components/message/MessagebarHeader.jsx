export default function MessagebarHeader({ user, active, modals, handleModal }) {
    return (
        <section className="w-full flex items-center gap-4 px-2 py-1 pl-4 absolute top-0 shadow-md bg-primary">
            <div onClick={() => handleModal("userModal", !modals.userModal)} className="flex items-center gap-4 cursor-pointer">
                <img className="size-10" src={user?.avatar} alt={user?.fullname} />
                <div className="flex flex-col">
                    <h1 className="text-base text-text font-semibold">{user?.fullname}</h1>
                    <p className="text-sm text-gray-400">
                        {active.includes(user?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                    </p>
                </div>
            </div>
        </section>
    )
}