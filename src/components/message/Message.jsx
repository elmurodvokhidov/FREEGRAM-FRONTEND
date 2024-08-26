import { useDispatch, useSelector } from "react-redux";
import { extractTime } from "../../config/extractTime";
import { useState, useRef, useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import service from "../../config/service";
import { messageSuccess } from "../../redux/slice/messageSlice";
import { showToast } from "../../utils/CustomToasts";

export default function Message({ msg, customRef }) {
    const { auth } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isSender = auth?._id === msg?.sender?._id;
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, messageId: null, });
    const menuRef = useRef(null);

    const handleRightClick = useCallback((event, messageId) => {
        event.preventDefault();
        const menuWidth = menuRef.current?.offsetWidth || 0;
        const menuHeight = menuRef.current?.offsetHeight || 0;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let x = event.clientX;
        let y = event.clientY;

        if (x + menuWidth > screenWidth) {
            x = screenWidth - (menuWidth + 5);
        }
        if (y + menuHeight > screenHeight) {
            y = screenHeight - (menuHeight + 5);
        }

        setContextMenu({ visible: true, x, y, messageId });
    }, []);

    const handleCloseContextMenu = useCallback(() => {
        setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
    }, []);

    const handleUpdate = useCallback(() => {
        console.log("updated:", contextMenu.messageId);
        handleCloseContextMenu();
    }, [contextMenu.messageId, handleCloseContextMenu]);

    const handleCopy = useCallback((message) => {
        navigator.clipboard.writeText(message);
        handleCloseContextMenu();
    }, [handleCloseContextMenu]);

    const handleDeleteMsg = async () => {
        try {
            await service.deleteMessage(contextMenu.messageId);
            const { data } = await service.getMessages(user?._id);
            dispatch(messageSuccess({ data, type: "set" }));
            handleCloseContextMenu();
        } catch (error) {
            console.error("Error deleting message:", error);
            showToast("error", error.message, "⚠", 1500);
        }
    };

    return (
        <div
            ref={customRef}
            onClick={handleCloseContextMenu}
            onMouseLeave={handleCloseContextMenu}
            onContextMenu={(e) => handleRightClick(e, msg?._id)}
            className={`${isSender ? "justify-end" : "justify-start"} flex select-none`}
        >
            <div className={`${isSender ? "bg-sender" : "bg-primary"} max-w-md flex items-end gap-2 rounded-md px-4 py-2 whitespace-pre-wrap shadow-md transition-colors duration-300`}>
                <p className="text-text">{msg.message}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap">{extractTime(msg.createdAt)}</p>
            </div>

            {contextMenu.visible && (
                <div
                    ref={menuRef}
                    className="flex flex-col fixed z-10 p-2 shadow-md rounded-lg backdrop-blur-3xl"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    {isSender && (
                        <button onClick={handleUpdate} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                            <span><GoPencil className="text-base" /></span>
                            <span>Tahrirlash</span>
                        </button>
                    )}
                    <button onClick={() => handleCopy(msg?.message)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                        <span><MdContentCopy className="text-base" /></span>
                        <span>Nusxa olish</span>
                    </button>
                    <button onClick={handleDeleteMsg} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-red-500">
                        <span><AiOutlineDelete className="text-base" /></span>
                        <span>O'chirish</span>
                    </button>
                </div>
            )}
        </div>
    );
}