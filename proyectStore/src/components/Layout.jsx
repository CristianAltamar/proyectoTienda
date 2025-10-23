import { Header } from "./layout/Header"
import { Footer } from "./layout/Footer"

export const Layout = ({ children }) => {
    return (
        <div className="min-h-dvh flex flex-col justify-between items-center">
            <Header />
            <main className="m-4 max-w-4xl w-full mb-auto ">{children}</main>
            <Footer />
        </div>
    )
}