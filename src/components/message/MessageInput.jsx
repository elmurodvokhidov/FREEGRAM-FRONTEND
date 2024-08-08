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
        <div className="flex items-center absolute bottom-4 right-4 left-2 z-0 px-4 shadow-dim rounded-lg bg-main-1">
            <button className="emoji_button size-8 absolute bottom-[10px] z-10">
                <div className="hidden absolute bottom-8">
                    <Picker
                        data={emoji}
                        theme="light"
                        onEmojiSelect={(emoji) => setMessage(prev => prev + emoji.native)}
                        previewPosition="none"
                        set="native"
                    />
                </div>
                <CiFaceSmile className="text-[28px] text-gray-400 absolute bottom-0" />
            </button>
            <form onSubmit={handleSend} className="w-full flex items-center rounded-lg">
                <textarea
                    ref={textareaRef}
                    name="message"
                    id="message"
                    rows={1}
                    placeholder="Xabar yozing..."
                    className="scrollbar-hide w-full max-h-80 overflow-y-auto resize-none outline-none p-3 mx-8 bg-main-1"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <button type="submit" className="text-2xl text-blue-700 absolute bottom-3 right-4">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}