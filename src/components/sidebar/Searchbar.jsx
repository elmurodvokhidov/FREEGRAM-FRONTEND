import { IoCloseOutline } from "react-icons/io5";

export default function Searchbar({ search, setSearch }) {
    return (
        <>
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Qidirish"
                className="w-full px-4 py-1.5 rounded-3xl border-2 outline-none text-text bg-secondary focus:bg-primary shadow-md" />
            {
                search &&
                <button
                    className="absolute right-8 text-text text-xl"
                    onClick={() => setSearch("")
                    }>
                    <IoCloseOutline />
                </button>
            }
        </>
    )
}