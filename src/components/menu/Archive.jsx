import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function Archive({ modals, handleModal }) {
    return (
        <div className={`${modals.archive ? "right-0" : "-right-full"} absolute top-0 z-20 size-full bg-primary select-none transition-all duration-300`}>
            <header className="w-full absolute top-0 flex items-center gap-8 mt-4 pb-4 pl-4 bg-primary">
                <button onClick={() => handleModal("archive", false)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineArrowLeft /></button>
                <h1 className="text-xl text-text">Arxiv chatlar</h1>
            </header>

            <section className="overflow-y-auto mt-16 px-4">
                <p className="text-gray-400 text-sm">This feature is coming soon… 🛠️📅</p>
            </section>
        </div>
    )
}