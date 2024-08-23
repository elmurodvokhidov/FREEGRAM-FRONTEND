import { useSelector } from "react-redux";
import { extractTime } from "../../config/extractTime";
import { useState, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";

export default function Message({ msg, customRef }) {
    const { auth } = useSelector(state => state.auth);
    const isSender = auth?._id === msg?.sender?._id;
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, messageId: null });
    const menuRef = useRef(null);

    const handleRightClick = (event, messageId) => {
        event.preventDefault();

        // Menyuni yashirin holda qo'shish
        setContextMenu({ visible: true, x: -9999, y: -9999, messageId });

        setTimeout(() => {
            const menuWidth = menuRef.current?.offsetWidth || 0;
            const menuHeight = menuRef.current?.offsetHeight || 0;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let x = event.clientX;
            let y = event.clientY;

            // X o'qi bo'yicha menyuni ekrandan chiqib ketmasligini tekshirish
            if (x + menuWidth > screenWidth) {
                x = screenWidth - (menuWidth + 5);
            }

            // Y o'qi bo'yicha menyuni ekrandan chiqib ketmasligini tekshirish
            if (y + menuHeight > screenHeight) {
                y = screenHeight - (menuHeight + 5);
            }

            // Menyuni to'g'ri pozitsiyada ko'rsatish
            setContextMenu({ visible: true, x, y, messageId });
        }, 0);
    };

    const handleCloseContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
    };

    const handleUpdate = () => {
        console.log("updated:", contextMenu.messageId);
        handleCloseContextMenu();
    };

    const handleCopy = (message) => {
        navigator.clipboard.writeText(message);
        handleCloseContextMenu();
    };

    const handleDelete = () => {
        console.log("deleted:", contextMenu.messageId);
        handleCloseContextMenu();
    };

    return (
        <div
            onClick={handleCloseContextMenu}
            onMouseLeave={handleCloseContextMenu}
            onContextMenu={(e) => handleRightClick(e, msg?._id)}
            ref={customRef}
            className={`${isSender ? 'justify-end' : 'justify-start'} flex select-none`}
        >
            <div className={`${isSender ? 'bg-sender' : 'bg-primary'} max-w-md flex items-end gap-2 rounded-md px-4 py-2 shadow-md transition-colors duration-300`}>
                <p className="text-text">{msg.message}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap">{extractTime(msg.createdAt)}</p>
            </div>

            {contextMenu.visible && (
                <div
                    ref={menuRef}
                    className="flex flex-col fixed left-4 top-16 z-10 p-2 shadow-lg rounded-lg backdrop-blur-3xl"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    {isSender &&
                        <button onClick={handleUpdate} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                            <span><GoPencil className="text-xl" /></span>
                            <span>Tahrirlash</span>
                        </button>}
                    <button onClick={() => handleCopy(msg?.message)} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-text">
                        <span><MdContentCopy className="text-xl" /></span>
                        <span>Nusxa olish</span>
                    </button>
                    <button onClick={handleDelete} className="flex items-center gap-4 px-4 py-1 rounded hover:bg-secondary transition-all text-red-500">
                        <span><AiOutlineDelete className="text-xl" /></span>
                        <span>O'chirish</span>
                    </button>
                </div>
            )}
        </div>
    );
}