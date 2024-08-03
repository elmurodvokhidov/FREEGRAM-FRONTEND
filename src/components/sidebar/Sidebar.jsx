import Searchbar from "./Searchbar";
import SidebarFooter from "./SidebarFooter";
import UserComponent from "./UserComponent";

export default function Sidebar() {
    return (
        <main className="flex flex-col">
            <Searchbar />
            <UserComponent />
            <SidebarFooter />
        </main>
    )
}