import HomePage from "./pages/Home";
import './app.css'

 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

function App() {
  return <div className="app">
    <ToastContainer />
    <HomePage/>
  </div>;
}

export default App;
