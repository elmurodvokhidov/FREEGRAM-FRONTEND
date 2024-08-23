import { CiLight, CiSettings } from "react-icons/ci";
import { PiArchive, PiMoonStarsLight } from "react-icons/pi";

export default function Menu({ modals, handleModal }) {

    const handleToggleTheme = () => {
        if (modals.theme === "dark") {
            localStorage.setItem("theme", "light");
            handleModal("theme", "light");
        }
        else if (modals.theme === "light") {
            localStorage.setItem("theme", "dark");
            handleModal("theme", "dark");
        }
    }

    return (
        <div className="flex flex-col absolute left-4 top-16 p-2 shadow-lg rounded-lg backdrop-blur-3xl">
            <button onClick={() => handleModal("archive", true)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><PiArchive className="text-xl" /></span>
                <span className="text-base">Arxiv chatlar</span>
            </button>
            <button onClick={() => handleModal("settings", true)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><CiSettings className="text-xl" /></span>
                <span className="text-base">Sozlamalar</span>
            </button>
            <button onClick={handleToggleTheme} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span className="text-xl -rotate-90">
                    {modals.theme === "dark" ? <CiLight /> : modals.theme === "light" ? <PiMoonStarsLight /> : null}
                </span>
                <span className="text-base">
                    {modals.theme === "dark" ? "Kunduzgi rejim" : modals.theme === "light" ? "Tungi rejim" : null}
                </span>
            </button>
        </div>
    )
}