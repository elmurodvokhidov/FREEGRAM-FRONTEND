import { GoInfo, GoLock, GoPencil } from "react-icons/go";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Settings({ modals, handleModal, setNewAuth }) {
    const { auth } = useSelector(state => state.auth);
    const { active } = useSelector(state => state.user);

    const openUpdateProfileModal = () => {
        handleModal("isUpdate", true);
        setNewAuth(auth);
    }

    return (
        <div className={`${modals.isSettings ? "right-0 z-20" : "-right-full -z-20"} absolute top-0 size-full bg-primary transition-all duration-300`}>
            <header className="w-full absolute top-0 flex items-center justify-between pt-2 pb-4 pl-4 bg-primary">
                <div className="flex items-center gap-8">
                    <button onClick={() => handleModal("isSettings", false)} className="text-2xl text-text transition-all hover:text-gray-500">
                        <HiOutlineArrowLeft />
                    </button>
                    <h1 className="text-xl text-text">Sozlamalar</h1>
                </div>
                <button onClick={openUpdateProfileModal} className="text-xl mr-6 text-text hover:text-gray-500">
                    <GoPencil />
                </button>
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

            <section className="flex flex-col gap-4 px-4">
                <div className="flex items-center gap-6">
                    <span><MdOutlinePhone className="text-2xl text-gray-500" /></span>
                    <p className="text-text">+{auth?.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-6">
                    <span><GoInfo className="text-2xl text-gray-500" /></span>
                    <p className="text-text">{auth?.bio}</p>
                </div>
            </section>

            <footer className="flex flex-col gap-4 px-4 mt-10">
                <button onClick={() => handleModal("privacy", true)} className="flex items-center gap-6">
                    <span><GoLock className="text-2xl text-gray-500" /></span>
                    <p className="text-text">Maxfiylik va xavfsizlik</p>
                </button>
            </footer>
        </div>
    )
}