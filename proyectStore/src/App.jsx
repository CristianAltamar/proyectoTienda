import { Layout } from "./components/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductPage } from "./pages/ProductPageDetail.jsx";
import { AboutUsPage } from "./pages/aboutUsPage.jsx";
import { ContatPage } from "./pages/contactPage.jsx";
import { LogingPage } from "./pages/logingPage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { Profile } from "./pages/Profile.jsx";
import { OrdersHistoryPage } from "./pages/OrdersHistoryPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./contexts/contextProducts";
import { CartProvider } from "./contexts/contextCart.jsx";
import { ProfileProviden } from "./contexts/contexProfile.jsx";
import { Success } from "./pages/Success.jsx";
import { NotFound } from "./pages/NotFound.jsx";

function App() {
  return (
    <ProfileProviden>
      <CartProvider>
        <BrowserRouter>
            <ProductsProvider>
              <Routes>
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
                <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
                <Route path="/about" element={<Layout><AboutUsPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContatPage /></Layout>} />
                <Route path="/login" element={<Layout><LogingPage /></Layout>} />
                <Route path="/cart" element={<Layout><CartPage /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/orders-history" element={<Layout><OrdersHistoryPage /></Layout>} />
                <Route path="/success" element={<Layout><Success /></Layout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProductsProvider>
        </BrowserRouter>
      </CartProvider>
    </ProfileProviden>
  )
}

export default App
