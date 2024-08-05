import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userEnd, userStart, userSuccess } from "../../redux/slice/userSlice";
import service from "../../config/service";

export default function UserComponent() {
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

    return (
        <section className="overflow-y-auto">
            {
                users?.map(user => (
                    <div key={user?._id} className="flex items-start justify-between p-2 cursor-pointer hover:bg-gray-100 transition-all">
                        <div className="flex gap-4">
                            <img src={user?.avatar} alt={user?.fullname} className="size-12" />
                            <div className="flex flex-col">
                                <h4 className="text-base">{user?.fullname}</h4>
                                {/* 30ta belgidan oshib ketsa, so'zni qirqish va ... qo'shish kerak! */}
                                <p className="text-sm text-gray-400">Salom, ishlar yaxshimi?</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">Mon, 7:41 AM</p>
                    </div>
                ))
            }
        </section>
    )
}