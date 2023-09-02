import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import axios from 'axios'

axios.defaults.baseURL = process.env.BACKENDURL || "https://trello-backend-ifxf.onrender.com"
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
