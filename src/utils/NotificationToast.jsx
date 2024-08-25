import toast from "react-hot-toast"
import { messageEnd, messageStart, messageSuccess } from "../redux/slice/messageSlice";
import { useDispatch } from "react-redux";
import service from "../config/service";
import { userSuccess } from "../redux/slice/userSlice";
import { showErrorToast } from "./CustomToasts";

export const NotificationToast = ({ t, message, handleModal }) => {
    const dispatch = useDispatch();

    const getMessagesFunction = async (user) => {
        try {
            toast.dismiss(t.id);
            dispatch(messageStart());
            const { data } = await service.getMessages(user._id);
            dispatch(messageSuccess({ data, type: "set" }));
            dispatch(userSuccess({ data: user, type: "one" }));
            handleModal("selected", user._id);
            handleModal("sidebar", false);
        } catch (error) {
            dispatch(messageEnd());
            showErrorToast(error.message);
            throw new Error(error);
        }
    }

    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-primary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div onClick={() => getMessagesFunction(message?.sender)} className="flex-1 w-0 p-4 cursor-pointer">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={message?.sender?.avatar}
                            alt={message?.sender?.fullname}
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-text">
                            {message?.sender?.fullname}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {message?.message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Yopish
                </button>
            </div>
        </div>
    )
}