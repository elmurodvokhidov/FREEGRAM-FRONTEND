import React, { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import service from "../../config/service";
import emoji from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { CiFaceSmile } from "react-icons/ci";

export default function MessageInput({ user }) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    const handleSend = async (e) => {
        e.preventDefault();
        if (message.trim() === "") return;
        try {
            await service.sendMessage(message, user?._id);
            setMessage("");
            textareaRef.current.style.height = "auto";
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <form onSubmit={handleSend} className="flex items-center gap-2 absolute bottom-4 right-2 left-2 z-0 px-4 shadow-dim rounded-lg bg-main-1">
            <button className="emoji_button relative">
                <div className="hidden absolute bottom-8">
                    <Picker
                        data={emoji}
                        theme={"light"}
                        onEmojiSelect={console.log}
                        previewPosition={"none"}
                        className="hidden"
                    />
                </div>
                <CiFaceSmile className="text-[28px] text-gray-400" />
            </button>
            <textarea
                ref={textareaRef}
                name="message"
                id="message"
                rows={1}
                placeholder="Xabar yozing..."
                className="scrollbar-hide w-full max-h-80 overflow-y-auto resize-none outline-none p-3 bg-main-1"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            ></textarea>
            <button type="submit" className="text-2xl text-blue-700 absolute bottom-3 right-4">
                <IoSend />
            </button>
        </form>
    );
}
