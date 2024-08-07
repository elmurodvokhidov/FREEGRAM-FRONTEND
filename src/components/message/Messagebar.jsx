import { useSelector } from "react-redux";
import Message from "./Message";
import MessagebarHeader from "./MessagebarHeader";
import MessageInput from "./MessageInput";
import Starter from "./Starter";

export default function Messagebar({ messages }) {
    const { user } = useSelector(state => state.user);

    return (
        <main className="flex-1 relative z-10 bg-main-1">
            <MessagebarHeader user={user} />

            {
                messages.length ?
                    <section className="h-screen overflow-y-auto flex flex-col gap-1 px-4 pt-16 pb-[75px]">
                        {messages.map((msg, ind) => <Message msg={msg} key={ind} />)}
                    </section>
                    : <Starter txt={"Xabar mavjud emas"} extraStyle={"top-[40%]"} />
            }

            <MessageInput user={user} />
        </main>
    )
}