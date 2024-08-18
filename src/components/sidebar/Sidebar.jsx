import { useState } from "react";
import Searchbar from "./Searchbar";
import SidebarFooter from "./SidebarFooter";
import UserComponent from "./UserComponent";
import { IoIosMenu } from "react-icons/io";
import SidebarModal from "./SidebarModal";
import Archive from "./Archive";
import Settings from "./Settings";

export default function Sidebar({
    isSelected,
    setIsSelected,
    isModal,
    setIsModal,
    theme,
    setTheme,
}) {
    const [search, setSearch] = useState("");
    const [isArchive, setIsArchive] = useState(false);
    const [isSettings, setIsSettings] = useState(false);

    const menuFunction = (e) => {
        e.stopPropagation();
        setIsModal(!isModal);
    }

    return (
        <main className="relative flex flex-col gap-4 w-1/4 h-screen p-2 bg-primary shadow-lg z-20">
            {isArchive && <Archive setIsArchive={setIsArchive} />}
            {isSettings && <Settings setIsSettings={setIsSettings} />}
            <div className="flex items-center gap-2 px-3">
                <button onClick={menuFunction}>
                    <IoIosMenu className="text-[26px] text-text hover:text-gray-500 transition-all" />
                </button>
                <Searchbar search={search} setSearch={setSearch} />
                {isModal && <SidebarModal
                    setIsArchive={setIsArchive}
                    setIsSettings={setIsSettings}
                    theme={theme}
                    setTheme={setTheme}
                />}
            </div>
            <UserComponent
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                search={search}
            />
            <SidebarFooter />
        </main>
    )
}