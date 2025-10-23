import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
