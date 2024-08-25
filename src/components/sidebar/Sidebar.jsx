import { useState } from "react";
import Searchbar from "./Searchbar";
import UserComponent from "../user/UserComponent";
import { IoIosMenu } from "react-icons/io";
import Menu from "../menu/Menu";
import Archive from "../menu/Archive";
import Settings from "../menu/Settings";
import UpdateProfile from "../menu/UpdateProfile";
import Privacy from "../menu/Privacy";
import Devices from "../menu/Devices";

export default function Sidebar({ modals, handleModal, getUsersFunction }) {
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
        <main className={`${modals.sidebar || !modals.selected ? "left-0" : "-left-full lg:left-0"} absolute z-10 lg:relative flex flex-col gap-4 w-full sm:w-[400px] h-screen p-2 bg-primary shadow-lg transition-all duration-300 overflow-hidden`}>
            <Archive modals={modals} handleModal={handleModal} />
            <Settings modals={modals} handleModal={handleModal} setNewAuth={setNewAuth} />
            <UpdateProfile modals={modals} handleModal={handleModal} newAuth={newAuth} setNewAuth={setNewAuth} />
            <Privacy modals={modals} handleModal={handleModal} />
            <Devices modals={modals} handleModal={handleModal} />

            <div className="flex items-center gap-2 px-3 mt-2">
                <button onClick={menuFunction}>
                    <IoIosMenu className="text-[26px] text-text hover:text-gray-500 transition-all" />
                </button>
                <Searchbar search={search} setSearch={setSearch} />
                {modals.menu && <Menu modals={modals} handleModal={handleModal} />}
            </div>

            <UserComponent
                modals={modals}
                handleModal={handleModal}
                search={search}
                setSearch={setSearch}
                getUsersFunction={getUsersFunction}
            />
        </main>
    )
}