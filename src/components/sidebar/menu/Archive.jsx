import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function Archive({ modals, handleModal }) {
    return (
        <div className={`${modals.archive ? "right-0" : "-right-full"} absolute top-0 z-20 size-full bg-primary transition-all duration-300`}>
            <header className="w-full absolute top-0 flex items-center gap-8 mt-4 pb-4 pl-4 bg-primary">
                <button onClick={() => handleModal("archive", false)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineArrowLeft /></button>
                <h1 className="text-xl text-text">Arxiv chatlar</h1>
            </header>

            <section className="overflow-y-auto mt-16 px-2">
                <div className="flex items-center gap-4 p-2 cursor-pointer rounded hover:bg-secondary transition-all">
                    <img src="https://avatar.iran.liara.run/username?username=Zokir+Norboyev" alt="..." className="size-12" />
                    <div className="flex flex-col">
                        <h4 className="text-base text-text">Zokir Norboyev</h4>
                        <p className="text-sm text-gray-400">
                            <span>offline</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}