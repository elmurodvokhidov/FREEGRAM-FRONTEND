import { useSelector } from "react-redux";
import Message from "./Message";
import MessagebarHeader from "./MessagebarHeader";
import MessageInput from "./MessageInput";
import Starter from "./Starter";
import { useEffect, useRef } from "react";

export default function Messagebar({ messages, modals, handleModal }) {
    const { user, active } = useSelector(state => state.user);
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <main className="flex-1 relative bg-secondary">
            <MessagebarHeader
                user={user}
                active={active}
                modals={modals}
                handleModal={handleModal}
            />

            {
                messages.length ?
                    <section className="h-screen scrollbar-hide overflow-y-auto flex flex-col gap-1 px-4 pt-16 pb-[75px] bg-secondary  transition-colors duration-300">
                        {messages.map((msg, ind) => <Message msg={msg} key={ind} customRef={lastMessageRef} />)}
                    </section>
                    : <Starter txt={"Xabar mavjud emas"} extraStyle={"top-[40%]"} />
            }

            <MessageInput user={user} modals={modals} />
        </main>
    )
}