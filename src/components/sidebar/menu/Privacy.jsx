import React, { useEffect, useState } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import service from '../../../config/service';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Privacy({ modals, handleModal }) {
    const { auth } = useSelector(state => state.auth);
    const [privacy, setPrivacy] = useState("");

    const handleInputChange = async (e) => {
        try {
            setPrivacy(e.target.value);
            const { data } = await service.updatePrivacy(e.target.value);
            toast.success(
                data?.message,
                {
                    icon: "✔",
                    style: {
                        background: "var(--primary)",
                        color: "var(--text)"
                    },
                    duration: 3000,
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setPrivacy(auth?.privacy);
    }, [])

    return (
        <div className={`${modals.privacy ? "right-0" : "-right-full"} absolute top-0 z-30 size-full bg-primary transition-all duration-300`}>
            <header className="w-full absolute top-0 flex items-center gap-8 mt-4 pb-4 pl-4 bg-primary">
                <button onClick={() => handleModal("privacy", false)} className="text-2xl text-text transition-all hover:text-gray-500"><HiOutlineArrowLeft /></button>
                <h1 className="text-xl text-text">Maxfiylik va xavfsizlik</h1>
            </header>

            <section className='flex flex-col gap-4 mt-20'>
                <div className='flex flex-col gap-4 px-4'>
                    <h1 className='text-blue-600'>Kimlar meni qidirishi mumkin?</h1>
                    <form className='flex flex-col gap-4 text-lg'>
                        <label htmlFor="everybody" className='cursor-pointer'>
                            <input
                                type="radio"
                                name="privacy"
                                onChange={handleInputChange}
                                checked={privacy === 'everybody'}
                                value="everybody"
                                id="everybody"
                            />
                            <span className='ml-4 text-text'>Hamma</span>
                        </label>
                        <label htmlFor="nobody" className='cursor-pointer'>
                            <input
                                type="radio"
                                name="privacy"
                                onChange={handleInputChange}
                                checked={privacy === 'nobody'}
                                value="nobody"
                                id="nobody"
                            />
                            <span className='ml-4 text-text'>Hech kim</span>
                        </label>
                    </form>
                </div>

                <div className="flex flex-col text-text bg-secondary p-4 mb-6 text-[13px]">
                    <p>Qidiruv oynasidan foydalanib, kimlar sizni qidirib topa olsin?</p>
                </div>
            </section>
        </div>
    )
}