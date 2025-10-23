import { endpoints } from "./api/enpoints"
import { useFetch } from "./hooks/useFetch"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"


function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default App
