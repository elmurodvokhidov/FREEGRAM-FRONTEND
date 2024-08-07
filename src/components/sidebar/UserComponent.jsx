import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userEnd, userStart, userSuccess } from "../../redux/slice/userSlice";
import service from "../../config/service";
import toast from "react-hot-toast";
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice";

export default function UserComponent({ isSelected, setIsSelected }) {
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllUsersFunction = async () => {
            try {
                dispatch(userStart());
                const { data } = await service.getAllUsers();
                dispatch(userSuccess({ data, type: "b" }));
            } catch (error) {
                dispatch(userEnd());
                console.log(error);
            }
        }

        getAllUsersFunction();
    }, []);

    const getMessagesFunction = async (id) => {
        try {
            dispatch(messageStart());
            const { data } = await service.getMessages(id);
            dispatch(messageSuccess(data));
            const user = users?.find(user => user?._id === id);
            dispatch(userSuccess({ data: user, type: "a" }));
            setIsSelected(id);
        } catch (error) {
            dispatch(messageEnd());
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <section className="overflow-y-auto">
            {
                users?.map(user => (
                    <div
                        key={user?._id}
                        onClick={() => getMessagesFunction(user?._id)}
                        className={`${isSelected === user?._id && 'bg-gray-100'} flex items-start justify-between p-2 cursor-pointer rounded hover:bg-gray-100 transition-all`}>
                        <div className="flex gap-4">
                            <img src={user?.avatar} alt={user?.fullname} className="size-12" />
                            <div className="flex flex-col">
                                <h4 className="text-base">{user?.fullname}</h4>
                                <p className="text-sm text-gray-400">
                                    online
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}