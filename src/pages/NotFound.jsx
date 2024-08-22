import { NavLink } from "react-router-dom"

function NotFound() {
    return (
        <main className="grid min-h-screen place-items-center bg-primary px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-text">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">Sahifa topilmadi</h1>
                <p className="mt-6 text-base leading-7 text-text">Kechirasiz, siz qidirayotgan sahifani topa olmadik.</p>
                <div className="mt-10 flex items-center justify-end gap-x-6">
                    <NavLink to="/" className="text-sm font-semibold text-text">
                        Bosh sahifaga qaytish <span aria-hidden="true">&rarr;</span>
                    </NavLink>
                </div>
            </div>
        </main>
    )
}

export default NotFound