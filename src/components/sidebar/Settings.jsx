import { GoInfo, GoPencil } from "react-icons/go";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Settings({ setIsSettings }) {
    const { auth } = useSelector(state => state.auth);
    const { active } = useSelector(state => state.user);

    return (
        <div className="absolute right-0 size-full z-20 bg-primary">
            <header className="w-full absolute top-0 flex items-center justify-between pt-2 pb-4 pl-4 bg-primary">
                <div className="flex items-center gap-8">
                    <button onClick={() => setIsSettings(false)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineArrowLeft /></button>
                    <h1 className="text-xl text-text">Sozlamalar</h1>
                </div>
                <button className="text-xl mr-6 text-text hover:text-gray-500"><GoPencil /></button>
            </header>

            <main className="flex flex-col items-center gap-4 py-6 mt-14">
                <figure className="size-28 overflow-hidden rounded-full">
                    <img className="size-full object-cover" src={auth?.avatar} alt={auth?.fullname} />
                </figure>
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-semibold text-text">{auth?.fullname}</h1>
                    <p className="text-base text-gray-400">
                        {active.includes(auth?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                    </p>
                </div>
            </main>

            <footer className="flex flex-col gap-4 px-4">
                <div className="flex items-center gap-6">
                    <span><MdOutlinePhone className="text-2xl text-gray-500" /></span>
                    <p className="text-text">+{auth?.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-6">
                    <span><GoInfo className="text-2xl text-gray-500" /></span>
                    <p className="text-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora atque</p>
                </div>
            </footer>
        </div>
    )
}