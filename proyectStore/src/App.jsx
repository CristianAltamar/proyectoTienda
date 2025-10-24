import { Layout } from "./components/Layout"
import { HomePage } from "./pages/HomePage"
import { ProductsPage } from "./pages/ProductsPage";
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
          </Routes>
        </ProductsProvider>
      </BrowserRouter>
    </Layout>
  )
}

export default App
