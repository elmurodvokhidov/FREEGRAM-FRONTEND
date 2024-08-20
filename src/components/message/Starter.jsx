export default function Starter({ txt, extraStyle }) {
    return (
        <div className={`${extraStyle} relative flex flex-1 items-center justify-center bg-secondary`}>
            <h1 className="absolute text-text text-base">
                {txt}
            </h1>
        </div>
    )
}