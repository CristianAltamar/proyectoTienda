import { Header } from "./layout/Header"
import { Footer } from "./layout/Footer"

export const Layout = ({ children }) => {
    return (
        <div className="min-h-dvh flex flex-col justify-between items-center">
            <Header />
            <main className="w-full mb-auto">{children}</main>
            <Footer />
        </div>
    )
}