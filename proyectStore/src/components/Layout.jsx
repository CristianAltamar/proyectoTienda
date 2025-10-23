import { Header } from "./layout/Header"
import { Footer } from "./layout/Footer"

export const Layout = ({ children }) => {
    return (
        <div className="min-h-full flex flex-col justify-between items-center">
            <Header />
            <main className="m-4 max-w-4xl">{children}</main>
            <Footer />
        </div>
    )
}