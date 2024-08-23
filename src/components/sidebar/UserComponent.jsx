import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userEnd, userStart, userSuccess } from "../../redux/slice/userSlice";
import service from "../../config/service";
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice";
import { useDelay } from "../../hooks/useDelay";
import { showErrorToast } from "../../utils/CustomToasts";

export default function UserComponent({ modals, handleModal, search }) {

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
            handleModal("selected", user?._id);
            handleModal("sidebar", false);
        } catch (error) {
            dispatch(messageEnd());
            showErrorToast(error.message);
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
                            className={`${modals.selected === user?._id && 'bg-secondary'} flex items-center gap-4 p-2 cursor-pointer rounded hover:bg-secondary transition-all`}>
                            <img src={user?.avatar} alt={user?.fullname} className="size-12" />
                            <div className="flex flex-col">
                                <h4 className="text-base text-text">{user?.fullname}</h4>
                                <p className="text-sm text-gray-400">
                                    {active.includes(user?._id) ? <span className='text-blue-500'>online</span> : <span>offline</span>}
                                </p>
                            </div>
                        </div>
                    ))
                    : <h1 className="text-center text-gray-400 text-sm">Foydalanavuvchi topilmadi.</h1>
            }
        </section>
    )
}