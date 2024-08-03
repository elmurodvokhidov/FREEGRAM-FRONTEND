import Message from "./Message";
import MessagebarHeader from "./MessagebarHeader";
import MessageInput from "./MessageInput";

export default function Messagebar() {
    return (
        <main>
            <MessagebarHeader />

            <section className="overflow-y-auto">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </section>

            <MessageInput />
        </main>
    )
}