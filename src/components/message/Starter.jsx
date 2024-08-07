export default function Starter({ txt, extraStyle }) {
    return (
        <div className={`${extraStyle} relative flex flex-1 items-center justify-center bg-main-1`}>
            <h1 className="absolute z-10 text-white text-sm bg-gray-400 rounded-2xl px-2 py-1 backdrop-blur-xl">
                {txt}
            </h1>
        </div>
    )
}