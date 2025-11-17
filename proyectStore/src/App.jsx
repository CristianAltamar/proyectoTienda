import { Layout } from "./components/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductPage } from "./pages/ProductPageDetail.jsx";
import { AboutUsPage } from "./pages/aboutUsPage.jsx";
import { ContatPage } from "./pages/contactPage.jsx";
import { LogingPage } from "./pages/logingPage.jsx";
import { CreatePage } from "./pages/CreatePage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { Profile } from "./pages/Profile.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./contexts/contextProducts";
import { CartProvider } from "./contexts/contextCart.jsx";

function App() {
  return (
    <CartProvider>
      <Layout>
        <BrowserRouter>
          <ProductsProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContatPage />} />
              <Route path="/login" element={<LogingPage />} />
              <Route path="/create-account" element={<CreatePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </ProductsProvider>
        </BrowserRouter>
      </Layout>
    </CartProvider>
  )
}

export default App
