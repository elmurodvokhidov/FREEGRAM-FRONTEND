import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSuccess } from "../../redux/slice/userSlice";
import service from "../../config/service";
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice";
import { useDelay } from "../../hooks/useDelay";
import { showErrorToast } from "../../utils/CustomToasts";
import { PiArchive } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteUserModal from "../modals/DeleteUserModal";

export default function UserComponent({ modals, handleModal, search, setSearch, getUsersFunction }) {
    const { users, active, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const delayedValue = useDelay(search, 500);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, userId: null });

    useEffect(() => {
        getUsersFunction(delayedValue);
    }, [delayedValue]);

    const getMessagesFunction = async (user) => {
        try {
            dispatch(messageStart());
            const { data } = await service.getMessages(user?._id);
            dispatch(messageSuccess({ data, type: "set" }));
            dispatch(userSuccess({ data: user, type: "one" }));
            handleModal("selected", user?._id);
            handleModal("sidebar", false);
            setSearch("");
        } catch (error) {
            dispatch(messageEnd());
            showErrorToast(error.message);
            throw new Error(error);
        }
    }

    const handleRightClick = (event, userId) => {
        event.preventDefault();
        setContextMenu({ visible: true, x: event.clientX, y: event.clientY, userId });
    };

    const handleCloseContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0, userId: null });
    };

    const handleDeleteUser = async () => {
        try {
            handleCloseContextMenu();
            await service.deleteUser(modals.deleteduser);
            dispatch(userSuccess({ data: modals.deleteduser, type: "pull" }));
            handleModal("deleteduser", null);
            if (user && user._id === modals.deleteduser) {
                handleModal("selected", null);
            };
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleArchiveUser = () => {
        console.log("User archived:", contextMenu.userId);
        handleCloseContextMenu();
    };

    return (
        <section className="overflow-y-auto" onClick={handleCloseContextMenu}>
            <DeleteUserModal
                modals={modals}
                handleModal={handleModal}
                title="chat"
                submitFunction={handleDeleteUser}
            />

            {
                users?.length > 0 ?
                    users.map(user => (
                        <div
                            key={user?._id}
                            onClick={() => getMessagesFunction(user)}
                            onMouseLeave={() => handleCloseContextMenu()}
                            onContextMenu={(e) => handleRightClick(e, user?._id)}
                            className={`${modals.selected === user?._id && 'lg:bg-secondary'} flex items-center gap-4 p-2 cursor-pointer rounded hover:bg-secondary select-none transition-all duration-300`}
                        >
                            <img src={user?.avatar} alt={user?.fullname} className="size-12 rounded-full bg-sender" />
                            <div className="flex flex-col">
                                <h4 className="text-base text-text">{user?.fullname}</h4>
                                <p className="text-sm text-gray-400">
                                    {active.includes(user?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                                </p>
                            </div>
                        </div>
                    ))
                    : <h1 className="text-center text-gray-400 text-sm">Foydalanuvchi topilmadi.</h1>
            }

            {contextMenu.visible && (
                <div
                    onMouseEnter={() => setContextMenu({ ...contextMenu, visible: true })}
                    onMouseLeave={() => handleCloseContextMenu()}
                    className="flex flex-col fixed left-4 top-16 p-2 shadow-lg rounded-lg backdrop-blur-3xl bg-none"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button onClick={handleArchiveUser} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                        <span><PiArchive className="text-xl" /></span>
                        <span>Arxivlash</span>
                    </button>
                    <button onClick={() => handleModal("deleteduser", contextMenu.userId)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-red-500">
                        <span><AiOutlineDelete className="text-xl" /></span>
                        <span>O'chirish</span>
                    </button>
                </div>
            )}
        </section>
    )
}