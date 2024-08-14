import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userEnd, userStart, userSuccess } from "../../redux/slice/userSlice";
import service from "../../config/service";
import toast from "react-hot-toast";
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice";
import { useDelay } from "../../utils/useDelay";

export default function UserComponent({ isSelected, setIsSelected, search }) {
    const { users, active } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const delayedValue = useDelay(search, 500);

    useEffect(() => {
        const getUsersFunction = async () => {
            try {
                dispatch(userStart());
                const { data } = await service.getUsers(delayedValue);
                dispatch(userSuccess({ data, type: "all" }));
            } catch (error) {
                dispatch(userEnd());
                console.log(error);
            }
        }

        getUsersFunction();
    }, [delayedValue]);

    const getMessagesFunction = async (user) => {
        try {
            dispatch(messageStart());
            const { data } = await service.getMessages(user?._id);
            dispatch(messageSuccess({ data, type: "set" }));
            dispatch(userSuccess({ data: user, type: "one" }));
            setIsSelected(user?._id);
        } catch (error) {
            dispatch(messageEnd());
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <section className="overflow-y-auto">
            {
                users?.length > 0 ?
                    users.map(user => (
                        <div
                            key={user?._id}
                            onClick={() => getMessagesFunction(user)}
                            className={`${isSelected === user?._id && 'bg-gray-100'} flex items-start justify-between p-2 cursor-pointer rounded hover:bg-gray-100 transition-all`}>
                            <div className="flex gap-4">
                                <img src={user?.avatar} alt={user?.fullname} className="size-12" />
                                <div className="flex flex-col">
                                    <h4 className="text-base">{user?.fullname}</h4>
                                    <p className="text-sm text-gray-400">
                                        {active.includes(user?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                    : <h1 className="text-center text-gray-400 text-sm">Foydalanavuvchi topilmadi.</h1>
            }
        </section>
    )
}