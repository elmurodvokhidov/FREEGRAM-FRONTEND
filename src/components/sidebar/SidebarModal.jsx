import { CiLight, CiSettings } from "react-icons/ci";
import { PiArchive, PiMoonStarsLight } from "react-icons/pi";

export default function SidebarModal({
    setIsArchive,
    setIsSettings,
    theme,
    setTheme,
}) {

    const handleToggleTheme = () => {
        if (theme === "dark") {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
        else if (theme === "light") {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    }

    return (
        <div className="flex flex-col absolute left-4 top-14 p-2 shadow-lg rounded-lg backdrop-blur-3xl">
            <button onClick={() => setIsArchive(true)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><PiArchive className="text-xl" /></span>
                <span className="text-base">Arxiv chatlar</span>
            </button>
            <button onClick={() => setIsSettings(true)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span><CiSettings className="text-xl" /></span>
                <span className="text-base">Sozlamalar</span>
            </button>
            <button onClick={handleToggleTheme} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                <span className="text-xl -rotate-90">
                    {theme === "dark" ? <CiLight /> : theme === "light" ? <PiMoonStarsLight /> : null}
                </span>
                <span className="text-base">
                    {theme === "dark" ? "Kunduzgi rejim" : theme === "light" ? "Tungi rejim" : null}
                </span>
            </button>
        </div>
    )
}