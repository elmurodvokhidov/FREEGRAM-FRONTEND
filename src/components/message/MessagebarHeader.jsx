import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function MessagebarHeader({ user, active, modals, handleModal }) {

    const back = () => {
        handleModal("sidebar", !modals.sidebar);
        handleModal("user", false);
    }

    return (
        <section className="w-full flex items-center gap-4 px-2 py-2 pl-4 absolute top-0 shadow-md bg-primary select-none  transition-colors duration-300">
            <button onClick={back} className="lg:hidden text-2xl text-text transition-all hover:text-gray-500">
                <HiOutlineArrowLeft />
            </button>
            <div onClick={() => handleModal("user", !modals.user)} className="flex items-center gap-4 cursor-pointer">
                <img className="size-10 bg-sender rounded-full" src={user?.avatar} alt={user?.fullname} />
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