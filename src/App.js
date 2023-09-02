import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import axios from 'axios'

axios.defaults.baseURL = process.env.BACKENDURL || ""
function App() {
  return (
    <>
    <Navbar />
    <Home />
    <Footer />
    </>
  );
}

export default App;
