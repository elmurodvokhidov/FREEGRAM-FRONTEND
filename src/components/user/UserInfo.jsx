import { GoInfo } from "react-icons/go";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import { useSelector } from "react-redux";

export default function UserInfo({ modals, handleModal }) {
    const { user, active } = useSelector(state => state.user);

    return (
        <div className={`${modals.user ? "right-0 lg:w-[400px]" : "-right-full lg:hidden"} w-full sm:w-[350px] absolute top-0 bottom-0 lg:static flex flex-col gap-4 shadow-xl z-20 px-4 py-4 bg-primary transition-all duration-300`}>
            <header className="flex items-center gap-8">
                <button onClick={() => handleModal("user", !modals.user)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineXMark /></button>
                <h1 className="text-xl text-text">Foydalanuvchi ma'lumotlari</h1>
            </header>

            <main className="flex flex-col items-center gap-4 py-6 mt-2">
                <figure className="size-28 overflow-hidden rounded-full bg-sender">
                    <img className="size-full object-cover" src={user?.avatar} alt={user?.fullname} />
                </figure>
                <div className="flex flex-col items-center">
                    <h1 className="text-xl text-text font-semibold">{user?.fullname}</h1>
                    <p className="text-base text-gray-400">
                        {active.includes(user?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                    </p>
                </div>
            </main>

            <footer className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                    <span><MdOutlinePhone className="text-2xl text-gray-500" /></span>
                    <p className="text-text">+{user?.phoneNumber}</p>
                </div>
                {
                    user && user.bio &&
                    <div className="flex items-center gap-6">
                        <span><GoInfo className="text-2xl text-gray-500" /></span>
                        <p className="text-text">{user?.bio}</p>
                    </div>
                }
            </footer>
        </div>
    )
}