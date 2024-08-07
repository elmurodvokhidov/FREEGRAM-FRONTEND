import Searchbar from "./Searchbar";
import SidebarFooter from "./SidebarFooter";
import UserComponent from "./UserComponent";

export default function Sidebar({ isSelected, setIsSelected }) {
    return (
        <main className="relative flex flex-col gap-4 w-1/4 h-screen p-2 bg-main-1 shadow-xl z-20">
            <Searchbar />
            <UserComponent isSelected={isSelected} setIsSelected={setIsSelected} />
            <SidebarFooter />
        </main>
    )
}