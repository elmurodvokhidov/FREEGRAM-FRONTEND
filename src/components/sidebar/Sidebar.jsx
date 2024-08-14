import { useState } from "react";
import Searchbar from "./Searchbar";
import SidebarFooter from "./SidebarFooter";
import UserComponent from "./UserComponent";
import { CiMenuBurger } from "react-icons/ci";

export default function Sidebar({ isSelected, setIsSelected }) {
    const [search, setSearch] = useState("");

    return (
        <main className="relative flex flex-col gap-4 w-1/4 h-screen p-2 bg-main-1 shadow-xl z-20">
            <div className="flex items-center gap-2">
                <button><CiMenuBurger className="text-2xl text-gray-500 hover:text-gray-800 transition-all" /></button>
                <Searchbar search={search} setSearch={setSearch} />
            </div>
            <UserComponent isSelected={isSelected} setIsSelected={setIsSelected} search={search} />
            <SidebarFooter />
        </main>
    )
}