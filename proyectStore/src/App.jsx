import { Layout } from "./components/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductPage } from "./pages/ProductPageDetail.jsx";
import { AboutUsPage } from "./pages/aboutUsPage.jsx";
import { ContatPage } from "./pages/contactPage.jsx";
import { LogingPage } from "./pages/logingPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./contexts/contextProducts";

function App() {
  return (
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
          </Routes>
        </ProductsProvider>
      </BrowserRouter>
    </Layout>
  )
}

export default App
