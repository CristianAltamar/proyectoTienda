import { Layout } from "./components/Layout"
import { HomePage } from "./pages/HomePage"
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPageDetail.jsx";
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
          </Routes>
        </ProductsProvider>
      </BrowserRouter>
    </Layout>
  )
}

export default App
