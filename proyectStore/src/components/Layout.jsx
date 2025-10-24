import { Header } from "./layout/Header"
import { Footer } from "./layout/Footer"

export const Layout = ({ children }) => {
    return (
        <div className="min-h-dvh flex flex-col justify-between items-center">
            <Header />
            <main className="m-4 w-full mb-auto flex justify-center ">{children}</main>
            <Footer />
        </div>
    )
}