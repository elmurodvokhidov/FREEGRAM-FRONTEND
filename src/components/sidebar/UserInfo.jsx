import { GoInfo } from "react-icons/go";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import { useSelector } from "react-redux";

export default function UserInfo({
    userModal,
    setUserModal,
}) {
    const { user, active } = useSelector(state => state.user);

    return (
        <div className="w-1/4 flex flex-col gap-4 relative shadow-xl z-20 px-4 py-3 bg-primary">
            <header className="flex items-center gap-8">
                <button onClick={() => setUserModal(!userModal)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineXMark /></button>
                <h1 className="text-xl text-text">Foydalanuvchi ma'lumotlari</h1>
            </header>

            <main className="flex flex-col items-center gap-4 py-6">
                <figure className="size-28 overflow-hidden rounded-full">
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
                <div className="flex items-center gap-6">
                    <span><GoInfo className="text-2xl text-gray-500" /></span>
                    <p className="text-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora atque</p>
                </div>
            </footer>
        </div>
    )
}