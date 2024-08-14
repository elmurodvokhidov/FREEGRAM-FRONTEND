export default function MessagebarHeader({ user, active }) {
    return (
        <section className="w-full flex items-center gap-4 px-2 py-1 pl-4 absolute top-0 shadow-smooth bg-main-1">
            <img className="size-10 cursor-pointer" src={user?.avatar} alt={user?.fullname} />
            <div className="flex flex-col">
                <h1 className="text-lg cursor-pointer">{user?.fullname}</h1>
                <p className="text-sm text-gray-400 relative -top-1">
                    {active.includes(user?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                </p>
            </div>
        </section>
    )
}