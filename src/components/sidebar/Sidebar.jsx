import { useState } from "react";
import Searchbar from "./Searchbar";
import SidebarFooter from "./SidebarFooter";
import UserComponent from "./UserComponent";
import { IoIosMenu } from "react-icons/io";
import SidebarModal from "./SidebarModal";
import Archive from "./Archive";
import Settings from "./Settings";
import UpdateProfile from "./UpdateProfile";
import Privacy from "./Privacy";

export default function Sidebar({ modals, handleModal }) {
    const [search, setSearch] = useState("");
    const [newAuth, setNewAuth] = useState({
        fullname: "",
        phoneNumber: "",
        bio: "",
    });

    const menuFunction = (e) => {
        e.stopPropagation();
        handleModal("menu", !modals.menu);
    }

    return (
        <main className="relative flex flex-col gap-4 w-1/4 h-screen p-2 bg-primary shadow-lg">
            <Archive modals={modals} handleModal={handleModal} />
            <Settings modals={modals} handleModal={handleModal} setNewAuth={setNewAuth} />
            <UpdateProfile modals={modals} handleModal={handleModal} newAuth={newAuth} setNewAuth={setNewAuth} />
            <Privacy modals={modals} handleModal={handleModal} />

            <div className="flex items-center gap-2 px-3">
                <button onClick={menuFunction}>
                    <IoIosMenu className="text-[26px] text-text hover:text-gray-500 transition-all" />
                </button>
                <Searchbar search={search} setSearch={setSearch} />
                {modals.menu && <SidebarModal modals={modals} handleModal={handleModal} />}
            </div>
            <UserComponent modals={modals} handleModal={handleModal} search={search} />
            <SidebarFooter />
        </main>
    )
}