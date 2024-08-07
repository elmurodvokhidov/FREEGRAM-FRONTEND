export default function MessagebarHeader({ user }) {
    return (
        <section className="w-full flex items-center gap-4 p-2 pl-4 absolute top-0 shadow-smooth bg-main-1">
            <img className="size-10" src={user?.avatar} alt={user?.fullname} />
            <h1 className="text-lg">{user?.fullname}</h1>
        </section>
    )
}