import { ThemeProvider } from "./components/theme-provider"
import Form from "./Form"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Form/>
  </ThemeProvider>
  )
}

export default App
