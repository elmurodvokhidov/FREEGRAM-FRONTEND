import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function Devices({ modals, handleModal }) {
    return (
        <div className={`${modals.devices ? "right-0" : "-right-full"} absolute top-0 z-30 size-full bg-primary select-none transition-all duration-300`}>
            <header className="w-full absolute top-0 flex items-center gap-8 mt-4 pb-4 pl-4 bg-primary">
                <button onClick={() => handleModal("devices", false)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineArrowLeft /></button>
                <h1 className="text-xl text-text">Qurilmalar</h1>
            </header>

            <section className="text-gray-400 text-sm mt-16 px-4">This feature is coming soon… 🛠️📅</section>
        </div>
    )
}