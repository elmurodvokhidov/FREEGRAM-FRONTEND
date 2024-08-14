import { useSelector } from "react-redux";
import { extractTime } from "../../config/extractTime";

export default function Message({ msg, customRef }) {
    const { auth } = useSelector(state => state.auth);
    const isSender = auth?._id === msg?.sender?._id;

    return (
        <div ref={customRef} className={`${isSender ? 'justify-end' : 'justify-start'} flex`}>
            <div className={`${isSender ? 'bg-blue-100' : 'bg-white'} max-w-md flex items-end gap-2 rounded-md px-4 py-2 shadow-md`}>
                <p>{msg.message}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap">{extractTime(msg.createdAt)}</p>
            </div>
        </div>
    )
}